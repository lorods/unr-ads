import {
	createCipheriv,
	createDecipheriv,
	createHmac,
	randomBytes,
	scryptSync,
	timingSafeEqual
} from 'node:crypto';
import { normalizeTextToken } from '../db/participantValidation.js';

const DEFAULT_DEV_SECRET = 'mousetrapbingo-backend-crypto-secret-key-v1-unr-ads';
const CIPHER_ALGORITHM = 'aes-256-gcm';
const SCRYPT_KEYLEN = 32;

function getBackendSecret() {
	if (typeof process !== 'undefined' && process.env?.BINGO_CRYPTO_SECRET) {
		return process.env.BINGO_CRYPTO_SECRET;
	}
	return DEFAULT_DEV_SECRET;
}

function getMasterKey() {
	const secret = getBackendSecret();
	return scryptSync(secret, 'mousetrapbingo-master-salt-v1', 32);
}

/**
 * Criptografa um valor textual no backend utilizando AES-256-GCM autenticado.
 *
 * @param {string} plainText
 * @returns {{ alg: string, iv: string, tag: string, ciphertext: string }}
 */
export function encryptBackendValue(plainText) {
	const key = getMasterKey();
	const iv = randomBytes(12);
	const cipher = createCipheriv(CIPHER_ALGORITHM, key, iv);
	const encrypted = Buffer.concat([
		cipher.update(String(plainText ?? ''), 'utf8'),
		cipher.final()
	]);
	const tag = cipher.getAuthTag();

	return {
		alg: CIPHER_ALGORITHM,
		iv: iv.toString('hex'),
		tag: tag.toString('hex'),
		ciphertext: encrypted.toString('hex')
	};
}

/**
 * Descriptografa um envelope AES-256-GCM gerado por `encryptBackendValue`.
 *
 * @param {{ alg?: string, iv: string, tag: string, ciphertext: string }} envelope
 * @returns {string}
 */
export function decryptBackendValue(envelope) {
	if (!envelope || typeof envelope !== 'object') {
		throw new TypeError('Envelope criptográfico inválido.');
	}
	const key = getMasterKey();
	const iv = Buffer.from(envelope.iv, 'hex');
	const tag = Buffer.from(envelope.tag, 'hex');
	const encrypted = Buffer.from(envelope.ciphertext, 'hex');

	const decipher = createDecipheriv(CIPHER_ALGORITHM, key, iv);
	decipher.setAuthTag(tag);
	const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
	return decrypted.toString('utf8');
}

/**
 * Gera um hash seguro da passphrase via `scrypt` com salt aleatório de 16 bytes.
 *
 * @param {string} passphrase
 * @param {string} [saltHex]
 * @returns {{ hashHex: string, saltHex: string }}
 */
export function hashPassphrase(passphrase, saltHex = randomBytes(16).toString('hex')) {
	const clean = String(passphrase ?? '').trim();
	const derived = scryptSync(clean, Buffer.from(saltHex, 'hex'), SCRYPT_KEYLEN);
	return {
		hashHex: derived.toString('hex'),
		saltHex
	};
}

/**
 * Verifica uma passphrase em tempo constante (`timingSafeEqual`) contra o hash armazenado.
 *
 * @param {string} candidatePassphrase
 * @param {string} storedHashHex
 * @param {string} saltHex
 * @returns {boolean}
 */
export function verifyPassphrase(candidatePassphrase, storedHashHex, saltHex) {
	if (!candidatePassphrase || !storedHashHex || !saltHex) return false;
	try {
		const { hashHex } = hashPassphrase(candidatePassphrase, saltHex);
		const a = Buffer.from(hashHex, 'hex');
		const b = Buffer.from(storedHashHex, 'hex');
		if (a.length !== b.length) return false;
		return timingSafeEqual(a, b);
	} catch {
		return false;
	}
}

/**
 * Gera um HMAC-SHA256 determinístico para indexação/identificação do nome normalizado.
 *
 * @param {string} participantName
 * @returns {string}
 */
export function computeParticipantNameHmac(participantName) {
	const normalized = normalizeTextToken(participantName).replace(/\s+/g, ' ');
	return createHmac('sha256', getMasterKey()).update(normalized).digest('hex');
}

/**
 * Deriva um `playerId` determinístico e seguro para documentos em `results/{playerId}` e `scores/{playerId}`.
 *
 * @param {object} params
 * @param {string} params.participantName
 * @param {'team' | 'individual'} [params.participantType='individual']
 * @param {string | null} [params.teamId=null]
 * @returns {string}
 */
export function deriveParticipantId({
	participantName,
	participantType = 'individual',
	teamId = null
}) {
	if (participantType === 'team' && teamId) {
		return teamId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
	}
	const slug = normalizeTextToken(participantName)
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '')
		.slice(0, 24);
	const hmacShort = computeParticipantNameHmac(participantName).slice(0, 8);
	return `part_${slug || 'user'}_${hmacShort}`;
}

/**
 * Cria o pacote de credenciais criptografadas de participante (nome e passphrase criptografados
 * com AES-256-GCM + hash scrypt + HMAC) para armazenamento seguro no documento do jogador.
 *
 * @param {object} params
 * @param {string} params.participantName
 * @param {string} params.passphrase
 * @param {'team' | 'individual'} [params.participantType='individual']
 * @param {string | null} [params.teamId=null]
 */
export function createEncryptedParticipantCredentials({
	participantName,
	passphrase,
	participantType = 'individual',
	teamId = null
}) {
	const cleanName = String(participantName ?? '').trim();
	const cleanPass = String(passphrase ?? '').trim();
	const { hashHex, saltHex } = hashPassphrase(cleanPass);

	return {
		version: 1,
		participantType,
		teamId: teamId ?? null,
		nameHmac: computeParticipantNameHmac(cleanName),
		encryptedName: encryptBackendValue(cleanName),
		encryptedPassphrase: encryptBackendValue(cleanPass),
		passphraseHash: hashHex,
		passphraseSalt: saltHex,
		createdAtIso: new Date().toISOString()
	};
}

/**
 * Valida a passphrase informada pelo usuário contra o pacote `credentials` armazenado.
 *
 * @param {string} passphrase
 * @param {object | null | undefined} credentials
 * @returns {boolean}
 */
export function verifyEncryptedParticipantCredentials(passphrase, credentials) {
	if (!credentials || typeof credentials !== 'object') return false;
	return verifyPassphrase(passphrase, credentials.passphraseHash, credentials.passphraseSalt);
}

/**
 * Emite um token de sessão assinado via HMAC-SHA256 para autenticar operações
 * de montagem, marcação e consulta da cartela pelo participante conectado.
 *
 * @param {object} payload
 * @param {string} payload.sessionId
 * @param {string} payload.playerId
 * @param {string} payload.participantName
 * @param {'team' | 'individual'} payload.participantType
 * @returns {string}
 */
export function issueParticipantAuthToken({
	sessionId,
	playerId,
	participantName,
	participantType
}) {
	const data = {
		sessionId,
		playerId,
		participantName,
		participantType,
		iat: Date.now()
	};
	const encoded = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
	const signature = createHmac('sha256', getMasterKey()).update(encoded).digest('base64url');
	return `${encoded}.${signature}`;
}

/**
 * Verifica a assinatura de um token emitido por `issueParticipantAuthToken` e retorna seu payload.
 *
 * @param {string} token
 * @returns {{ valid: boolean, payload: object | null }}
 */
export function verifyParticipantAuthToken(token) {
	if (!token || typeof token !== 'string' || !token.includes('.')) {
		return { valid: false, payload: null };
	}

	const [encoded, signature] = token.split('.');
	if (!encoded || !signature) {
		return { valid: false, payload: null };
	}

	try {
		const expectedSig = createHmac('sha256', getMasterKey()).update(encoded).digest('base64url');
		const sigBuf = Buffer.from(signature, 'utf8');
		const expBuf = Buffer.from(expectedSig, 'utf8');
		if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
			return { valid: false, payload: null };
		}

		const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
		return { valid: true, payload };
	} catch {
		return { valid: false, payload: null };
	}
}

package io.github.lorods.unitutils.loopconstructs;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class LoopHelpers {
	/**
	 * @param chkdprim:  a natural number to check for primality
	 * @param ceildsqrt: a ceiled square root which will be the upper bound to test
	 *                   against
	 */
	public static boolean chkSimpleNatPrimality(int chkdprim, double ceildsqrt) {
		int mod;
		// System.out.printf("got to line 57, sqrtceil: %.2f\n", ceildsqrt);
		for (int i = 3; i <= ceildsqrt; i += 2) {
			mod = chkdprim % i;
			if (mod == 0) {
				System.out.printf("O número %d não é primo.\n", chkdprim);
				return false;
			}
		}
		System.out.printf("O número %d é primo.\n", chkdprim);
		return true;
	}
	
	//exercise 6, set 7
	public static Object[] groupNatPrimality(int[] chkdset) {
		int primecnt = 0;
		int confprime[] = new int[0];
		boolean isprime;
		double ceildsqrt;
		for (int chkdprim : chkdset) {
			ceildsqrt = Math.sqrt(chkdprim);
			if (chkdprim % 1 != 0)
				ceildsqrt = Math.ceil(ceildsqrt);
			isprime = chkSimpleNatPrimality(chkdprim, ceildsqrt);
			if (isprime) {
				if (confprime.length == 0) {
					confprime = new int[1];
					confprime[0] = chkdprim;
				} else {
					confprime = Arrays.copyOf(confprime, (confprime.length + 1));
					confprime[(confprime.length-1)] = chkdprim;
				}
				primecnt++;
			}
		}
		return new Object[] { confprime, primecnt };
	}

	/**
	 * @param sortd: dummy array to sort and retrieve max and min from
	 */

	// exercise 4, set 7
	public static int[] getSimpleBounds(int[] sortd) {
		Arrays.sort(sortd);
		return new int[] { sortd[0], sortd[(sortd.length - 1)] };
	}

	// exercise 1, set 7
	public static int[] multiplySameIndex(int[] lfactr, int[] rfactr) {
		int[] prod = new int[1000];
		for (int curfi = 0; curfi < lfactr.length; curfi++) {
			prod[curfi] = (lfactr[curfi] == 0 || rfactr[curfi] == 0) ? 0 : lfactr[curfi];
			int targetfactr = (rfactr[curfi] < 0) ? rfactr[curfi] * (-1) : rfactr[curfi];
			if (prod[curfi] != 0) {
				if ((rfactr[curfi] < 0 && lfactr[curfi] < 0) || (rfactr[curfi] < 0 && lfactr[curfi] > 0)) {
					lfactr[curfi] *= -1;
					prod = lfactr;
				}
				for (int i = 2; i <= targetfactr; i++) {
					prod[curfi] += lfactr[curfi];
				}
			}
			assert prod[curfi] == lfactr[curfi] * rfactr[curfi] : "Erro na lógica da subrotina.";
		}
		return prod;
	}

	// exercise 2, set 7
	public static Object[] operateOnBalance(int ch, BigDecimal balance, boolean shquit, Scanner ativsc) {
		BigDecimal withdrawal, deposit;
		switch (ch) {
		case 4 -> shquit = true;
		case 1 -> {
			System.out.printf("Caro cliente, seu saldo atual é R$ %s.\n", balance.toPlainString());
		}
		case 2 -> {
			for (boolean proceed = false; !proceed;) {
				System.out.printf("Prezado cliente, qual o valor que deseja sacar de sua conta? Insira ao lado: ");
				withdrawal = ativsc.nextBigDecimal();
				if (withdrawal.compareTo(balance) == 1) {
					System.out.printf("Erro: saldo (R$ %s) é insuficiente para quantia de saque desejada (R$ %s).\n",
							balance.toPlainString(), withdrawal.toPlainString());
					continue;
				} else if (withdrawal.compareTo(BigDecimal.ZERO) <= 0) {
					System.out.printf(
							"Erro: uma quantia de saque negativa caracteriza um depósito. Você deseja depositar algum valor em sua conta? Caso positivo, escolha a opção 3 (depósito) a seguir.\n");
					break;
				}
				balance = balance.subtract(withdrawal);
				proceed = true;
			}
		}
		case 3 -> {
			for (boolean proceed = false; !proceed;) {
				System.out.printf("Prezado cliente, qual o valor que deseja depositar em sua conta? Insira ao lado: ");
				deposit = ativsc.nextBigDecimal();
				if (deposit.compareTo(BigDecimal.ZERO) == -1) {
					System.out.printf(
							"O depósito mínimo é de R$ 0,01. Para cancelar esta operação, digite 0 a seguir.\n");
					continue;

				} else if (deposit.compareTo(BigDecimal.ZERO) == 1) {
					balance = balance.add(deposit);
				}
				proceed = true;
			}
		}
		default -> {
			System.out.printf("Opção digitada não é válida!");
		}
		}
		if (ch != 1)
			System.out.printf("Atualmente, seu saldo é de R$ %s.\n", balance.toPlainString());
		return new Object[] { shquit, balance };
	}

	// exercise 3, set 7
	public static Object[] requestGrading(int clsize, Scanner ativsc, BigDecimal gradelen) {
		ArrayList<BigDecimal[]> typdgrade = new ArrayList<BigDecimal[]>(clsize);
		enum Situacao {
			REPROVADO, APROVADO
		}
		System.out.printf(
				"Professor, agora forneça a nota mínima necessária para aprovação. Se fornecer uma nota igual ou inferior a zero, a mínima considerada será seis: ");
		BigDecimal gradereq = ativsc.nextBigDecimal();
		if (!(gradereq.compareTo(BigDecimal.ZERO) == 1))
			gradereq = new BigDecimal(6);
		Situacao[] apprstatus = new Situacao[clsize];
		BigDecimal[] studentavg = new BigDecimal[clsize];
		BigDecimal[] gradehelpr = new BigDecimal[3];
		boolean isvalidgrade;
		for (int i = 0; i < clsize; i++) {
			if (studentavg[i] == null)
				studentavg[i] = BigDecimal.ZERO;
			System.out.printf("Forneça as notas do aluno %d.\n", (i + 1));
			for (int j = 0; j < 3; j++) {
				do {
					System.out.printf("Nota %d: ", (j + 1));
					gradehelpr[j] = ativsc.nextBigDecimal();
					if (gradehelpr[j].compareTo(BigDecimal.ZERO) == -1) {
						isvalidgrade = false;
						System.out.printf("Você inseriu uma nota negativa, porém a mínima é zero. Tente novamente.\n");
						continue;
					} else
						isvalidgrade = true;
				} while (!isvalidgrade);
				studentavg[i] = studentavg[i].add(gradehelpr[j]);
			}
			typdgrade.add(gradehelpr);
			System.out.printf("\nAbout to divide %s by %s.\n", studentavg[i].toPlainString(), gradelen.toPlainString());
			try {
				studentavg[i] = studentavg[i].divide(gradelen);
			} catch (ArithmeticException ae) {
				studentavg[i] = studentavg[i].divide(gradelen, 2, RoundingMode.HALF_UP);
			}
			System.out.printf("\nJust divided %s by %s.\n", studentavg[i].toPlainString(), gradelen.toPlainString());
			apprstatus[i] = (studentavg[i].compareTo(gradereq) >= 0) ? Situacao.APROVADO : Situacao.REPROVADO;
		}
		BigDecimal classavg = BigDecimal.ZERO;
		for (BigDecimal indavg : studentavg) {
			classavg = classavg.add(indavg);
		}
		BigDecimal bigclsize = new BigDecimal(clsize);
		classavg = classavg.divide(bigclsize);
		System.out.printf("\nEstatísticas consolidadas:\n\n");
		int aprovtotal = 0, reprovtotal = 0;
		boolean isappr[] = new boolean[clsize];
		for (int i = 0; i < clsize; i++) {
			if (apprstatus[i].equals(Situacao.APROVADO)) {
				aprovtotal++;
				isappr[clsize] = true;
			} else {
				reprovtotal++;
				isappr[clsize] = false;
			}
		}
		final BigDecimal bighundred = new BigDecimal(100);
		BigDecimal apprperc = new BigDecimal(aprovtotal).divide(bigclsize).multiply(bighundred),
				repprperc = new BigDecimal(reprovtotal).divide(bigclsize).multiply(bighundred);
		return new Object[] { studentavg, isappr, classavg, apprperc, repprperc };
	}

	// exercise 5, set 7
	private static class ArithmeticProg {
		int proglen;
		BigDecimal progratio, leadel, eltotal;

		ArithmeticProg(int proglen, BigDecimal progratio, BigDecimal leadel, BigDecimal eltotal) {
			this.proglen = proglen;
			this.progratio = progratio;
			this.leadel = leadel;
			this.eltotal = eltotal;
		}

		ArithmeticProg(int proglen) {
			this.proglen = proglen;
		}

		ArithmeticProg() {
		}

		int getProglen() {
			return proglen;
		}

		void setProglen(int proglen) {
			this.proglen = proglen;
		}

		BigDecimal getProgratio() {
			return progratio;
		}

		void setProgratio(BigDecimal progratio) {
			this.progratio = progratio;
		}

		BigDecimal getLeadel() {
			return leadel;
		}

		void setLeadel(BigDecimal leadel) {
			this.leadel = leadel;
		}

		BigDecimal getEltotal() {
			return eltotal;
		}

		void setEltotal(BigDecimal eltotal) {
			this.eltotal = eltotal;
		}
	}

	public static ArrayList<ArithmeticProg> fillAP(int progboundary, Scanner ativsc) {
		ArrayList<ArithmeticProg> aplist = new ArrayList<ArithmeticProg>(progboundary);
		for (int i = 0; i < progboundary; i++) {
			int plen = ativsc.nextInt();
			if (plen == 0 || plen == 1)
				plen = 2;
			ArithmeticProg ap = new ArithmeticProg(plen);
			System.out.printf("Forneça o primeiro elemento enumerado na progressão: ");
			BigDecimal curleadel = ativsc.nextBigDecimal();
			ap.setLeadel(curleadel);
			System.out.printf(
					"Forneça a razão de progressão (transformação a ser aplicada sucessivamente; entrada válida: número racional): ");
			BigDecimal curprogratio = ativsc.nextBigDecimal(), eltotal = curleadel;
			ap.setProgratio(curprogratio);
			ap.setEltotal(curleadel);
			BigDecimal[] prog = new BigDecimal[plen];
			for (int j = 1; j < plen; j++) {
				prog[j] = prog[(j - 1)].add(curprogratio);
				eltotal = eltotal.add(prog[j]);
			} /*
				 * System.out.printf("Termos da progressão:\n%s", prog.get(0).toPlainString());
				 * for (BigDecimal el : prog.subList(1, proglen)) { System.out.printf(", %s",
				 * el.toPlainString()); }
				 * System.out.printf(".\nSomatório dos elementos da progressão: %s.\n\n",
				 * eltotal.toPlainString());
				 */
			aplist.add(ap);
		}
		return aplist;
	}
}

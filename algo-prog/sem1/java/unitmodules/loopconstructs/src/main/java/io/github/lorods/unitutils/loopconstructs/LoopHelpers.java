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

	public record PrimalitySummary(int primecnt, int[] confprime) {

	}

	// exercise 6, set 7
	public static PrimalitySummary groupNatPrimality(int[] chkdset) {
		int primecnt = 0;
		int[] confprime = new int[0];
		Boolean isprime;
		double ceildsqrt;
		for (int chkdprim : chkdset) {
			isprime = null;
			// check for 2 and 3 special cases
			if (chkdprim == 2 || chkdprim == 3)
				isprime = true;
			// check for even numbers
			else if (chkdprim % 2 == 0 || chkdprim == 1) {
				isprime = false;
				continue;
			}
			if (isprime == null) {
				ceildsqrt = Math.sqrt(chkdprim);
				if (chkdprim % 1 != 0)
					ceildsqrt = Math.ceil(ceildsqrt);
				isprime = chkSimpleNatPrimality(chkdprim, ceildsqrt);
			}
			if (isprime) {
				if (confprime.length == 0) {
					confprime = new int[1];
					confprime[0] = chkdprim;
				} else {
					confprime = Arrays.copyOf(confprime, (confprime.length + 1));
					confprime[(confprime.length - 1)] = chkdprim;
				}
				primecnt++;
			}
		}
		return new PrimalitySummary(primecnt, confprime);
	}

	/**
	 * @param sortd: dummy array to sort and retrieve max and min from
	 */

	// exercise 4, set 7
	public static int[] getSimpleBounds(int[] sortd) {
		Arrays.sort(sortd);
		return new int[] { sortd[0], sortd[(sortd.length - 1)] };
	}

	// exercise 1, set 7; exercise 8, set 7
	public static int[] multiplySameIndex(int[] lfactr, int[] rfactr, int indivlen) {
		// indivlen: 1000 or 3000, for exs. 1 and 8, respectively
		int[] prod = new int[indivlen];
		for (int i = 0; i < indivlen; i++) {
			int a = lfactr[i];
			int b = rfactr[i];
			if (b < 0) {
				a = 0 - a;
				b = 0 - b;
			}
			for (int j = 0; j < b; j++) {
				prod[i] += a;
			}
			assert prod[i] == a * b : String
					.format("\nAlgo na lógica do cálculo mostrado ao lado está errado: result =/= %d * %d.\n", a, b);
		}
		return prod;
	}

	public record OperationSummary(boolean shquit, BigDecimal balance) {
	};

	// exercise 2, set 7
	public static OperationSummary operateOnBalance(int ch, BigDecimal balance, Scanner ativsc) {
		BigDecimal withdrawal, deposit;
		boolean shquit = false;
		switch (ch) {
		case 4 -> shquit = true;
		case 1 -> {
			break;
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
		return new OperationSummary(shquit, balance);
	}

	public record GradingSummary(BigDecimal[] studentavg, boolean[] isappr, BigDecimal classavg, BigDecimal apprperc,
			BigDecimal repprperc) {
	};

	// exercise 3, set 7
	public static GradingSummary requestGrading(int clsize, Scanner ativsc, BigDecimal gradelen) {
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
		try {
			classavg = classavg.divide(bigclsize);
		} catch (ArithmeticException ae) {
			classavg = classavg.divide(bigclsize, 2, RoundingMode.HALF_UP);
		}
		System.out.printf("\nEstatísticas consolidadas:\n\n");
		int aprovtotal = 0, reprovtotal = 0;
		boolean[] isappr = new boolean[clsize];
		for (int i = 0; i < clsize; i++) {
			if (apprstatus[i].equals(Situacao.APROVADO)) {
				aprovtotal++;
				isappr[i] = true;
			} else {
				reprovtotal++;
				isappr[i] = false;
			}
		}
		final BigDecimal bighundred = new BigDecimal(100);
		BigDecimal apprperc;
		try {
			apprperc = new BigDecimal(aprovtotal).divide(bigclsize);
		} catch (ArithmeticException ae) {
			apprperc = new BigDecimal(aprovtotal).divide(bigclsize, 2, RoundingMode.HALF_UP);
		}
		apprperc = apprperc.multiply(bighundred);
		BigDecimal repprperc;
		try {
			repprperc = new BigDecimal(reprovtotal).divide(bigclsize);
		} catch (ArithmeticException ae) {
			repprperc = new BigDecimal(reprovtotal).divide(bigclsize, 2, RoundingMode.HALF_UP);
		}
		repprperc = repprperc.multiply(bighundred);
		return new GradingSummary(studentavg, isappr, classavg, apprperc, repprperc);
	}

	// exercise 5, set 7
	public static class ArithmeticProg {
		int proglen;
		BigDecimal progratio, leadel, eltotal;
		BigDecimal[] memberel;

		ArithmeticProg(int proglen, BigDecimal progratio, BigDecimal leadel, BigDecimal eltotal,
				BigDecimal[] memberel) {
			this.proglen = proglen;
			this.progratio = progratio;
			this.leadel = leadel;
			this.eltotal = eltotal;
			this.memberel = memberel;
		}

		ArithmeticProg(int proglen) {
			this.proglen = proglen;
		}

		ArithmeticProg() {
		}

		public int getProglen() {
			return proglen;
		}

		void setProglen(int proglen) {
			this.proglen = proglen;
		}

		public BigDecimal getProgratio() {
			return progratio;
		}

		void setProgratio(BigDecimal progratio) {
			this.progratio = progratio;
		}

		public String getLeadel() {
			return leadel.toPlainString();
		}

		void setLeadel(BigDecimal leadel) {
			this.leadel = leadel;
		}

		public BigDecimal[] getMemberel() {
			return Arrays.copyOfRange(memberel, 1, proglen);
		}

		void setMemberel(BigDecimal[] memberel) {
			this.memberel = memberel;
		}

		public String getEltotal() {
			return eltotal.toPlainString();
		}

		void setEltotal(BigDecimal eltotal) {
			this.eltotal = eltotal;
		}
	}

	public static ArrayList<ArithmeticProg> fillAP(int progboundary, Scanner activitsc) {
		ArrayList<ArithmeticProg> aplist = new ArrayList<ArithmeticProg>(progboundary);
		int plen;
		String staytest;
		for (int i = 0; i < progboundary; i++) {
			System.out.printf(
					"Forneça o tamanho (capacidade de elementos) da progressão — caso forneça 1, 0 ou um número negativo, um ou dois elemento(s) extra(s)r será(ão) acrescentado(s) para formar uma progressão mínima: ");
			plen = activitsc.nextInt();
			if (plen < 0)
				plen *= (-1);
			else if (plen == 0 || plen == 1)
				plen = 2;
			ArithmeticProg ap = new ArithmeticProg(plen);
			System.out.printf("Forneça o primeiro elemento enumerado na progressão: ");
			BigDecimal curleadel = activitsc.nextBigDecimal();
			ap.setLeadel(curleadel);
			System.out.printf(
					"Forneça a razão de progressão (transformação a ser aplicada sucessivamente; entrada válida: número racional): ");
			BigDecimal curprogratio = activitsc.nextBigDecimal(), eltotal = curleadel;
			ap.setProgratio(curprogratio);
			BigDecimal[] prog = new BigDecimal[plen];
			prog[0] = curleadel;
			for (int j = 1; j < plen; j++) {
				prog[j] = prog[(j - 1)].add(curprogratio);
				eltotal = eltotal.add(prog[j]);
			}
			ap.setMemberel(prog);
			ap.setEltotal(eltotal);/*
									 * System.out.printf("Termos da progressão:\n%s", prog.get(0).toPlainString());
									 * for (BigDecimal el : prog.subList(1, proglen)) { System.out.printf(", %s",
									 * el.toPlainString()); }
									 * System.out.printf(".\nSomatório dos elementos da progressão: %s.\n\n",
									 * eltotal.toPlainString());
									 */
			aplist.add(ap);
			activitsc.nextLine();
			System.out.printf(
					"Você deseja permanecer lendo elementos? Digite s para sair ou qualquer outro caractere para continuar: ");
			staytest = activitsc.nextLine();
			if (staytest.equals("s"))
				break;
		}
		return aplist;
	}

	public record NumFactsheet(boolean isanyprime, int[] colprime, boolean isanyaboveoneth, int[] colgreat,
			int[] sortdprime, String primeavg) {

	}

	// exercise 7, set 7
	public static NumFactsheet getNumFacts(int amount, Scanner ativsc) {
		int primetot = 0;
		int[] collectd = new int[amount], colgreat = new int[0], colprime = new int[0];
		int[] colgreathelpr = new int[0], colprimehelpr = new int[0];
		boolean isprime, isnatural;
		// check for 2 and 3 special case
		for (int i = 0; i < amount; i++) {
			isprime = false;
			do {
				System.out.printf("Forneça o valor %d (qualquer entrada negativa produzirá um inverso positivo): ",
						(i + 1));
				collectd[i] = ativsc.nextInt();
				if (collectd[i] < 0) {
					collectd[i] *= -1;
				} else if (collectd[i] == 0) {
					isnatural = false;
					System.out.printf("Erro: 0 é divisível por qualquer número. Tente outro...\n");
					continue;
				}
				isnatural = true;
			} while (!isnatural);
			// check for 2 and 3 special case
			if (collectd[i] == 2 || collectd[i] == 3) {
				System.out.printf("O número %d é primo.\n", collectd[i]);
				isprime = true;
			}
			// check for even numbers
			else if (collectd[i] % 2 == 0 || collectd[i] == 1)
				System.out.printf("O número %d não é primo.\n", collectd[i]);
			else {
				double ceildsqrt = Math.sqrt(collectd[i]);
				if (collectd[i] % 1 != 0)
					ceildsqrt = Math.ceil(collectd[i]);
				isprime = LoopHelpers.chkSimpleNatPrimality(collectd[i], ceildsqrt);
			}
			if (collectd[i] > 1000) {
				colgreathelpr = (colgreathelpr.length > 0) ? Arrays.copyOf(colgreathelpr, (colgreathelpr.length + 1))
						: new int[1];
				colgreathelpr[(colgreathelpr.length - 1)] = collectd[i];
				colgreat = Arrays.copyOf(colgreathelpr, colgreathelpr.length);
			}
			if (isprime) {
				colprimehelpr = (colprimehelpr.length > 0) ? Arrays.copyOf(colprimehelpr, (colprimehelpr.length + 1))
						: new int[1];
				colprimehelpr[(colprimehelpr.length - 1)] = collectd[i];
				colprime = Arrays.copyOf(colprimehelpr, colprimehelpr.length);
				primetot += collectd[i];
			}
		}
		boolean isanyprime = (colprime.length != 0);
		int[] sortdprime = isanyprime ? LoopHelpers.getSimpleBounds(colprimehelpr) : null;
		/*
		 * System.out.
		 * printf("\nEstatísticas desejadas em relação aos números fornecidos:\nNúmeros primos: %s"
		 * , isanyprime ? String.valueOf(colprime[0]) : "nenhum"); if (isanyprime) { for
		 * (int i = 1; i < colprime.length; i++) { System.out.printf(", %d",
		 * colprime[i]); } }
		 */
		boolean isanyaboveoneth = (colgreat.length != 0);
		String primeavg = new BigDecimal(primetot).divide(new BigDecimal(colprime.length)).toPlainString();
		// System.out.printf(".\n———\nNúmeros maiores que 1000: %s",
		// isanyaboveoneth ? String.valueOf(colgreat[0]) : "nenhum");
		/*
		 * if (isanyaboveoneth) { for (int i = 1; i < colgreat.length; i++) {
		 * System.out.printf(", %d", colgreat[i]); } }
		 */
		/*
		 * System.out.printf(new String(".\n———\n").concat(isanyprime ? String.format(
		 * "Menor e maior primo, respectivamente: %d e %d\nMédia aritmética dos números primos localizados: %s\n———"
		 * , sortdprime[0], sortdprime[1],new BigDecimal(primetot).divide(new
		 * BigDecimal(colprime.length)).toPlainString()) :
		 * "Não é possível localizar o maior ou menor número primo nem obter a média deles porque nenhum foi informado na digitação."
		 * ) .concat("\n\n"));
		 */
		return new NumFactsheet(isanyprime, colprime, isanyaboveoneth, colgreat,
				(sortdprime.length != 0) ? (sortdprime) : (null), primeavg);
	}

	// exercise 9, set 7
	public static int[] powOfIndexes(int[] base, int[] exp, int indivlen) {
		int[] result = new int[indivlen];
		for (int i = 0; i < indivlen; i++) {
			result[i] = (exp[i] == 0) ? 1 : 0;
			if (result[i] != 1) {
				result[i] = base[i];
				for (int j = 2; j <= exp[i]; j++) {
					result[i] *= base[i];
					// System.out.printf("Resultado atual da potenciação: %d.\ni: %d\n", result, i);
				}
			}
			// System.out.printf("A %dª potência de base %d é %d.\n\n", exp, base, result);}
			assert result[i] == Math.pow(base[i], exp[i]) : String.format(
					"\nAlgo na lógica do cálculo mostrado acima está errado (result =/= Math.pow(%d,%d)).\n", base[i],
					exp[i]);
		}
		return result;
	}

	public static int[] powOfIndexes(int[] base, int[] exp, int indivlen, boolean isadditionimpl) {
		int[] result = new int[indivlen];
		int curftr;
		for (int i = 0; i < indivlen; i++) {
			result[i] = (exp[i] == 0) ? 1 : 0;
			curftr = base[i];
			if (result[i] != 1) {
				result[i] = base[i];
				for (int j = 2; j <= exp[i]; j++) {
					for (int k = 1; k < base[i]; k++) {
						result[i] += curftr;
						/*
						 * System.out.printf("Resultado atual da potenciação: %d.\n (i, j): (%d, %d)\n",
						 * result, i, j);
						 */
					}
					curftr = result[i];
				}
			}
			// System.out.printf("A %dª potência de base %d é %d.\n\n", exp, base, result);
			assert result[i] == Math.pow(base[i], exp[i]) : String.format(
					"\nAlgo na lógica do cálculo mostrado acima está errado (result =/= Math.pow(%d,%d)).\n", base[i],
					exp[i]);
		}
		return result;
	}
}

package iniciado220926;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers;

public class Main {
	/**
	 * @param chkdprim:  a natural number to check for primality
	 * @param ceildsqrt: a ceiled square root which will be the upper bound to test
	 *                   against
	 */
	public static boolean chkNatPrimality(int chkdprim, double ceildsqrt) {
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

	/**
	 * @param sortd: dummy array to sort and retrieve max and min from
	 */
	public static int[] getBounds(int[] sortd) {
		Arrays.sort(sortd);
		return new int[] { sortd[0], sortd[(sortd.length - 1)] };
	}

	public static void main(String[] args) throws IOException {
		Scanner choicesc = new Scanner(System.in), ativsc = new Scanner(System.in);
		String rawchoice = new String(), shortch, endstr;
		int choice;
		do {
			System.out.printf("Insira um código entre 1 e 10 ou digite \"Sair\" e então tecle Enter: ");
			rawchoice = choicesc.nextLine();
			shortch = String.valueOf(rawchoice.charAt(0));
			endstr = rawchoice.toLowerCase();
			if (!shortch.matches("[a-zA-Z]")) {
				choice = Integer.parseInt(rawchoice);
				switch (choice) {
				case 1 -> {
					System.out.printf(
							"Esta funcionalidade recebe dois fatores e calcula a multiplicação entre eles sem usar a operação de multiplicação, substituindo-a pelo incremento iterado de um dos fatores.\n");
					int lfactr, rfactr, prod;
					System.out.printf("Informe o primeiro fator: ");
					lfactr = ativsc.nextInt();
					int origlfact = lfactr;
					System.out.printf("Informe o segundo fator: ");
					rfactr = ativsc.nextInt();
					int origrfact = rfactr;
					prod = (lfactr == 0 || rfactr == 0) ? 0 : lfactr;
					int targetfactr = (rfactr < 0) ? rfactr * (-1) : rfactr;
					if (prod != 0) {
						if ((rfactr < 0 && lfactr < 0) || (rfactr < 0 && lfactr > 0)) {
							lfactr *= -1;
							prod = lfactr;
						}
						for (int i = 2; i <= targetfactr; i++) {
							prod += lfactr;
						}
					}
					System.out.printf("O produto %d * %d é %d.\n", origlfact, origrfact, prod);
				}
				case 2 -> {
					BigDecimal balance = BigDecimal.ZERO;
					System.out.printf("Esta funcionalidade simula um terminal bancário. ");
					int ch;
					BigDecimal deposit, withdrawal;
					for (boolean shquit = false; !shquit;) {
						deposit = BigDecimal.ZERO;
						withdrawal = BigDecimal.ZERO;
						System.out.printf("Escolha entre as opções 1 — Saldo, 2 — Saque, 3 — Depósito e 4 — Sair: ");
						ch = ativsc.nextInt();
						switch (ch) {
						case 4 -> shquit = true;
						case 1 -> {
							System.out.printf("Caro cliente, seu saldo atual é R$ %s.\n", balance.toPlainString());
						}
						case 2 -> {
							for (boolean proceed = false; !proceed;) {
								System.out.printf(
										"Prezado cliente, qual o valor que deseja sacar de sua conta? Insira ao lado: ");
								withdrawal = ativsc.nextBigDecimal();
								if (withdrawal.compareTo(balance) == 1) {
									System.out.printf(
											"Erro: saldo (R$ %s) é insuficiente para quantia de saque desejada (R$ %s).\n",
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
								System.out.printf(
										"Prezado cliente, qual o valor que deseja depositar em sua conta? Insira ao lado: ");
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
					}
				}
				case 3 -> {
					int clsize;
					final BigDecimal gradelen = new BigDecimal(3);
					boolean isvalidclsize, isvalidgrade;
					System.out.printf("Bem-vindo, professor. ");
					do {
						System.out.printf(
								"A fim de calcular a nota média individual, definir status de aprovação e obter nota média global e porcentagem de alunos aprovados e reprovados a partir de três notas de todos os seus alunos, insira ao lado o tamanho de sua turma (entradas inválidas: tamanho de turma igual ou inferior a zero, nota inferior a zero): ");
						clsize = ativsc.nextInt();
						if (clsize <= 0) {
							isvalidclsize = false;
							System.out.printf(
									"Tamanho de turma igual ou inferior a zero não é permitido. Tente novamente.\n");
							continue;
						} else
							isvalidclsize = true;
					} while (!isvalidclsize);
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
									System.out.printf(
											"Você inseriu uma nota negativa, porém a mínima é zero. Tente novamente.\n");
									continue;
								} else
									isvalidgrade = true;
							} while (!isvalidgrade);
							studentavg[i] = studentavg[i].add(gradehelpr[j]);
						}
						typdgrade.add(gradehelpr);
						System.out.printf("\nAbout to divide %s by %s.\n", studentavg[i].toPlainString(),
								gradelen.toPlainString());
						try {
							studentavg[i] = studentavg[i].divide(gradelen);
						} catch (ArithmeticException ae) {
							studentavg[i] = studentavg[i].divide(gradelen, 2, RoundingMode.HALF_UP);
						}
						System.out.printf("\nJust divided %s by %s.\n", studentavg[i].toPlainString(),
								gradelen.toPlainString());
						apprstatus[i] = (studentavg[i].compareTo(gradereq) >= 0) ? Situacao.APROVADO
								: Situacao.REPROVADO;
					}
					BigDecimal classavg = BigDecimal.ZERO;
					for (BigDecimal indavg : studentavg) {
						classavg = classavg.add(indavg);
					}
					BigDecimal bigclsize = new BigDecimal(clsize);
					classavg = classavg.divide(bigclsize);
					System.out.printf("\nEstatísticas consolidadas:\n\n");
					int aprovtotal = 0, reprovtotal = 0;
					boolean isappr;
					for (int i = 0; i < clsize; i++) {
						System.out.printf("===Aluno %d===\n", (i + 1));
						System.out.printf("Média do aluno: %s,\n", studentavg[i].toPlainString());
						if (apprstatus[i].equals(Situacao.APROVADO)) {
							aprovtotal++;
							isappr = true;
						} else {
							reprovtotal++;
							isappr = false;
						}
						System.out.printf("status de aprovação: %s.\n\n", isappr ? "aprovado" : "reprovado");
					}
					System.out.printf("Média da turma inteira: %s.\n", classavg.toPlainString());
					final BigDecimal bighundred = new BigDecimal(100);
					BigDecimal apprperc = new BigDecimal(aprovtotal).divide(bigclsize).multiply(bighundred),
							repprperc = new BigDecimal(reprovtotal).divide(bigclsize).multiply(bighundred);
					System.out.printf(
							"Fatia de alunos aprovados (em porcentagem): %s.\nFatia de alunos reprovados (em porcentagem): %s.\n\n",
							apprperc.toPlainString(), repprperc.toPlainString());
				}
				case 4 -> {
					int[] typdnum = new int[90000];
					boolean shquit = false;
					System.out.printf(
							"Este algoritmo recebe até 90000 números inteiros e verifica o maior e menor digitados. Você será indagado sobre eles agora. Para interromper a leitura, digite \"continuar\", sem aspas.\n");
					String typewbuff;
					for (int i = 0; i < typdnum.length && !shquit; i++) {
						for (;;) {
							System.out.printf("Forneça o número para ocupar o registro %d: ", (i + 1));
							typewbuff = ativsc.nextLine();
							typewbuff = typewbuff.toLowerCase();
							if (typewbuff.equals("continuar")) {
								shquit = true;
								break;
							} else if (typewbuff.matches("-?\\d+")) {
								typdnum[i] = Integer.parseInt(typewbuff);
								break;
							} else {
								System.out.printf("Valor inserido não numérico. Tente novamente.\n");
								continue;
							}
						}
					}
					int[] sortdtypd = typdnum;
					Arrays.sort(sortdtypd);
					System.out.printf("Seguem o menor e maior inteiros digitados: %d e %d.\n\n", sortdtypd[0],
							sortdtypd[(sortdtypd.length - 1)]);
				}
				case 5 -> {
					int proglen;
					BigDecimal progratio;
					BigDecimal eltotal = BigDecimal.ZERO;
					System.out.printf(
							"Esta funcionalidade lê um número finito n, um termo inicial a1 e uma razão de progressão r e calcula seus termos de 1 a n, além de seu somatório.\nForneça o tamanho (capacidade de elementos) da progressão — caso forneça 1 ou 0, um ou dois elemento(s) extra(s)r será(ão) acrescentado(s) para formar uma progressão mínima: ");
					proglen = ativsc.nextInt();
					if (proglen == 0 || proglen == 1)
						proglen = 2;
					ArrayList<BigDecimal> prog = new ArrayList<BigDecimal>();
					System.out.printf("Forneça o primeiro elemento enumerado na progressão: ");
					prog.add(ativsc.nextBigDecimal());
					System.out.printf(
							"Forneça a razão de progressão (transformação a ser aplicada sucessivamente; entrada válida: número racional): ");
					progratio = ativsc.nextBigDecimal();
					eltotal = prog.get(0);
					for (int i = 1; i < proglen; i++) {
						prog.add(prog.get((i - 1)).add(progratio));
						eltotal = eltotal.add(prog.get(i));
					}
					System.out.printf("Termos da progressão:\n%s", prog.get(0).toPlainString());
					for (BigDecimal el : prog.subList(1, proglen)) {
						System.out.printf(", %s", el.toPlainString());
					}
					System.out.printf(".\nSomatório dos elementos da progressão: %s.\n\n", eltotal.toPlainString());
				}
				case 6 -> {
					System.out.printf("Esta funcionalidade define se um número positivo é primo ou não. ");
					boolean isnatural;
					do {
						System.out.printf(
								"Entre com um número — se fornecer um número negativo, será transformado no inverso positivo: ");
						int chkdprim = ativsc.nextInt();
						if (chkdprim < 0) {
							chkdprim *= -1;
						} else if (chkdprim == 0) {
							isnatural = false;
							System.out.printf("Erro: 0 é divisível por qualquer número. Tente outro...\n");
							continue;
						}
						System.out.printf("chkdprim: %d\n", chkdprim);
						isnatural = true;
						// check for 2 and 3 special case
						if (chkdprim == 2 || chkdprim == 3)
							System.out.printf("O número %d é primo.\n", chkdprim);
						// check for even numbers
						else if (chkdprim % 2 == 0 || chkdprim == 1)
							System.out.printf("O número %d não é primo.\n", chkdprim);
						else {
							double ceildsqrt = Math.sqrt(chkdprim);
							if (chkdprim % 1 != 0)
								ceildsqrt = Math.ceil(ceildsqrt);
							chkNatPrimality(chkdprim, ceildsqrt);
						}
					} while (isnatural == false);
				}
				case 7 -> {
					int amount;
					System.out.printf(
							"Esta funcionalidade aceita uma quantidade de números informada por você e obtém:\n1) quantos números são primos e/ou maiores do que 1000,\n2) qual o maior e menor números primos digitados, e\n3) a média aritmética dos números primos digitados.\n");
					do {
						System.out.printf("Forneça a quantidade de números para leitura: ");
						amount = ativsc.nextInt();
						if (amount < 1)
							System.out.printf("A quantidade mínima necessária de números fornecidos é 1.\n");
					} while (amount < 1);
					int[] collectd = new int[amount], colgreat = new int[0], colprime = new int[0];
					int primetot = 0;
					boolean isprime, isnatural;
					int[] colgreathelpr = new int[0], colprimehelpr = new int[0];
					for (int i = 0; i < amount; i++) {
						isprime = false;
						do {
							System.out.printf(
									"Forneça o valor %d (qualquer entrada negativa produzirá um inverso positivo): ",
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
							isprime = chkNatPrimality(collectd[i], ceildsqrt);
						}
						if (collectd[i] > 1000) {
							colgreathelpr = (colgreathelpr.length > 0)
									? Arrays.copyOf(colgreathelpr, (colgreathelpr.length + 1))
									: new int[1];
							colgreathelpr[(colgreathelpr.length - 1)] = collectd[i];
							colgreat = Arrays.copyOf(colgreathelpr, colgreathelpr.length);
						}
						if (isprime) {
							colprimehelpr = (colprimehelpr.length > 0)
									? Arrays.copyOf(colprimehelpr, (colprimehelpr.length + 1))
									: new int[1];
							colprimehelpr[(colprimehelpr.length - 1)] = collectd[i];
							colprime = Arrays.copyOf(colprimehelpr, colprimehelpr.length);
							primetot += collectd[i];
						}
					}
					boolean isanyprime = (colprime.length != 0);
					int[] sortdprime = isanyprime ? getBounds(colprime) : null;
					System.out.printf("\nEstatísticas desejadas em relação aos números fornecidos:\nNúmeros primos: %s",
							isanyprime ? String.valueOf(colprime[0]) : "nenhum");
					if (isanyprime) {
						for (int i = 1; i < colprime.length; i++) {
							System.out.printf(", %d", colprime[i]);
						}
					}
					boolean isanyaboveoneth = (colgreat.length != 0);
					System.out.printf(".\n———\nNúmeros maiores que 1000: %s",
							isanyaboveoneth ? String.valueOf(colgreat[0]) : "nenhum");
					if (isanyaboveoneth) {
						for (int i = 1; i < colgreat.length; i++) {
							System.out.printf(", %d", colgreat[i]);
						}
					}
					System.out.printf(new String(".\n———\n").concat(isanyprime ? String.format(
							"Menor e maior primo, respectivamente: %d e %d\nMédia aritmética dos números primos localizados: %s\n———",
							sortdprime[0], sortdprime[1],new BigDecimal(primetot).divide(new BigDecimal(colprime.length)).toPlainString())
							: "Não é possível localizar o maior ou menor número primo nem obter a média deles porque nenhum foi informado na digitação.")
							.concat("\n\n"));
					/*
					 * System.out.printf(".\n———\nMenor e maior primo, respectivamente: %d e %d\n",
					 * sortdprime[0], sortdprime[1]); System.out.
					 * printf("Média aritmética dos números primos localizados: %s\n———\\n\n",
					 * aritavg.toPlainString());
					 */
				}
				case 8 -> {
					int ftr[] = new int[2];
					boolean isvalidftr;
					do {
						System.out.printf(
								"Esta funcionalidade recebe dois números naturais (an > 0) e calcula a multiplicação entre eles com uma implementação de soma sucessiva.\nForneça a primeira parcela positiva: ");
						ftr[0] = ativsc.nextInt();
						System.out.printf("Forneça a segunda parcela positiva: ");
						ftr[1] = ativsc.nextInt();
						if (ftr[0] == 0 || ftr[1] == 0) {
							System.out.printf("Um fator 0 é proibido nesta funcionalidade. Tente novamente.\n");
							isvalidftr = false;
							continue;
						} else
							isvalidftr = true;
						if (ftr[0] < 0) {
							System.out.printf(
									"Você forneceu uma parcela negativa (%d). Ela será transformada em positiva por meio de uma multiplicação por -1.\n",ftr[0]);
							ftr[0] *= -1;
						}
						if (ftr[1] < 0) {
							System.out.printf(
									"Você forneceu uma parcela negativa (%d). Ela será transformada em positiva por meio de uma multiplicação por -1.\n",ftr[1]);
							ftr[1] *= -1;
						}
						int prod = 0;
						for (int i = 1; i <= ftr[1]; i++) {
							prod += ftr[0];
						}
						System.out.printf("O produto entre %d e %d é %d.\n\n", ftr[0], ftr[1], prod);
					} while (!isvalidftr);
				}
				case 9 -> {
					int base, exp = 0;
					boolean isvalidbase;
					do {
						System.out.printf(
								"Esta funcionalidade calcula uma potenciação x^y, com x > 0, utilizando apenas laços de repetição e multiplicação.\nForneça a base da potenciação: ");
						base = ativsc.nextInt();
						isvalidbase = (base != 0);
						if (!isvalidbase) {
							System.out.printf("Base zero é proibida nesta funcionalidade. Tente novamente.\n");
							continue;
						}
						System.out.printf("Forneça o expoente da potenciação: ");
						exp = ativsc.nextInt();
						if (base < 0) {
							System.out.printf(
									"Você forneceu uma base negativa (%d). Esta será multiplicada por -1 para virar positiva.\n",base);
							base *= -1;
						}
						if (exp < 0) {
							System.out.printf(
									"Você forneceu um expoente negativo (%d). Este será multiplicado por -1 para virar positivo.\n",exp);
							exp *= -1;
						}
					} while (!isvalidbase);
					int result = (exp == 0) ? 1 : 0;
					if (result != 1) {
						result = base;
						for (int i = 2; i <= exp; i++) {
							result *= base;
							//System.out.printf("Resultado atual da potenciação: %d.\ni: %d\n", result, i);
						}
					}
					System.out.printf("A %dª potência de base %d é %d.\n\n", exp, base, result);
				}
				case 10 -> {
					int base, exp = 0;
					boolean isvalidbase;
					do {
						System.out.printf(
								"Esta funcionalidade calcula uma potenciação x^y, com x > 0, utilizando apenas laços de repetição e soma.\nForneça a base da potenciação: ");
						base = ativsc.nextInt();
						isvalidbase = (base != 0);
						if (!isvalidbase) {
							System.out.printf("Base zero é proibida nesta funcionalidade. Tente novamente.\n");
							continue;
						}
						System.out.printf("Forneça o expoente da potenciação: ");
						exp = ativsc.nextInt();
						if (base < 0) {
							System.out.printf(
									"Você forneceu uma base negativa. Esta será multiplicada por -1 para virar positiva.\n");
							base *= -1;
						}
						if (exp < 0) {
							System.out.printf(
									"Você forneceu um expoente negativo. Este será multiplicado por -1 para virar positivo.\n");
							exp *= -1;
						}
					} while (!isvalidbase);
					int result = (exp == 0) ? 1 : 0, curftr = base;
					if (result != 1) {
						result = base;
						for (int i = 2; i <= exp; i++) {
							for (int j = 1; j < base; j++) {
								result += curftr;
								System.out.printf("Resultado atual da potenciação: %d.\n (i, j): (%d, %d)\n", result, i,
										j);
							}
							curftr = result;
						}
					}
					System.out.printf("A %dª potência de base %d é %d.\n\n", exp, base, result);
					assert result==Math.pow(base, exp) : String.format("\nAlgo na lógica do cálculo mostrado acima está errado (result =/= Math.pow(%d,%d)).\n",base,exp);
				}
				}
			}
		} while (!endstr.equals("sair"));
		ativsc.close();
		choicesc.close();
	}
}

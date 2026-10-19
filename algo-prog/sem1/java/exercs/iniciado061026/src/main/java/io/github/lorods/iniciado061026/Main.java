package io.github.lorods.iniciado061026;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Pattern;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers.ArithmeticProg;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers.GradingSummary;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers.NumFactsheet;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers.OperationSummary;
import io.github.lorods.unitutils.loopconstructs.LoopHelpers.PrimalitySummary;

public class Main {

	public static void main(String[] args) {
		Scanner choicesc = new Scanner(System.in), activitsc = new Scanner(System.in);
		String rawchoice = new String(), shortch, endstr;
		int choice;
		int factrlen;
		do {
			System.out.printf("Insira um código entre 1 e 10 ou digite \"Sair\" e então tecle Enter: ");
			rawchoice = choicesc.nextLine();
			shortch = String.valueOf(rawchoice.charAt(0));
			endstr = rawchoice.toLowerCase();
			if (!shortch.matches("[a-zA-Z]")) {
				choice = Integer.parseInt(rawchoice);
				switch (choice) {
				//case 1 PASSED manual testing
				case 1 -> {
					System.out.printf(
							"Esta funcionalidade recebe dois vetores de fatores com 3000 elementos cada e calcula o produto entre aqueles presentes em cada índice de v1 e v2, sem usar a operação de multiplicação, substituindo-a pelo incremento iterado de um dos fatores.\n");
					factrlen = 1000;
					int[] lfactr = new int[factrlen], rfactr = new int[factrlen];
					final Pattern validactpat = Pattern.compile("(\\d+|continuar)");

					for (int i = 0; i < factrlen; i++) {
						String actstr = new String();
						for (;;) {
							System.out.printf(
									"Informe o primeiro fator abaixo (para interromper a leitura, responda \"continuar\"): ");
							actstr = activitsc.nextLine().trim().toLowerCase();
							if (actstr.isBlank() || !validactpat.matcher(actstr).find()) {
								System.out.printf(
										"Entrada inválida. São válidos: \"continuar\" ou um número representável pelo tipo int.\n");
								continue;
							} else
								break;
						}
						if (actstr.equals("continuar"))
							break;
						lfactr[i] = Integer.parseInt(actstr);
						System.out.printf("Informe o segundo fator: ");
						rfactr[i] = activitsc.nextInt();
						activitsc.nextLine();
					}
					int[] prod = LoopHelpers.multiplySameIndex(lfactr, rfactr, factrlen);
					System.out.printf("Resultado dos produtos: %d * %d = %d", lfactr[0], rfactr[0], prod[0]);
					for (int i = 1; i < factrlen; i++) {
						System.out.printf(",\n%d * %d = %d", lfactr[i], rfactr[i], prod[i]);
					}
					System.out.printf(".\n\n");
				}
				case 2 -> {
					System.out.printf("Esta funcionalidade simula um terminal bancário. ");
					int ch;
					OperationSummary operoutput = new OperationSummary(false, BigDecimal.ZERO);
					boolean shquit = operoutput.shquit();
					BigDecimal balance = operoutput.balance();
					for (; !shquit;) {
						System.out.printf("Escolha entre as opções 1 — Saldo, 2 — Saque, 3 — Depósito e 4 — Sair: ");
						ch = activitsc.nextInt();
						operoutput = LoopHelpers.operateOnBalance(ch, balance, activitsc);
						System.out.printf(new String("Caro cliente, seu saldo atualizado ")
								.concat((shquit) ? "ao fim desta sessão de atendimento é de " : "é de ")
								.concat(String.format("R$ %d.\n", balance)));
					}
				}
				case 3 -> {
					int clsize;
					final BigDecimal gradelen = new BigDecimal(3);
					boolean isvalidclsize;
					System.out.printf("Bem-vindo, professor. ");
					do {
						System.out.printf(
								"A fim de calcular a nota média individual, definir status de aprovação e obter nota média global e porcentagem de alunos aprovados e reprovados a partir de três notas de todos os seus alunos, insira ao lado o tamanho de sua turma (entradas inválidas: tamanho de turma igual ou inferior a zero, nota inferior a zero): ");
						clsize = activitsc.nextInt();
						if (clsize <= 0) {
							isvalidclsize = false;
							System.out.printf(
									"Tamanho de turma igual ou inferior a zero não é permitido. Tente novamente.\n");
							continue;
						} else
							isvalidclsize = true;
					} while (!isvalidclsize);
					GradingSummary gradoutput = LoopHelpers.requestGrading(clsize, activitsc, gradelen);
					BigDecimal[] studentavg = gradoutput.studentavg();
					boolean[] isappr = gradoutput.isappr();
					BigDecimal classavg = gradoutput.classavg();
					for (int i = 0; i < clsize; i++) {
						System.out.printf("===Aluno %d===\n", (i + 1));
						System.out.printf("Média do aluno: %s,\n", studentavg[i].toPlainString());
						System.out.printf("status de aprovação: %s.\n\n", isappr[i] ? "aprovado" : "reprovado");
					}
					System.out.printf("Média da turma inteira: %s.\n", classavg.toPlainString());
					BigDecimal apprperc = gradoutput.apprperc(), repprperc = gradoutput.repprperc();
					System.out.printf(
							"Fatia de alunos aprovados (em porcentagem): %s.\nFatia de alunos reprovados (em porcentagem): %s.\n\n",
							apprperc.toPlainString(), repprperc.toPlainString());
				}
				case 4 -> {
					final int typdlen = 90000;
					int[] typdnum = new int[typdlen];
					boolean shquit = false;
					System.out.printf(
							"Este algoritmo recebe até 90000 números inteiros e verifica o maior e menor digitados. Você será indagado sobre eles agora. Para interromper a leitura, digite \"continuar\", sem aspas.\n");
					String typewbuff;
					for (int i = 0; i < typdnum.length && !shquit; i++) {
						for (;;) {
							System.out.printf("Forneça o número para ocupar o registro %d: ", (i + 1));
							typewbuff = activitsc.nextLine();
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
					int[] sortdtypd = LoopHelpers.getSimpleBounds(typdnum);
					System.out.printf("Seguem o menor e maior inteiros digitados: %d e %d.\n\n", sortdtypd[0],
							sortdtypd[1]);
				}
				case 5 -> {
					final int progcapacity = 3000;
					System.out.printf(
							"Esta funcionalidade lê um número finito n, um termo inicial a1 e uma razão de progressão r e calcula seus termos de 1 a n, além de seu somatório.\n");
					ArrayList<ArithmeticProg> outaplist = LoopHelpers.fillAP(progcapacity, activitsc);
					BigDecimal[] memberel;
					String eltotal, leadel;
					for (int i = 0; i < progcapacity; i++) {
						leadel = outaplist.get(i).getLeadel();
						System.out.printf("Termos da progressão artimética %d:\n%s", (i + 1), leadel);
						memberel = outaplist.get(i).getMemberel();
						eltotal = outaplist.get(i).getEltotal();
						for (BigDecimal el : memberel) {
							System.out.printf(", %s", el.toPlainString());
						}
						System.out.printf(".\nSomatório dos elementos da progressão: %s.\n\n", eltotal);
					}
				}
				case 6 -> {
					System.out.printf("Esta funcionalidade define se um número positivo é primo ou não. ");
					int chkdlen;
					for (;;) {
						System.out.printf(
								"Comece fornecendo a quantidade de números inteiros, positivos e maiores que 0 para os quais deseja realizar o teste de primalidade: ");
						chkdlen = activitsc.nextInt();
						if (chkdlen <= 0) {
							System.out.printf("Erro: pelo menos um número deve ser verificado. Tente novamente.\n");
							continue;
						} else
							break;
					}
					int[] chkdprim = new int[chkdlen];
					int i = 0;
					for (; i < chkdlen;) {
						System.out.printf("Entre com um número: ");
						chkdprim[i] = activitsc.nextInt();
						if (chkdprim[i] < 0 || chkdprim[i] == 0) {
							System.out.printf("Erro: entrada <=0. É necessário um número positivo...\n");
							continue;
						}
						System.out.printf("current chkdprim: %d\n", chkdprim[i]);
						i++;
					}
					PrimalitySummary primoutput = LoopHelpers.groupNatPrimality(chkdprim);
					int primecnt = primoutput.primecnt();
					int[] confprime = primoutput.confprime();
					System.out.printf("Total de elementos primos: %d.\n\n", primecnt);
					System.out.printf("São primos: %d", confprime[0]);
					for (int j = 1; i < confprime.length; j++) {
						System.out.printf(", %d", confprime[j]);
					}
					System.out.printf(".\n");
				}
				case 7 -> {
					int amount;
					System.out.printf(
							"Esta funcionalidade aceita uma quantidade de números informada por você e obtém:\n1) quantos números são primos e/ou maiores do que 1000,\n2) qual o maior e menor números primos digitados, e\n3) a média aritmética dos números primos digitados.\\n");
					for (;;) {
						System.out.printf("Forneça a quantidade de números para leitura: ");
						amount = activitsc.nextInt();
						if (amount < 1) {
							System.out.printf("A quantidade mínima necessária de números fornecidos é 1.\n");
							continue;
						}
						break;
					}
					NumFactsheet numbreakdwn = LoopHelpers.getNumFacts(amount, activitsc);
					boolean isanyprime = numbreakdwn.isanyprime(), isanyaboveoneth = numbreakdwn.isanyaboveoneth();
					int[] sortdprime = numbreakdwn.sortdprime(), colprime = numbreakdwn.colprime(),
							colgreat = numbreakdwn.colgreat();
					String primeavg = numbreakdwn.primeavg();
					System.out.printf("\nEstatísticas desejadas em relação aos números fornecidos:\nNúmeros primos: %s",
							isanyprime ? String.valueOf(colprime[0]) : "nenhum");
					if (isanyprime) {
						for (int i = 1; i < colprime.length; i++) {
							System.out.printf(", %d", colprime[i]);
						}
					}
					System.out.printf(".\n———\nNúmeros maiores que 1000: %s",
							isanyaboveoneth ? String.valueOf(colgreat[0]) : "nenhum");
					if (isanyaboveoneth) {
						for (int i = 1; i < colgreat.length; i++) {
							System.out.printf(", %d", colgreat[i]);
						}
					}
					System.out.printf(new String(".\n———\n").concat(isanyprime ? String.format(
							"Menor e maior primo, respectivamente: %d e %d\nMédia aritmética dos números primos localizados: %s\n———",
							sortdprime[0], sortdprime[1], primeavg)
							: "Não é possível localizar o maior ou menor número primo nem obter a média deles porque nenhum foi informado na digitação.")
							.concat("\n\n"));
				}
				// case 8 PASSED manual testing
				case 8 -> {
					System.out.printf(
							"Esta funcionalidade recebe dois vetores de fatores com 3000 elementos cada e calcula o produto entre aqueles presentes em cada índice de v1 e v2, sem usar a operação de multiplicação, substituindo-a pelo incremento iterado de um dos fatores.\n");
					factrlen = 3000;
					int[] lfactr = new int[factrlen], rfactr = new int[factrlen];
					final Pattern validactpat = Pattern.compile("(\\d+|continuar)");

					for (int i = 0; i < factrlen; i++) {
						String actstr = new String();
						for (;;) {
							System.out.printf(
									"Informe o primeiro fator abaixo (para interromper a leitura, responda \"continuar\"): ");
							actstr = activitsc.nextLine().trim().toLowerCase();
							if (actstr.isBlank() || !validactpat.matcher(actstr).find()) {
								System.out.printf(
										"Entrada inválida. São válidos: \"continuar\" ou um número representável pelo tipo int.\n");
								continue;
							} else
								break;
						}
						if (actstr.equals("continuar"))
							break;
						lfactr[i] = Integer.parseInt(actstr);

						System.out.printf("Informe o segundo fator: ");
						rfactr[i] = activitsc.nextInt();
						activitsc.nextLine();
					}
					int[] prod = LoopHelpers.multiplySameIndex(lfactr, rfactr, factrlen);
					System.out.printf("Resultado dos produtos: %d * %d = %d", lfactr[0], rfactr[0], prod[0]);
					for (int i = 1; i < factrlen; i++) {
						System.out.printf(",\n%d * %d = %d", lfactr[i], rfactr[i], prod[i]);
					}
					System.out.printf(".\n\n");
				}
				// case 9 PASSED manual testing
				case 9 -> {
					final int powlen = 3000;
					int[] base = new int[powlen], exp = new int[powlen];
					boolean isvalidbase;
					int i = 0;
					String staytest;
					System.out.printf(
							"Esta funcionalidade calcula várias potenciações x^y, com x > 0, utilizando apenas laços de repetição e multiplicação.\n");
					for (; i < powlen;) {
						System.out.printf("Forneça a base da potenciação: ");
						base[i] = activitsc.nextInt();
						isvalidbase = (base[i] != 0);
						if (!isvalidbase) {
							System.out.printf("Base zero é proibida nesta funcionalidade. Tente novamente.\n");
							continue;
						}
						System.out.printf("Forneça o expoente da potenciação: ");
						exp[i] = activitsc.nextInt();
						if (base[i] < 0) {
							System.out.printf(
									"Você forneceu uma base negativa (%d). Esta será multiplicada por -1 para virar positiva.\n",
									base[i]);
							base[i] *= -1;
						}
						if (exp[i] < 0) {
							System.out.printf(
									"Você forneceu um expoente negativo (%d). Este será multiplicado por -1 para virar positivo.\n",
									exp[i]);
							exp[i] *= -1;
						}
						activitsc.nextLine();
						System.out.printf(
								"Você deseja permanecer lendo elementos? Digite s para sair ou qualquer outro caractere para continuar: ");
						staytest = activitsc.nextLine();
						if (staytest.equals("s"))
							break;
						else
							i++;
					}
					int[] powresults = LoopHelpers.powOfIndexes(base, exp, powlen);
					System.out.printf("Potenciação 1: %d ^ %d = %d", base[0], exp[0], powresults[0]);
					for (int j = 1; j < powlen; j++) {
						System.out.printf(",\nPotenciação %d: %d ^ %d = %d", (j + 1), base[j], exp[j], powresults[j]);
					}
					System.out.printf(".\n\n");
				}
				// case 10 PASSED manual testing
				case 10 -> {
					int powlen;
					boolean isvalidbase;
					int i = 0;
					System.out.printf(
							"Esta funcionalidade calcula várias potenciações x^y, com x > 0, utilizando apenas laços de repetição e soma.\n");
					for (;;) {
						System.out.printf("Quantas potenciações você deseja realizar? Responda ao lado: ");
						powlen = activitsc.nextInt();
						if (powlen < 1) {
							System.out.printf(
									"Erro: é necessária pelo menos uma potenciação para realizar. Tente novamente.\n");
							continue;
						}
						break;
					}
					int[] base = new int[powlen], exp = new int[powlen];
					for (; i < powlen;) {
						System.out.printf("Forneça a base da potenciação: ");
						base[i] = activitsc.nextInt();
						isvalidbase = (base[i] != 0);
						if (!isvalidbase) {
							System.out.printf("Base zero é proibida nesta funcionalidade. Tente novamente.\n");
							continue;
						}
						System.out.printf("Forneça o expoente da potenciação: ");
						exp[i] = activitsc.nextInt();
						if (base[i] < 0) {
							System.out.printf(
									"Você forneceu uma base negativa (%d). Esta será multiplicada por -1 para virar positiva.\n",
									base[i]);
							base[i] *= -1;
						}
						if (exp[i] < 0) {
							System.out.printf(
									"Você forneceu um expoente negativo (%d). Este será multiplicado por -1 para virar positivo.\n",
									exp[i]);
							exp[i] *= -1;
						}
						i++;
					}
					int[] powresults = LoopHelpers.powOfIndexes(base, exp, powlen, true);
					System.out.printf("Potenciação 1: %d ^ %d = %d", base[0], exp[0], powresults[0]);
					for (int j = 1; j < powlen; j++) {
						System.out.printf(",\nPotenciação %d: %d ^ %d = %d", (j + 1), base[j], exp[j], powresults[j]);
					}
					System.out.printf(".\n\n");
				}
				}
			}
		} while (!endstr.equals("sair"));
		choicesc.close();
		activitsc.close();
	}
}

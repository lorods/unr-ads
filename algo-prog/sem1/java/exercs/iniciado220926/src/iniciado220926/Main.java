package iniciado220926;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
	public static int[] getBounds(int[] sortd) {
		Arrays.sort(sortd);
		return new int[] {sortd[0], sortd[(sortd.length-1)]};
	}
	
	public static void main(String[] args) {
		Scanner choicesc = new Scanner(System.in);
		String rawchoice, shortch;
		int choice;
		do {
			System.out.printf("Insira um código entre 1 e 10 ou digite \"Sair\" e então tecle Enter: ");
			rawchoice = choicesc.nextLine();
			shortch = String.valueOf(rawchoice.charAt(0));
			if (!shortch.matches("[a-zA-Z]")) {
				choice = Integer.parseInt(rawchoice);
				Scanner ativsc = new Scanner(System.in);
				switch (choice) {
				case 1 -> {

				}
				case 2 -> {

				}
				case 3 -> {

				}
				case 4 -> {

				}
				case 5 -> {
					int proglen;
					BigDecimal progratio;
					BigDecimal eltotal = BigDecimal.ZERO;
					System.out.printf("Esta funcionalidade lê um número finito n, um termo inicial a1 e uma razão de progressão r e calcula seus termos de 1 a n, além de seu somatório.\nForneça o tamanho (capacidade de elementos) da progressão — caso forneça um número negativo, este será convertido no inverso positivo; ao fornecer 1 ou 0, um ou dois elemento(s) extra(s) será(ão) acrescentado(s) para formar uma progressão mínima: ");
					proglen = ativsc.nextInt();
					if(proglen==0||proglen==1) proglen=2;  
					ArrayList<BigDecimal> prog = new ArrayList<BigDecimal>(proglen);
					System.out.printf("Forneça o primeiro elemento enumerado na progressão: ");
					prog.add(ativsc.nextBigDecimal());
					System.out.printf("Forneça a razão de progressão (transformação a ser aplicada sucessivamente; entrada válida: número racional): ");
					progratio = ativsc.nextBigDecimal();
					for(int i=1;i<proglen; i++) {
						prog.add(prog.get((i-1)).add(progratio));
						eltotal.add(prog.get(i));
					}					
				}
				case 6 -> {
					System.out.printf(
							"Esta funcionalidade define se um número positivo é primo ou não. Entre com um número — se fornecer um número negativo, será transformado no inverso positivo: ");
					boolean isnatural;
					do {
						int chkdprim = ativsc.nextInt();
						if (chkdprim < 0) {
							chkdprim *= -1;
						} else if (chkdprim == 0) {
							isnatural = false;
							continue;
						}
						System.out.printf("chkdprim: %d\n", chkdprim);
						isnatural = true;
						// check for 2 and 3 special case
						if (chkdprim == 2 || chkdprim == 3)
							System.out.printf("O número %d é primo.\n", chkdprim);
						// check for even numbers
						else if (chkdprim % 2 == 0)
							System.out.printf("O número %d não é primo.\n", chkdprim);
						else {
							double ceildsqrt = Math.ceil(Math.sqrt(chkdprim));
							if (ceildsqrt % 2 == 0)
								ceildsqrt++;
							int mod;
							System.out.printf("got to line 57, sqrtceil: %.2f\n", ceildsqrt);
							for (int i = 3; i <= ceildsqrt; i += 2) {
								mod = chkdprim % i;
								if (mod == 0) {
									System.out.printf("O número %d não é primo.\n", chkdprim);
									break;
								} else if (i == ceildsqrt)
									System.out.printf("O número %d é primo.\n", chkdprim);
							}
						}
					} while (isnatural == false);
				}
				case 7 -> {
					int amount;
					System.out.printf(
							"Esta funcionalidade aceita uma quantidade de números informada por você e obtém:\n1) quantos números são primos e/ou maiores do que 1000,\n2) qual o maior e menor números primos digitados, e\n3) a média aritmética dos números primos digitados.\n");
					do {
						amount = ativsc.nextInt();
						if (amount < 1)
							System.out.printf("A quantidade mínima necessária de números fornecidos é 1.\n");
					} while (amount < 1);
					int[] collectd = new int[amount], colgreat = new int[0], colprime = new int[0];
					int primetot = 0;
					boolean isprime;
					int[] colgreathelpr = new int[0], colprimehelpr = new int[0];
					for (int i = 0; i < amount; i++) {
						isprime = false;
						System.out.printf("Forneça o valor %d: ", (i + 1));
						collectd[i] = ativsc.nextInt();
						// check for 2 and 3 special case
						if (collectd[i] == 2 || collectd[i] == 3) {
							System.out.printf("O número %d é primo.\n", collectd[i]);
							isprime = true;
						}
						// check for even numbers
						else if (collectd[i] % 2 == 0)
							System.out.printf("O número %d não é primo.\n", collectd[i]);
						else {
							double ceildsqrt = Math.ceil(Math.sqrt(collectd[i]));
							if (ceildsqrt % 2 == 0)
								ceildsqrt++;
							int mod;
							System.out.printf("got to line 57, sqrtceil: %.2f\n", ceildsqrt);
							for (int j = 3; j <= ceildsqrt; j += 2) {
								mod = collectd[i] % j;
								if (mod == 0) {
									System.out.printf("O número %d não é primo.\n", collectd[i]);
									break;
								} else if (j == ceildsqrt)
									System.out.printf("O número %d é primo.\n", collectd[i]);
								isprime = true;
							}
						}
						if (collectd[i] > 1000) {
							colgreathelpr = (colgreathelpr.length>0) ? Arrays.copyOf(colgreathelpr, (colgreathelpr.length+1)) : new int[1];
							colgreathelpr[(colgreathelpr.length-1)] = collectd[i];
							colgreat = Arrays.copyOf(colgreathelpr,colgreathelpr.length);
						}
						if (isprime) {
							colprimehelpr = (colprimehelpr.length>0) ? Arrays.copyOf(colprimehelpr, (colprimehelpr.length+1)) : new int[1];
							colprimehelpr[(colprimehelpr.length-1)] = collectd[i];
							colprime = Arrays.copyOf(colprimehelpr, colprimehelpr.length);
							primetot += collectd[i];
						}
					}
					int[] sortdprime = getBounds(colprime); 
					BigDecimal aritavg = new BigDecimal(primetot).divide(new BigDecimal(colprime.length));
					System.out.printf("Estatísticas desejadas em relação aos números fornecidos:\nNúmeros primos:\n");
					for(int prime : colprime) {
						System.out.printf("%d\n",prime);
					}
					System.out.printf("\n———\nNúmeros maiores que 1000:\n");
					for(int greatest : colgreat) {
						System.out.printf("%d\n",greatest);
					}
					System.out.printf("\n———\nMenor e maior primo, respectivamente: %d e %d\n",sortdprime[0],sortdprime[1]);
					System.out.printf("Média aritmética dos números primos localizados: %s\n———\\n\n",aritavg.toPlainString());
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
									"Você forneceu uma parcela negativa. Ela será transformada em positiva por meio de uma multiplicação por -1.\n");
							ftr[0] *= -1;
						}
						if (ftr[1] < 0) {
							System.out.printf(
									"Você forneceu uma parcela negativa. Ela será transformada em positiva por meio de uma multiplicação por -1.\n");
							ftr[1] *= -1;
						}
						int prod = 0;
						for (int i = 1; i <= ftr[1]; i++) {
							prod += ftr[0];
						}
						System.out.printf("O produto entre %d e %d é %d.\n", ftr[0], ftr[1], prod);
					} while (!isvalidftr);
				}
				case 9 -> {
					int base, exp = 0;
					boolean isvalidbase;
					do {
						System.out.printf(
								"Esta funcionalidade calcula uma potenciação x^y, com x > 0, utilizando apenas laços de repetição e multiplicação.\nForneça a base da potenciação: ");
						base = ativsc.nextInt();
						isvalidbase = (base != 0) ? true : false;
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
					int result = (exp == 0) ? 1 : 0;
					if (result != 1) {
						result = base;
						for (int i = 2; i <= exp; i++) {
							result *= base;
							System.out.printf("Resultado atual da potenciação: %d.\ni: %d\n", result, i);
						}
					}
					System.out.printf("A %dª potência de base %d é %d.\n", exp, base, result);
				}
				case 10 -> {
					int base, exp = 0;
					boolean isvalidbase;
					do {
						System.out.printf(
								"Esta funcionalidade calcula uma potenciação x^y, com x > 0, utilizando apenas laços de repetição e soma.\nForneça a base da potenciação: ");
						base = ativsc.nextInt();
						isvalidbase = (base != 0) ? true : false;
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
					System.out.printf("A %dª potência de base %d é %d.\n", exp, base, result);
				}
				}
				ativsc.close();
			}
		} while (!rawchoice.equals("sair"));
		choicesc.close();
	}
}

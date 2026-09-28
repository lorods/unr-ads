package iniciado220926;

import java.util.Scanner;

public class Main {

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
						isnatural = true;
						double sqrtceil = Math.ceil(Math.sqrt(chkdprim));
						// check for 2 and 3 special cases
						if (chkdprim == 2 || chkdprim == 3)
							System.out.printf("O número %d é primo.\n.", chkdprim);
						// check for even numbers
						else if (chkdprim % 2 == 0)
							System.out.printf("O número %d não é primo.\n", chkdprim);
						else {
							int mod;
							for (int i = 5; i <= sqrtceil; i += 2) {
								mod = chkdprim % i;
								if (mod == 0) {
									System.out.printf("O número %d não é primo.\n", chkdprim);
									break;
								} else if (i == sqrtceil)
									System.out.printf("O número %d é primo.\n", chkdprim);
							}
						}
					} while (isnatural == false);
				}
				case 7 -> {

				}
				case 8 -> {

				}
				case 9 -> {

				}
				case 10 -> {
					int base, exp;
					System.out.printf(
							"Esta funcionalidade calcula uma potenciação x^y, com ambos > 0, utilizando apenas laços de repetição e soma.\nForneça a base da potenciação: ");
					base = ativsc.nextInt();
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
						base *= -1;
					}
					Scanner scanner = new Scanner(System.in);
					System.out.println("Digite a base:");
					base = scanner.nextInt();
					System.out.println("Digite o expoente:");
					int expoente = scanner.nextInt();

					if (base > 0 && expoente > 0) {
						int result = 1;
						int i = 0;
						while (i < expoente) {
							int j = 0;
							int temp = 0;
							while (j < base) {
								temp += result;
								j++;
							}
							result = temp;
							i++;
						}
						System.out.println("O resultado da potência é: " + result);
					} else {
						System.out.println(
								"Os valores digitados não são válidos. Eles devem ser positivos e maiores que zero.");
					}

				}
				}
				ativsc.close();
			}
		} while (!rawchoice.equals("sair"));
		choicesc.close();
	}
}

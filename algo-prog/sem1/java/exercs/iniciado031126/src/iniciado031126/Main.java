package iniciado031126;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		int ch=-1;
		Scanner sc = new Scanner(System.in);
		for (;ch!=0;) {
			System.out.printf(
					"Este programa conta com duas funcionalidades: visualização de números da sequência de Fibonacci armazenados em uma única variável e visualização dos armazenados em vetor. Escolha entre as opções 1 ou 2; 0 para encerrar:\n");
			ch = sc.nextInt();
			switch (ch) {
			case 1 -> {
				int[] prev = { 0, 1 };
				int nlim;
				int cur;
				System.out.printf(
						"Informe um número que será o fim da impressão — o loop será interrompido quando ele for ultrapassado: ");
				nlim = sc.nextInt();
				System.out.printf("Sequência de Fibonacci: 0, 1");
				for (int i = 0; i <= nlim;) {
					cur = prev[0] + prev[1];
					System.out.printf(", %d",cur);
					prev[0] = prev[1];
					prev[1] = cur;
					i=prev[0]+prev[1];
				}
				System.out.printf(".\n");
			}
			case 2 -> {
				break;
			}
			case 0 -> {
				break;
			}
			}
		}
		sc.close();
	}
}

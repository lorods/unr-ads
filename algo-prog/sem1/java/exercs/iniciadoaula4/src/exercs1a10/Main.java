package exercs1a10;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.Scanner;

class CloseShieldInputStream extends FilterInputStream {
	public CloseShieldInputStream(InputStream in) {
		super(in);
	}

	@Override
	public void close() throws IOException {
		return;
	}
}

public class Main {

	public static void main(String[] args) {
		Scanner sci = new Scanner(new CloseShieldInputStream(System.in)), scdsw = new Scanner(new CloseShieldInputStream(System.in));
		int[] capacidadevet = { 1500, 1000, 15000, 1500, 4, 2000, 50000, 0, 0, 1000 };
		System.out.printf("Digite de 1 a 10 para executar o algoritmo/subrotina desejado e então pressione Enter: ");
		int opesc = sci.nextInt();
		switch (opesc) {
		case 1 -> {
			int capacidade = capacidadevet[0], comprimento;
			double[] nota = new double[capacidade];
			double tot=0;
			System.out.printf("Esta funcionalidade recebe até 1500 notas de um aluno, calcula sua média e classifica o resultado em APROVADO ou REPROVADO. Você será perguntado sobre elas. Para sair dessa funcionalidade, responda a qualquer repetição com \"sair\".\n");
			for(comprimento=0;comprimento<capacidade;comprimento++) {
				System.out.printf("Digite a nota: ");
				String resp = scdsw.nextLine();
				if(resp.equals("sair")) continue;
				else {
					nota[comprimento] = Double.parseDouble(resp);
					tot+=nota[comprimento];
				};
			}
			double media = tot/comprimento;
			String resulstr = (media>6) ? "aprovado com média ".concat(String.valueOf(media)) : "reprovado com média ".concat(String.valueOf(media));
			System.out.printf("Resultado do aluno: %s.",resulstr);
		}
		case 2 -> {
			int capacidade = capacidadevet[1];
			int[] comprimento = {0,0,0}, media={0,0,0}, tot={0,0,0};
			double[][] nota = new double[3][capacidade];
			System.out.printf("Esta funcionalidade recebe até 1000 notas de três alunos, calcula sua média e classifica cada resultado em APROVADO ou REPROVADO. Você será perguntado sobre elas. Para sair dessa funcionalidade, responda a qualquer repetição com \"sair\".\n");
			int i, j;
			for(i=0; i<4;i++) {
				for(j=0;j<capacidade;j++) {
					System.out.printf("Digite a nota: ");
					String resp = scdsw.nextLine();
					if(resp.equals("sair")) continue;
					else {
						nota[i][j] = Double.parseDouble(resp);
						tot[i]+=nota[i][j];
					}
				}
				comprimento[i] = j;
				media[i] = tot[i]/comprimento[i];
				String resulstr = (media[i]>6) ? "aprovado com média ".concat(String.valueOf(media[i])) : (media[i] >= 4) ? "em recuperação com média ".concat(String.valueOf(media[i])) : (media[i]<4) ? "reprovado com média ".concat(String.valueOf(media[i])) : "média desconhecida";
				System.out.printf("Resultado do aluno %d: %s.",i,resulstr);
			}
			double medsec = (tot[0]+tot[1]+tot[2])/3;
			System.out.printf("Resultado da média secundária entre os três alunos: %.2f",medsec);
		}
		case 3 -> {

		}
		case 4 -> {

		}
		case 5 -> {

		}
		case 6 -> {

		}
		case 7 -> {

		}
		case 8 -> {

		}
		case 9 -> {

		}
		case 10 -> {

		}
		default -> {
			System.out.printf("Não forneceu uma opção válida de subrotina.\n");
		}
		}
		sci.close();
		scdsw.close();
	}

}

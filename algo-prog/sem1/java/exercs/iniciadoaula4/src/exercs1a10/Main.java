package exercs1a10;

import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
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
		Scanner sci = new Scanner(new CloseShieldInputStream(System.in)), scinf = new Scanner(new CloseShieldInputStream(System.in)), scchr = new Scanner(new CloseShieldInputStream(System.in));
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
				String resp = scinf.nextLine();
				if(resp.equals("sair")) break;
				nota[comprimento] = Double.parseDouble(resp);
				tot+=nota[comprimento];
			}
			double media = tot/comprimento;
			String resulstr = (media>6) ? "aprovado com média ".concat(String.valueOf(media)) : "reprovado com média ".concat(String.valueOf(media));
			System.out.printf("Resultado do aluno: %s.",resulstr);
		}
		case 2 -> {
			int capacidade = capacidadevet[1];
			double[] comprimento = {0,0,0}, tot={0,0,0};
			double[][] nota = new double[3][capacidade];
			double[] media={0,0,0};
			System.out.printf("Esta funcionalidade recebe até 1000 notas de três alunos, calcula sua média e classifica cada resultado em APROVADO (media > 6), EM RECUPERAÇÃO (media >=4 e media <=6) ou REPROVADO (media < 4). Você será perguntado sobre elas. Para sair dessa funcionalidade, responda a qualquer repetição com \"sair\".\n");
			int i, j;
			//boolean s=false;
			for(i=0; i<3;i++) {
				for(j=0;j<capacidade;j++) {
					System.out.printf("Digite a nota: ");
					String resp = scinf.nextLine();
					if(resp.equals("sair")) break;
					else {
						nota[i][j] = Double.parseDouble(resp);
						tot[i]+=nota[i][j];
					}
				}
				comprimento[i] = j;
				media[i] = tot[i]/comprimento[i];
				String resulstr = (media[i]>6) ? "aprovado com média ".concat(String.valueOf(media[i])) : (media[i] >= 4) ? "em recuperação com média ".concat(String.valueOf(media[i])) : (media[i]<4) ? "reprovado com média ".concat(String.valueOf(media[i])) : "média desconhecida";
				System.out.printf("Resultado do aluno %d: %s.\n",(i+1),resulstr);
			}
			double medsec = (tot[0]+tot[1]+tot[2])/3;
			System.out.printf("Resultado da média secundária entre os três alunos: %.2f",medsec);
		}
		case 3 -> {
			int numt[] = new int[capacidadevet[2]], numpar[] = {0};
			int ctrpar = 0, totpar = 0;
			System.out.printf("Esta funcionalidade recebe até 15000 números inteiros e verifica quais deles são pares, mostrando estes e o valor que somados totalizam. Você será questionado sobre os valores agora. Para sair dessa funcionalidade, responda a qualquer repetição com \"sair\".\\n");
			for(int i=0;i<capacidadevet[2];i++) {
				System.out.printf("Digite o inteiro: ");
				String resp = scinf.nextLine();
				if(resp.equals("sair")) break;
				numt[i] = Integer.parseInt(resp);
				if(numt[i]%2==0) {
					numpar[ctrpar] = numt[i]; 
					totpar+=numpar[ctrpar];
					ctrpar++;
				}
			}
			System.out.printf("Somatório dos números pares: %d.\n",totpar);
			System.out.printf("Seguem os números pares entre os fornecidos: %d",numpar[0]);
			for(int unid : Arrays.copyOfRange(numpar, 1, numpar.length)) {
				System.out.printf(", %d",unid);	
			}
			System.out.printf(". Foram inseridos %d números pares.",numpar.length);
		}
		case 4 -> {
			int numt[] = new int[capacidadevet[3]], numimpar[] = {0};
			int ctrimpar = 0, totimpar = 0;
			//String proxentr = new String();
			System.out.printf("Esta funcionalidade recebe até 1500 números inteiros e verifica quais deles são ímpares, mostrando estes e o valor que somados totalizam. Você será questionado sobre os valores agora. Para sair dessa funcionalidade, responda a qualquer repetição com \"sair\".\\n");
			for(int i=0;i<capacidadevet[3];i++) {
				System.out.printf("Digite o inteiro: ");
				String resp = scinf.nextLine();
				if(resp.equals("sair")) break;
				numt[i] = Integer.parseInt(resp);
				if(numt[i]%2==1) {
					numimpar[ctrimpar] = numt[i]; 
					totimpar+=numimpar[ctrimpar];
					ctrimpar++;
				}
			}
			System.out.printf("Somatório dos números ímpares: %d.\n",totimpar);
			System.out.printf("Seguem os números ímpares entre os fornecidos: %d",numimpar[0]);
			for(int unid : Arrays.copyOfRange(numimpar, 1, numimpar.length)) {
				System.out.printf(", %d",unid);	
			}
			System.out.printf(". Foram inseridos %d números ímpares.",numimpar.length);
		}
		case 5 -> {
			int vot[] = new int[6];
			System.out.printf("Quatro candidatos anônimos, identificados por 1, 2, 3 e 4, estão concorrendo nesta eleição presidencial observada pelo TSE. Sr. Presidente do Tribunal, por favor, digite a seguir a quantidade de votantes que participarão: ");
			capacidadevet[4] = sci.nextInt();
			System.out.printf("Prosseguindo com %d votantes.",capacidadevet[4]);
			int votinst;
			for(int i=0;i<capacidadevet[4];i++) {
				System.out.printf("Votante na posição %d na fila, por favor, informe seu voto, seguindo a relação abaixo, e então pressione Enter.\n- Voto 1, 2, 3, 4: voto computado para o respectivo candidato entre os quatro concorrentes.\nVoto 5: voto em branco.\nVoto fora do intervalo [1-5]: voto nulo.\n",(i+1));
				votinst = sci.nextInt();
				switch(votinst) {
					case 1 -> {
						vot[0]++;
					}
					case 2->{
						vot[1]++;
					}
					case 3->{
						vot[2]++;
					}
					case 4->{
						vot[3]++;
					}
					case 5->{
						vot[4]++;
					}
					default->{
						vot[5]++;
					}
				}
			}
			System.out.printf("---Totais de votos---\n");
			System.out.printf("Candidato %d: %d votos",1,vot[0]);
			for(int i=1;i<4;i++) {
				System.out.printf(";\ncandidato %d: %d votos",(i+1),vot[i]);
			}
			System.out.printf(".\n\nVotos em branco: %d.",vot[4]);
			System.out.printf("\n\nVotos nulos: %d\n",vot[5]);
		}
		case 6 -> {
			//int[] valfator = new int[capacidadevet[5]];
			//int[][] prodval = new int[capacidadevet[5]][10];
			String lidoinst, rescomp = new String();
			int resinst;
			System.out.printf("Esta funcionalidade recebe até 2000 números inteiros e calcula sua tabuada do fator 1 até o fator 10. Você será perguntado sobre os valores agora e pode sair do ciclo repetitivo a qualquer momento respondendo com \"sair\".\n");
			for(int i=0;i<capacidadevet[5];i++) {
				System.out.printf("Insira um inteiro: ");
				lidoinst = sci.nextLine();
				if(lidoinst.equals("sair")) break;
				resinst = Integer.parseInt(lidoinst);
				for(int j=1;j<11;j++) {
					rescomp=rescomp.concat(String.valueOf(j)).concat(" * ").concat(String.valueOf(resinst)).concat(" = ").concat(String.valueOf(j*resinst)).concat("\n");
				}
				System.out.printf("\n");
			}
			System.out.printf("Tabuadas registradas: %s\n",rescomp);
		}
		case 7 -> {
			int[] altcm = new int[capacidadevet[6]];
			int ctraltfem=0, totaltfem=0, totaltglob=0;
			char[] sx = new char[capacidadevet[6]];
			char escsair;
			System.out.printf("Esta funcionalidade recebe até 50000 combinações de altura (em cm) e sexo individuais em uma turma escolar. Após informar uma combinação e responder \"S\" quando perguntado para encerrar, ou o limite de 50000 combinações ser alcançado, o que ocorrer primeiro, você verá a maior e menor alturas da turma, bem como a média da altura das mulheres e da turma em geral.\n");
			for(int i=0;i<capacidadevet[6];i++) {
				System.out.printf("Aluno na posição %d na chamada, insira sua altura em cm e aperte enter: ",(i+1));
				altcm[i] = sci.nextInt();
				System.out.printf("Aluno na posição %d na chamada, agora insira seu sexo, por favor. Uma entrada diferente de F e M produzirá o resultado \"Prefiro não informar (N)\"",(i+1));
				sx[i] = scchr.nextLine().toUpperCase().charAt(0);
				if(sx[i]!='F'&&sx[i]!='M') sx[i] = 'N';
				else if(sx[i]=='F') {
					totaltfem+=altcm[i];
					ctraltfem++;
				}
				totaltglob+=altcm[i];
				System.out.printf("Você deseja sair da funcionalidade agora? Se responder com \"S\", as estatísticas calculadas até o momento serão exibidas.");
				escsair = scchr.nextLine().toUpperCase().charAt(0);
				if(escsair=='S') break;
			}
			int[] altord = altcm;
			Arrays.sort(altord);
			System.out.printf("Estatísticas do conjunto de alturas:\nmaior altura geral da turma: %d\nmenor altura geral da turma: %d\nmédia aproximada de altura feminina da turma: %.2f\nmédia aproximada de altura geral da turma: %.2f\n\n",altord[(altord.length-1)],altord[0],(totaltfem/ctraltfem),(totaltglob/altcm.length));
			
		}
		case 8 -> {
			double[][] estatis = new double[1][2];
			double tots[] = new double[3], conjsal[] = new double[1];
			double leitorsal, leitorprole;
			int ctrestatis=0;
			System.out.printf("A prefeitura da cidade Cidadela quer descobrir a média do salário da população, a média do número de filhos, o maior salário da população e o percentual de pessoas com salário de até R$ 200,00. Para tanto, é necessário que o usuário deste programa informe o salário e o número de filhos de habitantes anônimos. Para encerrar a leitura de dados, insira um salário negativo no prompt de salário.\n");
			do {
				System.out.printf("Insira o salário do habitante nº %d: ",(ctrestatis+1));
				leitorsal = scinf.nextDouble();
				if(leitorsal<0) break;
				if(ctrestatis>0) {
					estatis = Arrays.copyOf(estatis, (ctrestatis+1));
					conjsal = Arrays.copyOf(conjsal, (ctrestatis+1));
				}
				estatis[ctrestatis][0] = leitorsal;
				System.out.printf("Insira o número de filhos do habitante nº %d: ",(ctrestatis+1));
				leitorprole = scinf.nextDouble();
				estatis[ctrestatis][1] = leitorprole;
				conjsal[ctrestatis] = estatis[ctrestatis][0];
				tots[0]+=estatis[ctrestatis][0];
				tots[1]+=estatis[ctrestatis][1];
				if(leitorsal<=200) tots[2]++;
				ctrestatis++;
			} while(true);
			Arrays.sort(conjsal);
			double medsal = (tots[0]/ctrestatis), medprole = (tots[1]/ctrestatis), porcsalminu = (tots[2]/ctrestatis)*100, maiorsal = conjsal[(conjsal.length-1)];
			System.out.printf("Estatísticas obtidas pela prefeitura:\nMédia salarial aproximada da população: %.2f\nMédia aproximada do número de filhos na população, per capita: %.2f\nMaior salário encontrado na amostra colhida: %.2f\nPercentual aproximado de pessoas com salário de até R$ 200,00: %.2f\\%\n\n",medsal,medprole,maiorsal,porcsalminu);
		}
		case 9 -> {
			int alt[] = {150,110}, txcres[] = {2,3};
			int refl = alt[0], refm=alt[1],ctdrano=0;
			while(refm<=refl) {
				refl+=txcres[0];
				refm+=txcres[1];
				ctdrano++;
			}
			System.out.printf("Será(ão) necessário(s) %d ano(s) para a altura de Maria superar a de Luiz.",ctdrano);
		}
		case 10 -> {
			class Membro {
				int idd, categoria;
				char sexo;
				double rendamens;
				int valmens;
				
				public Membro() {
					return;
				}

				public int getIdd() {
					return idd;
				}

				public void setIdd(int idd) {
					this.idd = idd;
				}

				public int getCategoria() {
					return categoria;
				}

				public void setCategoria(int categoria) {
					this.categoria = categoria;
				}

				public char getSexo() {
					return sexo;
				}

				public void setSexo(char sexo) {
					this.sexo = sexo;
				}

				public double getRendamens() {
					return rendamens;
				}

				public void setRendamens(double rendamens) {
					this.rendamens = rendamens;
				}

				public int getValmens() {
					return valmens;
				}

				public void setValmens(int valmens) {
					this.valmens = valmens;
				}
			}
			ArrayList<Membro> sociedade = new ArrayList<>();
			System.out.printf("Esta funcionalidade calcula a receita mensal de um clube para cada membro informado. A fim de possibilitar esse detalhamento, por favor, forneça idade, sexo e renda mensal de até mil sócios do clube, o que permitirá definir a categoria de cobrança e, então, o valor arrecadado com ela. Para finalizar a leitura de membros, responda \"S\" à pergunta \"Qual o sexo do(a) associado(a)\".\n");
			for(int i=0;i<capacidadevet[9];i++) {
				Membro membromensal = new Membro();
				char sxatual;
				boolean sxinvalido;
				System.out.printf("Qual o sexo do associado? ");
				do {
												membromensal.setSexo(scchr.nextLine().toUpperCase().charAt(0));
					sxatual = membromensal.getSexo();
					sxinvalido = (sxatual!='F'&&sxatual!='M'&&sxatual!='S') ? true : false;
					if(sxinvalido) System.out.printf("Você não digitou um sexo válido (F, M ou S [para sair]).");
				}while(sxinvalido);
				if(sxatual=='S') break;
				int iddatual;
				boolean iddinvalida;
				do {
					membromensal.setIdd(sci.nextInt());
					iddatual = membromensal.getIdd();
					iddinvalida = (iddatual<1 || iddatual>100) ? true : false;
					if(iddinvalida) System.out.printf("Você não digitou uma idade válida (aceitam-se membros de 1 a 100 anos).");
				} while(iddinvalida);
				double rendatual;
				boolean rendainvalida;
				do {
					membromensal.setRendamens(scinf.nextDouble());
					rendatual = membromensal.getRendamens();
					rendainvalida = (rendatual < 0) ? true : false;
					if(rendainvalida) System.out.printf("Você digitou um valor inferior ao mínimo de renda (R$ 0).");
				} while(rendainvalida);
				int catplano = (iddatual >= 65 && sxatual=='F') ? 2 : (iddatual<65 && iddatual>=18 && rendatual > 1000) ? 1 : 3;
				int valrefmembro = (catplano == 1) ? 300 : (catplano == 2) ? 300*(75/100) : 300*(110/100); 
				membromensal.setCategoria(catplano);
				membromensal.setValmens(valrefmembro);
				sociedade.add(membromensal);
		}
			int totarrecadacao=0;
			for(int i=0;i<sociedade.size();i++) {
				int menslida = sociedade.get(i).getValmens();
				System.out.printf("Valor pago pelo membro %d: %d.\n",(i+1),menslida);
				totarrecadacao+=menslida;
			}
			System.out.printf("Total arrecadado pelo clube no mês analisado: %d.",totarrecadacao);
		}
		default -> {
			System.out.printf("Não forneceu uma opção válida de subrotina.\n");
		}
		}
		sci.close();
		scinf.close();
		scchr.close();
	}

}

package exercs1a10;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

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
	public static Map<String, String> parseEntries(String[] entryset) {
		Map<String, String> retentry = new HashMap<String, String>();
		for (int i = 0; i < entryset.length; i += 2) {
			retentry.put(entryset[i], entryset[i + 1]);
		}
		return retentry;
	}
	
	public static void metodoEncerramento() {
		System.out.printf("Finalizando execução...");
	}
	
	public static void metodoOpcaoInvalida() {
		System.out.printf("Essa opção não é válida! Escolha novamente.\n");
	}

	public static void metodoObterMod() {
		
	}

	public static void metodoOrdenacaoCres() {
		double numspordenacao[] = new double[3];
		System.out.printf("A seguir, forneça os números positivos a serem ordenados.\n");
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		for(int i=0;i<=2;i++) {
			System.out.printf("Insira o número no índice %i: ",i);
			numspordenacao[i] = Math.abs(sc.nextDouble());
		}
		Arrays.sort(numspordenacao);
		System.out.printf("Veja o array ordenado:\n");
		for(int i=0;i<=2;i++) {
			System.out.printf("%d\n",numspordenacao[i]);
		}
		sc.close();
	}

	public static void metodoMedias() {
		int opesc = 0;
		double resul;
		String tipomedia;
		Scanner isc = new Scanner(new CloseShieldInputStream(System.in));
		Scanner dbsc = new Scanner(new CloseShieldInputStream(System.in));
		System.out.printf("Escolha o tipo de média das 4 notas estudantis que deseja obter – código 1 para aritmética, código 2 para harmônica ou código 3 para ponderada – e então pressione Enter: ");
		opesc = isc.nextInt();
		switch(opesc) {
			case 1 ->{
				double[] elma = new double[4];
				tipomedia = "aritmética";
				double eltot = 0;
				for(int i=0;i<=3; i++) {
					boolean notavalida;
					do {
					System.out.printf("Digite aqui um número ou nota para ocupar a variável x%d da fórmula da média aritmética. ",(i+1));
					elma[i] = dbsc.nextDouble();
					notavalida = (elma[i]<0||elma[i]>10) ? false : true;
					if(!notavalida) System.out.printf("Número inválido! Insira-o novamente.");
					} while(notavalida==false);
					eltot+=elma[i];
				}
				resul=eltot/elma.length;
				String aval = (resul>=6) ? "aprovado" : "reprovado";
				System.out.printf("Aluno %s.\n)",aval);
			} 
			case 2 ->{
				double[] elmh = new double[4];
				tipomedia = "harmônica";
				boolean notavalida;
				for(int i=0;i<=2;i++){
					do {
					System.out.printf("Digite aqui um número ou nota para ocupar a variável x%d da fórmula da média harmônica. ",(i+1));
					elmh[i] = dbsc.nextDouble();
					notavalida = (elmh[i]<0||elmh[i]>10) ? false : true;
					if(!notavalida) System.out.printf("Número inválido! Insira-o novamente.");
					} while(notavalida==false);
				}
				double operandlen = elmh.length;
				double denominatortot = 0;
				for (int i = 0; i < operandlen; i++) {
					denominatortot += (1 / elmh[i]);
				}
				resul = operandlen / denominatortot;
			}
			case 3 ->{
				double[][] elmp = new double[4][2];
				tipomedia = "ponderada";
				for(int i=0; i<=3; i++) {
					for(int j=0; j<=1; j++) {
						System.out.printf("Digite aqui um número ou nota para ocupar a variável %s%d da fórmula da média ponderada. ", (j==0 ? "x" : "(p)eso"), (i+1));
						elmp[i][j] = dbsc.nextDouble();
					}
				}
				double coeflen = elmp.length;
				double operandtot = 0, weightot = 0;
				for (int i = 0; i < coeflen; i++) {
						operandtot += elmp[i][0] * elmp[i][1];
						weightot += elmp[i][1];
					
				}
				resul = operandtot / weightot;
			}
			default ->{
				System.out.printf("Não foi escolhido um tipo de média válido (1, 2 ou 3).");
				dbsc.close();
				isc.close();
				return;
			}
		}
		System.out.printf("Resultado da média %s: %d",tipomedia,resul);
		dbsc.close();
		isc.close();
	}

	public static void metodoOperacoesMat() {
		double result = 0;
		String opstr, tipoperacao = new String();
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		System.out.printf("Este item é uma calculadora simples de dois valores. Insira sua operação (x+y, x*y, x-y, x[: ou /]d ou x%d) e aperte enter.\n Operações suportadas: adição, multiplicação, subtração, divisão e módulo, SEM CARACTERES ENTRE OS OPERADORES: ");
		opstr = sc.nextLine();
		String[] parsdopstr = opstr.split("+|-|/|:|*|%");
		char opertr = (opstr.contains("+")) ? '+' : (opstr.contains("-")) ? '-' : (opstr.contains("/") || opstr.contains(":")) ? '/' : (opstr.contains("*")) ? '*' : (opstr.contains("%")) ? '%' : null; 
		switch(opertr) {
			case '+' -> {
				tipoperacao = "adição";
				result = Double.parseDouble(parsdopstr[0]) + Double.parseDouble(parsdopstr[1]);
			} 
			case '-' -> {
				tipoperacao = "subtração";
				result = Double.parseDouble(parsdopstr[0]) - Double.parseDouble(parsdopstr[1]);
			}
			case '/' -> {
				double dividendo = Double.parseDouble(opstr.substring(2, 3));
				if(dividendo==0) {
					System.out.printf("Divisão por zero é igual a infinito positivo ou negativo, a depender do sinal do dividendo.");
					break;
				}
				result = Double.parseDouble(parsdopstr[0]) / Double.parseDouble(parsdopstr[1]);
				tipoperacao = "divisão";
			} 
			case '*' -> {
				result = Double.parseDouble(parsdopstr[0]) * Double.parseDouble(parsdopstr[1]);
				tipoperacao = "multiplicação";
			}
			case '%' -> {
				double operands[] = {Double.parseDouble(parsdopstr[0]), Double.parseDouble(parsdopstr[1])};
				result = operands[0] % operands[1];
				tipoperacao = "módulo";
				if(result==0) System.out.printf("O primeiro operando é divisível de forma exata pelo segundo, pois o resto da divisão é 0.\n");
				else System.out.printf("O primeiro operando não é divisível de forma exata pelo segundo, pois o resto da divisão não é 0.\n");
				String resultparid[] = {(operands[0] % 2 == 0 ? "par" : "ímpar"),(operands[1] % 2 == 0 ? "par" : "ímpar")};
				String paridadenum = "O primeiro operando é ".concat(resultparid[0]).concat(", e o segundo, ").concat(resultparid[1]).concat(".");
				System.out.printf(paridadenum);
			}
			default -> {
				System.out.printf("Operação inválida ou não suportada!");
			}
		}
		sc.close();
		System.out.printf("Resultado da %s: %d",tipoperacao,result);
	}

	public static void metodoIR() {
		BigDecimal salmensarred;
		double salan, salextraord, salferias, rendsaltot;
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		System.out.printf("Esta funcionalidade calcula seu salário anual bruto, décimo terceiro salário, salário de férias com base na média salarial bruta em um ano e desconto anual de IR (fonte: <www.gov.br/receitafederal/pt-br>, ano-calendário 2026). Insira sua média salarial no ano e então pressione enter: ");
		salmensarred = new BigDecimal(String.valueOf(sc.nextDouble()));
		double salmensarredb = salmensarred.doubleValue();
		salan = salmensarredb * 12;
		salferias = salmensarredb * 4/3;
		salextraord = salmensarredb;
		rendsaltot = salan+salferias+salextraord;
		double totdescrend = (rendsaltot>55976.15) ? 10853.78 : (rendsaltot>=45012.61&&rendsaltot<=55976.15) ? 8054.97 : (rendsaltot>=33919.81&&rendsaltot<45012.60) ? 4679.67 : (rendsaltot>=28467.21&&rendsaltot<=33919.80) ? 2135.04 : 0;
		System.out.printf("Resultados da simulação:\nSalário anual bruto: R$ %d\nDécimo terceiro salário: R$ %d\nSalário de mês-recesso: R$ %d\nTotal de rendimentos regulares tributáveis: R$ %d\nDesconto de IR de incidência anual: R$ %d.",salan,salextraord,salferias,rendsaltot,totdescrend);
		sc.close();
	}

	public static void metodoTabelaIMC() {
		Scanner readr = new Scanner(new CloseShieldInputStream(System.in));
		System.out.printf("Para os próximos dados, utilize valores em unidades de medida compatíveis — por exemplo, kg e m: SI; lb e ft: imperial; etc.\nForneça o nome da pessoa. ");
		String nomepessoa = readr.nextLine();
		System.out.printf("Forneça o peso da pessoa. ");
		Scanner dblreader = new Scanner(new CloseShieldInputStream(System.in));
		double bodywg = dblreader.nextDouble();
		System.out.printf("Forneça a altura da pessoa. ");
		double height = dblreader.nextDouble();
		readr.close();
		dblreader.close();
		final double quoimc = (bodywg / (height * height));
		final String nomeclass = (quoimc<16) ? "muito abaixo do peso" : (quoimc>=16&quoimc<18.5) ? "abaixo do peso" : (quoimc>=18.5&&quoimc<25) ? "normal" : (quoimc>=25&&quoimc<30) ? "sobrepeso" : (quoimc>=30&quoimc<35) ?  "obeso – classe I" : (quoimc>=35&&quoimc<40) ? "obeso – classe II" : (quoimc>=40) ? "obeso – classe III" : "fora do normal/esperado";
		final String resultimc = "O IMC de ".concat(nomepessoa).concat(" é ").concat(String.valueOf(quoimc).concat(". Ele(a) se enquadra em ").concat(nomeclass).concat(".\n"));
		System.out.printf(resultimc);
	}

	public static void metodoNotasUni() {
		double na, nb;
		int contadfalta;
		Scanner scd = new Scanner(new CloseShieldInputStream(System.in)), sci = new Scanner(new CloseShieldInputStream(System.in));
		System.out.printf("Esta subrotina calcula sua média final e o(a) classifica em aprovado(a), reprovado(a) ou desistente.\nPara começar, insira sua nota A: ");
		na = scd.nextDouble();
		System.out.printf("Insira sua nota B: ");
		nb = scd.nextDouble();
		System.out.printf("Por fim, insira o total de faltas registradas: ");
		contadfalta = sci.nextInt();
		if(contadfalta>33) {
			System.out.printf("Você tem %d faltas e portanto se enquadra em desistente! O máximo admitido é 33.\n",contadfalta);
			scd.close();
			sci.close();
			return;
		}
		final String result = ((na+nb)/2>=7) ? "aprovado por nota." : "reprovado por nota.";
		System.out.printf("\nResultado da avaliação final por média: %s\n",result);
		scd.close();
		sci.close();
	}

	public static void metodoMontanhaRussa() {
		double idd, altura;
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		do {
			System.out.printf("Bem-vindo à montanha russa do sim/não! Informe sua idade e aperte enter: ");
			idd = sc.nextDouble();
			System.out.printf("Agora informe sua altura e aperte enter: ");
			altura = sc.nextDouble();
			final String disp = (idd>10||altura>1) ? "Acesso liberado à motanha-russa.\n" : "Acesso negado à montanha-russa devido a idade e altura insuficientes.\n";
			System.out.printf(disp);
		}while(idd<=0&&altura>0);
		sc.close();
	}

	public static void metodoTriangulos() {
		String tritype;
		do {
		System.out.printf("Informe a primeira medida de lado do triângulo.\n");
		double l[] = {1,1,1};
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		l[0] = sc.nextDouble();
		System.out.printf("Informe a segunda medida de lado do triângulo.\n");
		l[1] = sc.nextDouble();
		System.out.printf("Informe a terceira medida de lado do triângulo.\n");
		l[2] = sc.nextDouble();
		tritype = (l[0]==l[1] && l[1]==l[2]) ? "Seu triângulo é equilátero.\n"  :  (l[0]==l[1] || l[0]==l[2] || l[1]==l[2]) ? "Seu triângulo é isósceles.\n" : (l[0]>0&&l[1]>0&&l[2]>0) ? "Seu triângulo é escaleno.\n" : "Medida inválida de pelo menos um dos lados!";
		System.out.printf("%s",tritype);
		sc.close();
		} while(tritype.equals("Medida inválida de pelo menos um dos lados!"));
	}

	public static void metodoIdadesCriancas() {
		String crianca[] = {"Joãozinho","Maria","Zezinho"};
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		boolean isvalidage;
		int i=0, idd[] = {0,0,0};
		for(String cria : crianca) {
			do {
				System.out.printf("Bem-vindo, %s. Para prosseguir, digite sua idade: ",cria);
				idd[i] = sc.nextInt();
				isvalidage = (idd[i]<=0||idd[i]>18) ? false : true;
				if(!isvalidage) System.out.printf("Idade inválida! Insira-a novamente.\n");
			}
			while(!isvalidage);
			System.out.printf("Você informou %d.\n",idd[i]);
			i++;
		}
		sc.close();
		if(idd[0]==idd[1]) {
			//comparacoes possiveis:
			// >< | >= | >> | <= | << | <> | =< | => | == 
			if(idd[1]==idd[2]) System.out.printf("Os três têm a mesma idade (%d anos)! Parabéns!\n",idd[0]); //==
			else if(idd[0]>idd[2]) System.out.printf("A idade de %s e %s, a maior do grupo (%d), é maior que a de %s (%d).",crianca[0],crianca[1],idd[0],crianca[2],idd[2]);//=>
			else System.out.printf("A idade de %s e %s (%d) é menor que a de %s, a maior do grupo (%d).",crianca[0],crianca[1],idd[0],crianca[2],idd[2]);//=<
		}
		else if(idd[0]>idd[1]){
			 if(idd[1]==idd[2]) System.out.printf("A idade de %s, o mais velho dos três (%d), é maior que a de %s (%d), que é igual à de %s (%d).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //>=
			 else if(idd[1]<idd[2]) System.out.printf("A idade de %s, o mais velho dos três (%d), é maior que a de %s (%d), que é menor à de %s (%d).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //><
			 else System.out.printf("A idade de %s, o mais velho dos três (%d), é maior que a de %s (%d), que é maior que a de %s (%d).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //>>
		} else { //<
			if(idd[1]==idd[2]) System.out.printf("A idade de %s (%d) é menor que a de %s (%d), que é igual à de %s (%d), sendo a segunda/terceira idade a maior do grupo.",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //<=
			else if(idd[1]<idd[2]) System.out.printf("A idade de %s (%d) é menor que a de %s (%d), que é menor que a de %s, a maior do grupo (%d).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //<<
			else System.out.printf("A idade de %s (%d) é menor que a de %s (%d anos, a maior do grupo), que é maior que a de %s (%d).\n",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //<>
		}
		if(idd[0]!=idd[1]&&idd[0]!=idd[2]&&idd[1]!=idd[2]) System.out.printf(" Os três têm idades diferentes!\n"); 
	}

	public static void main(String[] args) {
		final String[] optlbl = { "OPEX1", "Triangulos", "OPEX2", "Idades criancas", "OPEX3", "Altura montanha russa",
				"OPEX4", "Notas uni", "OPEX5", "Tabela IMC", "OPEX6", "Imposto de renda", "OPEX7",
				"Operacoes matematicas", "OPEX8", "Medias aritmetica, harmonica e ponderada", "OPEX9",
				"Ordenacao crescente", "OPEX10", "Verificacao de divisao exata e paridade numerica", "OPEXSAIDA",
				"Encerramento" };
		Map<String, String> mp = parseEntries(optlbl);
		String chopt=new String(), fstr;
		Scanner sc = new Scanner(new CloseShieldInputStream(System.in));
		Runnable task;
		do {
			System.out.printf("Digite a operação a realizar e aperte enter (use uma das seguintes palavras-chave assim como segue: triangulos,\n idades criancas,\n altura montanha russa,\n notas uni,\n tabela IMC,\n imposto de renda,\n operacoes matematicas,\n medias aritmetica/harmonica/ponderada,\n ordenacao crescente,\n verificacao de divisao exata e paridade numerica, ou\n encerramento): ");
			chopt = sc.nextLine();
			String helprstr[] = { chopt.substring(0, 1).toUpperCase(), chopt.substring(1, chopt.length()) };
			fstr = helprstr[0].concat(helprstr[1]);
			System.out.printf("%s | %s | %s | %s\n", "placeholder", "placeholder", fstr, mp.get(optlbl[0]));
			// String optconst = Optset.values()[0].mode;
			// System.out.printf(": %s\n",mp.get());
			task = (fstr.equals(mp.get(optlbl[0]))) ? Main::metodoTriangulos : (fstr.equals(mp.get(optlbl[2]))) ? Main::metodoIdadesCriancas : (fstr.equals(mp.get(optlbl[4]))) ? Main::metodoMontanhaRussa : (fstr.equals(mp.get(optlbl[6]))) ? Main::metodoNotasUni : (fstr.equals(mp.get(optlbl[8]))) ? Main::metodoTabelaIMC : (fstr.equals(mp.get(optlbl[10]))) ? Main::metodoIR : (fstr.equals(mp.get(optlbl[12]))) ? Main::metodoOperacoesMat : (fstr.equals(mp.get(optlbl[14]))) ? Main::metodoMedias : (fstr.equals(mp.get(optlbl[16]))) ? Main::metodoOrdenacaoCres : (fstr.equals(mp.get(optlbl[18]))) ? Main::metodoObterMod : (fstr.equals(mp.get(optlbl[20]))) ? Main::metodoEncerramento : Main::metodoOpcaoInvalida;
			task.run();
		} while (!fstr.equals(optlbl[21]));
		sc.close();
	}
}

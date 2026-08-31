package exercs1a10;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.function.Consumer;
public class Main {
	public static Map<String, String> parseEntries(String[] entryset) {
		Map<String, String> retentry = new HashMap<String, String>();
		for (int i = 0; i < entryset.length; i += 2) {
			retentry.put(entryset[i], entryset[i + 1]);
		}
		return retentry;
	}
	
	public static void metodoEncerramento() {
		
	}
	
	public static void metodoOpcaoInvalida() {
		// TODO Auto-generated method stub
		
	}

	public static void metodoObterMod() {
		// TODO Auto-generated method stub
	
	}

	public static void metodoOrdenacaoCres() {
		// TODO Auto-generated method stub

	}

	public static void metodoMedias() {
		// TODO Auto-generated method stub
		
	}

	public static void metodoOperacoesMat() {
		// TODO Auto-generated method stub
		
	}

	public static void metodoIR() {
		// TODO Auto-generated method stub

	}

	public static void metodoTabelaIMC() {
		// TODO Auto-generated method stub
		Scanner readr = new Scanner(System.in);
		System.out.printf("Para os próximos dados, utilize valores em unidades de medida compatíveis — por exemplo, kg e m: SI; lb e ft: imperial; etc.\nForneça o nome da pessoa. ");
		String nomepessoa = readr.nextLine();
		System.out.printf("Forneça o peso da pessoa. ");
		Scanner dblreader = new Scanner(System.in);
		double bodywg = dblreader.nextDouble();
		System.out.printf("Forneça a altura da pessoa. ");
		double height = dblreader.nextDouble();
		readr.close();
		dblreader.close();
		final String imcresult = "O IMC de ".concat(nomepessoa).concat(" é ").concat(String.valueOf(bodywg / (height * height)).concat("."));
	}

	public static void metodoNotasUni() {
		// TODO Auto-generated method stub
		double na, nb;
		int contadfalta;
		Scanner scd = new Scanner(System.in), sci = new Scanner(System.in);
		System.out.printf("Esta subrotina calcula sua média final e o(a) classifica em aprovado(a), reprovado(a) ou desistente.\nPara começar, insira sua nota A: ");
		na = scd.nextDouble();
		System.out.printf("Insira sua nota B: ");
		nb = scd.nextDouble();
		System.out.printf("Por fim, insira o total de faltas registradas: ");
		contadfalta = sci.nextInt();
		if(contadfalta>33) {
			System.out.printf("Você tem %i faltas e portanto se enquadra em desistente! O máximo admitido é 33.");
			scd.close();
			sci.close();
			return;
		}
		final String result = ((na+nb)/2>=7) ? "aprovado por nota." : "reprovado por nota.";
		System.out.printf("Resultado da avaliação final por média: %s",result);
		scd.close();
		sci.close();
	}

	public static void metodoMontanhaRussa() {
		// TODO Auto-generated method stub
		double idd, altura;
		Scanner sc = new Scanner(System.in);
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
		Scanner sc = new Scanner(System.in);
		l[0] = sc.nextDouble();
		System.out.printf("Informe a segunda medida de lado do triângulo.\n");
		l[1] = sc.nextDouble();
		System.out.printf("Informe a terceira medida de lado do triângulo.\n");
		l[2] = sc.nextDouble();
		tritype = (l[0]==l[1] && l[1]==l[2]) ? "Seu triângulo é equilátero.\n."  :  (l[0]==l[1] || l[0]==l[2] || l[1]==l[2]) ? "Seu triângulo é isósceles.\n" : (l[0]>0&&l[1]>0&&l[2]>0) ? "Seu triângulo é escaleno.\n" : "Medida inválida de pelo menos um dos lados!";
		System.out.printf("%s",tritype);
		sc.close();
		} while(tritype.equals("Medida inválida de pelo menos um dos lados!"));
	}

	public static void metodoIdadesCriancas() {
		String crianca[] = {"Joãozinho","Maria","Zezinho"};
		Scanner sc = new Scanner(System.in);
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
			i++;
		}
		sc.close();
		if(idd[0]==idd[1]) {
			//comparacoes possiveis:
			// >< | >= | >> | <= | << | <> | =< | => | == 
			if(idd[1]==idd[2]) System.out.printf("Os três têm a mesma idade (%i anos)! Parabéns!\n",idd[0]); //==
			else if(idd[0]>idd[2]) System.out.printf("A idade de %s e %s, a maior do grupo (%i), é maior que a de %s (%i).",crianca[0],crianca[1],idd[0],crianca[2],idd[2]);//=>
			else System.out.printf("A idade de %s e %s (%i) é menor que a de %s, a maior do grupo(%i).",crianca[0],crianca[1],idd[0],crianca[2],idd[2]);//=<
		}
		else if(idd[0]>idd[1]){
			 if(idd[1]==idd[2]) System.out.printf("A idade de %s, o mais velho dos três (%i), é maior que a de %s (%i), que é igual à de %s (%i).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //>=
			 else if(idd[1]<idd[2]) System.out.printf("A idade de %s, o mais velho dos três (%i), é maior que a de %s (%i), que é menor à de %s (%i).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //><
			 else System.out.printf("A idade de %s, o mais velho dos três (%i), é maior que a de %s (%i), que é maior que a de %s (%i).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //>>
		} else { //<
			if(idd[1]==idd[2]) System.out.printf("A idade de %s (%i) é menor que a de %s (%i), que é igual à de %s (%i), sendo a segunda/terceira idade a maior do grupo.",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //<=
			else if(idd[1]<idd[2]) System.out.printf("A idade de %s (%i) é menor que a de %s (%i), que é menor que a de %s, a maior do grupo (%i).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //<<
			else System.out.printf("A idade de %s (%i) é menor que a de %s (%i anos, a maior do grupo), que é maior que a de %s (%i).",crianca[0],idd[0],crianca[1],idd[1],crianca[2],idd[2]); //<>
		}
		if(idd[0]!=idd[1]&&idd[0]!=idd[2]&&idd[1]!=idd[2]) System.out.printf("Os três têm idades diferentes!"); 
	}

	public static void main(String[] args) {
		final String[] optlbl = { "OPEX1", "Triangulos", "OPEX2", "Idades criancas", "OPEX3", "Altura montanha russa",
				"OPEX4", "Notas uni", "OPEX5", "Tabela IMC", "OPEX6", "Imposto de renda", "OPEX7",
				"Operacoes matematicas", "OPEX8", "Medias aritmetica, harmonica e ponderada", "OPEX9",
				"Ordenacao crescente", "OPEX10", "Verificacao de divisao exata e paridade numerica", "OPEXSAIDA",
				"Encerramento" };
		Map<String, String> mp = parseEntries(optlbl);
		String chopt, fstr;
		Scanner sc;
		do {
			System.out.printf("Digite a operação a realizar e aperte enter: ");
			sc = new Scanner(System.in);
			chopt = sc.nextLine();
			String helprstr[] = { chopt.substring(0, 1).toUpperCase(), chopt.substring(1, chopt.length()) };
			fstr = helprstr[0].concat(helprstr[1]);
			System.out.printf("%s | %s | %s | %s\n", "placeholder", "placeholder", fstr, mp.get(optlbl[0]));
			// String optconst = Optset.values()[0].mode;
			// System.out.printf(": %s\n",mp.get());
			Runnable task = (fstr.equals(mp.get(optlbl[0]))) ? Main::metodoTriangulos : (fstr.equals(mp.get(optlbl[2]))) ? Main::metodoIdadesCriancas : (fstr.equals(mp.get(optlbl[4]))) ? Main::metodoMontanhaRussa : (fstr.equals(mp.get(optlbl[6]))) ? Main::metodoNotasUni : (fstr.equals(mp.get(optlbl[8]))) ? Main::metodoTabelaIMC : (fstr.equals(mp.get(optlbl[10]))) ? Main::metodoIR : (fstr.equals(mp.get(optlbl[12]))) ? Main::metodoOperacoesMat : (fstr.equals(mp.get(optlbl[14]))) ? Main::metodoMedias : (fstr.equals(mp.get(optlbl[16]))) ? Main::metodoOrdenacaoCres : (fstr.equals(mp.get(optlbl[18]))) ? Main::metodoObterMod : (fstr.equals(mp.get(optlbl[20]))) ? Main::metodoEncerramento : Main::metodoOpcaoInvalida;
			task.run();
		} while (!fstr.equals(null));
		sc.close();
	}
}

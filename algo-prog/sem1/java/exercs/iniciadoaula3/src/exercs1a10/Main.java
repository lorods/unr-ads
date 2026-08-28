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

	}

	public static void metodoNotasUni() {
		// TODO Auto-generated method stub

	}

	public static void metodoMontanhaRussa() {
		// TODO Auto-generated method stub

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
			//comparacoes possiveis: 0,1; 0,2; 1,2;
			// >< | >= | >> | <= | << | <> | =< | => | == 
			if(idd[1]==idd[2]) System.out.printf("Os três têm a mesma idade! Parabéns!\n"); //==
			else if(idd[0]>idd[2]) System.out.printf("A idade de %s e %s (%i) é maior que a de %s (%i).",crianca[0],crianca[1],idd[0],crianca[2],idd[2]);//=>
			else System.out.printf("A idade de %s e %s (%i) é menor que a de %s (%i).",crianca[0],crianca[1],idd[0],crianca[2],idd[2]);//=<
		}
		else if(idd[2]==idd[1]){
			
		} else System.out.printf("Os três têm idades diferentes!");
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

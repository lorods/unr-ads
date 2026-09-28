package main.java.aula27;

import java.util.Scanner;

public class Main {
	private static void atividadeDobro() {
		Scanner dblinput = new Scanner(System.in);
		System.out.printf("Número inteiro: ");
		int inum = dblinput.nextInt();
		int dblprod = dobro(inum);
		System.out.printf("O dobro de %d é %d.\n",inum,dblprod);
		dblinput.close();
	}
	
	private static void atividadeMediaDoisInts() {
		Scanner intinput = new Scanner(System.in);
		System.out.printf("Entre com os números para os quais tirar a média. ");
		double[] mediael = new double[2];
		System.out.printf("Inteiro um: ");
		mediael[0] = intinput.nextInt();
		System.out.printf("Inteiro dois: ");
		mediael[1] = intinput.nextInt();
		double quo = obterMediaDoisInts(mediael);
		System.out.printf("A média entre %.2f e %.2f é %.2f.\n",mediael[0],mediael[1],quo);
		intinput.close();
	}

	private static double obterMediaDoisInts(double[] mediael) {
		return (mediael[0]+mediael[1])/2;
	}
	
	private static int dobro(int num) {
		return (num*2);
	}
	
	static int chkdnum = 0;
	static Scanner intsc = new Scanner(System.in);
	public static void main(String[] args) {
		atividadeMediaDoisInts();
		//atividadeDobro();
		/*boolean passed=false;
		Runnable readreq = Main::requestNumRead;
		do {
			try {
				System.out.printf("Insira um número inteiro que deseje verificar divisibilidade por 2 (se é par ou não) e tecle enter: ");
				readreq.run();
				passed=true;
			} catch(Exception e) {
				System.out.printf("Número inválido fornecido. Tente novamente.\n");
				intsc.nextLine();
			}
		} while(!passed);
		chkEveness(chkdnum);*/
		
	}

	private static void requestNumRead() {
		chkdnum = intsc.nextInt();
	}
	
	private static void chkEveness(int chkdnum) {
		if(chkdnum % 2==0) {
			System.out.printf("Você forneceu um número par.");
		} else {
			System.out.printf("Você forneceu um número ímpar.");
		}
	}

}

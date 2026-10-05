package main.java.aula27;

import java.math.BigDecimal;
import java.util.Scanner;

public class MathApplication {
	private static void displayMenu() {
		System.out.printf("Menu:\n1: somar\n2: subtrair\n3: multiplicar\n4: dividir\n0 ou 5: sair\n\n");
	}

	public static void wrapCalls() {
		displayMenu();
		Scanner sc = new Scanner(System.in);
		int outerch = yieldChoice();
		System.out.printf("Número 1: ");
		int num1 = sc.nextInt();
		System.out.printf("Número 2: ");
		int num2 = sc.nextInt();
		int result = 0;
		BigDecimal dec;
		Mathematics mathshelper = new Mathematics();
		boolean shquit = false;
		do {
			switch (outerch) {
			case 1 -> {
				result = mathshelper.sum(new int[] { num1, num2 });
			}
			case 2 -> {
				result = mathshelper.subtract(new int[] { num1, num2 });
			}
			case 3 -> {
				result = mathshelper.multiply(new int[] { num1, num2 });
			}
			case 4 -> {
				dec = mathshelper.divide(new BigDecimal[] { new BigDecimal(num1), new BigDecimal(num2) });
				System.out.printf("Resultado da operação: %d.\n",dec);
			}
			case 0, 5 -> {
				shquit = true;
			}
			}
		} while (!shquit);
		System.out.printf("Resultado da operação: %d.\n",result);
		sc.close();
	}

	private static int yieldChoice() {
		Scanner sc = new Scanner(System.in);
		boolean isvalidch;
		int ch;
		do {
			System.out.printf("Insira uma opção de operação: ");
			ch = sc.nextInt();
			isvalidch = (ch >= 0 && ch <= 5) ? true : false;
		} while (!isvalidch);
		sc.close();
		return ch;
	}
}

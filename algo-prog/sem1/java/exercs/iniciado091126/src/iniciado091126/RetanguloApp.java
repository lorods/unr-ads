package iniciado091126;

import java.math.BigDecimal;

public class RetanguloApp {

	public static void main(String[] args) {
		BigDecimal width = new BigDecimal("3.14"), height = new BigDecimal(20);
		Retangulo retlocal = new Retangulo(height, width);
		System.out.printf("Área do retângulo: %s",retlocal.calcArea());
	}

}

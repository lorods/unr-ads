package test.java.aula27;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import main.java.aula27.Mathematics;

public class MathematicsTest {
	private Mathematics mathtestcl;

	@BeforeEach
	void setup() {
		// arrange/preparar
		mathtestcl = new Mathematics();
	}

	@Test
	void shouldSumNums() {
		// action/acionar
		int result = mathtestcl.sum(new int[] { 6, 4 });

		// assert/aferir
		assertEquals(10, result);
	}

	@Test
	void shouldSubtractNums() {
		assertEquals(2, mathtestcl.subtract(new int[] { 6, 4 }));
	}

	@Test
	void shouldMultiplyNums() {
		assertEquals(24, mathtestcl.multiply(new int[] { 4, 6 }));
	}

	@Test void shouldDivideBigDecs() {
		BigDecimal dividend = new BigDecimal(6), divisor=new BigDecimal(4);
		assertEquals(new BigDecimal(6).divide(new BigDecimal(4)),mathtestcl.divide(new BigDecimal[] {dividend, divisor}));
		}
}

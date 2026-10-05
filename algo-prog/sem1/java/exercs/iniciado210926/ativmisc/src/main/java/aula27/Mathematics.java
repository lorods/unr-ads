package main.java.aula27;

import java.math.BigDecimal;

public class Mathematics {
	public int sum(int[] parc) {
		int res=0;
		for(int i=0;i<parc.length;i++) {
			res+=parc[i];
		}
		return res;
	}
	
	public int subtract(int[] parcsub) {
		int res=parcsub[0];
		for(int i=1;i<parcsub.length;i++) {
			res-=parcsub[i];
		}
		return res;
	}
	
	public int multiply(int[] factr) {
		int res=factr[0];
		for(int i=1;i<factr.length;i++) {
			res*=factr[i];
		}
		return res;
	}
	
	public BigDecimal divide(BigDecimal[] operand) {
		BigDecimal res=operand[0];
		for(int i=1;i<operand.length;i++) {
			res = res.divide(operand[i]);
		}
		return res;
	}
}

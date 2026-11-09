package iniciado091126;

import java.math.BigDecimal;

public class Retangulo {
	private BigDecimal height, width;

	public Retangulo(BigDecimal height, BigDecimal width) {
		this.height = height;
		this.width = width;
	}
	
	public Retangulo() {
		
	}

	public BigDecimal getHeight() {
		return height;
	}

	public void setHeight(BigDecimal height) {
		this.height = height;
	}

	public BigDecimal getWidth() {
		return width;
	}

	public void setWidth(BigDecimal width) {
		this.width = width;
	}
	
	public String calcArea() {
		return (getHeight().multiply(getWidth())).toPlainString();
	}
}

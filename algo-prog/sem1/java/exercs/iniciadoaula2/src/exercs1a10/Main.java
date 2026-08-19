package exercs1a10;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.OptionalDouble;
import java.util.Scanner;

import org.apache.commons.lang3.StringUtils;

public class Main {

	public static double calcStdAvg(double[] operand) {
		double len = operand.length;
		double total = 0;
		for (int i = 0; i < len; i++) {
			total += operand[i];
		}
		double avg = total / len;
		return avg;
	}

	public static double calcWeightedAvg(double[][] operand) {
		double coeflen = operand.length;
		double operandtot = 0, weightot = 0;
		for (int i = 0; i < coeflen; i++) {
				operandtot += operand[i][0] * operand[i][1];
				weightot += operand[i][1];
			
		}
		double weighdavg = operandtot / weightot;
		return weighdavg;
	}

	public static double calcHarmAvg(double[] operand) {
		double operandlen = operand.length;
		double denominatortot = 0;
		for (int i = 0; i < operandlen; i++) {
			denominatortot += (1 / operand[i]);
		}
		double harmavg = operandlen / denominatortot;
		return harmavg;
	}

	public static String calcImc() {
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
		return "O IMC de ".concat(nomepessoa).concat(" é ").concat(String.valueOf(bodywg / (height * height)).concat("."));
	}

	public static double calCubeArea() {
		Scanner readr = new Scanner(System.in);
		System.out.printf("Informe a medida da aresta do cubo. ");
		double edge = readr.nextDouble();
		double area = 6 * (edge * edge);
		readr.close();
		return area;
	}

	public static double calCubeVol() {
		Scanner readr = new Scanner(System.in);
		System.out.printf("Informe a medida da aresta do cubo. ");
		double edge = readr.nextDouble();
		double vol = Math.pow(edge, 3);
		readr.close();
		return vol;
	}

	public static double calCircleArea() {
		Scanner readr = new Scanner(System.in);
		System.out.printf("Informe a medida do raio do círculo. ");
		double radius = readr.nextDouble();
		double area = Math.PI * (radius * radius);
		readr.close();
		return area;
	}

	public static double calcRectPerimeter() {
		Scanner readr = new Scanner(System.in);
		System.out.printf("Informe a medida da largura do retângulo. ");
		double w = readr.nextDouble();
		System.out.printf("Informe a medida do comprimento do retângulo. ");
		double l = readr.nextDouble();
		double perim = 2 * (l + w);
		readr.close();
		return perim;
	}

	public static double calcRectArea() {
		Scanner readr = new Scanner(System.in);
		System.out.printf("Informe a medida da largura do retângulo. ");
		double w = readr.nextDouble();
		System.out.printf("Informe a medida do comprimento do retângulo. ");
		double l = readr.nextDouble();
		double area = l * w;
		readr.close();
		return area;
	}

	public static OptionalDouble yieldOperandsAvg(Optset mode) {
		Scanner readr = new Scanner(System.in);
		double resul=0;
		System.out.printf("Modo selecionado: %s\n",mode.toString());
		switch(mode) {
			case Optset.MP -> {
				double[][] elmp = new double[3][2];
				for(int i=0; i<=2; i++) {
					for(int j=0; j<=1; j++) {
						System.out.printf("Digite aqui um número para ocupar a variável %s%d da fórmula da %s. ", (j==0 ? "x" : "(p)eso"), (i+1),mode.toString());
						elmp[i][j] = readr.nextDouble();
					}
				}
				resul=calcWeightedAvg(elmp);
			}
			case Optset.MA -> {
				double[] elma = new double[3];
				for(int i=0;i<=2; i++) {
					System.out.printf("Digite aqui um número para ocupar a variável x%d da fórmula da %s. ",(i+1),mode.toString());
					elma[i] = readr.nextDouble();
				}
				resul=calcStdAvg(elma);
			}
			case Optset.MH -> {
				double[] elmh = new double[3];
				for(int i=0;i<=2;i++){
					System.out.printf("Digite aqui um número para ocupar a variável x%d da fórmula da %s. ",(i+1),mode.toString());
					elmh[i] = readr.nextDouble();
				}
				resul=calcHarmAvg(elmh);
			}
			default ->	{
				readr.close();
				return null;
			}
		}
		readr.close();
		return OptionalDouble.of(resul);
	}
	
	public enum Optset {
		MA("Média Aritmética"), MP("Média Ponderada"), MH("Média Harmônica"), IMC("Índice de Massa Corporal"),
		ACB("Área de Cubo"), VC("Volume de Cubo"), ACI("Área de Círculo"), PR("Perímetro de Retângulo"),
		AR("Área de Retângulo"), F("Fim da Aplicação");

		public String mode;

		private Optset(String mode) {
			this.mode = mode;
		}
	};

	public static void main(String[] args) {
		Scanner readr = new Scanner(System.in);
		System.out.print("Escolha uma opção para prosseguir. ");
		String rawopt = readr.nextLine().toLowerCase();
		String chopt = (Normalizer.isNormalized(rawopt, Form.NFKD) ? rawopt : StringUtils.stripAccents(rawopt));
		Double expresul = null;
		String expresulstr = null;
		System.out.printf("Escolheu %s.\n",chopt);
		switch (chopt) {
			case "mediaaritmetica", "media aritmetica" -> {
				expresul=yieldOperandsAvg(Optset.MA).getAsDouble();
			}
			case "media ponderada", "mediaponderada" -> {
				expresul=yieldOperandsAvg(Optset.MP).getAsDouble();
			}
			case "media harmonica", "mediaharmonica" -> {
				expresul=yieldOperandsAvg(Optset.MH).getAsDouble();
			}
			case "imc", "indicemassacorporal", "indicedemassacorporal", "indice de massa corporal" -> {
				expresulstr=calcImc();
			}
			case "areacubo", "area cubo", "area do cubo" -> {
				expresul=calCubeArea();
			}
			case "volcubo", "volume cubo", "volume do cubo" -> {
				expresul=calCubeVol();
			}
			case "areacirculo", "area circulo", "area do circulo" -> {
				expresul=calCircleArea();
			}
			case "perimetro retangulo", "perimetroretangulo", "perimetro do retangulo" -> {
				expresul=calcRectPerimeter();
			}
			case "area retangulo", "arearetangulo", "area do retangulo" -> {
				expresul=calcRectArea();
			}
			case "sair", "encerrar", "concluir", "fechar" -> {
				System.out.printf("%s.",Optset.F.toString());
			}
		}
		/*if(expresul!=null) {
			System.out.printf("O resultado do cálculo da %s é %d.",rawopt,expresul);
		} else {
			System.out.printf(expresulstr);
		}*/
		System.out.printf(expresul != null ? (("O resultado do cálculo do(a) ").concat(rawopt).concat(" é ").concat(String.valueOf(expresul)).concat(".")) : expresulstr);
		expresul=null;
		expresulstr=null;
		readr.close();
	}

}
package iniciado091126;

public class LivroApp {

	public static void main(String[] args) throws Exception {
		Livro[] colecao = {new Livro(), new Livro()};
		colecao[0].setTitulo("Dom Casmurro");
		colecao[0].setAutor("Machado de Assis");
		colecao[0].setNumpaginacao(300);
		colecao[1].setTitulo("Clean Code");
		colecao[1].setAutor("Uncle Bob");
		colecao[1].setNumpaginacao(502);
		colecao[0].exibirFicha();
		colecao[1].exibirFicha();
	}
}

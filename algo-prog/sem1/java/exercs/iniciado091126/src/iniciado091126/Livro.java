package iniciado091126;

public class Livro {
	private String titulo, autor;
	private int numpaginacao;
	
	public Livro() {
		
	}
	
	public Livro(String titulo, String autor, int numpaginacao) throws Exception {
		this.titulo = titulo;
		this.autor = autor;
		this.setNumpaginacao(numpaginacao);
	}

	public void setNumpaginacao(int numpaginacao) throws Exception {
		if(numpaginacao<1) {
			throw new Exception("Atenção: número de páginas deve ser maior ou igual a 1.");
		}
		this.numpaginacao = numpaginacao;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getTitulo() {
		return titulo;
	}

	public String getAutor() {
		return autor;
	}

	public int getNumpaginacao() {
		return numpaginacao;
	}

	public void exibirFicha() {
		System.out.printf("%s — %s (%d páginas).\n",titulo,autor,numpaginacao);
	}
}

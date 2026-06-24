import React, { useState, useEffect, useRef } from 'react';

const bancoDados = {
  cozinha: [
    { n: "Avental", i: "/imagens/cozinha/avental.png" },
    { n: "Batedeira", i: "/imagens/cozinha/batedeira.png" },
    { n: "Bule", i: "/imagens/cozinha/bule.png" },
    { n: "Garfo", i: "/imagens/cozinha/garfo.png" },
    { n: "Colher", i: "/imagens/cozinha/colher.png" },
    { n: "Concha", i: "/imagens/cozinha/concha.png" },
    { n: "Copo", i: "/imagens/cozinha/copo.png" },
    { n: "Esponja", i: "/imagens/cozinha/esponja.png" },
    { n: "Faca", i: "/imagens/cozinha/faca.png" },
    { n: "Fogao", i: "/imagens/cozinha/fogao.png" },
    { n: "Frigideira", i: "/imagens/cozinha/frigideira.png" },
    { n: "Geladeira", i: "/imagens/cozinha/geladeira.png" },
    { n: "Liquidificador", i: "/imagens/cozinha/liquidificador.png" },
    { n: "Micro-ondas", i: "/imagens/cozinha/microondas.png" },
    { n: "Panela", i: "/imagens/cozinha/panela.png" },
    { n: "Pano de Prato", i: "/imagens/cozinha/panodeprato.png" },
    { n: "Xícara", i: "/imagens/cozinha/xicara.png" },
],
  quarto: [
    { n: "Cama", i: "/imagens/quarto/cama.png" },
    { n: "Guarda-roupa", i: "/imagens/quarto/guardaroupa.png" },
    { n: "Travesseiro", i: "/imagens/quarto/travesseiro.png" },
    { n: "Colchao", i: "/imagens/quarto/colchao.png" },
    { n: "Cobertor", i: "/imagens/quarto/cobertor.png" },
    { n: "Abajur", i: "/imagens/quarto/abajur.png" },
    { n: "Cortina", i: "/imagens/quarto/cortina.png" },
    { n: "Tapete", i: "/imagens/quarto/tapete.png" },
    { n: "Comoda", i: "/imagens/quarto/comoda.png" },
    { n: "Sapateira", i: "/imagens/quarto/sapateira.png" },
    { n: "Espelho", i: "/imagens/quarto/espelho.png" },
    { n: "Cabide", i: "/imagens/quarto/cabide.png" },
    { n: "Penteadeira", i: "/imagens/quarto/penteadeira.png" },
    { n: "Caixa organizadora", i: "/imagens/quarto/caixaorganizadora.png" },
    { n: "Lençol", i: "/imagens/quarto/lencol.png" },
    
  ],
  banheiro: [
    { n: "Toalha", i: "/imagens/banheiro/toalha.png" },
    { n: "Toca de Banho", i: "/imagens/banheiro/toca.png" },
    { n: "Sabonete liquido", i: "/imagens/banheiro/saboneteliquido.png" },
    { n: "Sabão em barra", i: "/imagens/banheiro/sabaoembarra.png" },
    { n: "Shampoo", i: "/imagens/banheiro/shampoo.png" },
    { n: "Condicionador", i: "/imagens/banheiro/condicionador.png" },
    { n: "Creme de cabelo", i: "/imagens/banheiro/cremedecabelo.png" },
    { n: "Escova de dente", i: "/imagens/banheiro/escovadedente.png" },
    { n: "Creme dental", i: "/imagens/banheiro/cremedental.png" },
    { n: "Fio dental", i: "/imagens/banheiro/fiodental.png" },
    { n: "Escova de cabelo", i: "/imagens/banheiro/escovadecabelo.png" },
    { n: "Pente", i: "/imagens/banheiro/pente.png" },
    { n: "Lixeira", i: "/imagens/banheiro/lixeira.png" },
    { n: "Papel Higiênico", i: "/imagens/banheiro/papelhigienico.png" },
    { n: "Escova de vaso", i: "/imagens/banheiro/escovadevaso.png" },
  ],
  escola: [
    { n: "Caderno", i: "/imagens/escola/caderno.png" },
    { n: "Lapis", i: "/imagens/escola/lapis.png" },
    { n: "Borracha", i: "/imagens/escola/borracha.png" },
    { n: "Caneta", i: "/imagens/escola/caneta.png" },
    { n: "Regua", i: "/imagens/escola/regua.png" },
    { n: "Estojo", i: "/imagens/escola/estojo.png" },
    { n: "Apontador", i: "/imagens/escola/apontador.png" },
    { n: "Mochila", i: "/imagens/escola/mochila.png" },
    { n: "Livro", i: "/imagens/escola/livro.png" },
    { n: "Cola", i: "/imagens/escola/cola.png" },
    { n: "Tesoura", i: "/imagens/escola/tesoura.png" },
    { n: "Giz", i: "/imagens/escola/giz.png" },
    { n: "Tinta", i: "/imagens/escola/tinta.png" },
    { n: "Compasso", i: "/imagens/escola/compasso.png" },
    { n: "Esquadro", i: "/imagens/escola/esquadro.png" },
    { n: "Calculadora", i: "/imagens/escola/calculadora.png" },
    { n: "Mesa", i: "/imagens/escola/mesa.png" },
    { n: "Quadro", i: "/imagens/escola/quadro.png" },
    { n: "Globo", i: "/imagens/escola/globo.png" },
    { n: "Lixeira", i: "/imagens/escola/lixeira.png" },
    { n: "Dicionario", i: "/imagens/escola/dicionario.png" },
    { n: "Projetor", i: "/imagens/escola/projetor.png" },
    { n: "Microscópio", i: "/imagens/escola/microscopio.png" },
    { n: "Pasta", i: "/imagens/escola/pasta.png" }
  ],
  animais: [
    { n: "Cachorro", i: "/imagens/animais/cachorro.png" },
    { n: "Gato", i: "/imagens/animais/gato.png" },
    { n: "Leao", i: "/imagens/animais/leao.png" },
    { n: "Passaro", i: "/imagens/animais/pombo.png" },
    { n: "Peixe", i: "/imagens/animais/peixe.png" },
    { n: "Cavalo", i: "/imagens/animais/cavalo.png" },
    { n: "Vaca", i: "/imagens/animais/vaca.png" },
    { n: "Porco", i: "/imagens/animais/porco.png" },
    { n: "Galinha", i: "/imagens/animais/galinha.png" },
    { n: "Coelho", i: "/imagens/animais/coelho.png" },
    { n: "Elefante", i: "/imagens/animais/elefante.png" },
    { n: "Girafa", i: "/imagens/animais/girafa.png" },
    { n: "Macaco", i: "/imagens/animais/macaco.png" },
    { n: "Urso", i: "/imagens/animais/urso.png" },
    { n: "Tarta-ruga", i: "/imagens/animais/tartaruga.png" },
    { n: "Jacare", i: "/imagens/animais/jacare.png" },
    { n: "Foca", i: "/imagens/animais/foca.png" },
    { n: "Baleia", i: "/imagens/animais/baleia.png" },
    { n: "Tubarão", i: "/imagens/animais/tubarao.png" },
    { n: "Ovelha", i: "/imagens/animais/ovelha.png" },
  ],
    ações: [
    { n: "Comer", i: "/imagens/acoes/comer.png" },
    { n: "Beber", i: "/imagens/acoes/beber.png" },
    { n: "Correr", i: "/imagens/acoes/correr.png" },
    { n: "Nadar", i: "/imagens/acoes/nadar.png" },
    { n: "Escovar os dentes", i: "/imagens/acoes/escovardentes.png" },
    { n: "Dormir", i: "/imagens/acoes/dormir.png" },
    { n: "Lavar as maos", i: "/imagens/acoes/lavarmaos.png" },
    { n: "Vestir a roupa", i: "/imagens/acoes/vestir.png" },
    { n: "Amarrar o sapato", i: "/imagens/acoes/amarrarsapato.png" },
    { n: "Pentear o cabelo", i: "/imagens/acoes/pentearcabelo.png" },
    { n: "Dar tchau", i: "/imagens/acoes/dartchau.png" },
    { n: "Ler", i: "/imagens/acoes/ler.png" },
    { n: "Desenhar", i: "/imagens/acoes/desenhar.png" },
    { n: "Ouvir", i: "/imagens/acoes/ouvir.png" },
    { n: "Brincar de bola", i: "/imagens/acoes/brincarbola.png" },
    { n: "Pular", i: "/imagens/acoes/pular.png" },
    { n: "Guardar os brinquedos", i: "/imagens/acoes/guardarbrinquedos.png" },
    { n: "Abraçar", i: "/imagens/acoes/abracar.png" },
    { n: "Compartilhar", i: "/imagens/acoes/compartilhar.png" },
    { n: "Sentar", i: "/imagens/acoes/sentar.png" },
    { n: "Subir escada", i: "/imagens/acoes/subirescada.png" },
    { n: "Abrir o casaco", i: "/imagens/acoes/abrircasaco.png" },
    { n: "Cheirar a flor", i: "/imagens/acoes/cheirarflor.png" },
    { n: "Alimentar o pet", i: "/imagens/acoes/alimentarpet.png" },
    { n: "Plantar", i: "/imagens/acoes/plantar.png" },
    { n: "Chorar", i: "/imagens/acoes/chorar.png" },
    { n: "Agradecer", i: "/imagens/acoes/agradecer.png" },
    { n: "Sorrir", i: "/imagens/acoes/sorrir.png" },
    { n: "Tomar banho", i: "/imagens/acoes/tomarbanho.png" }
  ],
  formas: [
    { n: "Circulo", i: "/imagens/formas/circulo.png" },
    { n: "Quadrado", i: "/imagens/formas/quadrado.png" },
    { n: "Triangulo", i: "/imagens/formas/triangulo.png" },
    { n: "Retangulo", i: "/imagens/formas/retangulo.png" },
    { n: "Pentagono", i: "/imagens/formas/pentagono.png" },
    { n: "Hexagono", i: "/imagens/formas/hexagono.png" },
    { n: "Estrela", i: "/imagens/formas/estrela.png" },
    { n: "Coracao", i: "/imagens/formas/coracao.png" },
    { n: "Losango", i: "/imagens/formas/losango.png" },
    { n: "Cilindro", i: "/imagens/formas/cilindro.png" },
    { n: "Esfera", i: "/imagens/formas/esfera.png" },
    { n: "Cone", i: "/imagens/formas/cone.png" },
    { n: "Oval", i: "/imagens/formas/oval.png" },
    { n: "Octogono", i: "/imagens/formas/octogono.png" },
    { n: "Seta", i: "/imagens/formas/seta.png" },
    { n: "Trapezio", i: "/imagens/formas/trapezio.png" },
    { n: "Cruz", i: "/imagens/formas/cruz.png" },
    { n: "Arco", i: "/imagens/formas/arco.png" },
  ],
  alfabeto: [
    { n: "Letra A", v: "A", isText: true }, { n: "Letra B", v: "B", isText: true },
    { n: "Letra C", v: "C", isText: true }, { n: "Letra D", v: "D", isText: true },
    { n: "Letra E", v: "E", isText: true }, { n: "Letra F", v: "F", isText: true },
    { n: "Letra G", v: "G", isText: true }, { n: "Letra H", v: "H", isText: true },
    { n: "Letra I", v: "I", isText: true }, { n: "Letra J", v: "J", isText: true },
    { n: "Letra K", v: "K", isText: true }, { n: "Letra L", v: "L", isText: true },
    { n: "Letra M", v: "M", isText: true }, { n: "Letra N", v: "N", isText: true },
    { n: "Letra O", v: "O", isText: true }, { n: "Letra P", v: "P", isText: true },
    { n: "Letra Q", v: "Q", isText: true }, { n: "Letra R", v: "R", isText: true },
    { n: "Letra S", v: "S", isText: true }, { n: "Letra T", v: "T", isText: true },
    { n: "Letra U", v: "U", isText: true }, { n: "Letra V", v: "V", isText: true },
    { n: "Letra W", v: "W", isText: true }, { n: "Letra X", v: "X", isText: true },
    { n: "Letra Y", v: "Y", isText: true }, { n: "Letra Z", v: "Z", isText: true }
  ],
  números: [
    { n: "Numero 0", v: "0", isText: true }, { n: "Numero 1", v: "1", isText: true },
    { n: "Numero 2", v: "2", isText: true }, { n: "Numero 3", v: "3", isText: true },
    { n: "Numero 4", v: "4", isText: true }, { n: "Numero 5", v: "5", isText: true },
    { n: "Numero 6", v: "6", isText: true }, { n: "Numero 7", v: "7", isText: true },
    { n: "Numero 8", v: "8", isText: true }, { n: "Numero 9", v: "9", isText: true },
    { n: "Numero 10", v: "10", isText: true }
  ]
};

export default function App() {
    const [eventoInstalacao, setEventoInstalacao] = useState(null);

  useEffect(() => {
    const capturarEvent = (e) => {
      e.preventDefault();
      setEventoInstalacao(e);
    };
    window.addEventListener('beforeinstallprompt', capturarEvent);
    return () => window.removeEventListener('beforeinstallprompt', capturarEvent);
  }, []);

  const dispararInstalacao = async () => {
    if (!eventoInstalacao) return;
    eventoInstalacao.prompt();
    const { outcome } = await eventoInstalacao.userChoice;
    if (outcome === 'accepted') setEventoInstalacao(null);
  };
  
  const [categoria, setCategoria] = useState("cozinha");
  const areaRef = useRef(null);

useEffect(() => {
    const elemento = areaRef.current;
    if (!elemento) return;

    const gerenciarRodaMouse = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        elemento.scrollLeft += e.deltaY * 1.2;
      }
    };

    elemento.addEventListener('wheel', gerenciarRodaMouse, { passive: false });
    return () => elemento.removeEventListener('wheel', gerenciarRodaMouse);
  }, [categoria]);
useEffect(() => {
    const prevenirZoomDuploToque = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault(); // Bloqueia múltiplos dedos na tela simultaneamente
      }
    };


    document.addEventListener('touchstart', prevenirZoomDuploToque, { passive: false });
    return () => {
      document.removeEventListener('touchstart', prevenirZoomDuploToque);
    };
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
      }
    }
  }, []);

  const falarItem = (texto) => {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      setTimeout(() => {
        const u = new SpeechSynthesisUtterance(texto);
        u.lang = 'pt-BR';
        u.rate = 0.82; 
        u.pitch = 1.05; 

        const pt = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('pt'));

        const melhorVoz = pt.find(x => x.name.toLowerCase().includes('google português do brasil')) ||
                          pt.find(x => x.name.toLowerCase().includes('google pt-br')) ||
                          pt.find(x => x.name.toLowerCase().includes('natural')) ||
                          pt.find(x => x.name.toLowerCase().includes('microsoft maria')) ||
                          pt.find(x => x.name.toLowerCase().includes('maria')) ||
                          pt.find(x => x.name.toLowerCase().includes('female'));

        if (melhorVoz) u.voice = melhorVoz;
        window.speechSynthesis.speak(u);
      }, 60);
    } catch (e) {
      console.error(e);
    }
  };

  const alternarCategoria = (cat) => {
    setCategoria(cat);
    falarItem(cat);
    if (areaRef.current) areaRef.current.scrollLeft = 0;
  };

  const scrollGrade = (dir) => {
    if (areaRef.current) {
      const desc = window.innerWidth * (window.innerWidth <= 768 ? 0.86 : 0.45);
      areaRef.current.scrollLeft += (dir * desc);
    }
  };

  return (
    <div className="painel-jogo">
      {eventoInstalacao && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <p style={{ color: '#000', margin: '0 0 10px 0' }}>Deseja instalar o Painel Catavento no tablet?</p>
          <button onClick={dispararInstalacao} style={{ background: '#00cc66', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Instalar Aplicativo
          </button>
        </div>
      )}
      <div className="menu-categorias">
        {Object.keys(bancoDados).map(cat => (
          <button 
            key={cat} 
            className={`btn-categoria ${cat === categoria ? 'ativo' : ''}`}
            onClick={() => alternarCategoria(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="area-horizontal" ref={areaRef}>
        {bancoDados[categoria].map((item, index) => (
          <div key={index} className="item-card" onClick={() => falarItem(item.n)}>
            <div className="item-icone">
              {item.isText ? (
                <div className="card-caractere-3d">
                  <span className="texto-caractere-3d">{item.v}</span>
                </div>
              ) : (
                <img 
                  src={item.i} 
                  alt={item.n} 
                  style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '30px' }} 
                />
              )}
            </div>
            <div className="item-nome">{item.n}</div>
          </div>
        ))}
      </div>

      <div className="controles-navegacao">
        <button className="btn-nav" onClick={() => scrollGrade(-1)}>&larr;</button>
        <button className="btn-nav" onClick={() => scrollGrade(1)}>&rarr;</button>
      </div>
    </div>
  );
}

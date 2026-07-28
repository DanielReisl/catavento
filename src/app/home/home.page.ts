import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface ItemCatalogo {
  n: string;
  i?: string;
  v?: string;
  isText?: boolean;
}

type CategoriaChave = 'cozinha' | 'quarto' | 'banheiro' | 'escola' | 'animais' | 'acoes' | 'formas' | 'alfabeto' | 'numeros';

type BancoDados = Record<CategoriaChave, ItemCatalogo[]>;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  categoria: CategoriaChave = 'cozinha';
  vozesDisponiveis: SpeechSynthesisVoice[] = [];
  eventoInstalacao: any = null;

  bancoDados: BancoDados = {
    cozinha: [{ n: 'Avental', i: 'assets/cozinha/avental.png' }, { n: 'Batedeira', i: 'assets/cozinha/batedeira.png' }, { n: 'Bule', i: 'assets/cozinha/bule.png' }, { n: 'Garfo', i: 'assets/cozinha/garfo.png' }, { n: 'Colher', i: 'assets/cozinha/colher.png' }, { n: 'Concha', i: 'assets/cozinha/concha.png' }, { n: 'Copo', i: 'assets/cozinha/copo.png' }, { n: 'Esponja', i: 'assets/cozinha/esponja.png' }, { n: 'Faca', i: 'assets/cozinha/faca.png' }, { n: 'Fogao', i: 'assets/cozinha/fogao.png' }],
    quarto: [{ n: 'Cama', i: 'assets/quarto/cama.png' }, { n: 'Guarda-roupa', i: 'assets/quarto/guardaroupa.png' }, { n: 'Travesseiro', i: 'assets/quarto/travesseiro.png' }, { n: 'Cobertor', i: 'assets/quarto/cobertor.png' }, { n: 'Abajur', i: 'assets/quarto/abajur.png' }, { n: 'Cortina', i: 'assets/quarto/cortina.png' }],
    banheiro: [{ n: 'Toalha', i: 'assets/banheiro/toalha.png' }, { n: 'Sabonete', i: 'assets/banheiro/saboneteliquido.png' }, { n: 'Shampoo', i: 'assets/banheiro/shampoo.png' }, { n: 'Escova de dente', i: 'assets/banheiro/escovadedente.png' }],
    escola: [{ n: 'Caderno', i: 'assets/escola/caderno.png' }, { n: 'Lápis', i: 'assets/escola/lapis.png' }, { n: 'Mochila', i: 'assets/escola/mochila.png' }, { n: 'Livro', i: 'assets/escola/livro.png' }],
    animais: [{ n: 'Cachorro', i: 'assets/animais/cachorro.png' }, { n: 'Gato', i: 'assets/animais/gato.png' }, { n: 'Leão', i: 'assets/animais/leao.png' }, { n: 'Peixe', i: 'assets/animais/peixe.png' }],
    acoes: [{ n: 'Comer', i: 'assets/acoes/comer.png' }, { n: 'Beber', i: 'assets/acoes/beber.png' }, { n: 'Dormir', i: 'assets/acoes/dormir.png' }, { n: 'Correr', i: 'assets/acoes/correr.png' }],
    formas: [{ n: 'Círculo', i: 'assets/formas/circulo.png' }, { n: 'Quadrado', i: 'assets/formas/quadrado.png' }, { n: 'Estrela', i: 'assets/formas/estrela.png' }, { n: 'Coração', i: 'assets/formas/coracao.png' }],
    alfabeto: [{ n: 'Letra A', v: 'A', isText: true }, { n: 'Letra B', v: 'B', isText: true }, { n: 'Letra C', v: 'C', isText: true }],
    numeros: [{ n: 'Número 1', v: '1', isText: true }, { n: 'Número 2', v: '2', isText: true }, { n: 'Número 3', v: '3', isText: true }]
  };

  categorias: CategoriaChave[] = Object.keys(this.bancoDados) as CategoriaChave[];

  get itensAtuais(): ItemCatalogo[] {
    return this.bancoDados[this.categoria] ?? [];
  }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.eventoInstalacao = e;
    });

    if ('speechSynthesis' in window) {
      this.vozesDisponiveis = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.vozesDisponiveis = window.speechSynthesis.getVoices();
      };
    }
  }

  alternarCategoria(cat: CategoriaChave) {
    this.categoria = cat;
    this.falarItem(cat);
  }

  falarItem(texto: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      const vocesPT = this.vozesDisponiveis.filter(v => v.lang.toLowerCase().includes('pt'));
      const melhorVoz = vocesPT.find(v => v.name.toLowerCase().includes('maria')) || vocesPT[0];
      if (melhorVoz) utterance.voice = melhorVoz;
      window.speechSynthesis.speak(utterance);
    }, 60);
  }

  dispararInstalacao() {
    if (!this.eventoInstalacao) return;
    this.eventoInstalacao.prompt();
  }
}

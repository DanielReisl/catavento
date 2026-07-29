import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular/standalone';

interface PontoArraste {
  startX: number;
  currentX: number;
}

interface ItemCatalogo {
  n: string;
  i?: string;
  v?: string;
  isText?: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

type CategoriaChave = 'cozinha' | 'quarto' | 'banheiro' | 'escola' | 'animais' | 'acoes' | 'formas' | 'alfabeto' | 'numeros';
type CategoriaImagemChave = Exclude<CategoriaChave, 'alfabeto' | 'numeros'>;
type BancoDados = Record<CategoriaChave, ItemCatalogo[]>;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  categoria: CategoriaChave = 'cozinha';
  vozesDisponiveis: SpeechSynthesisVoice[] = [];
  eventoInstalacao: BeforeInstallPromptEvent | null = null;
  isStandalone = false;
  indiceCarrossel = 0;
  offsetCarrossel = 0;
  arrastando: PontoArraste | null = null;
  larguraItem = 240;

  bancoDados: BancoDados;
  categorias: CategoriaChave[];

  private readonly catalogoImagensPorCategoria: Record<CategoriaImagemChave, string[]> = {
    cozinha: ['avental', 'batedeira', 'bule', 'colher', 'concha', 'copo', 'esponja', 'faca', 'fogao', 'frigideira', 'garfo', 'geladeira', 'gelo', 'liquidificador', 'microondas', 'panela', 'panodeprato', 'prato', 'queijo', 'ralador', 'ralo', 'toalhaderosto', 'torradeira', 'xicara'],
    quarto: ['abajur', 'cabide', 'caixaorganizadora', 'cama', 'cobertor', 'colchao', 'comoda', 'cortina', 'espelho', 'fronha', 'guardaroupa', 'lencol', 'penteadeira', 'sapateira', 'tapete', 'travesseiro'],
    banheiro: ['toalha', 'toca', 'saboneteliquido', 'sabaoembarra', 'shampoo', 'condicionador', 'cremedecabelo', 'escovadedente', 'cremedental', 'fiodental', 'escovadecabelo', 'pente', 'lixeira', 'papelhigienico', 'escovadevaso'],
    escola: ['caderno', 'lapis', 'borracha', 'caneta', 'regua', 'estojo', 'apontador', 'mochila', 'livro', 'cola', 'tesoura', 'giz', 'tinta', 'compasso', 'esquadro', 'calculadora', 'mesa', 'quadro', 'globo', 'lixeira', 'dicionario', 'projetor', 'microscopio', 'pasta'],
    animais: ['cachorro', 'gato', 'leao', 'pombo', 'peixe', 'cavalo', 'vaca', 'porco', 'galinha', 'coelho', 'elefante', 'girafa', 'macaco', 'urso', 'tartaruga', 'jacare', 'foca', 'baleia', 'tubarao', 'ovelha', 'bode', 'pato', 'hamster'],
    acoes: ['comer', 'beber', 'correr', 'nadar', 'escovardentes', 'dormir', 'lavarmaos', 'vestir', 'amarrarsapato', 'pentearcabelo', 'dartchau', 'ler', 'desenhar', 'ouvir', 'brincarbola', 'pular', 'guardarbrinquedos', 'abracar', 'compartilhar', 'sentar', 'subirescada', 'abrircasaco', 'cheirarflor', 'alimentarpet', 'plantar', 'chorar', 'agradecer', 'sorrir', 'tomarbanho', 'pedir', 'esperaralmoco'],
    formas: ['circulo', 'quadrado', 'triangulo', 'retangulo', 'pentagono', 'hexagono', 'estrela', 'coracao', 'losango', 'cilindro', 'esfera', 'cone', 'oval', 'octogono', 'seta', 'trapezio', 'cruz', 'arco']
  };

  constructor() {
    this.bancoDados = this.criarBancoDados();
    this.categorias = Object.keys(this.bancoDados) as CategoriaChave[];
  }

  get itensAtuais(): ItemCatalogo[] {
    return this.bancoDados[this.categoria] ?? [];
  }

  get itensVisiveis(): ItemCatalogo[] {
    return this.itensAtuais.slice(this.indiceCarrossel, this.indiceCarrossel + 5);
  }

  ngOnInit(): void {
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.eventoInstalacao = e as BeforeInstallPromptEvent;
    });

    window.addEventListener('appinstalled', () => {
      this.eventoInstalacao = null;
    });

    if ('speechSynthesis' in window) {
      this.vozesDisponiveis = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.vozesDisponiveis = window.speechSynthesis.getVoices();
      };
    }
  }

  alternarCategoria(cat: CategoriaChave): void {
    this.categoria = cat;
    this.indiceCarrossel = 0;
    this.offsetCarrossel = 0;
    this.falarItem(cat);
  }

  falarItem(texto: string): void {
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

  dispararInstalacao(): void {
    if (!this.eventoInstalacao) return;
    this.eventoInstalacao.prompt();
  }

  navegarCarrossel(direcao: -1 | 1): void {
    const proximo = this.indiceCarrossel + direcao;
    if (proximo >= 0 && proximo < this.itensAtuais.length) {
      this.indiceCarrossel = proximo;
      this.offsetCarrossel = 0;
    }
  }

  onArrastarInicio(event: PointerEvent): void {
    this.arrastando = { startX: event.clientX, currentX: event.clientX };
  }

  onArrastar(event: PointerEvent): void {
    if (!this.arrastando) return;
    this.arrastando.currentX = event.clientX;
    this.offsetCarrossel = this.arrastando.currentX - this.arrastando.startX;
  }

  onArrastarFim(): void {
    if (!this.arrastando) return;
    const delta = this.arrastando.currentX - this.arrastando.startX;
    if (delta < -70) {
      this.navegarCarrossel(1);
    } else if (delta > 70) {
      this.navegarCarrossel(-1);
    }
    this.offsetCarrossel = 0;
    this.arrastando = null;
  }

  private criarBancoDados(): BancoDados {
    const dados: Partial<BancoDados> = {};

    (Object.keys(this.catalogoImagensPorCategoria) as CategoriaImagemChave[]).forEach((categoria) => {
      dados[categoria] = this.criarItens(categoria);
    });

    dados.alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letra => ({
      n: `Letra ${letra}`,
      v: letra,
      isText: true
    }));

    dados.numeros = Array.from({ length: 11 }, (_, i) => ({
      n: `Numero ${i}`,
      v: String(i),
      isText: true
    }));

    return dados as BancoDados;
  }

  private criarItens(categoria: CategoriaImagemChave): ItemCatalogo[] {
    return this.catalogoImagensPorCategoria[categoria].map((arquivo) => ({
      n: this.formatarNome(arquivo),
      i: `assets/${categoria}/${arquivo}.png`
    }));
  }

  private formatarNome(arquivo: string): string {
    const nomesEspeciais: Record<string, string> = {
      panodeprato: 'Pano de Prato',
      toalhaderosto: 'Toalha de Rosto',
      escovardentes: 'Escovar os Dentes',
      lavarmaos: 'Lavar as Maos',
      amarrarsapato: 'Amarrar o Sapato',
      abrircasaco: 'Abrir o Casaco',
      cheirarflor: 'Cheirar a Flor',
      escovadevaso: 'Escova de Vaso',
      saboneteliquido: 'Sabonete Liquido',
      sabaoembarra: 'Sabao em Barra',
      cremedecabelo: 'Creme de Cabelo',
      cremedental: 'Creme Dental',
      fiodental: 'Fio Dental',
      escovadecabelo: 'Escova de Cabelo',
      caixaorganizadora: 'Caixa Organizadora',
      guardaroupa: 'Guarda-Roupa',
      dicionario: 'Dicionario',
      microscopio: 'Microscopio',
      esquadro: 'Esquadro',
      quadrado: 'Quadrado',
      circulo: 'Circulo',
      triangulo: 'Triangulo',
      retangulo: 'Retangulo',
      pentagono: 'Pentagono',
      hexagono: 'Hexagono',
      coracao: 'Coracao',
      losango: 'Losango',
      cilindro: 'Cilindro',
      esfera: 'Esfera',
      cone: 'Cone',
      oval: 'Oval',
      octogono: 'Octagono',
      trapezio: 'Trapezio',
      cruz: 'Cruz',
      arco: 'Arco',
      dartchau: 'Dar Tchau',
      brincarbola: 'Brincar de Bola',
      guardarbrinquedos: 'Guardar os Brinquedos',
      abracar: 'Abracar',
      subirescada: 'Subir Escada',
      alimentarpet: 'Alimentar o Pet',
      pentearcabelo: 'Pentear o Cabelo',
      vestir: 'Vestir a Roupa',
      tomarbanho: 'Tomar Banho',
      esperaralmoco: 'Esperar o Almoco'
    };

    if (nomesEspeciais[arquivo]) {
      return nomesEspeciais[arquivo];
    }

    const nome = arquivo
      .replace(/[-_]+/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .trim();

    return nome
      .split(' ')
      .filter(Boolean)
      .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
      .join(' ');
  }
}

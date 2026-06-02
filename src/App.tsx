import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Paintbrush, 
  Printer, 
  Trophy, 
  Sparkles, 
  Zap, 
  Smartphone, 
  Check, 
  ShieldCheck, 
  Lock, 
  Star, 
  Clock, 
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Award,
  Gift,
  Globe,
  ChevronDown,
  Loader2
} from "lucide-react";

import CheckoutModal from "./components/CheckoutModal";
import PageLightbox from "./components/PageLightbox";
import PurchaseNotifications from "./components/PurchaseNotifications";
import { Benefit, ColoringPage } from "./types";

// Import generated images
import bookMockupImg from "./assets/images/book_mockup_1779901838818.webp";
const headlineMockupImg = "https://i.ibb.co/PzhvkRZG/Chat-GPT-Image-27-de-mai-de-2026-18-20-12.png";
import coloringPage1Img from "./assets/images/coloring_page_1_1779901857472.webp";
import coloringPage2Img from "./assets/images/coloring_page_2_1779901872187.webp";
import coloringPage3Img from "./assets/images/coloring_page_3_1779901885961.webp";

// Custom Mock Social proof testimonials to boost high converting vibe
interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarText: string;
  comment: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mariana Souza",
    role: "Mãe do Léo (6 anos)",
    avatarText: "MS",
    comment: "Melhor compra que fiz antes da Copa começar! Meu filho passa horas colorindo ao invés de ficar no tablet. Os desenhos são fofos demais e super fáceis de imprimir.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Thiago Oliveira",
    role: "Pai do Arthur e Bia",
    avatarText: "TO",
    comment: "Qualidade excelente dos traços. Praticidade incrível de imprimir de novo as páginas que eles mais gostaram. As crianças amaram o capivara com a camiseta do Brasil! 🇧🇷",
    stars: 5,
  },
  {
    id: "t3",
    name: "Beatriz Santos",
    role: "Mãe da Clara (4 anos)",
    avatarText: "BS",
    comment: "Minhas filhas amaram os mascotes! O livro vem com muitos desenhos e o arquivo em PDF tem qualidade impecável. Recomendo muito para entreter em dias chuvosos!",
    stars: 5,
  },
  {
    id: "t4",
    name: "Profª Carolina Mendes",
    role: "Especialista em Ed. Infantil",
    avatarText: "CM",
    comment: "Excelente recurso pedagógico para trabalhar a coordenação motora fina no período da Copa do Mundo. Os alunos adoraram colorir os mascotes e jogadores da Seleção.",
    stars: 5,
  }
];

export default function App() {
  // COLOQUE O SEU LINK DE PAGAMENTO DA KIWIFY, HOTMART, PERFECTPAY, ETC. ABAIXO:
  // Se você mantiver o valor "COLOQUE_SEU_LINK_AQUI" ou vazio "", o site usará o modal de Pix integrado padrão do site.
  const CHECKOUT_LINK: string = "https://checkout.compraragora.site/VCCL1O8SD2XG";

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ id: "livro" | "kit"; price: string; title: string }>({
    id: "kit",
    price: "19,90",
    title: "Mega Kit Copa do Mundo"
  });
  const [selectedPage, setSelectedPage] = useState<ColoringPage | null>(null);
  const [timeLeft, setTimeLeft] = useState(899); // 14 minutes 59 seconds
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<"livro" | "kit" | null>(null);

  const faqItems = [
    {
      question: "Como vou receber o meu livro de colorir?",
      answer: "O acesso é 100% digital e imediato! Assim que a sua compra for confirmada, você receberá um e-mail com as instruções e o link exclusivo para fazer o download dos arquivos em formato PDF de alta resolução."
    },
    {
      question: "Posso imprimir os desenhos quantas vezes quiser?",
      answer: "Sim, absolutamente! Com o acesso vitalício, o arquivo é seu para sempre. Você pode imprimir as mais de 120 páginas quantas vezes quiser — seja para seus filhos, sobrinhos ou alunos brincarem à vontade."
    },
    {
      question: "Qual tamanho de folha é ideal para a impressão?",
      answer: "Todos os desenhos foram milimetricamente configurados para encaixar com perfeição no tamanho padrão de folha A4. Você pode imprimi-los usando qualquer impressora caseira comum no conforto do seu lar."
    },
    {
      question: "Para qual faixa etária os desenhos são recomendados?",
      answer: "Os desenhos abrangem uma grande variedade de traços: desde desenhos mais simples com mascotes e fofurinhas ideais para crianças pequenas de 3 a 6 anos, até ilustrações mais ricas com as estrelas do futebol (craques), estádios de futebol e a taça para crianças maiores e adultos apaixonados se divertirem."
    },
    {
      question: "E se eu não gostar do produto?",
      answer: "Nós confiamos tanto na qualidade e diversidade do nosso material que te oferecemos uma Garantia de Satisfação de 7 dias completos. Se não gostar, basta nos enviar uma mensagem e devolveremos todo o seu dinheiro!"
    },
    {
      question: "Quais bônus estão incluídos na oferta?",
      answer: "Além dos +120 desenhos exclusivos de craques, torcedores e mascotes, você receberá inteiramente GRÁTIS uma coleção extra fantástica contendo as bandeiras das principais seleções do mundo de futebol detalhadas para pintar!"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 899 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const benefits: Benefit[] = [
    {
      id: "b1",
      title: "Diversão sem telas",
      description: "Desconecte as crianças de celulares e tablets com atividades manuais relaxantes.",
      iconName: "screens",
    },
    {
      id: "b2",
      title: "Estimula a criatividade",
      description: "Ajuda no desenvolvimento motor fino, concentração e livre expressão de cores.",
      iconName: "paint",
    },
    {
      id: "b3",
      title: "Fácil de imprimir",
      description: "Arquivos em formato PDF otimizados em tamanho A4 para imprimir quantas vezes quiser.",
      iconName: "print",
    },
    {
      id: "b4",
      title: "Ideal para fãs de futebol",
      description: "Perfeito para envolver crianças no clima empolgante dos jogos da Copa do Mundo.",
      iconName: "soccer",
    },
    {
      id: "b5",
      title: "Mais de 120 desenhos",
      description: "Uma imensa quantidade de opções divertidas para manter as crianças entretidas por dias.",
      iconName: "sparkles",
    },
    {
      id: "b6",
      title: "Acesso imediato",
      description: "Produto digital enviado na hora por e-mail e download disponível logo após o Pix.",
      iconName: "zap",
    },
  ];

  const coloringPages: ColoringPage[] = [
    {
      id: "p1",
      title: "Mascote Canarinho",
      imageSrc: "https://i.ibb.co/KjKy972G/IMG-0829.jpg",
      description: "O mascote mais amado do Brasil pronto para fazer o primeiro gol da vitória."
    },
    {
      id: "p2",
      title: "Garoto Craque",
      imageSrc: "https://i.ibb.co/99htcnFg/IMG-0738.webp",
      description: "O craque da nossa Seleção conduzindo a bola em direção ao gol da taça."
    },
    {
      id: "p3",
      title: "Artilheiro no Estádio",
      imageSrc: "https://i.ibb.co/ZpVP0Rk7/IMG-0745.webp",
      description: "A bola oficial balançando a rede sob os gritos de comemoração da torcida brasileira."
    },
    {
      id: "p4",
      title: "Ursinho Torcedor",
      imageSrc: "https://i.ibb.co/svC0pSs8/IMG-0815.jpg",
      description: "Lindo ursinho com acessórios da Seleção Brasileira torcendo com muita alegria."
    },
    {
      id: "p5",
      title: "Leãozinho Canarinho",
      imageSrc: "https://i.ibb.co/Z3c9J41/IMG-0816.jpg",
      description: "O leãozinho corajoso vestindo a amarelinha e mostrando toda a sua raça."
    },
    {
      id: "p6",
      title: "Capivara de Chuteira",
      imageSrc: "https://i.ibb.co/4nkSRNdy/IMG-0820.jpg",
      description: "Nosso animal símbolo esbanjando carisma e habilidade de fone de ouvido e chuteiras."
    },
    {
      id: "p7",
      title: "Elefantinho Brasileiro",
      imageSrc: "https://i.ibb.co/99QXXd4g/IMG-0832.jpg",
      description: "O simpático elefantinho celebrando o futebol com balões verdes e amarelos."
    },
    {
      id: "p8",
      title: "Gato com Bola",
      imageSrc: "https://i.ibb.co/PGXRPtdH/IMG-0746.jpg",
      description: "Um gatinho super fofo se divertindo no campo e fazendo malabarismo com a bola."
    },
    {
      id: "p9",
      title: "Copa Encantada",
      imageSrc: "https://i.ibb.co/tP4DxzRd/IMG-0750.png",
      description: "A linda taça cercada por estrelas cintilantes e detalhes mágicos de futebol."
    },
    {
      id: "p10",
      title: "Panda da Sorte",
      imageSrc: "https://i.ibb.co/Rkrzq9JM/IMG-0817.jpg",
      description: "Urso panda fofinho usando fita de torcedor e abraçando a bandeira nacional."
    },
    {
      id: "p11",
      title: "Pequeno Jogador",
      imageSrc: "https://i.ibb.co/PGvFPGh4/IMG-0739.webp",
      description: "Um garotinho sonhador batendo um pênalti incrível debaixo de aplausos."
    },
    {
      id: "p12",
      title: "Chuteira do Campeão",
      imageSrc: "https://i.ibb.co/bctXYwZ/IMG-0741.webp",
      description: "A chuteira dourada desenhada em riqueza de detalhes para inspirar grandes jogadas."
    }
  ];

  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "screens":
        return <Smartphone className="h-6 w-6 text-blue-600" />;
      case "paint":
        return <Paintbrush className="h-6 w-6 text-yellow-500" />;
      case "print":
        return <Printer className="h-6 w-6 text-green-600" />;
      case "soccer":
        return <Trophy className="h-6 w-6 text-blue-600" />;
      case "sparkles":
        return <Sparkles className="h-6 w-6 text-yellow-500" />;
      case "zap":
        return <Zap className="h-6 w-6 text-green-600" />;
      default:
        return <Star className="h-6 w-6 text-green-600" />;
    }
  };

  const getCheckoutUrlForLink = (baseLink: string) => {
    if (!baseLink || baseLink.trim() === "") {
      return "";
    }
    try {
      const checkoutUrl = new URL(baseLink);
      
      // 1. Capture current URL search parameters
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.forEach((value, key) => {
        checkoutUrl.searchParams.set(key, value);
      });

      // 2. Capture parameters from localStorage/sessionStorage
      const utmKeys = [
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 
        'xcod', 'src', 'sck', 'subid', 'utmify', 'origin'
      ];
      
      utmKeys.forEach(key => {
        const val = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (val) {
          checkoutUrl.searchParams.set(key, val);
        }
      });

      // 3. Capture parameters from cookies (and standard UTMify prefixes)
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const parts = cookie.split('=');
        if (parts.length >= 2) {
          const name = parts[0].trim();
          const value = parts.slice(1).join('=').trim();
          
          utmKeys.forEach(key => {
            if (name === key || name === `_${key}` || name.includes(key)) {
              try {
                checkoutUrl.searchParams.set(key, decodeURIComponent(value));
              } catch (_) {
                checkoutUrl.searchParams.set(key, value);
              }
            }
          });
        }
      });

      return checkoutUrl.toString();
    } catch (e) {
      return baseLink;
    }
  };

  const trackPurchaseIntent = (planName: string, price: number) => {
    try {
      console.log(`Tracking purchase intent: ${planName} - R$ ${price}`);

      // 1. Facebook Pixel
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: planName,
          value: price,
          currency: 'BRL',
          content_type: 'product'
        });
      }

      // 2. TikTok Pixel
      if (typeof (window as any).ttq === 'function') {
        (window as any).ttq('track', 'InitiateCheckout', {
          content_name: planName,
          value: price,
          currency: 'BRL'
        });
      }

      // 3. Google Analytics / Tag Manager
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'begin_checkout', {
          value: price,
          currency: 'BRL',
          items: [{
            item_name: planName,
            price: price
          }]
        });
      }

      // 4. UTMify Custom Event Support
      if (typeof (window as any).utmify === 'function') {
        (window as any).utmify('track', 'InitiateCheckout');
      }
    } catch (e) {
      console.warn("Tracking failed but proceeding gracefully", e);
    }
  };

  const getCheckoutUrlWithParams = () => {
    return getCheckoutUrlForLink(CHECKOUT_LINK);
  };

  const handleOpenCheckout = () => {
    const finalUrl = getCheckoutUrlWithParams();
    if (finalUrl) {
      trackPurchaseIntent("Mega Kit Copa do Mundo", 19.90);
      setTimeout(() => {
        window.location.href = finalUrl;
      }, 150);
    } else {
      setSelectedPlan({ id: "kit", price: "19,90", title: "Mega Kit Copa do Mundo" });
      setIsCheckoutOpen(true);
    }
  };

  const handleSelectPlanAndCheckout = (id: "livro" | "kit", price: string, title: string) => {
    if (loadingPlan) return;
    setLoadingPlan(id);

    const priceNum = id === "livro" ? 10.00 : 19.90;
    // Trigger standard purchase intent trackers instantly
    trackPurchaseIntent(title, priceNum);

    // Speed up redirection to under 50ms now that loading feedback is instant and prevents double-clicking
    setTimeout(() => {
      const targetLink = id === "livro" ? "https://checkout.compraragora.site/VCCL1O8SD2XG" : "https://checkout.compraragora.site/VCCL1O8SD36C";
      window.location.href = getCheckoutUrlForLink(targetLink);
    }, 50);
  };

  const handleScrollToOffer = () => {
    const offerElement = document.getElementById("oferta");
    if (offerElement) {
      offerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-yellow-200">
      
      {/* Dynamic Soccer Header ticker bar */}
      <div className="bg-green-700 text-white font-semibold py-2 px-4 text-center text-xs tracking-wider flex items-center justify-center gap-2 overflow-hidden border-b border-green-800">
        <motion.div 
          animate={{ x: [20, -20, 20] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-2 font-display uppercase shrink-0"
        >
          <span>⏱️ CONDIÇÃO ESPECIAL TERMINA EM BREVE ⏱️</span>
        </motion.div>
      </div>

      {/* Floating Sparkle / Soccer decorations backgrounds top */}
      <div className="absolute top-16 left-0 right-0 overflow-hidden h-[600px] pointer-events-none z-0">
        <div className="absolute top-10 left-[8%] animate-float text-3xl opacity-20">⚽</div>
        <div className="absolute top-40 right-[10%] animate-float-slow text-4xl opacity-25">⭐</div>
        <div className="absolute top-96 left-[5%] animate-float-slow text-5xl opacity-15">🏆</div>
        <div className="absolute top-80 right-[5%] animate-float text-3xl opacity-20">🎉</div>
        <div className="absolute top-12 right-[45%] animate-pulse-subtle text-yellow-400 text-sm opacity-40">✨</div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-10 pb-16 md:py-24 overflow-hidden bg-gradient-to-b from-green-50/50 via-yellow-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            
            {/* Hero Main Content */}
            <div className="space-y-6 md:space-y-8 flex flex-col items-center justify-center">
              
              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight md:leading-[1.1] tracking-tight animate-pulse-subtle text-center">
                Livro de Colorir <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600">
                  da Copa
                </span>
              </h1>

              {/* Headline Image Requested by User */}
              <div className="my-4 mx-auto max-w-[240px] sm:max-w-[280px] overflow-hidden rounded-2xl border border-gray-100 shadow-lg bg-white p-1.5 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={headlineMockupImg} 
                  alt="Amostra do Livro de Colorir da Copa" 
                  className="w-full h-auto rounded-xl object-contain bg-white"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 max-w-2xl mx-auto leading-relaxed tracking-wide my-8 md:my-10 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 font-extrabold">+120 desenhos incríveis</span> da Copa para imprimir e colorir em casa ⚽🇧🇷
              </p>

              {/* Bullets List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto pt-1 text-left font-semibold text-gray-700">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xs shrink-0 shadow-sm border border-green-200">✓</span>
                  <span className="text-sm">Craques da seleção</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xs shrink-0 shadow-sm border border-green-200">✓</span>
                  <span className="text-sm">Taças, torcida e mascotes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xs shrink-0 shadow-sm border border-green-200">✓</span>
                  <span className="text-sm">Desenhos super divertidos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xs shrink-0 shadow-sm border border-green-200">✓</span>
                  <span className="text-sm">Ideal para crianças e fãs de futebol</span>
                </div>
              </div>

              {/* CTA and Price */}
              <div className="space-y-4 pt-2 w-full flex flex-col items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  
                  {/* Glowing Premium CTA Button */}
                  <button
                    onClick={handleScrollToOffer}
                    className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white font-display text-base font-extrabold shadow-xl shadow-green-600/25 tracking-wider transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 animate-btn-pulse group"
                  >
                    <span>QUERO MEU LIVRO AGORA</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>

                {/* Micro guarantees */}
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-gray-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-green-500" /> COMPRA 100% SEGURA
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-blue-500" /> DOWNLOAD IMEDIATO EM PDF
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} className="text-yellow-500" /> GARANTIA DE 7 DIAS
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Trust Ticker: Happy families love it! */}
      <div className="bg-white py-6 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-xs font-black tracking-wider text-gray-500 uppercase">
                Avaliação de 4.9/5 estrelas por pais
              </span>
            </div>
            
            <div className="h-4 w-px bg-gray-200 hidden md:block" />

            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
              <span>⚡ DOWNLOAD IMEDIATO</span>
              <span className="text-gray-200">•</span>
              <span>🖨️ IMPRESSÃO ILIMITADA</span>
              <span className="text-gray-200">•</span>
              <span>📱 OFFLINE SEM TELAS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Preview of Coloring Pages */}
      <section className="py-20 bg-gradient-to-tr from-green-50 via-yellow-100/80 to-blue-50/80 relative overflow-hidden">
        {/* Subtle decorative circles for a festive child-friendly look */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-white/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-green-900 uppercase tracking-wider bg-yellow-300 py-1.5 px-4 rounded-full w-fit mx-auto shadow-sm border-2 border-green-600/20 transform hover:scale-105 transition-transform duration-250">
              <span className="animate-bounce">👀</span> Espia só por dentro!
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-green-950 tracking-tight leading-tight">
              Veja as <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">Páginas Incríveis</span> do Livro!
            </h2>
            <p className="text-base sm:text-lg text-emerald-800 font-bold">
              Desenhos incríveis para imprimir e colorir em casa
            </p>
          </div>
        </div>

        {/* Continuous Infinite Lateral Scroll Showcase - Full Width */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Single Unified Container for both tracks to be close together without black background */}
          <div className="py-2 flex flex-col gap-2">
            
            {/* ROW 1: Esquerda para Direita (animate-marquee-reverse) */}
            <div className="flex gap-3 overflow-hidden select-none">
              <div className="flex gap-3 shrink-0 animate-marquee-reverse py-1">
                {coloringPages.slice(0, 6).map((page, index) => (
                  <div
                    key={`scroll-r1-1-${page.id}-${index}`}
                    className="w-40 sm:w-48 aspect-square shrink-0"
                  >
                    <img
                      src={page.imageSrc}
                      alt={page.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 shrink-0 animate-marquee-reverse py-1" aria-hidden="true">
                {coloringPages.slice(0, 6).map((page, index) => (
                  <div
                    key={`scroll-r1-2-${page.id}-${index}`}
                    className="w-40 sm:w-48 aspect-square shrink-0"
                  >
                    <img
                      src={page.imageSrc}
                      alt={page.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: Direita para Esquerda (animate-marquee) */}
            <div className="flex gap-3 overflow-hidden select-none">
              <div className="flex gap-3 shrink-0 animate-marquee py-1">
                {coloringPages.slice(6, 12).map((page, index) => (
                  <div
                    key={`scroll-r2-1-${page.id}-${index}`}
                    className="w-40 sm:w-48 aspect-square shrink-0"
                  >
                    <img
                      src={page.imageSrc}
                      alt={page.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 shrink-0 animate-marquee py-1" aria-hidden="true">
                {coloringPages.slice(6, 12).map((page, index) => (
                  <div
                    key={`scroll-r2-2-${page.id}-${index}`}
                    className="w-40 sm:w-48 aspect-square shrink-0"
                  >
                    <img
                      src={page.imageSrc}
                      alt={page.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Under scroll caption */}
          <div className="text-center mt-2 mb-0">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-black text-amber-600 drop-shadow-sm">
              E isso é apenas uma pequena parte do livro… 🇧🇷😍
            </p>
          </div>
          
          {/* Prompt banner under preview */}
          <div className="mt-5 max-w-3xl mx-auto rounded-3xl bg-white border-2 border-green-150 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 md:text-left text-center">
              <h4 className="font-display text-lg font-extrabold text-green-900">Quer testar com seus filhos hoje?</h4>
              <p className="text-xs font-medium text-green-800 max-w-md">No botão abaixo você garante a coleção completa em alta definição!</p>
            </div>
            <button
              onClick={handleScrollToOffer}
              className="w-full md:w-auto shrink-0 bg-green-600 hover:bg-green-700 text-white font-display text-sm font-extrabold p-4 px-6 rounded-2xl transition shadow-md shadow-green-600/10 cursor-pointer text-center animate-btn-pulse"
            >
              Baixar Livro Completo!
            </button>
          </div>

        </div>
      </section>

      {/* Section 2.5: Testimonials / Feedbacks below Section 4 Offer */}
      <section className="py-12 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-green-200/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-green-800 uppercase tracking-wider bg-green-100 py-1 px-3.5 rounded-full w-fit mx-auto border border-green-200">
              ⭐ Campeão de Avaliações
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              Quem já imprimiu, amou! 😍
            </h3>
          </div>

          {/* Testimonial Prints Grid (3 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-2.5 border border-gray-150 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img 
                src="https://i.ibb.co/yn2MKdL9/IMG-0856.jpg" 
                alt="Depoimento de Cliente" 
                className="w-full h-auto rounded-xl object-contain object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="bg-white rounded-2xl p-2.5 border border-gray-150 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img 
                src="https://i.ibb.co/Q3HqCVLH/IMG-0855.jpg" 
                alt="Depoimento Real do Whatsapp" 
                className="w-full h-auto rounded-xl object-contain object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="bg-white rounded-2xl p-2.5 border border-gray-150 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img 
                src="https://i.ibb.co/BHjTjVTz/IMG-0854.jpg" 
                alt="Feedback Positivo" 
                className="w-full h-auto rounded-xl object-contain object-center"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Specialized World Cup Bonus Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden border-b border-gray-100">
        {/* Soft World Cup Confetti / Ball decorative elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none z-0">
          <div className="absolute top-[10%] left-[5%] text-2xl rotate-12">⚽</div>
          <div className="absolute top-[80%] left-[8%] text-3xl -rotate-12">🏆</div>
          <div className="absolute top-[20%] right-[6%] text-xl rotate-45">✨</div>
          <div className="absolute top-[70%] right-[10%] text-2xl -rotate-45">🎉</div>
          <div className="absolute top-[45%] left-[5%] text-sm opacity-50 text-emerald-500">🟢</div>
          <div className="absolute top-[35%] left-[90%] text-sm opacity-50 text-yellow-500">🟡</div>
          <div className="absolute top-[60%] right-[25%] text-sm opacity-50 text-blue-500">🔵</div>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          {/* Main Container with custom shadow and World Cup premium border */}
          <div className="bg-gradient-to-br from-white via-green-50/15 to-blue-50/20 rounded-[32px] border-2 border-green-500/20 p-6 sm:p-8 md:p-12 shadow-xl relative overflow-hidden text-center">
            {/* Highlight yellow/green glow background shine */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* 🎁 BÔNUS EXCLUSIVO Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-green-950 text-xs sm:text-sm font-black py-2 px-6 rounded-full shadow-md animate-bounce border border-yellow-200">
                <Gift size={16} className="text-green-950 animate-pulse" />
                <span>🎁 BÔNUS EXCLUSIVOS NO KIT COMPLETO</span>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <h2 className="font-display text-lg sm:text-xl font-black text-green-900 uppercase tracking-widest">
                  Comprando Hoje Você Também Recebe:
                </h2>
              </div>

              {/* High Quality Visual Image Showcase Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                
                {/* BONUS 1: Os 26 Jogadores Convocados */}
                <div className="flex flex-col items-center">
                  <div className="relative group max-w-[250px] w-full mx-auto">
                    {/* Glowing border/background wrapper */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-green-500 rounded-[24px] blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    
                    {/* Image itself */}
                    <div className="relative bg-white rounded-[20px] p-1.5 sm:p-2 border-2 border-green-200 shadow-2xl overflow-hidden">
                      <img 
                        src="https://i.ibb.co/FbXvGNB6/Chat-GPT-Image-31-de-mai-de-2026-12-53-01.png" 
                        alt="Bônus Os 26 Jogadores Convocados para Colorir" 
                        referrerPolicy="no-referrer"
                        className="w-full h-auto rounded-[16px] transition-transform duration-300 group-hover:scale-[1.01]" 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  
                  <p className="text-base sm:text-lg font-black text-green-950 tracking-tight mt-4">
                    Os 26 Jogadores Convocados para Colorir 🇧🇷⚽
                  </p>
                </div>

                {/* BONUS 2: Bandeiras das Seleções */}
                <div className="flex flex-col items-center">
                  <div className="relative group max-w-[250px] w-full mx-auto">
                    {/* Glowing border/background wrapper */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 rounded-[24px] blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    
                    {/* Image itself */}
                    <div className="relative bg-white rounded-[20px] p-1.5 sm:p-2 border-2 border-green-200 shadow-2xl overflow-hidden">
                      <img 
                        src="https://i.ibb.co/VcKGL7Gn/Chat-GPT-Image-27-de-mai-de-2026-19-38-55.png" 
                        alt="Bônus Especial Copa do Mundo" 
                        referrerPolicy="no-referrer"
                        className="w-full h-auto rounded-[16px] transition-transform duration-300 group-hover:scale-[1.01]" 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  
                  <p className="text-base sm:text-lg font-black text-green-950 tracking-tight mt-4">
                    Bandeiras das Seleções 🌎⚽
                  </p>
                </div>

                {/* BONUS 3: Copa Colorida */}
                <div className="flex flex-col items-center">
                  <div className="relative group max-w-[250px] w-full mx-auto">
                    {/* Glowing border/background wrapper */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-emerald-500 rounded-[24px] blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    
                    {/* Image itself */}
                    <div className="relative bg-white rounded-[20px] p-1.5 sm:p-2 border-2 border-green-200 shadow-2xl overflow-hidden">
                      <img 
                        src="https://i.ibb.co/xtMqLzyq/Chat-GPT-Image-31-de-mai-de-2026-13-18-15.png" 
                        alt="Bônus Livrinho extra Copa Colorida" 
                        referrerPolicy="no-referrer"
                        className="w-full h-auto rounded-[16px] transition-transform duration-300 group-hover:scale-[1.01]" 
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  
                  <p className="text-base sm:text-lg font-black text-green-950 tracking-tight mt-4">
                    Livrinho extra Copa Colorida 📚🎨
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Downward Connector Arrow */}
      <div className="relative -mt-8 mb-[-32px] z-20 flex justify-center pointer-events-none">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full p-3 sm:p-4 shadow-xl border-4 border-white flex items-center justify-center animate-bounce">
          <ChevronDown size={28} className="text-green-950 font-black" />
        </div>
      </div>

      {/* Section 4: Final CTA & Checkout Trigger Banner */}
      <section id="oferta" className="relative z-10 py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-blue-900 text-white overflow-hidden text-center rounded-t-[40px] md:rounded-t-[60px] shadow-2xl">
        {/* Confetti Background detail */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-10 left-[12%] animate-float text-4xl">🎉</div>
          <div className="absolute top-44 right-[15%] animate-float-slow text-4xl">🌟</div>
          <div className="absolute top-[60%] left-[8%] animate-float text-3xl">⚽</div>
          <div className="absolute top-[70%] right-[10%] animate-float-slow text-4xl">🏆</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-8">
          
          {/* Real-time Urgency Countdown Banner */}
          <div className="w-full flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-red-600 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-lg border border-red-500 animate-pulse">
              <span className="flex items-center gap-2 uppercase tracking-wider">
                <Clock size={16} className="animate-spin text-yellow-300" />
                ⚠️ Corre! Desconto Especial Expira em:
              </span>
              <span className="bg-gray-950 text-yellow-300 font-mono text-sm sm:text-base px-3 py-0.5 rounded-lg border border-red-500 shadow-inner">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          {/* Logo / Badge */}
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-yellow-300 uppercase tracking-widest border border-white/10 mx-auto">
            ⚽ O mais desejado do Brasil
          </div>

          {/* Headline of plans section */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Escolha o Plano Ideal para Você
            </h2>
            <div className="inline-block bg-yellow-400/15 border border-yellow-400/30 px-5 py-2.5 rounded-2xl shadow-lg max-w-lg mx-auto backdrop-blur-sm">
              <p className="text-yellow-300 text-xs sm:text-sm font-extrabold tracking-wide text-center">
                🔒 Acesso seguro, imediato e vitalício. Escolha e comece a colorir agora mesmo!
              </p>
            </div>
          </div>

          {/* Plans Comparison flex/grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto pt-4 text-left">
            
            {/* PLANO 1 - Livro de Colorir */}
            <div className="relative flex flex-col justify-between bg-white/10 border-2 border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-green-950/20 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 text-white">
              <div className="space-y-5">
                {/* Plan Header */}
                <div className="text-center">
                  <h4 className="font-display text-lg sm:text-xl font-black text-white flex items-center justify-center gap-1.5 pt-1">
                    ⚽ Kit Básico
                  </h4>
                </div>

                {/* Price */}
                <div className="py-2.5 border-b border-white/15 text-center">
                  <span className="text-xs text-gray-300/80 line-through font-bold block leading-none mb-1">DE R$ 27,00</span>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-xs font-black text-yellow-300 uppercase tracking-wider">POR R$</span>
                    <span className="text-5xl sm:text-6xl font-display font-black text-yellow-300 tracking-tight">10,00</span>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white/10 px-2 py-1 rounded-lg ml-1.5 align-middle">Único</span>
                  </div>
                </div>

                {/* Includes list */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-yellow-400 uppercase tracking-wider text-center">O que está incluso:</p>
                  <ul className="space-y-2.5 text-xs text-gray-100 font-semibold text-left">
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>+120 Desenhos da Copa para Colorir</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Arquivo Digital para Imprimir</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plan Selector Button */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  disabled={loadingPlan !== null}
                  onClick={() => {
                    handleSelectPlanAndCheckout("livro", "10,00", "Kit Básico");
                  }}
                  className={`w-full text-gray-950 font-display font-black text-xs tracking-wider py-4 rounded-2xl uppercase transition shadow-lg flex items-center justify-center gap-2 active:scale-95 duration-200 text-center ${
                    loadingPlan === "livro"
                      ? "bg-yellow-500 cursor-not-allowed opacity-90 animate-pulse"
                      : loadingPlan !== null
                      ? "bg-yellow-400 opacity-60 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-300 shadow-yellow-400/20 cursor-pointer animate-btn-pulse-strong"
                  }`}
                >
                  {loadingPlan === "livro" ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Redirecionando Seguro...</span>
                    </>
                  ) : (
                    <>
                      <span>QUERO O KIT BÁSICO</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* PLANO 2 - Mega Kit (Destaque Principal) */}
            <div className="relative flex flex-col justify-between bg-white/10 border-[3px] border-yellow-400 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.03] hover:border-yellow-400 text-white">
              
              {/* Outstanding Highlight Ribbon / Seal */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg border-2 border-yellow-400 whitespace-nowrap flex items-center gap-1.5 z-20">
                <span>🔥</span> CAMPEÃO DE VENDAS <span>🔥</span>
              </div>

              <div className="space-y-4 pt-1">
                {/* Plan Header */}
                <div className="text-center">
                  <h4 className="font-display text-lg sm:text-xl font-black text-yellow-300 flex items-center justify-center gap-1.5">
                    🏆 Mega Kit Copa do Mundo
                  </h4>
                  <p className="text-[11px] text-yellow-100 font-bold bg-white/10 p-2.5 rounded-xl border border-white/10 mt-2.5 leading-relaxed text-center">
                    Tudo do plano básico + conteúdos exclusivos.
                  </p>
                </div>

                {/* Price with styling */}
                <div className="py-2 border-b border-white/15 relative text-center">
                  <span className="text-xs text-gray-300/80 line-through font-bold block leading-none mb-1">DE R$ 49,90</span>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-xs font-black text-yellow-300 uppercase tracking-wider">POR R$</span>
                    <span className="text-5xl sm:text-6xl font-display font-black text-yellow-300 tracking-tight">19,90</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest bg-red-600 px-2 py-1 rounded-lg ml-1.5 align-middle animate-pulse">Único</span>
                  </div>
                </div>

                {/* Includes list */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-yellow-300 uppercase tracking-wider text-center">O que está incluso no Kit Completo:</p>
                  <ul className="space-y-2.5 text-xs text-gray-100 font-semibold text-left">
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>+120 Desenhos da Copa para Colorir</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Jogadores Craques</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Torcidas Vibrantes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Taças da Copa</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Mascotes Divertidos</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Arquivo Digital para Imprimir</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shrink-0 mt-0.5">✓</span>
                      <span>Atualizações Futuras</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white/15 p-2.5 rounded-xl border border-white/10 mt-1">
                      <span className="shrink-0 text-amber-300">🎁</span>
                      <span className="text-yellow-300 font-bold">Bônus: Bandeiras das Seleções</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white/15 p-2.5 rounded-xl border border-white/10 mt-1">
                      <span className="shrink-0 text-amber-300">🎁</span>
                      <span className="text-yellow-300 font-bold">Bônus: Os 26 Jogadores Convocados para Colorir</span>
                    </li>
                    <li className="flex items-start gap-2 bg-white/15 p-2.5 rounded-xl border border-white/10 mt-1">
                      <span className="shrink-0 text-amber-300">🎁</span>
                      <span className="text-yellow-300 font-bold">Bônus: Livrinho extra Copa Colorida</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plan Selector Button */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  disabled={loadingPlan !== null}
                  onClick={() => {
                    handleSelectPlanAndCheckout("kit", "19,90", "Mega Kit Copa do Mundo");
                  }}
                  className={`w-full text-gray-950 font-display font-black text-xs tracking-wider py-4 rounded-2xl uppercase transition shadow-lg flex items-center justify-center gap-2 active:scale-95 duration-200 text-center ${
                    loadingPlan === "kit"
                      ? "bg-yellow-500 cursor-not-allowed opacity-90 animate-pulse"
                      : loadingPlan !== null
                      ? "bg-yellow-400 opacity-60 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-300 shadow-yellow-400/20 cursor-pointer animate-btn-pulse-strong"
                  }`}
                >
                  {loadingPlan === "kit" ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Redirecionando Seguro...</span>
                    </>
                  ) : (
                    <>
                      <span>🔥 QUERO O KIT COMPLETO</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Guaranteed bottom bar trust seals */}
          <div className="pt-3 flex flex-wrap justify-center items-center gap-6 text-[10px] font-bold text-gray-300/80 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              🔒 Checkout Criptografado
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1">
              ⚡ Envio Automático & Rápido
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1">
              🛡️ Garantia de Satisfação
            </span>
          </div>

        </div>
      </section>



      {/* Brief Guarantee Section */}
      <section className="bg-white py-10 border-t border-b border-gray-200/60 relative z-10">
        <div className="max-w-xl mx-auto px-4 text-center flex flex-col items-center space-y-3">
          <div className="w-28 sm:w-32 hover:scale-105 transition-transform duration-300">
            <img 
              src="https://i.ibb.co/Zp4F2Tjp/celo-de-garantia.png" 
              alt="Celo de Garantia 7 Dias" 
              className="w-full h-auto object-contain"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="font-display text-lg sm:text-xl font-black text-gray-900 tracking-tight">
            Garantia Incondicional de 7 dias! ⭐
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-bold leading-relaxed max-w-md">
            Seu risco é zero! Se por qualquer motivo você não gostar do livro, devolvemos 100% do seu dinheiro imediatamente. Basta nos enviar um e-mail.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 relative z-10 border-b border-gray-200/50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-gray-900 tracking-tight animate-fade-in">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-green-500 ring-4 ring-green-500/5 shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left py-4 px-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className={`font-display text-xs sm:text-sm md:text-base font-extrabold transition-colors duration-150 ${
                      isOpen ? 'text-green-700' : 'text-gray-800'
                    }`}>
                      {item.question}
                    </span>
                    <span className={`transform transition-transform duration-300 rounded-lg p-1 ${
                      isOpen ? 'bg-green-50 text-green-600 rotate-180' : 'bg-gray-50 text-gray-400'
                    }`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 pt-1 border-t border-gray-100"
                    >
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Humble professional footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-xs space-y-3">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-display font-black text-gray-200 text-sm tracking-wider flex items-center justify-center gap-1">
            ⚽ LIVRO DE COLORIR DA COPA
          </p>
          <p className="max-w-md mx-auto leading-relaxed mt-2 text-gray-400/80">
            Todos os direitos reservados.
          </p>
          <div className="pt-3 text-[10px] text-gray-500 flex justify-center gap-4">
            <a href="#rules" className="hover:underline">Termos de Uso</a>
            <span>•</span>
            <a href="#privacy" className="hover:underline">Políticas de Privacidade</a>
            <span>•</span>
            <a href="#contact" className="hover:underline">Contato</a>
          </div>
          <p className="pt-4 text-[10px] text-gray-600">
            © {new Date().getFullYear()} Livro de Colorir da Copa. Criado e otimizado com orgulho e design de alta conversão.
          </p>
        </div>
      </footer>

      {/* Dynamic Popups handles */}

      {/* Lightbox Preview */}
      <PageLightbox
        isOpen={selectedPage !== null}
        imageSrc={selectedPage?.imageSrc || ""}
        imageTitle={selectedPage?.title || ""}
        imageDesc={selectedPage?.description || ""}
        onClose={() => setSelectedPage(null)}
        onOpenCheckout={handleScrollToOffer}
      />

      {/* Full-blown interactive checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
      />

      {/* Social proof purchase notifications */}
      <PurchaseNotifications />

    </div>
  );
}

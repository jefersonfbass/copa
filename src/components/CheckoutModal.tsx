import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, ShieldCheck, Mail, User, CreditCard, 
  Check, Download, Copy, CopyCheck, Sparkles, AlertCircle 
} from "lucide-react";

// Import the generated images
import coloringPage1Img from '../assets/images/coloring_page_1_1779901857472.webp';
import coloringPage2Img from '../assets/images/coloring_page_2_1779901872187.webp';
import coloringPage3Img from '../assets/images/coloring_page_3_1779901885961.webp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "pix" | "card";

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [step, setStep] = useState<"details" | "processing" | "payment_action" | "success">("details");
  
  // Card states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Pix states
  const [copiedPix, setCopiedPix] = useState(false);
  const pixKey = "00020126580014br.gov.bcb.pix0136campolatocopa2026-prod-col-colorir520400005303986540514.905802BR5924LivrodeColorirdaCopa6009Sao_Paulo62070503***6304E21D";

  useEffect(() => {
    if (!isOpen) {
      // Reset state on close
      setEmail("");
      setName("");
      setPaymentMethod("pix");
      setStep("details");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setCopiedPix(false);
    }
  }, [isOpen]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setStep("processing");
    
    setTimeout(() => {
      if (paymentMethod === "pix") {
        setStep("payment_action");
      } else {
        setStep("success");
      }
    }, 1500);
  };

  const handleSimulatePixPaid = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 1200);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          id="checkout-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 p-6 text-white">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-black/20 p-1.5 text-white blur-none hover:bg-black/30 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚽</span>
              <div>
                <h3 className="font-display text-xl font-extrabold tracking-tight">Checkout Seguro</h3>
                <p className="text-xs text-white/95 font-medium">Garanta seu Livro de Colorir da Copa</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Step indicators */}
            <div className="mb-6 flex items-center justify-between text-xs font-semibold text-gray-500">
              <div className="flex items-center gap-1.5 text-green-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold">1</span>
                Dados
              </div>
              <div className="h-px flex-1 mx-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${step === 'success' || step === 'payment_action' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>2</span>
                Pagamento
              </div>
              <div className="h-px flex-1 mx-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${step === 'success' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>3</span>
                Download
              </div>
            </div>

            {/* Step 1: Details */}
            {step === "details" && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <User size={13} /> Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Pedro Silva"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    <Mail size={13} /> Seu E-mail (Para envio do PDF)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: pedro@email.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>

                {/* Payment Method Toggle */}
                <div className="pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                    Escolha o Método de Pagamento
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pix")}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                        paymentMethod === "pix" 
                          ? "border-green-600 bg-green-50/50 text-green-900" 
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl mb-1">⚡</span>
                      <span className="text-sm font-bold">PIX Copia & Cola</span>
                      <span className="text-[10px] text-green-600 font-bold uppercase mt-0.5">Acesso Instantâneo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                        paymentMethod === "card" 
                          ? "border-blue-600 bg-blue-50/50 text-blue-900" 
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl mb-1">💳</span>
                      <span className="text-sm font-bold">Cartão de Crédito</span>
                      <span className="text-[10px] text-blue-600 font-bold uppercase mt-0.5">Até 3x sem juros</span>
                    </button>
                  </div>
                </div>

                {/* Total pricing bar */}
                <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 border border-gray-100">
                  <div className="text-xs text-gray-500 font-bold">Valor Promocional Único</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-gray-400 line-through">R$ 47,00</span>
                    <span className="text-xl font-black text-green-600">R$ 10,00</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-green-600 py-4 font-display text-base font-extrabold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  Continuar para Pagamento
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-400">
                  <ShieldCheck size={14} className="text-green-500" /> Seus dados estão 100% seguros e protegidos.
                </p>
              </form>
            )}

            {/* Step: Processing */}
            {step === "processing" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-6">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
                  <span className="absolute inset-0 flex items-center justify-center text-xl">⏳</span>
                </div>
                <h4 className="font-display text-lg font-bold text-gray-800">Processando solicitação...</h4>
                <p className="max-w-[280px] text-xs text-gray-500 mt-2">Estamos gerando o seu código de pagamento de forma segura.</p>
              </div>
            )}

            {/* Step: PIX Action Screen */}
            {step === "payment_action" && (
              <div className="space-y-5">
                <div className="text-center">
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">⚡ Pix Gerado com Sucesso!</span>
                  <h4 className="font-display text-xl font-extrabold text-gray-800 mt-2">Copie o código e pague no seu banco</h4>
                </div>

                {/* QR Code Placeholder Box */}
                <div className="mx-auto max-w-[170px] aspect-square rounded-2xl bg-gray-50 border border-gray-100 p-4 flex flex-col items-center justify-center relative">
                  {/* Decorative QR Lines */}
                  <div className="w-full h-full border-4 border-dashed border-green-500/20 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-5xl mb-1">📲</span>
                    <span className="text-[10px] uppercase tracking-wider text-green-600 font-extrabold">Simulado</span>
                  </div>
                </div>

                {/* Copy paste input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wide">
                    <span>Código Pix Copia e Cola</span>
                    <span className="text-green-600">Valor: R$ 10,00</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixKey}
                      className="flex-1 rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-xs font-mono text-gray-500 select-all outline-none"
                    />
                    <button
                      onClick={handleCopyPix}
                      type="button"
                      className="rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700 transition flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      {copiedPix ? <CopyCheck size={14} /> : <Copy size={14} />}
                      {copiedPix ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-3 flex gap-2.5 items-start">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-amber-900 font-semibold leading-relaxed">
                    <strong>Demo de Teste:</strong> Clique abaixo para simular a confirmação do pagamento instantâneo e liberar seus downloads!
                  </div>
                </div>

                <button
                  onClick={handleSimulatePixPaid}
                  className="w-full rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-display font-extrabold py-3.5 transition text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 cursor-pointer"
                >
                  <Check size={16} /> Confirmar Pagamento Simulado
                </button>
              </div>
            )}

            {/* Step: Success / Download Unlocked */}
            {step === "success" && (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl animate-bounce">
                  ✨
                </div>

                <div>
                  <h4 className="font-display text-2xl font-black text-gray-900">Parabéns, {name}! 🎉</h4>
                  <p className="text-xs text-green-600 font-bold uppercase tracking-widest mt-1">Seu acesso está 100% liberado!</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Enviamos um e-mail de confirmação para <strong>{email}</strong>, mas você já pode baixar os seus arquivos exclusivos abaixo.
                  </p>
                </div>

                {/* Free coloring pages unlocked for download! */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">Suas Páginas Exclusivas</div>
                  
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-50 group">
                      <img 
                        src={coloringPage1Img} 
                        alt="Capivara" 
                        className="w-full aspect-square object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <a 
                        href={coloringPage1Img} 
                        download="Copa_Colorir_Capivara.png" 
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Download size={20} />
                      </a>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-50 group">
                      <img 
                        src={coloringPage2Img} 
                        alt="Bola" 
                        className="w-full aspect-square object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <a 
                        href={coloringPage2Img} 
                        download="Copa_Colorir_Bola.png" 
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Download size={20} />
                      </a>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-50 group">
                      <img 
                        src={coloringPage3Img} 
                        alt="Trofeu" 
                        className="w-full aspect-square object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <a 
                        href={coloringPage3Img} 
                        download="Copa_Colorir_Trofeu.png" 
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 font-semibold italic">Dica: Passe o mouse ou clique na imagem acima para baixar ou imprimir diretamente!</p>
                </div>

                <div className="rounded-2xl bg-green-50 p-4 border border-green-100">
                  <h5 className="text-xs font-bold text-green-900 flex items-center justify-center gap-1">
                    <Sparkles size={14} /> Pacote Completo Enviado por E-mail
                  </h5>
                  <p className="text-[11px] text-green-800 mt-1">
                    O PDF com as <strong>+120 páginas completas de alta definição</strong> foi expedido de forma automática. Divirta-se!
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={coloringPage1Img}
                    download="Livro_Colorir_Copa_Amostra.png"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 text-white font-display text-xs font-bold py-3.5 transition flex items-center justify-center gap-1.5"
                  >
                    <Download size={14} /> Baixar Amostra PNG
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-display text-xs font-bold py-3.5 transition"
                  >
                    Fechar Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

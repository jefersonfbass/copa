import { motion, AnimatePresence } from "motion/react";
import { X, Download, Printer, CircleCheck } from "lucide-react";

interface PageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageTitle: string;
  imageDesc: string;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export default function PageLightbox({
  isOpen,
  imageSrc,
  imageTitle,
  imageDesc,
  onClose,
  onOpenCheckout
}: PageLightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Outer card shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row border border-white/10"
        >
          {/* Left panel: Large preview of the coloring sheet */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
            {/* Blueprint/soccer ball background icon detail */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <span className="text-[200px]">⚽</span>
            </div>
            
            <img
              src={imageSrc}
              alt={imageTitle}
              className="max-h-[50vh] md:max-h-[70vh] w-auto max-w-full select-none rounded-xl bg-white p-3 shadow-lg object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right panel: Details & High conversion hook */}
          <div className="w-full md:w-80 bg-white p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100">
            {/* Close button for mobile and desktop */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:static md:self-end text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-50 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex-1 mt-2 md:mt-6 space-y-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700 uppercase tracking-wider mb-2">
                  🎨 Amostra Grátis
                </span>
                <h4 className="font-display text-2xl font-black text-gray-900 leading-tight">
                  {imageTitle}
                </h4>
                <p className="text-sm font-medium text-gray-500 mt-1.5 leading-relaxed">
                  {imageDesc}
                </p>
              </div>

              {/* Bullet details */}
              <div className="space-y-2.5 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <CircleCheck size={16} className="text-green-500 shrink-0" />
                  <span>Ultra-alta definição (300 DPI)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck size={16} className="text-green-500 shrink-0" />
                  <span>Vetor limpo sem borrões</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck size={16} className="text-green-500 shrink-0" />
                  <span>Pronto para folhas A4 standard</span>
                </div>
              </div>
            </div>

            {/* CTA Elements */}
            <div className="mt-6 space-y-2.5 pt-4 border-t border-gray-100">
              <a
                href={imageSrc}
                download={`${imageTitle.toLowerCase().replace(/\s+/g, "_")}_copa_colorir.png`}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-2xl border-2 border-gray-200 bg-white py-3 font-display text-xs font-bold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download size={14} /> Baixar para Testar Impressão
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-yellow-500 py-3.5 font-display text-xs font-extrabold text-white transition hover:from-green-700 hover:to-yellow-600 shadow-md shadow-green-600/10 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 animate-pulse-subtle"
              >
                <Printer size={14} /> Liberar Mais de 120 Desenhos
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

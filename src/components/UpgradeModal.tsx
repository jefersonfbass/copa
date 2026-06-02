import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpgrade: () => void;
  onDeclineUpgrade: () => void;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  onConfirmUpgrade,
  onDeclineUpgrade,
}: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Ultra-objective compact card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.35 }}
          className="relative w-full max-w-[340px] overflow-hidden rounded-3xl bg-gradient-to-b from-green-950 to-slate-950 text-white shadow-2xl border-2 border-yellow-400 z-10"
        >
          {/* Main Content Area */}
          <div className="p-6 flex flex-col items-center">
            {/* Minimal High-Contrast Badge */}
            <div className="bg-yellow-400 text-green-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 mb-4 font-mono shadow-sm">
              <Sparkles size={11} className="animate-pulse" />
              <span>🏆 ESPERE!</span>
            </div>

            {/* Direct Title */}
            <h3 className="font-display font-black text-base text-center leading-tight tracking-tight text-white uppercase max-w-[280px]">
              Você Está a Um Passo de Levar a Versão Completa
            </h3>
            
            {/* Quick value prop */}
            <p className="text-center text-xs text-gray-200 mt-2.5 leading-relaxed px-1">
              Garanta <span className="text-yellow-400 font-bold">todos os bônus exclusivos por Apenas Mais R$ 7,90</span>
            </p>

            {/* Compact Price Box */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 flex flex-col items-center justify-center gap-1">
              <div className="text-[10px] text-gray-400 line-through">De R$ 19,90</div>
              <div className="text-3xl font-black text-yellow-300 tracking-tight animate-pulse">
                R$ 17,90
              </div>
            </div>

            {/* Difference indicator with red urgency style */}
            <div className="w-full text-center mt-4">
              <p className="inline-block text-[10px] text-red-400 font-black tracking-wide uppercase px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/20 animate-pulse">
                ⏳ Última chance de levar o Mega Kit por este valor especial.
              </p>
            </div>

            {/* Main CTA Button */}
            <button
              onClick={onConfirmUpgrade}
              className="w-full bg-green-500 hover:bg-green-400 text-green-950 font-display font-black text-xs tracking-wide py-4 rounded-xl uppercase transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer text-center mt-4 active:scale-95 animate-pulse"
            >
              🔥 SIM! QUERO O KIT COMPLETO
            </button>

            {/* Decline Action */}
            <button
              onClick={onDeclineUpgrade}
              className="mt-4 text-[13px] font-bold text-gray-400 hover:text-white underline decoration-gray-600/60 hover:decoration-white transition-all duration-150 py-2 cursor-pointer touch-manipulation text-center block"
            >
              Não, obrigado. Quero apenas o básico por R$ 10,00
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

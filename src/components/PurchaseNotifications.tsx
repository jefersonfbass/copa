import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ShieldCheck, ShoppingBag } from "lucide-react";

// Realistic buyer data for Brazilian e-commerce market
const FIRST_NAMES = [
  "Mariana", "Rodrigo", "Marcio", "Patrícia", "Ana Carolina", "Fabiana", "Thiago", 
  "Amanda", "Gustavo", "Larissa", "Camila", "Bruno", "Renata", "Rafael", "Débora", 
  "Luiz", "Bianca", "Carlos", "Letícia", "Felipe", "Vanessa", "Daniel", "Priscila", 
  "Gabriel", "Aline", "Lucas", "Sônia", "Matheus", "Eduarda", "Ricardo", "Juliana"
];

const LAST_INITIALS = ["S.", "M.", "O.", "F.", "R.", "A.", "G.", "C.", "B.", "L.", "P.", "T.", "V.", "N.", "D.", "J.", "E."];

const CITIES = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Curitiba - PR", 
  "Porto Alegre - RS", "Salvador - BA", "Recife - PE", "Fortaleza - CE", "Brasília - DF", 
  "Goiânia - GO", "Campinas - SP", "Manaus - AM", "Florianópolis - SC", "Vitória - ES", 
  "Belém - PA", "Niterói - RJ", "Sorocaba - SP", "Uberlândia - MG", "Londrina - PR", 
  "Joinville - SC", "Duque de Caxias - RJ", "Ribeirão Preto - SP", "Natal - RN"
];

const ACTIONS = [
  "acabou de garantir o Livro de Colorir da Copa! ⚽️",
  "garantiu as 120+ páginas do livro de colorir! 🇧🇷🎨",
  "comprou via Pix e recebeu o PDF imediatamente! 🚀",
  "aproveitou a oferta e garantiu o acesso vitalício! 🏆",
  "garantiu o kit completo + bônus exclusivos! 🎁",
  "acabou de adquirir o Super Kit da Copa! 🌟"
];

interface NotificationState {
  id: number;
  name: string;
  city: string;
  action: string;
  timeAgo: string;
}

export default function PurchaseNotifications() {
  const [notification, setNotification] = useState<NotificationState | null>(null);

  useEffect(() => {
    // Generate a random purchase notification
    const generateNotification = () => {
      const id = Date.now();
      const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)] + " " + LAST_INITIALS[Math.floor(Math.random() * LAST_INITIALS.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      
      const minutes = Math.floor(Math.random() * 4) + 1;
      const timeAgo = Math.random() > 0.6 ? `há ${minutes} min` : "agora mesmo";

      return { id, name, city, action, timeAgo };
    };

    // Cycle timing
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const runCycle = () => {
      // 1. Show a notification
      setNotification(generateNotification());

      // 2. Hide it after 6 seconds
      timeoutId = setTimeout(() => {
        setNotification(null);
      }, 5500);
    };

    // Initial wait to show the first alert (e.g., 4 seconds after page load)
    const initialTimeoutId = setTimeout(() => {
      runCycle();
      
      // Keep triggering every 16 seconds (display 5.5s + internal pause 10.5s)
      intervalId = setInterval(runCycle, 16000);
    }, 4000);

    return () => {
      clearTimeout(initialTimeoutId);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-[300px] z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-sm border border-gray-200/90 shadow-lg rounded-xl p-2.5 px-3 flex gap-2.5 items-center max-w-[92%] sm:max-w-[280px] mx-auto sm:mx-0 select-none overflow-hidden duration-300 hover:shadow-green-500/5 hover:border-green-300"
          >
            {/* Left side compact active green badge */}
            <div className="relative shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500 text-white shadow-sm shadow-emerald-500/10">
              <ShoppingBag size={13} className="animate-wiggle" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
              </span>
            </div>

            {/* Notification content body */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="text-[11px] font-sans text-gray-900 font-bold truncate leading-none">
                  {notification.name} <span className="text-gray-400 font-normal">({notification.city})</span>
                </p>
                <span className="text-[9px] text-gray-400 whitespace-nowrap font-medium shrink-0 leading-none">
                  {notification.timeAgo}
                </span>
              </div>
              
              <p className="text-[10px] text-gray-650 font-medium leading-tight mt-1 truncate">
                {notification.action}
              </p>
            </div>

            {/* Minimal safe badge */}
            <div className="shrink-0 text-emerald-600/70">
              <ShieldCheck size={13} title="Compra 100% Segura" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

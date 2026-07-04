'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ projectTitle }: { projectTitle?: string }) {
  const pathname = usePathname();
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
  const text = encodeURIComponent(
    projectTitle
      ? `Hi! I'm interested in the "${projectTitle}" project. Can you share more details?`
      : `Hi! I'm looking for a B.Tech final year IEEE project. Can you help?`
  );

  if (pathname?.startsWith('/admin')) return null;

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-base-950 font-semibold pl-4 pr-5 py-3 shadow-[0_4px_24px_rgba(37,211,102,0.45)]"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline text-sm">WhatsApp Us</span>
    </motion.a>
  );
}

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function FloatingWhatsApp() {
  return (
    <a
      href={companyInfo.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with TeesZone on WhatsApp"
      title="Chat with TeesZone on WhatsApp"
    >
      <MessageCircle size={30} fill="#FFFFFF" color="#FFFFFF" />
    </a>
  );
}

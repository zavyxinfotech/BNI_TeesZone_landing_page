import React, { useState, useRef } from 'react';
import Header from './components/Header';
import { useCinematicScroll } from './components/animations/useCinematicScroll';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import WhoWeServe from './components/WhoWeServe';
import WhyChooseUs from './components/WhyChooseUs';
import ProductGallery from './components/ProductGallery';
import BniCollaboration from './components/BniCollaboration';
import BniPricingBanner from './components/BniPricingBanner';
import TrustedCorporatePartners from './components/TrustedCorporatePartners';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import IntroductionModal from './components/IntroductionModal';
import ProductDetailModal from './components/ProductDetailModal';

export default function App() {
  const rootRef = useRef(null);
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [introModalType, setIntroModalType] = useState('introduction');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useCinematicScroll(rootRef);

  const handleOpenIntroModal = (type = 'introduction') => {
    setIntroModalType(type);
    setIntroModalOpen(true);
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
  };

  return (
    <div ref={rootRef} className="landing-page-root">
      {/* 1. Header & Navigation */}
      <Header />

      <main id="main-content">
        {/* 2. Hero Section with Integrated Wavy Trust Indicators */}
        <Hero onOpenIntroModal={() => handleOpenIntroModal('introduction')} />

        {/* 3. Who We Are */}
        <About onOpenAboutModal={() => handleOpenIntroModal('about')} />

        {/* 5. What We Manufacture (3D Floating Products) */}
        <Products onSelectProduct={handleSelectProduct} />

        {/* 6. Who We Serve (Human Showcase & Industries) */}
        <WhoWeServe />

        {/* 7. Why Businesses Choose TeesZone & DTF Printing Demo */}
        <WhyChooseUs />

        {/* 8. Product Gallery Carousel */}
        <ProductGallery onImageClick={handleSelectProduct} />

        {/* 9. BNI Collaboration Opportunities */}
        <BniCollaboration onSelectOpportunity={(item) => handleOpenIntroModal('collaboration')} />

        {/* 10. Exclusive BNI Member Pricing Banner */}
        <BniPricingBanner onClaimOffer={() => handleOpenIntroModal('discount')} />

        {/* 11. Trusted Corporate Partners */}
        <TrustedCorporatePartners />
      </main>

      {/* 11. Corporate Office & Contact Footer */}
      <Footer />

      {/* 12. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Interactive Modals */}
      <IntroductionModal
        isOpen={introModalOpen}
        defaultType={introModalType}
        onClose={() => setIntroModalOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

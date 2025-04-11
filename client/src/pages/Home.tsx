import { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import DestinationsSection from '../components/DestinationsSection';
import WhyChooseSection from '../components/WhyChooseSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ParallaxCTA from '../components/ParallaxCTA';
import OfficeGallerySection from '../components/OfficeGallerySection';
import InquiryFormSection from '../components/InquiryFormSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const Home = () => {
  useEffect(() => {
    document.title = 'StudyVista - Your Gateway to International Education';
  }, []);

  const scrollToInquiry = () => {
    const inquirySection = document.getElementById('inquiry-form');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <Header />
      <HeroSection onGetStarted={scrollToInquiry} />
      <FeaturesSection />
      <DestinationsSection />
      <WhyChooseSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ParallaxCTA onGetConsultation={scrollToInquiry} />
      <OfficeGallerySection />
      <InquiryFormSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;

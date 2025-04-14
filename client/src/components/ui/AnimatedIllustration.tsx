import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { FiSend, FiGlobe, FiBookOpen, FiMapPin, FiBook } from 'react-icons/fi';

type AnimationType = 'globe' | 'education' | 'map' | 'book' | 'send';

interface AnimatedIllustrationProps {
  type: AnimationType;
  size?: number | string;
  color?: string;
}

const AnimatedIllustration = ({ 
  type = 'globe',
  size = '100%',
  color = 'var(--primary)'
}: AnimatedIllustrationProps) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        setIsLoading(true);
        let url;
        
        switch(type) {
          case 'globe':
            url = 'https://assets7.lottiefiles.com/packages/lf20_w6whqxmx.json';
            break;
          case 'education':
            url = 'https://assets6.lottiefiles.com/packages/lf20_inti4oxf.json';
            break;
          case 'map':
            url = 'https://assets5.lottiefiles.com/packages/lf20_oifa4qm1.json';
            break;
          case 'book':
            url = 'https://assets9.lottiefiles.com/packages/lf20_1cazwtnc.json';
            break;
          case 'send':
            url = 'https://assets5.lottiefiles.com/packages/lf20_GmXGEs.json';
            break;
          default:
            url = 'https://assets7.lottiefiles.com/packages/lf20_w6whqxmx.json';
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setAnimationData(data);
        setError(false);
      } catch (err) {
        console.error('Failed to load animation:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnimation();
  }, [type]);
  
  // Fallback icon in case of error or during loading
  const getFallbackIcon = () => {
    switch(type) {
      case 'globe':
        return <FiGlobe size={typeof size === 'number' ? size : 60} />;
      case 'education':
        return <FiBookOpen size={typeof size === 'number' ? size : 60} />;
      case 'map':
        return <FiMapPin size={typeof size === 'number' ? size : 60} />;
      case 'book':
        return <FiBook size={typeof size === 'number' ? size : 60} />;
      case 'send':
        return <FiSend size={typeof size === 'number' ? size : 60} />;
      default:
        return <FiGlobe size={typeof size === 'number' ? size : 60} />;
    }
  };
  
  if (isLoading || error || !animationData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          backgroundColor: `${color}10`,
          borderRadius: '50%',
          padding: '2rem'
        }}
      >
        {getFallbackIcon()}
      </motion.div>
    );
  }
  
  return (
    <Lottie 
      animationData={animationData} 
      loop={true}
      style={{ width: size, height: 'auto' }}
    />
  );
};

export default AnimatedIllustration;
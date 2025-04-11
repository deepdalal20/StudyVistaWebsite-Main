import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, motion } from 'framer-motion';
import Home from "./pages/Home";
import About from "./pages/About";
import Countries from "./pages/Countries";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Inquiry from "./pages/Inquiry";
import Contact from "./pages/Contact";
import NotFound from "./pages/not-found";

// Declare AOS types for TypeScript
declare global {
  interface Window {
    AOS: {
      init: (options?: any) => void;
      refresh: () => void;
    };
  }
}

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.61, 1, 0.88, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

function App() {
  const [location] = useLocation();
  
  // Initialize AOS on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refresh();
    }
  }, []);
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Switch location={location}>
        <Route path="/">
          {() => (
            <motion.div
              key="home"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Home />
            </motion.div>
          )}
        </Route>
        
        <Route path="/about">
          {() => (
            <motion.div
              key="about"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <About />
            </motion.div>
          )}
        </Route>
        
        <Route path="/countries">
          {() => (
            <motion.div
              key="countries"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Countries />
            </motion.div>
          )}
        </Route>
        
        <Route path="/gallery">
          {() => (
            <motion.div
              key="gallery"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Gallery />
            </motion.div>
          )}
        </Route>
        
        <Route path="/blog">
          {() => (
            <motion.div
              key="blog"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Blog />
            </motion.div>
          )}
        </Route>
        
        <Route path="/inquiry">
          {() => (
            <motion.div
              key="inquiry"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Inquiry />
            </motion.div>
          )}
        </Route>
        
        <Route path="/contact">
          {() => (
            <motion.div
              key="contact"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <Contact />
            </motion.div>
          )}
        </Route>
        
        <Route>
          {() => (
            <motion.div
              key="not-found"
              initial="initial"
              animate="enter"
              exit="exit"
              variants={pageVariants}
            >
              <NotFound />
            </motion.div>
          )}
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default App;

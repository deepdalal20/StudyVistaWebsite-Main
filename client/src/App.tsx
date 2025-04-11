import { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";

function App() {
  // Initialize AOS on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;

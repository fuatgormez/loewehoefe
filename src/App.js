import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LocationsList from "./components/LocationsList";
import Footer from "./components/Footer";

// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <LocationsList />
      <Footer />
    </div>
  );
}

export default App;

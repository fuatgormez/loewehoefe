import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Contact from "./Contact";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu takip ederek mobil görünümü belirle
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // İlk yükleme kontrolü
    checkIfMobile();

    // Pencere boyutu değiştiğinde kontrol et
    window.addEventListener("resize", checkIfMobile);

    // Temizleme fonksiyonu
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openContactModal = (e) => {
    e.preventDefault();
    setContactModalOpen(true);
    if (isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="logo-container">
            <img src="/images/logo.png" alt="Löwe Höfe Logo" className="logo" />
          </div>

          <div
            className={`mobile-menu-button ${
              mobileMenuOpen ? "mobile-menu-open" : ""
            } ${isMobile ? "mobile-visible" : ""}`}
            onClick={toggleMobileMenu}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <nav className={`navigation ${mobileMenuOpen ? "active" : ""}`}>
            <ul
              className={`nav-menu ${
                isMobile && !mobileMenuOpen ? "hidden" : ""
              }`}
            >
              <li className="nav-item">
                <a
                  href="https://www.loewesaal.de/anfragen/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jetzt Anfragen
                </a>
              </li>
              <li className="nav-item">
                <a href="#" onClick={openContactModal}>
                  Kontaktiere uns
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={contactModalOpen}
        onClose={closeContactModal}
        title="Kontakt"
      >
        <Contact />
      </Modal>
    </header>
  );
};

export default Header;

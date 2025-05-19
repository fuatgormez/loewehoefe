import React, { useState } from "react";
import Modal from "./Modal";
import AboutUs from "./AboutUs";
import Impressum from "./Impressum";
import Datenschutz from "./Datenschutz";
import Contact from "./Contact";

const Footer = () => {
  const [modals, setModals] = useState({
    aboutUs: false,
    impressum: false,
    datenschutz: false,
    contact: false,
  });

  const openModal = (modalName) => {
    setModals({
      ...modals,
      [modalName]: true,
    });
  };

  const closeModal = (modalName) => {
    setModals({
      ...modals,
      [modalName]: false,
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <img
              src="/images/logo-footer.png"
              alt="Löwe Höfe Logo"
              className="footer-logo"
            />
            <p>mit WOW-EFFECT</p>
          </div>

          <div className="footer-column">
            <h3>Links</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal("aboutUs");
                  }}
                >
                  Über Uns
                </a>
              </li>
              <li className="footer-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal("impressum");
                  }}
                >
                  Impressum
                </a>
              </li>
              <li className="footer-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal("datenschutz");
                  }}
                >
                  Datenschutz
                </a>
              </li>
              <li className="footer-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal("contact");
                  }}
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Kontakt</h3>
            <p>Wiebestraße 42-45, 10553 Berlin</p>
            <p>+49(0)30 – 34 50 95 87</p>
            <p>info@loewehoefe.de</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Löwehöfe. All RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Modaller */}
      <Modal
        isOpen={modals.aboutUs}
        onClose={() => closeModal("aboutUs")}
        title="Über Uns"
      >
        <AboutUs />
      </Modal>

      <Modal
        isOpen={modals.impressum}
        onClose={() => closeModal("impressum")}
        title="Impressum"
      >
        <Impressum />
      </Modal>

      <Modal
        isOpen={modals.datenschutz}
        onClose={() => closeModal("datenschutz")}
        title="Datenschutz"
      >
        <Datenschutz />
      </Modal>

      <Modal
        isOpen={modals.contact}
        onClose={() => closeModal("contact")}
        title="Kontakt"
      >
        <Contact />
      </Modal>
    </footer>
  );
};

export default Footer;

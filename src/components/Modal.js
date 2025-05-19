import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // Arka plana tıklandığında modal'ı kapat
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  // ESC tuşuna basıldığında modal'ı kapat
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Modaldayken sayfanın scroll olmasını engelle
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Modal açıldığında animasyon efekti
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.classList.add("modal-open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

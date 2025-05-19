import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  // EmailJS servisini başlatma
  useEffect(() => {
    emailjs.init("I9bY6nDc5ecNRbbvR"); // EmailJS kullanıcı ID'nizi buraya ekleyin
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    message: "",
    isSuccess: false,
    isError: false,
    isSending: false,
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFocused((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocused((prev) => ({
      ...prev,
      [name]: value ? true : false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validasyonu
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: "Bitte füllen Sie alle Pflichtfelder aus.",
        isSuccess: false,
        isError: true,
        isSending: false,
      });
      return;
    }

    // E-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        isSuccess: false,
        isError: true,
        isSending: false,
      });
      return;
    }

    // Gönderim başladı
    setFormStatus({
      message: "Ihre Anfrage wird gesendet...",
      isSuccess: false,
      isError: false,
      isSending: true,
    });

    // EmailJS için hazırlanmış şablon parametreleri
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      phone_number: formData.phone || "Nicht angegeben",
      message: formData.message,
      to_email: "info@loewesaal.de",
      subject: "Von loewehoefe.de - Neue Kontaktanfrage",
    };

    // EmailJS ile e-posta gönderimi
    emailjs
      .send(
        "service_ivreocq", // EmailJS servis ID'nizi buraya ekleyin
        "template_190devi", // EmailJS şablon ID'nizi buraya ekleyin
        templateParams
      )
      .then((response) => {
        // Başarılı gönderim
        setFormStatus({
          message:
            "Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden.",
          isSuccess: true,
          isError: false,
          isSending: false,
        });

        // Formu sıfırla
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Odak durumunu sıfırla
        setFocused({
          name: false,
          email: false,
          phone: false,
          message: false,
        });
      })
      .catch((error) => {
        // Hata durumu
        setFormStatus({
          message:
            "Es gab ein Problem beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.",
          isSuccess: false,
          isError: true,
          isSending: false,
        });
        console.error("Formular senden fehlgeschlagen:", error);
      });
  };

  return (
    <div className="page-content">
      <h1>Jetzt Anfragen</h1>

      <div className="contact-info">
        <div className="contact-details">
          <h2>Unsere Kontaktdaten</h2>
          <p>
            <strong>Loewe Saal GmbH</strong>
            <br />
            Wiebestraße 42-45
            <br />
            10553 Berlin
          </p>
          <p>
            <strong>Telefon:</strong>{" "}
            <a href="tel:+4930345095">+49(0)30 – 34 50 95 87</a>
            <br />
            <strong>WhatsApp:</strong>{" "}
            <a href="https://wa.me/491707791913">+49 170 7791913</a>
            <br />
            <strong>E-Mail:</strong>{" "}
            <a href="mailto:info@loewesaal.de">info@loewesaal.de</a>
          </p>
          <p>
            <strong>Öffnungszeiten:</strong>
            <br />
            Montag bis Freitag: 10:00 - 15:00 Uhr
          </p>
        </div>

        <div className="contact-form-container">
          <h2>Anfrage-Formular</h2>
          <p>
            Sie können uns auch gerne über unser Anfrage-Formular eine Nachricht
            senden:
          </p>

          {formStatus.message && (
            <div
              className={`form-message ${
                formStatus.isSuccess
                  ? "success"
                  : formStatus.isError
                  ? "error"
                  : "info"
              }`}
            >
              {formStatus.message}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className={`form-group ${focused.name ? "focused" : ""}`}>
              <label htmlFor="name" className={formData.name ? "active" : ""}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                placeholder="Ihr Name"
                disabled={formStatus.isSending}
              />
            </div>

            <div className={`form-group ${focused.email ? "focused" : ""}`}>
              <label htmlFor="email" className={formData.email ? "active" : ""}>
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                placeholder="Ihre E-Mail-Adresse"
                disabled={formStatus.isSending}
              />
            </div>

            <div className={`form-group ${focused.phone ? "focused" : ""}`}>
              <label htmlFor="phone" className={formData.phone ? "active" : ""}>
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Ihre Telefonnummer"
                disabled={formStatus.isSending}
              />
            </div>

            <div className={`form-group ${focused.message ? "focused" : ""}`}>
              <label
                htmlFor="message"
                className={formData.message ? "active" : ""}
              >
                Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                placeholder="Ihre Nachricht an uns"
                disabled={formStatus.isSending}
              ></textarea>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="submit-button"
                disabled={formStatus.isSending}
              >
                <span>
                  {formStatus.isSending
                    ? "Wird gesendet..."
                    : "Anfrage absenden"}
                </span>
                {!formStatus.isSending && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "8px" }}
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { sendBookingEmails } from '../utils/emailService';

function Catering({ lang = 'en' }) {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(lang || i18n.language || 'en');
  const formRef = useRef(null);

  useEffect(() => {
    setCurrentLang(lang || i18n.language || 'en');
  }, [lang, i18n.language]);

  const tx = (en, fa, es) =>
    currentLang === 'fa' ? fa : currentLang === 'es' ? es : en;

  const cateringHeroImage = '/images/catering-hero.jpg';

  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '',
    location: '', guests: '25', notes: '', service: 'full',
  });

  const [status, setStatus] = useState({
    submitted: false,
    sending: false,
    error: false,
    errorMessage: '',
  });

  const [phoneError, setPhoneError] = useState('');

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow digits, limit to 10
      const numbers = value.replace(/\D/g, '').slice(0, 10);
      setForm({ ...form, phone: formatPhoneNumber(numbers) });
      
      // Real-time validation
      if (numbers.length > 0 && numbers.length < 10) {
        setPhoneError(tx(
          'Phone number must be exactly 10 digits',
          'شماره تماس باید دقیقاً ۱۰ رقم باشد',
          'El teléfono debe tener exactamente 10 dígitos'
        ));
      } else {
        setPhoneError('');
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get raw phone numbers for validation
    const phoneNumbers = form.phone.replace(/\D/g, '');
    
    // Validate phone number
    if (phoneNumbers.length !== 10) {
      setStatus({
        submitted: false, sending: false, error: true,
        errorMessage: tx(
          'Phone number must be exactly 10 digits',
          'شماره تماس باید دقیقاً ۱۰ رقم باشد',
          'El teléfono debe tener exactamente 10 dígitos'
        )
      });
      return;
    }

    setStatus({ submitted: false, sending: true, error: false, errorMessage: '' });

    const serviceLabels = {
      full: tx('Full Service Catering', 'سرویس کامل کترینگ', 'Servicio Completo de Catering'),
      dropoff: tx('Drop-Off Delivery', 'تحویل در محل', 'Entrega a Domicilio'),
      custom: tx('Custom Package', 'بسته سفارشی', 'Paquete Personalizado'),
    };

    const emailData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      date: form.date,
      time: form.time,
      location: form.location,
      guests: form.guests,
      serviceType: serviceLabels[form.service],
      notes: form.notes,
    };

    try {
      await sendBookingEmails('CATERING', emailData);

      setStatus({ submitted: true, sending: false, error: false, errorMessage: '' });

      // Keep email visible in success message, clear form after delay
      const customerEmail = form.email;
      setTimeout(() => {
        setStatus({ submitted: false, sending: false, error: false, errorMessage: '' });
        setForm({
          name: '', phone: '', email: '', date: '', time: '',
          location: '', guests: '25', notes: '', service: 'full'
        });
      }, 12000);

      // Preserve email for success message display
      setForm(prev => ({ ...prev, email: customerEmail }));

    } catch (err) {
      console.error('Catering email error:', err);
      setStatus({
        submitted: false,
        sending: false,
        error: true,
        errorMessage: tx(
          'Unable to send request. Please call us directly: (916) 804-7220',
          'ارسال ناموفق بود. لطفاً مستقیماً تماس بگیرید: ۹۱۶-۸۰۴-۷۲۲۰',
          'Error al enviar. Por favor llámenos: (916) 804-7220'
        ),
      });
    }
  };

  const servingData = [
    { guests: '10–20', app: '2–3', main: '2', rice: '1', dessert: '1' },
    { guests: '25–50', app: '4–6', main: '4', rice: '2', dessert: '2' },
    { guests: '50–75', app: '7–9', main: '6', rice: '3', dessert: '2' },
    { guests: '75–100', app: '10–12', main: '8', rice: '4', dessert: '3' },
    { guests: '100–150', app: '14–18', main: '12', rice: '6', dessert: '4' },
    { guests: '150–200', app: '20–24', main: '16', rice: '8', dessert: '5' },
    { guests: '200–300', app: '28–35', main: '22', rice: '11', dessert: '7' },
    { guests: '300–500', app: '40–60', main: '35', rice: '18', dessert: '12' },
    { guests: '500–750', app: '70–90', main: '55', rice: '28', dessert: '18' },
    { guests: '750–1000', app: '100+', main: '75+', rice: '40+', dessert: '25+' },
  ];

  return (
    <div className="catering-page">
      <style>{`
        .catering-page { width: 100%; background: var(--lapis-deep); color: var(--ivory); min-height: 100vh; }

        /* ============ HERO SECTION ============ */
        .catering-hero {
          position: relative; width: 100%; height: 65vh; min-height: 460px;
          overflow: hidden; display: flex; align-items: center; justify-content: center; text-align: center;
        }
        .catering-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }
        .catering-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(19,31,61,0.6) 0%, rgba(19,31,61,0.9) 100%); z-index: 1;
        }
        .catering-hero-content { position: relative; z-index: 2; max-width: 880px; padding: 0 1.5rem; }
        .catering-chapter {
          display: inline-block; font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--saffron-soft); margin-bottom: 1.25rem;
        }
        .catering-hero-title {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4.75rem);
          color: var(--saffron); margin: 0 0 1.25rem;
          text-shadow: 0 4px 30px rgba(0,0,0,0.8); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
        }
        .catering-hero-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(1.05rem, 1.6vw, 1.3rem); color: var(--ivory); line-height: 1.7; max-width: 740px; margin: 0 auto;
        }

        /* ============ FEATURE CARDS ============ */
        .catering-features {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem; padding: 5rem 2rem; max-width: 1200px; margin: 0 auto;
        }
        .feature-card {
          position: relative; text-align: center; padding: 3rem 1.75rem 2.5rem;
          border: 1px solid rgba(227, 167, 47, 0.22); background: rgba(255,255,255,0.02);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .feature-card:hover { transform: translateY(-4px); border-color: rgba(227, 167, 47, 0.55); }
        .feature-card .corner { position: absolute; width: 22px; height: 22px; color: var(--saffron); }
        .feature-card .corner.tl { top: 8px; left: 8px; }
        .feature-card .corner.tr { top: 8px; right: 8px; }
        .feature-card .corner.bl { bottom: 8px; left: 8px; }
        .feature-card .corner.br { bottom: 8px; right: 8px; }
        .feature-card h3 { font-family: 'Cormorant Garamond', serif; color: var(--saffron); font-size: 1.55rem; margin: 0.75rem 0 0.5rem; font-weight: 600; }
        .feature-card p { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; line-height: 1.7; color: var(--parchment); margin: 0; }
        .feature-icon { color: var(--saffron); display: flex; justify-content: center; margin-bottom: 0.5rem; }

        /* ============ RESERVATION FORM ============ */
        .reservation-card {
          max-width: 820px; margin: 2rem auto 4rem;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(227, 167, 47, 0.28);
          padding: 3rem 2.25rem; position: relative; border-radius: 8px;
        }
        .reservation-title {
          font-family: 'Cormorant Garamond', serif; color: var(--saffron);
          font-size: clamp(1.75rem, 4vw, 2.5rem); text-align: center; margin: 0 0 0.5rem;
          text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
        }
        .reservation-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          text-align: center; color: var(--parchment); margin: 0 0 2rem; font-size: 1.1rem;
        }

        /* STATUS BANNERS */
        .success-banner {
          background: rgba(45,106,95,0.2); border: 1px solid rgba(45,106,95,0.6);
          color: #a9d4c8; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;
          font-family: 'Cormorant Garamond', serif; font-size: 1.05rem;
          border-radius: 6px; animation: slideIn 0.3s ease; line-height: 1.7;
        }
        .success-banner strong { display: block; font-size: 1.25rem; margin-bottom: 0.5rem; font-style: normal; color: #b5e6d8; }
        .error-banner {
          background: rgba(156,34,48,0.2); border: 1px solid rgba(156,34,48,0.6);
          color: #f4a0a8; padding: 1.25rem; text-align: center; margin-bottom: 1.5rem;
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.05rem;
          border-radius: 6px; animation: slideIn 0.3s ease;
        }

        /* FORM STYLING */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; }
        .form-group.full { grid-column: 1 / -1; }
        .form-group label {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.9rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--saffron-soft); margin-bottom: 0.5rem;
        }
        .form-group input, .form-group select, .form-group textarea {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(227, 167, 47, 0.4);
          border-radius: 6px; color: var(--ivory); padding: 0.85rem 1rem;
          font-size: 0.95rem; font-family: 'Inter', sans-serif;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s; width: 100%;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(227, 167, 47, 0.15); background: rgba(255,255,255,0.12);
        }
        .form-group input.error { border-color: rgba(156,34,48,0.8); }
        .field-error { 
          color: #f4a0a8; font-size: 0.85rem; margin-top: 0.5rem; 
          font-family: 'Cormorant Garamond', serif; font-style: italic; 
        }
        .form-group textarea { resize: vertical; min-height: 110px; }

        .submit-btn {
          grid-column: 1 / -1; background: var(--saffron); color: var(--lapis-deep);
          border: 1px solid var(--saffron); padding: 1rem 2.25rem;
          font-family: 'Cormorant Garamond', serif; font-size: 1rem;
          letter-spacing: 0.25em; text-transform: uppercase; font-weight: 600;
          cursor: pointer; transition: all 0.3s ease; margin-top: 1rem;
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          border-radius: 4px;
        }
        .submit-btn:hover:not(:disabled) { background: var(--saffron-soft); transform: translateY(-2px); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        /* ============ OTHER SECTIONS ============ */
        .view-menu-wrap { text-align: center; margin: 2rem 0 5rem; }
        .view-menu-btn {
          display: inline-block; background: transparent; color: var(--saffron);
          border: 1px solid var(--saffron); padding: 1rem 2.25rem;
          font-family: 'Cormorant Garamond', serif; font-size: 0.95rem;
          letter-spacing: 0.25em; text-transform: uppercase; font-weight: 600;
          text-decoration: none; transition: all 0.3s ease; border-radius: 4px;
        }
        .view-menu-btn:hover { background: rgba(227, 167, 47, 0.12); transform: translateY(-2px); }

        .serving-guide { max-width: 1100px; margin: 0 auto 5rem; padding: 0 2rem; }
        .serving-title {
          font-family: 'Cormorant Garamond', serif; color: var(--saffron);
          font-size: clamp(1.75rem, 4vw, 2.5rem); text-align: center; margin: 0 0 0.5rem;
          text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
        }
        .serving-note {
          text-align: center; color: var(--parchment); font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1.05rem; margin: 0 auto 2rem; max-width: 700px;
        }
        .serving-table-wrap { overflow-x: auto; }
        .serving-table {
          width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(227, 167, 47, 0.3); font-family: 'Cormorant Garamond', serif;
        }
        .serving-table th, .serving-table td {
          padding: 0.95rem 1rem; text-align: center;
          border-bottom: 1px solid rgba(227, 167, 47, 0.18); font-size: 1rem; color: var(--ivory);
        }
        .serving-table th {
          background: rgba(227, 167, 47, 0.12); color: var(--saffron);
          text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.85rem; font-weight: 600;
        }
        .serving-table tbody tr:nth-child(even) { background: rgba(255,255,255,0.025); }
        .serving-table tbody tr:hover { background: rgba(227, 167, 47, 0.08); }

        .catering-contact {
          max-width: 820px; margin: 0 auto 5rem; padding: 3rem 2rem; text-align: center;
          background: radial-gradient(ellipse at top, rgba(156, 34, 48, 0.18) 0%, transparent 70%);
          border: 1px solid rgba(227, 167, 47, 0.25); border-radius: 8px;
        }
        .catering-contact h3 {
          font-family: 'Cormorant Garamond', serif; color: var(--saffron);
          font-size: clamp(1.5rem, 3vw, 2rem); margin: 0 0 1rem;
          text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
        }
        .catering-contact p { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--parchment); margin: 0 0 1.5rem; font-size: 1.1rem; }
        .catering-contact-links { display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; }
        .catering-contact-links a { color: var(--saffron); text-decoration: none; font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; letter-spacing: 0.05em; }
        .catering-contact-links a:hover { color: var(--saffron-soft); }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .catering-hero { height: 50vh; min-height: 320px; }
          .reservation-card { padding: 1.8rem 1.2rem; margin: 1.5rem 0.5rem 3rem; }
          .form-grid { grid-template-columns: 1fr; gap: 1rem; }
          .form-group input, .form-group select, .form-group textarea { padding: 0.75rem 0.9rem; font-size: 0.9rem; }
          .submit-btn { padding: 0.85rem 1.8rem; font-size: 0.9rem; letter-spacing: 0.2em; }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="catering-hero">
        <div className="catering-hero-bg" style={{ backgroundImage: `url('${cateringHeroImage}')` }} />
        <div className="catering-hero-overlay" />
        <div className="catering-hero-content">
          <span className="catering-chapter">
            {tx('— Celebrate With Us —', '— با ما جشن بگیرید —', '— Celebra Con Nosotros —')}
          </span>
          <h1 className="catering-hero-title">
            {tx('Catering & Events', 'کترینگ و مراسم', 'Catering y Eventos')}
          </h1>
          <p className="catering-hero-sub">
            {tx(
              'For more than twenty-five years we have brought our table to weddings, gatherings, and quiet office lunches across Sacramento. No event is too grand, none too humble.',
              'بیش از بیست و پنج سال است که سفره‌ی خود را به عروسی‌ها، مهمانی‌ها و ناهارهای آرام دفتری در ساکرامنتو می‌بریم. هیچ مراسمی برای ما بزرگ نیست و هیچ‌کدام کوچک.',
              'Durante más de veinticinco años hemos llevado nuestra mesa a bodas, reuniones y tranquilos almuerzos de oficina en Sacramento. Ningún evento es demasiado grande, ninguno demasiado humilde.'
            )}
          </p>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="catering-features">
        <Feature
          title={tx('Full Service', 'سرویس کامل', 'Servicio Completo')}
          text={tx(
            'On-site setup, attentive servers, and a clean kitchen left behind so you can be a guest at your own celebration.',
            'چیدمان در محل، پیشخدمت‌های با‌توجه و آشپزخانه‌ای تمیز پس از مراسم تا شما خود مهمان جشن خویش باشید.',
            'Montaje en el lugar, meseros atentos y una cocina limpia para que sea un invitado en su propia celebración.'
          )}
          icon={<svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="32" cy="32" r="22" /><path d="M22 32 L42 32 M32 22 L32 42" /><circle cx="32" cy="32" r="3" fill="currentColor" /></svg>}
        />
        <Feature
          title={tx('Drop-Off', 'تحویل در محل', 'Entrega')}
          text={tx(
            'Hot trays of saffron rice, charcoal kabobs, and fresh naan delivered ready-to-serve, on the hour you need them.',
            'سینی‌های گرم برنج زعفرانی، کباب ذغالی و نان تازه، آماده‌ی سرو، در همان ساعتی که می‌خواهید.',
            'Bandejas calientes de arroz con azafrán, kebabs a la brasa y pan fresco entregadas listas para servir, a la hora que las necesite.'
          )}
          icon={<svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="10" y="22" width="44" height="28" /><path d="M10 32 L54 32" /><path d="M22 22 L22 14 L42 14 L42 22" /></svg>}
        />
        <Feature
          title={tx('Custom Menus', 'منوی سفارشی', 'Menús Personalizados')}
          text={tx(
            'A menu shaped to your event — vegetarian, halal, gluten-free, or simply your grandmother\'s favorite stew.',
            'منویی متناسب با مراسم شما — گیاهی، حلال، بدون گلوتن، یا حتی خورش مورد علاقه‌ی مادربزرگتان.',
            'Un menú a medida — vegetariano, halal, sin gluten, o simplemente el estofado favorito de su abuela.'
          )}
          icon={<svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 12 L48 12 L48 52 L16 52 Z" /><path d="M22 22 L42 22 M22 30 L42 30 M22 38 L36 38" /></svg>}
        />
      </section>

      {/* CATERING REQUEST FORM */}
      <section className="reservation-card">
        <h2 className="reservation-title">
          {tx('Request Catering', 'درخواست کترینگ', 'Solicitar Catering')}
        </h2>
        <p className="reservation-sub">
          {tx(
            'Tell us about your event — we will reply within 12 hours and send you a beautiful confirmation email.',
            'درباره‌ی مراسم خود به ما بگویید — ظرف ۱۲ ساعت پاسخ می‌دهیم و ایمیل تأیید زیبا ارسال می‌کنیم.',
            'Cuéntenos sobre su evento — le responderemos en 12 horas y le enviaremos un email de confirmación hermoso.'
          )}
        </p>

        {status.submitted && (
          <div className="success-banner">
            <strong>✓ {tx('Catering Request Sent Successfully!', 'درخواست کترینگ با موفقیت ارسال شد!', '¡Solicitud de Catering Enviada!')}</strong>
            {tx(
              `We have sent a confirmation email to ${form.email}. Our catering team will get back to you within 12 hours to discuss your event details and create a custom menu proposal.`,
              `ایمیل تأیید به ${form.email} ارسال کردیم. تیم کترینگ ما ظرف ۱۲ ساعت با شما تماس می‌گیرد تا جزئیات مراسم و پیشنهاد منوی سفارشی را بررسی کند.`,
              `Enviamos un email de confirmación a ${form.email}. Nuestro equipo de catering le contactará en 12 horas para discutir los detalles y crear una propuesta de menú personalizada.`
            )}
          </div>
        )}

        {status.error && (
          <div className="error-banner">
            ⚠️ {status.errorMessage}
          </div>
        )}

        <form className="form-grid" onSubmit={handleSubmit} ref={formRef}>
          <div className="form-group">
            <label>{tx('Full Name', 'نام و نام خانوادگی', 'Nombre Completo')}</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              placeholder={tx('Your full name', 'نام کامل شما', 'Su nombre completo')} 
            />
          </div>
          <div className="form-group">
            <label>{tx('Phone Number (10 Digits)', 'شماره تماس (۱۰ رقم)', 'Teléfono (10 Dígitos)')}</label>
            <input 
              type="tel" 
              name="phone" 
              value={form.phone} 
              onChange={handleChange} 
              required 
              placeholder="(916) 000-0000" 
              className={phoneError ? 'error' : ''}
            />
            {phoneError && <span className="field-error">{phoneError}</span>}
          </div>
          <div className="form-group full">
            <label>{tx('Email Address', 'آدرس ایمیل', 'Correo Electrónico')}</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              placeholder={tx(
                'your@email.com — confirmation will be sent here', 
                'your@email.com — تأییدیه به این آدرس ارسال می‌شود', 
                'your@email.com — confirmación enviada aquí'
              )} 
            />
          </div>
          <div className="form-group">
            <label>{tx('Event Date', 'تاریخ مراسم', 'Fecha del Evento')}</label>
            <input 
              type="date" 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              required 
              min={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <div className="form-group">
            <label>{tx('Event Time', 'ساعت مراسم', 'Hora del Evento')}</label>
            <input 
              type="time" 
              name="time" 
              value={form.time} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group full">
            <label>{tx('Event Location', 'محل مراسم', 'Lugar del Evento')}</label>
            <input 
              type="text" 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              required 
              placeholder={tx(
                'Venue name and full address', 
                'نام و آدرس کامل مکان', 
                'Nombre del lugar y dirección completa'
              )} 
            />
          </div>
          <div className="form-group">
            <label>{tx('Number of Guests', 'تعداد مهمانان', 'Número de Invitados')}</label>
            <input 
              type="number" 
              name="guests" 
              min="10" 
              max="2000" 
              value={form.guests} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>{tx('Preferred Service', 'نوع سرویس', 'Servicio Preferido')}</label>
            <select name="service" value={form.service} onChange={handleChange}>
              <option value="full">{tx('Full Service Catering', 'سرویس کامل کترینگ', 'Servicio Completo de Catering')}</option>
              <option value="dropoff">{tx('Drop-Off Delivery', 'تحویل در محل', 'Entrega a Domicilio')}</option>
              <option value="custom">{tx('Custom Package', 'بسته سفارشی', 'Paquete Personalizado')}</option>
            </select>
          </div>
          <div className="form-group full">
            <label>{tx('Notes & Special Requests', 'یادداشت و درخواست‌های ویژه', 'Notas y Solicitudes Especiales')}</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder={tx(
                'Dietary restrictions, menu preferences, setup requirements, special occasions details...',
                'محدودیت‌های غذایی، ترجیحات منو، نیازمندی‌های چیدمان، جزئیات مناسبت‌های ویژه...',
                'Restricciones dietéticas, preferencias de menú, requisitos de montaje, detalles de ocasiones especiales...'
              )}
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={status.sending}>
            {status.sending
              ? <>{tx('⏳ Sending Emails...', '⏳ در حال ارسال ایمیل‌ها...', '⏳ Enviando Correos...')}</>
              : <>{tx('📧 Submit & Get Instant Confirmation', '📧 ارسال و دریافت فوری تأییدیه', '📧 Enviar y Recibir Confirmación Instantánea')}</>
            }
          </button>
        </form>
      </section>

      {/* VIEW MENU LINK */}
      <div className="view-menu-wrap">
        <Link to="/menu" className="view-menu-btn">
          {tx('View Our Complete Menu', 'مشاهده‌ی منوی کامل', 'Ver Nuestro Menú Completo')}
        </Link>
      </div>

      {/* SERVING GUIDE TABLE */}
      <section className="serving-guide">
        <h2 className="serving-title">{tx('Serving Guide', 'راهنمای سرو', 'Guía de Porciones')}</h2>
        <p className="serving-note">
          {tx(
            'Recommended tray counts based on guest count. Our team will adjust portions based on your specific event needs and menu preferences.',
            'تعداد سینی‌های پیشنهادی بر اساس تعداد مهمانان. تیم ما بر اساس نیازهای ویژه مراسم و ترجیحات منوی شما، مقادیر را تنظیم می‌کند.',
            'Cantidades recomendadas según el número de invitados. Nuestro equipo ajustará las porciones según las necesidades específicas de su evento.'
          )}
        </p>
        <div className="serving-table-wrap">
          <table className="serving-table">
            <thead>
              <tr>
                <th>{tx('Guests', 'مهمانان', 'Invitados')}</th>
                <th>{tx('Appetizers', 'پیش‌غذا', 'Aperitivos')}</th>
                <th>{tx('Main Trays', 'غذای اصلی', 'Platos Principales')}</th>
                <th>{tx('Rice', 'برنج', 'Arroz')}</th>
                <th>{tx('Dessert', 'دسر', 'Postre')}</th>
              </tr>
            </thead>
            <tbody>
              {servingData.map((row, i) => (
                <tr key={i}>
                  <td>{row.guests}</td>
                  <td>{row.app}</td>
                  <td>{row.main}</td>
                  <td>{row.rice}</td>
                  <td>{row.dessert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="catering-contact">
        <h3>{tx('Ready to Plan Your Perfect Event?', 'آماده برنامه‌ریزی مراسم عالی خود هستید؟', '¿Listo para Planificar Su Evento Perfecto?')}</h3>
        <p>{tx(
          'Call, email, or visit us — our experienced catering team will help you create an unforgettable Persian feast.',
          'تماس بگیرید، ایمیل بزنید یا به ما سر بزنید — تیم با تجربه کترینگ ما کمک می‌کند ضیافت فراموش‌نشدنی ایرانی برایتان بچینیم.',
          'Llámenos, escríbanos o visítenos — nuestro equipo experimentado de catering le ayudará a crear un banquete persa inolvidable.'
        )}</p>
        <div className="catering-contact-links">
          <a href="tel:+19168047220">📞 (916) 804-7220</a>
          <a href="mailto:famouskabob1@gmail.com">✉️ famouskabob1@gmail.com</a>
          <a href="https://maps.google.com/?q=1290+Fulton+Ave+Sacramento+CA">📍 Visit Our Restaurant</a>
        </div>
      </section>
    </div>
  );
}

// Feature and Corner components
function Feature({ icon, title, text }) {
  return (
    <article className="feature-card">
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Corner({ pos }) {
  const paths = {
    tl: 'M0 12 Q0 0 12 0',
    tr: 'M30 12 Q30 0 18 0',
    bl: 'M0 18 Q0 30 12 30',
    br: 'M30 18 Q30 30 18 30',
  };
  const dots = {
    tl: { cx: 6, cy: 6 },
    tr: { cx: 24, cy: 6 },
    bl: { cx: 6, cy: 24 },
    br: { cx: 24, cy: 24 },
  };
  return (
    <svg className={`corner ${pos}`} viewBox="0 0 30 30" aria-hidden="true">
      <path d={paths[pos]} stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx={dots[pos].cx} cy={dots[pos].cy} r="1.5" fill="currentColor" />
    </svg>
  );
}

export default Catering;

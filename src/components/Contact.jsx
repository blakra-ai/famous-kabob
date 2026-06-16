import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sendBookingEmails } from '../utils/emailService';

function Contact({ lang = 'en' }) {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(lang || i18n.language || 'en');

  useEffect(() => {
    setCurrentLang(lang || i18n.language || 'en');
  }, [lang, i18n.language]);

  const tx = (en, fa, es) =>
    currentLang === 'fa' ? fa : currentLang === 'es' ? es : en;

  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', guests: '2', notes: ''
  });

  const [status, setStatus] = useState({
    submitted: false, sending: false, error: false, errorMessage: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [timeError, setTimeError] = useState('');

  // Format phone number as user types - EXACTLY 10 digits required
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow digits, limit to exactly 10
      const numbers = value.replace(/\D/g, '').slice(0, 10);
      setForm({ ...form, phone: formatPhoneNumber(numbers) });
      
      // Real-time validation for exactly 10 digits
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

    if (name === 'time') {
      setForm({ ...form, time: value });
      
      // Validate time is between 11:00 AM and 8:30 PM
      if (value && (value < "11:00" || value > "20:30")) {
        setTimeError(tx(
          'Reservations are only available between 11:00 AM and 8:30 PM',
          'رزرو فقط بین ۱۱:۰۰ صبح تا ۸:۳۰ شب امکان‌پذیر است',
          'Las reservas solo están disponibles entre 11:00 AM y 8:30 PM'
        ));
      } else {
        setTimeError('');
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate exactly 10 digits
    const phoneNumbers = form.phone.replace(/\D/g, '');
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

    // Validate time range 11:00 AM to 8:30 PM
    if (form.time < "11:00" || form.time > "20:30") {
      setStatus({
        submitted: false, sending: false, error: true,
        errorMessage: tx(
          'Reservations are only available between 11:00 AM and 8:30 PM',
          'رزرو فقط بین ۱۱:۰۰ صبح تا ۸:۳۰ شب امکان‌پذیر است',
          'Las reservas solo están disponibles entre 11:00 AM y 8:30 PM'
        )
      });
      return;
    }

    setStatus({ submitted: false, sending: true, error: false, errorMessage: '' });

    const emailData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      date: form.date,
      time: form.time,
      guests: form.guests,
      notes: form.notes,
      serviceType: tx('Dine-in Reservation', 'رزرو میز', 'Reservación para Cenar'),
      location: tx('Famous Kabob Restaurant', 'رستوران فیمس کباب', 'Restaurante Famous Kabob'),
    };

    try {
      await sendBookingEmails('TABLE', emailData);

      setStatus({ submitted: true, sending: false, error: false, errorMessage: '' });

      const customerEmail = form.email;
      setTimeout(() => {
        setStatus({ submitted: false, sending: false, error: false, errorMessage: '' });
        setForm({ name: '', phone: '', email: '', date: '', time: '', guests: '2', notes: '' });
      }, 10000);

      setForm(prev => ({ ...prev, email: customerEmail }));

    } catch (err) {
      console.error('Table reservation email error:', err);
      setStatus({
        submitted: false, sending: false, error: true,
        errorMessage: tx(
          'Unable to send reservation. Please call us directly: (916) 804-7220',
          'ارسال رزرو ناموفق بود. لطفاً مستقیماً تماس بگیرید: ۹۱۶-۸۰۴-۷۲۲۰',
          'No se pudo enviar la reserva. Por favor llámenos: (916) 804-7220'
        )
      });
    }
  };

  return (
    <div className="contact-page">
      <style>{`
        .contact-page { 
          width: 100%; 
          background: var(--lapis-deep); 
          color: var(--ivory); 
          min-height: 100vh; 
          padding: 6rem 1.5rem; 
        }
        .contact-container { 
          max-width: 800px; 
          margin: 0 auto; 
          background: rgba(255,255,255,0.03); 
          border: 1px solid rgba(227, 167, 47, 0.28); 
          padding: 3rem; 
          border-radius: 8px; 
        }
        .contact-title { 
          font-family: 'Cormorant Garamond', serif; 
          color: var(--saffron); 
          font-size: clamp(2rem, 5vw, 3rem); 
          text-align: center; 
          margin-bottom: 0.5rem; 
          text-transform: uppercase; 
          letter-spacing: 0.05em; 
          font-weight: 600;
        }
        .contact-sub { 
          text-align: center; 
          color: var(--parchment); 
          font-style: italic; 
          margin-bottom: 2rem; 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 1.1rem; 
        }
        .success-banner { 
          background: rgba(45,106,95,0.2); 
          border: 1px solid rgba(45,106,95,0.6); 
          color: #a9d4c8; 
          padding: 1.5rem; 
          text-align: center; 
          margin-bottom: 1.5rem; 
          font-family: 'Cormorant Garamond', serif; 
          border-radius: 6px; 
          line-height: 1.7;
        }
        .success-banner strong { 
          display: block; 
          font-size: 1.25rem; 
          margin-bottom: 0.5rem; 
          font-style: normal; 
          color: #b5e6d8; 
        }
        .error-banner { 
          background: rgba(156,34,48,0.2); 
          border: 1px solid rgba(156,34,48,0.6); 
          color: #f4a0a8; 
          padding: 1.25rem; 
          text-align: center; 
          margin-bottom: 1.5rem; 
          font-family: 'Cormorant Garamond', serif; 
          border-radius: 6px; 
        }
        .form-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 1.25rem; 
        }
        .form-group { 
          display: flex; 
          flex-direction: column; 
        }
        .form-group.full { 
          grid-column: 1 / -1; 
        }
        .form-group label { 
          font-family: 'Cormorant Garamond', serif; 
          font-style: italic; 
          font-size: 0.9rem; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: var(--saffron-soft); 
          margin-bottom: 0.5rem; 
        }
        .form-group input, .form-group textarea { 
          background: rgba(255,255,255,0.08); 
          border: 1px solid rgba(227, 167, 47, 0.4); 
          border-radius: 6px; 
          color: var(--ivory); 
          padding: 0.85rem 1rem; 
          font-size: 0.95rem; 
          font-family: 'Inter', sans-serif; 
          width: 100%; 
          transition: all 0.3s; 
        }
        .form-group input:focus, .form-group textarea:focus { 
          outline: none; 
          border-color: var(--saffron); 
          box-shadow: 0 0 0 3px rgba(227, 167, 47, 0.15); 
          background: rgba(255,255,255,0.12); 
        }
        .form-group input.error { 
          border-color: rgba(156,34,48,0.8); 
        }
        .field-error { 
          color: #f4a0a8; 
          font-size: 0.85rem; 
          margin-top: 0.5rem; 
          font-family: 'Cormorant Garamond', serif; 
          font-style: italic; 
        }
        .form-group textarea { 
          resize: vertical; 
          min-height: 100px; 
        }
        .time-hint {
          font-size: 0.8rem; 
          color: var(--saffron-soft); 
          margin-top: 0.3rem;
          font-family: 'Cormorant Garamond', serif; 
          font-style: italic;
        }
        .submit-btn { 
          grid-column: 1 / -1; 
          background: var(--saffron); 
          color: var(--lapis-deep); 
          border: none; 
          padding: 1rem 2.25rem; 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 1rem; 
          letter-spacing: 0.25em; 
          text-transform: uppercase; 
          font-weight: 600;
          cursor: pointer; 
          border-radius: 4px; 
          transition: all 0.3s; 
          margin-top: 1rem; 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          gap: 0.5rem;
        }
        .submit-btn:hover:not(:disabled) { 
          background: var(--saffron-soft); 
          transform: translateY(-2px); 
        }
        .submit-btn:disabled { 
          opacity: 0.7; 
          cursor: not-allowed; 
          transform: none; 
        }
        @media (max-width: 640px) {
          .contact-container { 
            padding: 2rem 1.5rem; 
          }
          .form-grid { 
            grid-template-columns: 1fr; 
          }
        }
      `}</style>

      <div className="contact-container">
        <h1 className="contact-title">{tx('Reserve a Table', 'رزرو میز', 'Reservar una Mesa')}</h1>
        <p className="contact-sub">
          {tx(
            'Join us for an unforgettable Persian dining experience. We will get back to you within 30 minutes to 1 hour.',
            'برای یک تجربه فراموش‌نشدنی غذای ایرانی به ما بپیوندید. ظرف ۳۰ دقیقه تا ۱ ساعت پاسخ می‌دهیم.',
            'Únase a nosotros para una experiencia gastronómica persa inolvidable. Le responderemos en 30 minutos a 1 hora.'
          )}
        </p>

        {status.submitted && (
          <div className="success-banner">
            <strong>
              ✓ {tx('Table Reservation Sent!', 'رزرو میز ارسال شد!', '¡Reservación de Mesa Enviada!')}
            </strong>
            {tx(
              `We sent a confirmation email to ${form.email}. Our team will get back to you within 30 minutes to 1 hour to confirm your table.`,
              `ایمیل تأیید به ${form.email} ارسال شد. تیم ما ظرف ۳۰ دقیقه تا ۱ ساعت برای تأیید میز با شما تماس می‌گیرد.`,
              `Enviamos un email de confirmación a ${form.email}. Nuestro equipo le contactará en 30 minutos a 1 hora para confirmar su mesa.`
            )}
          </div>
        )}

        {status.error && <div className="error-banner">⚠️ {status.errorMessage}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{tx('Full Name', 'نام کامل', 'Nombre Completo')}</label>
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
            <label>{tx('Reservation Date', 'تاریخ رزرو', 'Fecha de Reservación')}</label>
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
            <label>{tx('Preferred Time', 'ساعت مورد نظر', 'Hora Preferida')}</label>
            <input 
              type="time" 
              name="time" 
              value={form.time} 
              onChange={handleChange} 
              required 
              min="11:00"
              max="20:30"
              className={timeError ? 'error' : ''}
            />
            <span className="time-hint">
              {tx('Available: 11:00 AM - 8:30 PM', 'ساعت کاری: ۱۱:۰۰ صبح - ۸:۳۰ شب', 'Disponible: 11:00 AM - 8:30 PM')}
            </span>
            {timeError && <span className="field-error">{timeError}</span>}
          </div>
          <div className="form-group full">
            <label>{tx('Number of Guests', 'تعداد مهمانان', 'Número de Invitados')}</label>
            <input 
              type="number" 
              name="guests" 
              min="1" 
              max="30" 
              value={form.guests} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group full">
            <label>{tx('Special Requests & Notes', 'درخواست‌های ویژه و یادداشت', 'Peticiones Especiales y Notas')}</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder={tx(
                'Anniversary celebration, high chair needed, dietary restrictions, window seat preference...',
                'جشن سالگرد، نیاز به صندلی کودک، محدودیت‌های غذایی، ترجیح صندلی کنار پنجره...',
                'Celebración de aniversario, silla alta necesaria, restricciones dietéticas, preferencia de asiento junto a ventana...'
              )}
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={status.sending}>
            {status.sending
              ? <>{tx('⏳ Sending...', '⏳ در حال ارسال...', '⏳ Enviando...')}</>
              : <>{tx('📧 Reserve Table & Get Confirmation', '📧 رزرو میز و دریافت تأییدیه', '📧 Reservar Mesa y Obtener Confirmación')}</>
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

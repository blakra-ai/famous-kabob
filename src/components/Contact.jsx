import React, { useState } from 'react';

function Contact({ lang = 'en' }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', time: '', guests: '2', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const tx = (en, fa, es) => (lang === 'fa' ? fa : lang === 'es' ? es : en);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="contact-page">
      <style>{`
        .contact-page {
          width: 100%; background: var(--lapis-deep); color: var(--ivory);
          padding: 5rem 2rem 6rem; min-height: 100vh;
        }
        .contact-header { text-align: center; max-width: 720px; margin: 0 auto 4rem; }
        .contact-chapter {
          display: inline-block; font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--saffron-soft); margin-bottom: 1rem;
        }
        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.25rem, 5vw, 3.75rem);
          color: var(--saffron); margin: 0 0 1rem;
          letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600;
        }
        .contact-subtitle {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.15rem; color: var(--parchment); line-height: 1.7;
          margin: 0;
        }

        .contact-info-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem; max-width: 1100px; margin: 0 auto 4rem;
        }
        .info-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(227, 167, 47, 0.22);
          padding: 2.5rem 1.75rem; text-align: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .info-card:hover { transform: translateY(-4px); border-color: rgba(227, 167, 47, 0.55); }
        .info-card .corner { position: absolute; width: 22px; height: 22px; color: var(--saffron); }
        .info-card .corner.tl { top: 8px; left: 8px; }
        .info-card .corner.tr { top: 8px; right: 8px; }
        .info-card .corner.bl { bottom: 8px; left: 8px; }
        .info-card .corner.br { bottom: 8px; right: 8px; }
        .info-icon { color: var(--saffron); margin-bottom: 1rem; display: flex; justify-content: center; }
        .info-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; color: var(--saffron);
          margin: 0 0 0.75rem; letter-spacing: 0.05em;
          text-transform: uppercase; font-weight: 600;
        }
        .info-card p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; line-height: 1.6; color: var(--parchment); margin: 0 0 1rem;
        }
        .info-card-link {
          display: inline-block;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.95rem; letter-spacing: 0.1em;
          color: var(--saffron); text-decoration: none; font-weight: 600;
          transition: color 0.3s ease;
        }
        .info-card-link:hover { color: var(--saffron-soft); }

        .reservation-card {
          position: relative;
          max-width: 820px; margin: 0 auto 4rem;
          background: var(--ivory); color: var(--lapis-deep);
          padding: 3.5rem 2.5rem 3rem;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          border: 1px solid rgba(227, 167, 47, 0.5);
        }
        .reservation-card::before, .reservation-card::after {
          content: ''; position: absolute; width: 40px; height: 40px;
          border: 1.5px solid var(--saffron);
        }
        .reservation-card::before { top: 12px; left: 12px; border-right: none; border-bottom: none; }
        .reservation-card::after { bottom: 12px; right: 12px; border-left: none; border-top: none; }

        .reservation-header { text-align: center; margin-bottom: 2.5rem; }
        .reservation-chapter {
          display: inline-block; font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 0.95rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--ruby); margin-bottom: 0.75rem;
        }
        .reservation-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          color: var(--lapis-deep); margin: 0;
          letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600;
        }

        .success-banner {
          background: var(--teal); color: var(--ivory);
          padding: 1rem 1.25rem; margin-bottom: 1.5rem;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1rem; text-align: center;
        }

        .reservation-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-field { display: flex; flex-direction: column; }
        .form-field label {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.95rem; letter-spacing: 0.1em;
          color: var(--lapis); margin-bottom: 0.5rem; font-weight: 600;
        }
        .form-field input, .form-field select, .form-field textarea {
          padding: 0.85rem 1rem; border: 1px solid #c8b27c;
          background: #fff; color: var(--lapis-deep);
          font-size: 0.95rem; font-family: 'Inter', sans-serif;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
          outline: none; border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(227, 167, 47, 0.2);
        }
        .form-field textarea { resize: vertical; }

        .reservation-submit {
          margin-top: 1rem; padding: 1.1rem 2rem;
          background: var(--lapis-deep); color: var(--saffron);
          border: 1px solid var(--lapis-deep);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; letter-spacing: 0.25em;
          text-transform: uppercase; font-weight: 600;
          cursor: pointer; transition: all 0.3s ease;
        }
        .reservation-submit:hover {
          background: var(--saffron); color: var(--lapis-deep); border-color: var(--saffron);
        }

        .contact-map {
          max-width: 1100px; margin: 0 auto;
          border: 1px solid rgba(227, 167, 47, 0.3); overflow: hidden;
        }
        .contact-map iframe {
          display: block; filter: grayscale(0.4) contrast(1.05) sepia(0.15);
        }

        @media (max-width: 640px) {
          .contact-page { padding: 3rem 1rem 4rem; }
          .reservation-card { padding: 2.5rem 1.25rem 2rem; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="contact-header">
        <span className="contact-chapter">
          {tx('— "Bringing You the Finest in Persian Hospitality" —', '— بهترین مهمان‌نوازی ایرانی، تقدیم به شما —', '— "Ofreciéndole lo mejor de la hospitalidad persa" —')}
        </span>
        <h1 className="contact-title">{tx('Visit Us', 'به ما سر بزنید', 'Visítenos')}</h1>
        <p className="contact-subtitle">
          {tx(
            'Stop by, telephone, or write — and reserve a place at our table.',
            'سری بزنید، تماس بگیرید یا بنویسید — و جای خود را بر سفره‌ی ما رزرو کنید.',
            'Visítenos, llámenos o escríbanos — y reserve un lugar en nuestra mesa.'
          )}
        </p>
      </div>

      <div className="contact-info-grid">
        <InfoCard
          icon={<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 4 C10 4 6 8 6 14 C6 22 16 28 16 28 C16 28 26 22 26 14 C26 8 22 4 16 4 Z"/><circle cx="16" cy="14" r="3.5"/></svg>}
          title={tx('Address', 'آدرس', 'Dirección')}
          body={<>1290 Fulton Ave<br />Sacramento, CA 95825</>}
          link="https://www.google.com/maps?daddr=1290+Fulton+Ave+Sacramento,+CA+95825"
          linkLabel={tx('Get Directions →', 'دریافت مسیر →', 'Cómo Llegar →')}
        />
        <InfoCard
          icon={<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6 L12 6 L14 12 L11 14 C12 18 14 20 18 21 L20 18 L26 20 L26 26 C26 26 22 27 18 25 C12 22 8 18 6 12 C5 9 6 6 6 6 Z"/></svg>}
          title={tx('Phone', 'تلفن', 'Teléfono')}
          body="(916) 483-1700"
          link="tel:+19164831700"
          linkLabel={tx('Call Now →', 'تماس →', 'Llamar →')}
        />
        <InfoCard
          icon={<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="8" width="24" height="18"/><path d="M4 8 L16 18 L28 8"/></svg>}
          title={tx('Email', 'ایمیل', 'Correo')}
          body="famouskabob1@gmail.com"
          link="mailto:famouskabob1@gmail.com"
          linkLabel={tx('Send Email →', 'ارسال ایمیل →', 'Enviar Correo →')}
        />
        <InfoCard
          icon={<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="16" cy="16" r="12"/><path d="M16 8 L16 16 L22 19"/></svg>}
          title={tx('Hours', 'ساعات کاری', 'Horario')}
          body={<>{tx('Open Daily', 'هر روز باز', 'Abierto Diario')}<br />11:00 AM – 10:00 PM<br />{tx('7 Days a Week', '۷ روز هفته', '7 Días a la Semana')}</>}
        />
      </div>

      <div className="reservation-card">
        <div className="reservation-header">
          <span className="reservation-chapter">
            {tx('— Reserve Your Table —', '— میز خود را رزرو کنید —', '— Reserve Su Mesa —')}
          </span>
          <h2 className="reservation-title">
            {tx('Make A Reservation', 'رزرو میز', 'Hacer Una Reserva')}
          </h2>
        </div>

        {submitted && (
          <div className="success-banner">
            ✓ {tx(
              "Reservation request received. We will call to confirm.",
              'درخواست شما دریافت شد. برای تأیید تماس می‌گیریم.',
              'Solicitud recibida. Le llamaremos para confirmar.'
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-row">
            <div className="form-field">
              <label>{tx('Full Name', 'نام کامل', 'Nombre')}</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>{tx('Phone', 'تلفن', 'Teléfono')}</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="(916) 555-1234" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>{tx('Date', 'تاریخ', 'Fecha')}</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>{tx('Time', 'زمان', 'Hora')}</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-field">
            <label>{tx('Number of Guests', 'تعداد مهمانان', 'Invitados')}</label>
            <select name="guests" value={form.guests} onChange={handleChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? tx('Person', 'نفر', 'Persona') : tx('People', 'نفر', 'Personas')}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label>{tx('Special Requests (optional)', 'درخواست خاص (اختیاری)', 'Solicitudes (opcional)')}</label>
            <textarea
              name="notes" value={form.notes} onChange={handleChange} rows="3"
              placeholder={tx('Allergies, occasion, seating preference…', 'حساسیت، مناسبت، ترجیح نشستن…', 'Alergias, ocasión, preferencias…')}
            />
          </div>

          <button type="submit" className="reservation-submit">
            {tx('Confirm Reservation', 'تأیید رزرو', 'Confirmar Reserva')}
          </button>
        </form>
      </div>

      <div className="contact-map">
        <iframe
          title="Famous Kabob — 1290 Fulton Ave, Sacramento, CA"
          src="https://www.google.com/maps?q=1290+Fulton+Ave,+Sacramento,+CA+95825&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, body, link, linkLabel }) {
  return (
    <div className="info-card">
      <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
      <div className="info-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      {link && <a href={link} className="info-card-link" target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{linkLabel}</a>}
    </div>
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
    tl: { cx: 6, cy: 6 }, tr: { cx: 24, cy: 6 },
    bl: { cx: 6, cy: 24 }, br: { cx: 24, cy: 24 },
  };
  return (
    <svg className={`corner ${pos}`} viewBox="0 0 30 30" aria-hidden="true">
      <path d={paths[pos]} stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx={dots[pos].cx} cy={dots[pos].cy} r="1.5" fill="currentColor" />
    </svg>
  );
}

export default Contact;

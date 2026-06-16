import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import i18n from './i18n';
import Home from './components/Home.jsx';
import Menu from './components/Menu.jsx';
import Catering from './components/Catering.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

const LANG = {
  en: {
    home: 'HOME', menu: 'MENU', catering: 'CATERING', about: 'ABOUT US', contact: 'CONTACT',
    footerText: 'Authentic Persian Cuisine',
    address: '1290 Fulton Ave, Sacramento, CA 95825',
    hours: 'Hours: 11:00am – 10:00pm, 7 days a week',
    rights: 'All rights reserved.'
  },
  fa: {
    home: 'خانه', menu: 'منو', catering: 'کترینگ', about: 'درباره ما', contact: 'تماس',
    footerText: 'غذای اصیل ایرانی',
    address: '۱۲۹۰ خیابان فولتون، ساکرامنتو، کالیفرنیا ۹۵۸۲۵',
    hours: 'ساعات کاری: ۱۱ صبح تا ۱۰ شب، هفت روز هفته',
    rights: 'تمام حقوق محفوظ است.'
  },
  es: {
    home: 'INICIO', menu: 'MENÚ', catering: 'CATERING', about: 'NOSOTROS', contact: 'CONTACTO',
    footerText: 'Auténtica Cocina Persa',
    address: '1290 Fulton Ave, Sacramento, CA 95825',
    hours: 'Horario: 11:00am – 10:00pm, 7 días a la semana',
    rights: 'Todos los derechos reservados.'
  }
};

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function Header({ lang, setLang }) {
  const location = useLocation();
  const t = LANG[lang];

  return (
    <header className="site-header">
      <nav className="header-nav">
        <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>{t.home}</Link>
        <Link to="/menu" className={location.pathname === '/menu' ? 'nav-link active' : 'nav-link'}>{t.menu}</Link>
        <Link to="/catering" className={location.pathname === '/catering' ? 'nav-link active' : 'nav-link'}>{t.catering}</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>{t.about}</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>{t.contact}</Link>
      </nav>

      <div className="lang-bar">
        <button onClick={() => setLang('en')} className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}>🇺🇸 ENGLISH</button>
        <span>|</span>
        <button onClick={() => setLang('fa')} className={lang === 'fa' ? 'lang-btn active' : 'lang-btn'}>🇮🇷 فارسی</button>
        <span>|</span>
        <button onClick={() => setLang('es')} className={lang === 'es' ? 'lang-btn active' : 'lang-btn'}>🇪🇸 ESPAÑOL</button>
      </div>
    </header>
  );
}

function Footer({ lang }) {
  const t = LANG[lang];
  return (
    <footer className="site-footer">
      <h2 className="footer-logo">FAMOUS KABOB</h2>
      <p style={{ color: '#e8d6a8', margin: '0.25rem 0 1rem', fontSize: '0.9rem', letterSpacing: '0.15em' }}>
        {t.footerText}
      </p>

      <div className="footer-social">
        <a href="https://instagram.com/famouskabob" target="_blank" rel="noreferrer">📷 INSTAGRAM</a>
        <a href="https://facebook.com/famouskabob" target="_blank" rel="noreferrer">📘 FACEBOOK</a>
        <a href="https://yelp.com/biz/famous-kabob-sacramento" target="_blank" rel="noreferrer">⭐ YELP</a>
      </div>

      <div style={{ margin: '1.5rem 0', color: '#c9bfa8', fontSize: '0.9rem', lineHeight: 1.8 }}>
        <a
          href="https://www.google.com/maps?q=1290+Fulton+Ave,+Sacramento,+CA+95825"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#c9bfa8', textDecoration: 'none', display: 'block' }}
        >
          📍 {t.address}
        </a>
        <a href="tel:+19164831700" style={{ color: '#c9bfa8', textDecoration: 'none', display: 'block' }}>
          📞 (916) 483-1700
        </a>
        <a href="mailto:famouskabob1@gmail.com" style={{ color: '#c9bfa8', textDecoration: 'none', display: 'block' }}>
          ✉️ famouskabob1@gmail.com
        </a>
        <span style={{ display: 'block', marginTop: '0.5rem' }}>🕐 {t.hours}</span>
      </div>

      <p style={{ borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '1rem', marginTop: '1rem', fontSize: '0.8rem', color: '#8a8270' }}>
        © {new Date().getFullYear()} Famous Kabob. {t.rights}
      </p>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Router>
      <ScrollTop />
      <div
        className="app-wrapper"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#1a1208',
        }}
      >
        <Header lang={lang} setLang={setLang} />
        <main className="main-content" style={{ flex: 1, background: '#1a1208' }}>
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/menu" element={<Menu lang={lang} />} />
            <Route path="/catering" element={<Catering lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
      </div>
    </Router>
  );
}

export default App;

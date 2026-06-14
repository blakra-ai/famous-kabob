import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ lang = 'en' }) {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroImage =
    'https://i.pinimg.com/originals/71/a3/30/71a330dd32f29200164bc70d7f529c90.jpg';

  const tx = (en, fa, es) => (lang === 'fa' ? fa : lang === 'es' ? es : en);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = heroImage;
  }, []);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-fullscreen">
        <div
          className={`hero-background ${imageLoaded ? 'loaded' : ''}`}
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="hero-overlay" />
        <div className="hero-vignette" />

        {/* Shamseh medallion behind title */}
        <svg className="hero-medallion" viewBox="0 0 200 200" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="72" />
            <circle cx="100" cy="100" r="40" />
            {[...Array(16)].map((_, i) => {
              const a = (i * 22.5 * Math.PI) / 180;
              const x1 = 100 + 40 * Math.cos(a);
              const y1 = 100 + 40 * Math.sin(a);
              const x2 = 100 + 90 * Math.cos(a);
              const y2 = 100 + 90 * Math.sin(a);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
            {[...Array(8)].map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const x = 100 + 56 * Math.cos(a);
              const y = 100 + 56 * Math.sin(a);
              return <circle key={i} cx={x} cy={y} r="4" />;
            })}
          </g>
        </svg>

        <div className="hero-content">
          <span className="hero-chapter">
            {tx('— Welcome To —', '— خوش آمدید به —', '— bienvenido a —')}
          </span>

          <h1 className="hero-title">
            {tx('Famous Kabob', 'فیموس کباب', 'Famous Kabob')}
          </h1>

          <div className="hero-ornament" aria-hidden="true">
            <span className="ornament-line" />
            <svg viewBox="0 0 40 16" width="40" height="16">
              <path
                d="M2 8 Q10 0 20 8 Q30 16 38 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="20" cy="8" r="2" fill="currentColor" />
            </svg>
            <span className="ornament-line" />
          </div>

          <p className="hero-tagline">
            {tx(
              'A painted invitation to the table of Old Tehran — saffron, charcoal, and stories told over rice.',
              'دعوت‌نامه‌ای از سفره‌ی تهران قدیم — زعفران، ذغال، و قصه‌هایی بر سر برنج.',
              'Una invitación pintada a la mesa de la vieja Teherán — azafrán, carbón e historias contadas sobre arroz.'
            )}
          </p>

          <div className="hero-buttons">
            <Link to="/menu" className="btn-saffron">
              {tx('Explore the Menu', 'مشاهده‌ی منو', 'Ver el Menú')}
            </Link>
            <Link to="/contact" className="btn-outline">
              {tx('Reserve a Table', 'رزرو میز', 'Reservar Mesa')}
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span>{tx('Turn the page', 'ورق بزنید', 'Pase la página')}</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* ILLUMINATED DIVIDER */}
      <div className="illuminated-divider" aria-hidden="true">
        <svg viewBox="0 0 600 40" preserveAspectRatio="none">
          <path d="M0 20 L260 20" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M340 20 L600 20" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <g transform="translate(300 20)" fill="none" stroke="currentColor" strokeWidth="1">
            <circle r="14" />
            <circle r="6" />
            <path d="M-22 0 Q-14 -8 0 -8 Q14 -8 22 0 Q14 8 0 8 Q-14 8 -22 0 Z" />
          </g>
        </svg>
      </div>

      {/* HIGHLIGHTS */}
      <section className="home-highlights">
        <div className="section-heading">
          <span className="eyebrow">
            {tx('— From Our Kitchen —', '— از آشپزخانه‌ی ما —', '— De Nuestra Cocina —')}
          </span>
          <h2 className="section-title">
            {tx('Three Promises', 'سه عهد', 'Tres Promesas')}
          </h2>
        </div>

        <div className="highlight-grid">
          <article className="highlight-card">
            <CornerOrnaments />
            <div className="highlight-icon">
              <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M32 8 C24 16 24 24 32 32 C40 24 40 16 32 8 Z" />
                <path d="M20 36 C16 44 20 52 32 56 C44 52 48 44 44 36" />
                <path d="M32 32 L32 56" />
              </svg>
            </div>
            <h3>{tx('Charcoal Grilled', 'کباب ذغالی', 'A la Brasa')}</h3>
            <p>
              {tx(
                'Open-flame kabobs, the way our grandfathers taught us — slow, patient, and seasoned only with salt and saffron.',
                'کباب‌های ذغالی، همان‌طور که پدربزرگ‌هایمان آموختند — آرام، صبور، و تنها با نمک و زعفران.',
                'Kebabs a fuego abierto, como nos enseñaron nuestros abuelos — lentos, pacientes, sazonados con sal y azafrán.'
              )}
            </p>
          </article>

          <article className="highlight-card">
            <CornerOrnaments />
            <div className="highlight-icon">
              <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M32 8 Q20 24 24 36 Q28 48 32 56 Q36 48 40 36 Q44 24 32 8 Z" />
                <path d="M32 20 L32 56" />
                <path d="M28 32 L32 36 L36 32" />
              </svg>
            </div>
            <h3>{tx('Fresh Daily', 'روزانه تازه', 'Fresco Cada Día')}</h3>
            <p>
              {tx(
                'Herbs from the morning market, lamb from local farms, basmati measured by hand each afternoon.',
                'سبزی از بازار صبح، گوشت بره از مزارع محلی، برنج باسماتی که هر بعدازظهر با دست پیمانه می‌شود.',
                'Hierbas del mercado matutino, cordero de granjas locales, basmati medido a mano cada tarde.'
              )}
            </p>
          </article>

          <article className="highlight-card">
            <CornerOrnaments />
            <div className="highlight-icon">
              <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="14" y="20" width="36" height="32" rx="2" />
                <path d="M20 20 L20 14 L44 14 L44 20" />
                <path d="M22 30 L42 30 M22 38 L42 38 M22 46 L36 46" />
              </svg>
            </div>
            <h3>{tx('Family Recipes', 'دستور خانوادگی', 'Recetas de Familia')}</h3>
            <p>
              {tx(
                'Three generations of Persian cooking, written in margins of an old notebook and served on every plate.',
                'سه نسل آشپزی ایرانی، نوشته‌شده در حاشیه‌ی دفترچه‌ای قدیمی و سرو شده در هر بشقاب.',
                'Tres generaciones de cocina persa, escritas al margen de un viejo cuaderno y servidas en cada plato.'
              )}
            </p>
          </article>
        </div>
      </section>

      {/* INVITATION STRIP */}
      <section className="home-invitation">
        <div className="invitation-inner">
          <span className="eyebrow dark">
            {tx('— An Invitation —', '— یک دعوت —', '— Una Invitación —')}
          </span>
          <h2 className="invitation-title">
            {tx(
              'Come share our table.',
              'بر سر سفره‌ی ما بنشینید.',
              'Venga a compartir nuestra mesa.'
            )}
          </h2>
          <p className="invitation-text">
            {tx(
              'Whether for a quiet dinner, a celebration of two hundred guests, or simply the smell of fresh naan on a Tuesday afternoon — we have kept the fire warm for you.',
              'چه برای شامی آرام، چه جشنی برای دویست نفر، یا تنها برای بوی نان تازه در عصر سه‌شنبه — آتش را برای شما گرم نگه داشته‌ایم.',
              'Ya sea para una cena tranquila, una celebración de doscientos invitados, o simplemente el aroma del pan recién hecho un martes por la tarde — hemos mantenido el fuego encendido para usted.'
            )}
          </p>
          <div className="invitation-buttons">
            <Link to="/catering" className="btn-saffron">
              {tx('Catering & Events', 'کترینگ و مراسم', 'Catering y Eventos')}
            </Link>
            <Link to="/about" className="btn-outline">
              {tx('Our Story', 'داستان ما', 'Nuestra Historia')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CornerOrnaments() {
  return (
    <>
      <svg className="corner-ornament tl" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M0 12 Q0 0 12 0" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </svg>
      <svg className="corner-ornament tr" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M30 12 Q30 0 18 0" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="24" cy="6" r="1.5" fill="currentColor" />
      </svg>
      <svg className="corner-ornament bl" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M0 18 Q0 30 12 30" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="6" cy="24" r="1.5" fill="currentColor" />
      </svg>
      <svg className="corner-ornament br" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M30 18 Q30 30 18 30" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="24" cy="24" r="1.5" fill="currentColor" />
      </svg>
    </>
  );
}

export default Home;

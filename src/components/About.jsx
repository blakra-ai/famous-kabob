import React from 'react';

function About({ lang = 'en' }) {
  const tx = (en, fa, es) => (lang === 'fa' ? fa : lang === 'es' ? es : en);

  const aboutHero = '/images/about-hero.jpg';
  const aboutDish = '/images/about-dish.jpg';

  return (
    <div className="about-page">
      <style>{`
        .about-page { width: 100%; background: var(--lapis-deep); color: var(--ivory); }

        .about-hero {
          position: relative; width: 100%; height: 60vh; min-height: 420px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        .about-hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          z-index: 0;
        }
        .about-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(19,31,61,0.6) 0%, rgba(19,31,61,0.92) 100%);
          z-index: 1;
        }
        .about-hero-content {
          position: relative; z-index: 2; text-align: center;
          padding: 0 1.5rem; max-width: 800px;
        }
        .about-chapter {
          display: inline-block; font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--saffron-soft); margin-bottom: 1rem;
        }
        .about-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: var(--saffron); margin: 0;
          letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600;
          text-shadow: 0 4px 30px rgba(0,0,0,0.7);
        }

        .about-split {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 4rem; align-items: center;
          max-width: 1200px; margin: 0 auto;
          padding: 6rem 2rem;
        }
        .about-image-side { position: relative; display: flex; justify-content: center; }
        .about-image-frame-wrap {
          position: relative; max-width: 480px; width: 100%;
        }
        .about-image {
          width: 100%; height: auto; display: block;
          position: relative; z-index: 2;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
        }
        .about-image-frame {
          position: absolute; top: 22px; left: 22px; right: -22px; bottom: -22px;
          border: 1.5px solid var(--saffron);
          z-index: 1;
        }
        .about-image-frame::before, .about-image-frame::after {
          content: ''; position: absolute; width: 30px; height: 30px;
          border: 1.5px solid var(--saffron);
        }
        .about-image-frame::before { top: -8px; left: -8px; border-right: none; border-bottom: none; }
        .about-image-frame::after { bottom: -8px; right: -8px; border-left: none; border-top: none; }

        .about-text-side { padding: 1rem 0; }
        .about-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--saffron); margin: 0.75rem 0 1.5rem;
          letter-spacing: 0.03em; font-weight: 600;
        }
        .about-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; line-height: 1.85; color: var(--parchment);
          margin: 0 0 2.5rem; font-weight: 400;
        }

        .about-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
          padding-top: 2rem; border-top: 1px solid rgba(227, 167, 47, 0.25);
        }
        .about-stat { display: flex; flex-direction: column; align-items: flex-start; }
        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 2.75rem);
          color: var(--saffron); font-weight: 600; line-height: 1; margin-bottom: 0.5rem;
        }
        .stat-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 0.9rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--parchment);
        }

        @media (max-width: 900px) {
          .about-split { grid-template-columns: 1fr; gap: 4rem; padding: 4rem 1.5rem; }
          .about-image-frame { right: 0; }
        }
        @media (max-width: 540px) {
          .about-stats { grid-template-columns: 1fr; gap: 1.25rem; }
        }
      `}</style>

      <section className="about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: `url('${aboutHero}')` }} />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-chapter">
            {tx('— THIS IS —', '— این است —', '— ESTA ES —')}
          </span>
          <h1 className="about-hero-title">
            {tx('OUR HERITAGE', 'میراث ما', 'NUESTRA HERENCIA')}
          </h1>
        </div>
      </section>

      <section className="about-split">
        <div className="about-image-side">
          <div className="about-image-frame-wrap">
            <img src={aboutDish} alt="Persian dishes" className="about-image" />
            <div className="about-image-frame" />
          </div>
        </div>

        <div className="about-text-side">
          <span className="eyebrow">
            {tx('— Sacramento, California —', '— ساکرامنتو، کالیفرنیا —', '— Sacramento, California —')}
          </span>
          <h2 className="about-section-title">
            {tx('Authentic Persian Cuisine', 'غذاهای اصیل ایرانی', 'Auténtica Cocina Persa')}
          </h2>
          <p className="about-text">
            {tx(
              'For more than twenty-five years we have set the same table — saffron measured by the pinch, lamb marinated overnight, basmati steamed beneath a cotton cloth until the rice sings beneath the lid. Every dish carries a memory: a grandmother\'s patience, a father\'s hand at the grill, a mother\'s quiet correction of the salt. This is the kitchen we inherited, and the one we are proud to share with you.',
              'بیش از بیست و پنج سال است که همین سفره را می‌چینیم — زعفرانی که با نوک انگشت پیمانه می‌شود، گوشت بره‌ای که شب تا صبح در ادویه می‌خوابد، برنج باسماتی که زیر پارچه‌ای نخی می‌پزد تا زمانی که زیر در، آواز برنج بلند شود. هر غذا، خاطره‌ای دارد: صبر مادربزرگ، دست پدر بر سر آتش، اصلاح آرام نمک توسط مادر. این آشپزخانه‌ای است که به ارث برده‌ایم، و افتخار می‌کنیم آن را با شما تقسیم می‌کنیم.',
              'Durante más de veinticinco años hemos puesto la misma mesa — azafrán medido pizca a pizca, cordero marinado toda la noche, basmati cocido bajo un paño de algodón hasta que el arroz canta bajo la tapa. Cada plato lleva una memoria: la paciencia de una abuela, la mano de un padre en la parrilla, la corrección silenciosa de la sal por una madre. Esta es la cocina que heredamos, y la que nos enorgullece compartir con usted.'
            )}
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="stat-number">25+</span>
              <span className="stat-label">{tx('Years in Sacramento', 'سال در ساکرامنتو', 'Años en Sacramento')}</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">7</span>
              <span className="stat-label">{tx('Days a Week', 'روز هفته', 'Días a la Semana')}</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">{tx('Family Recipes', 'دستور خانوادگی', 'Recetas de Familia')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

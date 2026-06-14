import React, { useState, useEffect, useRef } from 'react';

function Menu({ lang = 'en' }) {
  const [activeItem, setActiveItem] = useState(null);
  const lastTriggerRef = useRef(null);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') setActiveItem(null); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeItem ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem && lastTriggerRef.current) {
      lastTriggerRef.current.focus?.();
    }
  }, [activeItem]);

  const tx = (en, fa, es) => (lang === 'fa' ? fa : lang === 'es' ? es : en);
  const isRTL = lang === 'fa';

  const openItem = (item, e) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveItem(item);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToCategory = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 180;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // COMPLETE MENU DATA: All items from comprehensive menu with image support
  const menuData = [
    {
      id: 'appetizers',
      titleEn: 'Appetizers', titleFa: 'پیش غذا', titleEs: 'Aperitivos',
      items: [
        {
          nameEn: 'Appetizer Duo', nameFa: 'دوگانه پیش غذا', nameEs: 'Dúo de Aperitivos',
          price: '$16', tags: ['veg'], image: '/images/appetizer-duo.jpg',
          descEn: 'Eggplant Delight and Must-o-Musir – served with naan',
          descFa: 'اگپلنت دیلایت و ماست و موسیر – با نان سرو می‌شود',
          descEs: 'Eggplant Delight y Must-o-Musir – servido con naan'
        },
        {
          nameEn: 'Eggplant Delight', nameFa: 'بادمجان دیلایت', nameEs: 'Eggplant Delight',
          price: '$14', tags: ['veg', 'v*'], featured: true, image: '/images/eggplant-delight.jpg',
          descEn: 'Our FAMOUS dip – sautéed eggplant, zucchini, caramelized onion drizzled with kashk and dried mint – served with naan',
          descFa: 'دیپ معروف ما – بادمجان و کدو سرخ شده، پیاز کاراملی با کشک و نعناع خشک – با نان سرو می‌شود',
          descEs: 'Nuestro dip FAMOSO – berenjena, calabacín, cebolla caramelizada con kashk y menta seca – servido con naan'
        },
        {
          nameEn: 'Kashk-e-Bademjoon', nameFa: 'کشک بادمجان', nameEs: 'Kashk-e-Bademjoon',
          price: '$14', tags: ['veg'],
          descEn: 'Traditional style dip – sautéed eggplant, kashk, caramelized onion drizzled with kashk and dried mint – served with naan',
          descFa: 'دیپ سنتی – بادمجان سرخ شده، کشک، پیاز کاراملی با کشک و نعناع خشک – با نان سرو می‌شود',
          descEs: 'Dip tradicional – berenjena salteada, kashk, cebolla caramelizada con kashk y menta seca – servido con naan'
        },
        {
          nameEn: 'Dolmeh', nameFa: 'دلمه', nameEs: 'Dolmeh',
          price: '$12',
          descEn: 'Stuffed grape leaves – rice, yellow split peas, ground beef',
          descFa: 'برگ مو شکم پر – برنج، لپه، گوشت چرخ کرده',
          descEs: 'Hojas de parra rellenas – arroz, lentejas amarillas, carne molida'
        },
        {
          nameEn: 'Tahdig with Stew', nameFa: 'ته دیگ با خورش', nameEs: 'Tahdig con Estofado',
          price: '$15', tags: ['veg*', 'v*'],
          descEn: 'Crispy rice paired with choice of stew – Ghormeh Sabzi or Gheymeh',
          descFa: 'ته دیگ با انتخاب خورش قورمه سبزی یا قیمه',
          descEs: 'Arroz crujiente con opción de estofado – Ghormeh Sabzi o Gheymeh'
        },
        {
          nameEn: 'Sabzi Khordan', nameFa: 'سبزی خوردن', nameEs: 'Sabzi Khordan',
          price: '$10', tags: ['veg', 'v*'],
          descEn: 'Medley of fresh herbs, feta cheese, onion, walnuts, and radishes – served with naan',
          descFa: 'مجموعه سبزی تازه، پنیر فتا، پیاز، گردو و تربچه – با نان سرو می‌شود',
          descEs: 'Mezcla de hierbas frescas, queso feta, cebolla, nueces y rábanos – servido con naan'
        },
        {
          nameEn: 'Must-o-Khiar', nameFa: 'ماست و خیار', nameEs: 'Must-o-Khiar',
          price: '$10', tags: ['veg'],
          descEn: 'Yogurt, cucumber, dried mint',
          descFa: 'ماست، خیار، نعناع خشک',
          descEs: 'Yogur, pepino, menta seca'
        },
        {
          nameEn: 'Must-o-Musir', nameFa: 'ماست و موسیر', nameEs: 'Must-o-Musir',
          price: '$12', tags: ['veg'], image: '/images/must-o-musir.jpg',
          descEn: 'Whipped yogurt and shallot dip – served with naan',
          descFa: 'ماست هم زده و موسیر – با نان سرو می‌شود',
          descEs: 'Dip de yogur batido y chalota – servido con naan'
        },
        {
          nameEn: 'Hummus', nameFa: 'حمص', nameEs: 'Hummus',
          price: '$10', tags: ['veg', 'v'], image: '/images/hummus.jpg',
          descEn: 'Chickpea and tahini dip drizzled with olive oil and paprika – served with naan',
          descFa: 'دیپ نخود و طحینی با روغن زیتون و پاپریکا – با نان سرو می‌شود',
          descEs: 'Dip de garbanzos y tahini con aceite de oliva y pimentón – servido con naan'
        },
        {
          nameEn: 'Torshi', nameFa: 'ترشی', nameEs: 'Torshi',
          price: '$10', tags: ['veg', 'v'],
          descEn: 'Pickled vegetables aged in red wine and apple cider vinegar',
          descFa: 'سبزیجات شور رسیده در سرکه شراب قرمز و سرکه سیب',
          descEs: 'Verduras encurtidas en vinagre de vino tinto y sidra de manzana'
        },
      ]
    },
    {
      id: 'soups-salads',
      titleEn: 'Soups & Salads', titleFa: 'سوپ و سالاد', titleEs: 'Sopas y Ensaladas',
      items: [
        {
          nameEn: 'Shirazi Salad', nameFa: 'سالاد شیرازی', nameEs: 'Ensalada Shirazi',
          price: '$10', tags: ['veg', 'v'], image: '/images/shirazi-salad.jpg',
          descEn: 'Chopped tomato, cucumber, onion dressed with red wine vinegar and olive oil',
          descFa: 'گوجه، خیار و پیاز خرد شده با سرکه شراب قرمز و روغن زیتون',
          descEs: 'Tomate, pepino y cebolla picados aderezados con vinagre de vino tinto y aceite de oliva'
        },
        {
          nameEn: 'House Salad', nameFa: 'سالاد مخصوص', nameEs: 'Ensalada de la Casa',
          price: '$16', tags: ['veg', 'v'], image: '/images/house-salad.jpg',
          descEn: 'Romaine, artichoke, pepperoncini, tomato, cucumber, carrot, red cabbage, olives dressed with red wine vinegar and olive oil – add feta $2',
          descFa: 'کاهو، آرتیشو، فلفل، گوجه، خیار، هویج، کلم قرمز، زیتون با سرکه شراب قرمز و روغن زیتون – با پنیر فتا ۲ دلار',
          descEs: 'Lechuga, alcachofa, pepperoncini, tomate, pepino, zanahoria, col morada, aceitunas con vinagre de vino tinto y aceite de oliva – añadir feta $2'
        },
        {
          nameEn: 'Green Salad', nameFa: 'سالاد سبز', nameEs: 'Ensalada Verde',
          price: '$13', tags: ['veg', 'v'],
          descEn: 'Romaine, tomato, cucumber, carrot, red cabbage, olives dressed with red wine vinegar and olive oil',
          descFa: 'کاهو، گوجه، خیار، هویج، کلم قرمز و زیتون با سرکه شراب قرمز و روغن زیتون',
          descEs: 'Lechuga, tomate, pepino, zanahoria, col morada y aceitunas con vinagre de vino tinto y aceite de oliva'
        },
        {
          nameEn: 'Ash Reshteh', nameFa: 'آش رشته', nameEs: 'Ash Reshteh',
          price: '$14', tags: ['veg', 'v*'],
          descEn: 'Noodle soup – fresh herbs, lentils, garbanzo and kidney beans drizzled with kashk, caramelized onion, and dried mint',
          descFa: 'آش رشته – سبزی تازه، عدس، نخود و لوبیا قرمز با کشک، پیاز سرخ شده و نعناع داغ',
          descEs: 'Sopa de fideos – hierbas frescas, lentejas, garbanzos y frijoles rojos con kashk, cebolla caramelizada y menta seca'
        },
        {
          nameEn: 'Addassee', nameFa: 'عدسی', nameEs: 'Addassee',
          price: '$10',
          descEn: 'Lentil soup – lentils, onion, chicken broth',
          descFa: 'سوپ عدس – عدس، پیاز، آب مرغ',
          descEs: 'Sopa de lentejas – lentejas, cebolla, caldo de pollo'
        },
      ]
    },
    {
      id: 'beef',
      titleEn: 'Entrée – Beef', titleFa: 'غذای اصلی – گوشت گاو', titleEs: 'Plato Principal – Carne',
      note: tx(
        'Kabobs and stews served with basmati rice with saffron or green salad, and grilled tomato. Half rice / half salad $3',
        'کباب‌ها و خورش‌ها با برنج باسماتی زعفرانی یا سالاد سبز و گوجه کبابی سرو می‌شوند. نصف برنج / نصف سالاد ۳ دلار',
        'Kebabs y estofados servidos con arroz basmati con azafrán o ensalada verde, y tomate a la parrilla. Medio arroz / media ensalada $3'
      ),
      items: [
        {
          nameEn: 'Koobideh Kabob', nameFa: 'کباب کوبیده', nameEs: 'Kebab Koobideh',
          price: '$16 / $26', featured: true, image: '/images/koobideh-kabob.jpg',
          descEn: 'Ground beef sirloin – one or two skewers',
          descFa: 'گوشت گاو چرخ کرده – یک یا دو سیخ',
          descEs: 'Carne de res molida – una o dos brochetas'
        },
        {
          nameEn: 'Barg Kabob', nameFa: 'کباب برگ', nameEs: 'Kebab Barg',
          price: '$42', image: '/images/barg-kabob.jpg',
          descEn: 'Thinly sliced beef filet',
          descFa: 'فیله گوشت گاو نازک برش خورده',
          descEs: 'Filete de ternera en rodajas finas'
        },
        {
          nameEn: 'Shish Kabob', nameFa: 'شیش کباب', nameEs: 'Shish Kebab',
          price: '$33',
          descEn: 'Beef sirloin, onion, bell pepper',
          descFa: 'راسته گوشت گاو، پیاز، فلفل دلمه‌ای',
          descEs: 'Lomo de res, cebolla, pimiento'
        },
        {
          nameEn: 'Koobideh Kabob Combo', nameFa: 'کباب کوبیده ترکیبی', nameEs: 'Combo Kebab Koobideh',
          price: '$26', featured: true,
          descEn: 'Combination of beef and chicken Koobideh',
          descFa: 'ترکیب کباب کوبیده گوشت گاو و مرغ',
          descEs: 'Combinación de Koobideh de carne y pollo'
        },
        {
          nameEn: 'Soltani Kabob', nameFa: 'سلطانی کباب', nameEs: 'Kebab Soltani',
          price: '$52',
          descEn: 'Combination – Barg and Koobideh',
          descFa: 'ترکیب کباب برگ و کوبیده',
          descEs: 'Combinación – Barg y Koobideh'
        },
        {
          nameEn: 'Koobideh Wrap', nameFa: 'ساندویچ کوبیده', nameEs: 'Wrap Koobideh',
          price: '$17',
          descEn: 'Beef Koobideh, sabzi, onion, tomato, and sumac wrapped in naan',
          descFa: 'کوبیده گوشت گاو، سبزی، پیاز، گوجه و سماق پیچیده در نان',
          descEs: 'Koobideh de carne, sabzi, cebolla, tomate y sumac envuelto en naan'
        },
        {
          nameEn: 'Ghormeh Sabzi Stew', nameFa: 'خورش قورمه سبزی', nameEs: 'Estofado Ghormeh Sabzi',
          price: '$25', image: '/images/ghormeh-sabzi.jpg',
          descEn: 'Fresh herbs, kidney beans, sun-dried lime, beef',
          descFa: 'سبزی تازه، لوبیا قرمز، لیمو عمانی، گوشت گاو',
          descEs: 'Hierbas frescas, frijoles rojos, lima seca, carne'
        },
        {
          nameEn: 'Gheymeh Stew', nameFa: 'خورش قیمه', nameEs: 'Estofado Gheymeh',
          price: '$23',
          descEn: 'Yellow split peas, sun-dried lime, beef',
          descFa: 'لپه، لیمو عمانی، گوشت گاو',
          descEs: 'Lentejas amarillas, lima seca, carne'
        },
        {
          nameEn: 'Gheymeh Bademjoon Stew', nameFa: 'خورش قیمه بادمجان', nameEs: 'Estofado Gheymeh Bademjoon',
          price: '$25',
          descEn: 'Yellow split peas, sour grapes, eggplant, beef',
          descFa: 'لپه، غوره، بادمجان، گوشت گاو',
          descEs: 'Lentejas amarillas, uvas agrias, berenjena, carne'
        },
        {
          nameEn: 'Bameyeh Stew', nameFa: 'خورش بامیه', nameEs: 'Estofado Bameyeh',
          price: '$25',
          descEn: 'Okra, beef',
          descFa: 'بامیه، گوشت گاو',
          descEs: 'Okra, carne'
        },
        {
          nameEn: 'Loobia Polo', nameFa: 'لوبیا پلو', nameEs: 'Loobia Polo',
          price: '$25',
          descEn: 'Beef sirloin and green beans mixed with basmati rice',
          descFa: 'راسته گوشت گاو و لوبیا سبز مخلوط با برنج باسماتی',
          descEs: 'Lomo de res y judías verdes mezclados con arroz basmati'
        },
      ]
    },
    {
      id: 'chicken',
      titleEn: 'Chicken Entrées', titleFa: 'غذاهای مرغ', titleEs: 'Platos Principales – Pollo',
      items: [
        {
          nameEn: 'Chicken Koobideh Kabob', nameFa: 'کباب کوبیده مرغ', nameEs: 'Kebab Koobideh de Pollo',
          price: '$16 / $26', image: '/images/chicken-koobideh-kabob.jpg',
          descEn: 'Koobideh Kabob – one or two skewers',
          descFa: 'کباب کوبیده مرغ – یک یا دو سیخ',
          descEs: 'Kebab Koobideh – una o dos brochetas'
        },
        {
          nameEn: 'Chicken Barg Kabob', nameFa: 'کباب برگ مرغ', nameEs: 'Kebab Barg de Pollo',
          price: '$28', image: '/images/chicken-barg.jpg',
          descEn: 'Thinly sliced chicken filet',
          descFa: 'فیله مرغ نازک برش خورده',
          descEs: 'Filete de pollo en rodajas finas'
        },
        {
          nameEn: 'Chicken Kabob', nameFa: 'کباب مرغ', nameEs: 'Kebab de Pollo',
          price: '$18 / $24',
          descEn: 'Marinated chicken (breast or thigh)',
          descFa: 'مرغ مزه دار شده (سینه یا ران)',
          descEs: 'Pollo marinado (pechuga o muslo)'
        },
        {
          nameEn: 'Chicken Soltani Kabob', nameFa: 'کباب سلطانی مرغ', nameEs: 'Kebab Soltani de Pollo',
          price: '$34',
          descEn: 'Combination – Chicken Kabob (breast or thigh) and Koobideh (beef or chicken)',
          descFa: 'ترکیب کباب مرغ (سینه یا ران) و کوبیده (گوشت یا مرغ)',
          descEs: 'Combinación – Kebab de Pollo (pechuga o muslo) y Koobideh (carne o pollo)'
        },
        {
          nameEn: 'Chicken with Bone Kabob', nameFa: 'کباب مرغ با استخوان', nameEs: 'Kebab de Pollo con Hueso',
          price: '$38',
          descEn: 'Marinated Cornish game hen',
          descFa: 'جوجه کرنیش مزه دار شده',
          descEs: 'Gallina de Cornualles marinada'
        },
        {
          nameEn: 'Chicken Koobideh Wrap', nameFa: 'ساندویچ کوبیده مرغ', nameEs: 'Wrap Koobideh de Pollo',
          price: '$17', featured: true,
          descEn: 'Chicken Koobideh, sabzi, onion, tomato, and sumac wrapped in naan',
          descFa: 'کوبیده مرغ، سبزی، پیاز، گوجه و سماق پیچیده در نان',
          descEs: 'Koobideh de pollo, sabzi, cebolla, tomate y sumac envuelto en naan'
        },
        {
          nameEn: 'Chicken Bowl', nameFa: 'کاسه مرغ', nameEs: 'Bowl de Pollo',
          price: '$18',
          descEn: 'Chopped chicken breast, Must-o-Khiar, and Shirazi served over basmati rice',
          descFa: 'سینه مرغ خرد شده، ماست و خیار و شیرازی روی برنج باسماتی',
          descEs: 'Pechuga de pollo picada, Must-o-Khiar y Shirazi sobre arroz basmati'
        },
        {
          nameEn: 'Fesenjoon Stew', nameFa: 'خورش فسنجون', nameEs: 'Estofado Fesenjoon',
          price: '$25', image: '/images/fesenjan.jpg',
          descEn: 'Ground walnuts, pomegranate molasses, chicken',
          descFa: 'گردو آسیاب شده، رب انار، مرغ',
          descEs: 'Nueces molidas, melaza de granada, pollo'
        },
        {
          nameEn: 'Zereshk Polo with Morgh', nameFa: 'زرشک پلو با مرغ', nameEs: 'Zereshk Polo con Pollo',
          price: '$22',
          descEn: 'Braised chicken in saffron broth served with Zereshk Polo (basmati rice, saffron, barberries)',
          descFa: 'مرغ پخته در آب زعفران با زرشک پلو (برنج باسماتی، زعفران، زرشک)',
          descEs: 'Pollo estofado en caldo de azafrán servido con Zereshk Polo (arroz basmati, azafrán, agracejos)'
        },
      ]
    },
    {
      id: 'lamb',
      titleEn: 'Lamb Entrées', titleFa: 'غذاهای گوشت بره', titleEs: 'Platos Principales – Cordero',
      items: [
        {
          nameEn: 'Shish Kabob', nameFa: 'شیش کباب بره', nameEs: 'Shish Kebab de Cordero',
          price: '$40',
          descEn: 'Lamb tenderloin, onion, bell pepper',
          descFa: 'راسته بره، پیاز، فلفل دلمه‌ای',
          descEs: 'Lomo de cordero, cebolla, pimiento'
        },
        {
          nameEn: 'Shish Leek Kabob', nameFa: 'شیش لیک کباب', nameEs: 'Shish Leek Kebab',
          price: '$40',
          descEn: 'Lamb chops served with basmati rice and grilled tomato',
          descFa: 'دنده بره با برنج باسماتی و گوجه کبابی سرو می‌شود',
          descEs: 'Chuletas de cordero servidas con arroz basmati y tomate a la parrilla'
        },
        {
          nameEn: 'Lamb Shank (Mahecheh)', nameFa: 'ماهیچه بره', nameEs: 'Lamb Shank (Mahecheh)',
          price: '$28',
          descEn: 'Braised lamb shank, potatoes, and carrots in saffron broth served with basmati rice',
          descFa: 'ماهیچه بره با سیب زمینی و هویج در آب زعفران با برنج باسماتی سرو می‌شود',
          descEs: 'Cordero estofado, papas y zanahorias en caldo de azafrán servido con arroz basmati'
        },
      ]
    },
    {
      id: 'seafood',
      titleEn: 'Fish & Seafood', titleFa: 'ماهی و غذاهای دریایی', titleEs: 'Pescado / Mariscos',
      items: [
        {
          nameEn: 'Mahi – Trout', nameFa: 'ماهی قزل آلا', nameEs: 'Mahi – Trucha',
          price: '$22 / $30',
          descEn: 'Pan seared or grilled with fresh garlic, lemon, butter, and parsley – half or whole',
          descFa: 'تابه‌ای یا کبابی با سیر تازه، لیمو، کره و جعفری – نصف یا کامل',
          descEs: 'Salteada o a la parrilla con ajo fresco, limón, mantequilla y perejil – media o entera'
        },
        {
          nameEn: 'Mahi – Swai', nameFa: 'ماهی سوای', nameEs: 'Mahi – Swai',
          price: '$20 / $28',
          descEn: 'Pan seared or grilled with fresh garlic, lemon, butter, and parsley – half or whole',
          descFa: 'تابه‌ای یا کبابی با سیر تازه، لیمو، کره و جعفری – نصف یا کامل',
          descEs: 'Salteado o a la parrilla con ajo fresco, limón, mantequilla y perejil – medio o entero'
        },
        {
          nameEn: 'Mahi – Salmon', nameFa: 'ماهی سالمون', nameEs: 'Mahi – Salmón',
          price: '$30', image: '/images/grilled-salmon.jpg',
          descEn: 'Pan seared or grilled with fresh garlic, lemon, butter, and parsley',
          descFa: 'تابه‌ای یا کبابی با سیر تازه، لیمو، کره و جعفری',
          descEs: 'Salteado o a la parrilla con ajo fresco, limón, mantequilla y perejil'
        },
        {
          nameEn: 'Salmon Bowl', nameFa: 'کاسه سالمون', nameEs: 'Bowl de Salmón',
          price: '$30',
          descEn: 'Salmon and Shirazi served over basmati rice',
          descFa: 'سالمون و سالاد شیرازی روی برنج باسماتی',
          descEs: 'Salmón y Shirazi sobre arroz basmati'
        },
      ]
    },
    {
      id: 'vegetarian',
      titleEn: 'Vegetarian / Vegan', titleFa: 'گیاهی / وگان', titleEs: 'Vegetariano / Vegano',
      items: [
        {
          nameEn: 'Impossible™ Koobideh Kabob', nameFa: 'کباب کوبیده ایمپاسیبل', nameEs: 'Kebab Koobideh Impossible™',
          price: '$16 / $26', featured: true,
          descEn: 'Plant-based version of our classic Koobideh – one or two skewers',
          descFa: 'نسخه گیاهی کباب کوبیده کلاسیک ما – یک یا دو سیخ',
          descEs: 'Versión vegetal de nuestro Koobideh clásico – una o dos brochetas'
        },
        {
          nameEn: 'Impossible™ Koobideh Wrap', nameFa: 'ساندویچ کوبیده ایمپاسیبل', nameEs: 'Wrap Koobideh Impossible™',
          price: '$17', featured: true,
          descEn: 'Our plant-based Koobideh, sabzi, onion, tomato, and sumac wrapped in naan',
          descFa: 'کوبیده گیاهی، سبزی، پیاز، گوجه و سماق پیچیده در نان',
          descEs: 'Nuestro Koobideh vegetal, sabzi, cebolla, tomate y sumac envuelto en naan'
        },
        {
          nameEn: 'Veggie Kabob', nameFa: 'کباب سبزیجات', nameEs: 'Kebab Vegetal',
          price: '$17',
          descEn: 'Zucchini, yellow squash, bell pepper, onion, carrot, and mushroom',
          descFa: 'کدو سبز، کدو زرد، فلفل دلمه‌ای، پیاز، هویج و قارچ',
          descEs: 'Calabacín, calabaza amarilla, pimiento, cebolla, zanahoria y champiñón'
        },
        {
          nameEn: 'Veggie Ghormeh Sabzi Stew', nameFa: 'خورش قورمه سبزی گیاهی', nameEs: 'Estofado Vegetal Ghormeh Sabzi',
          price: '$25',
          descEn: 'Fresh herbs, kidney beans, sun-dried lime, Portobello mushrooms',
          descFa: 'سبزی تازه، لوبیا قرمز، لیمو عمانی، قارچ پرتوبلو',
          descEs: 'Hierbas frescas, frijoles rojos, lima seca, champiñones Portobello'
        },
        {
          nameEn: 'Veggie Gheymeh Stew', nameFa: 'خورش قیمه گیاهی', nameEs: 'Estofado Vegetal Gheymeh',
          price: '$23',
          descEn: 'Yellow split peas, sun-dried lime, Portobello mushrooms',
          descFa: 'لپه، لیمو عمانی، قارچ پرتوبلو',
          descEs: 'Lentejas amarillas, lima seca, champiñones Portobello'
        },
        {
          nameEn: 'Veggie Gheymeh Bademjoon Stew', nameFa: 'خورش قیمه بادمجان گیاهی', nameEs: 'Estofado Vegetal Gheymeh Bademjoon',
          price: '$25',
          descEn: 'Yellow split peas, sour grapes, eggplant, Portobello mushrooms',
          descFa: 'لپه، غوره، بادمجان، قارچ پرتوبلو',
          descEs: 'Lentejas amarillas, uvas agrias, berenjena, champiñones Portobello'
        },
        {
          nameEn: 'Veggie Bameyeh Stew', nameFa: 'خورش بامیه گیاهی', nameEs: 'Estofado Vegetal Bameyeh',
          price: '$25',
          descEn: 'Okra, Portobello mushrooms',
          descFa: 'بامیه، قارچ پرتوبلو',
          descEs: 'Okra, champiñones Portobello'
        },
        {
          nameEn: 'Veggie Fesenjoon Stew', nameFa: 'خورش فسنجون گیاهی', nameEs: 'Estofado Vegetal Fesenjoon',
          price: '$25',
          descEn: 'Ground walnuts, pomegranate molasses, Portobello mushrooms',
          descFa: 'گردو آسیاب شده، رب انار، قارچ پرتوبلو',
          descEs: 'Nueces molidas, melaza de granada, champiñones Portobello'
        },
        {
          nameEn: 'Eggplant Delight with Rice', nameFa: 'بادمجان دیلایت با برنج', nameEs: 'Eggplant Delight con Arroz',
          price: '$20', tags: ['v*'],
          descEn: 'Our Eggplant Delight served over basmati rice',
          descFa: 'اگپلنت دیلایت روی برنج باسماتی سرو می‌شود',
          descEs: 'Nuestro Eggplant Delight servido sobre arroz basmati'
        },
      ]
    },
    {
      id: 'alacarte',
      titleEn: 'À La Carte', titleFa: 'تک پرس', titleEs: 'A La Carta',
      items: [
        {
          nameEn: 'Koobideh Kabob (Beef or Chicken)', nameFa: 'کباب کوبیده (گوشت یا مرغ)', nameEs: 'Koobideh (Carne o Pollo)',
          price: '$12',
          descEn: '', descFa: '', descEs: ''
        },
        {
          nameEn: 'Basmati Rice', nameFa: 'برنج باسماتی', nameEs: 'Arroz Basmati',
          price: '$7',
          descEn: '', descFa: '', descEs: ''
        },
        {
          nameEn: 'Skewer of Grilled Onions and Bell Peppers', nameFa: 'سیخ پیاز و فلفل کبابی', nameEs: 'Brocheta de Cebollas y Pimientos a la Parrilla',
          price: '$8',
          descEn: '', descFa: '', descEs: ''
        },
        {
          nameEn: 'Skewer of Grilled Tomatoes', nameFa: 'سیخ گوجه کبابی', nameEs: 'Brocheta de Tomates a la Parrilla',
          price: '$7',
          descEn: '', descFa: '', descEs: ''
        },
        {
          nameEn: 'Naan', nameFa: 'نان', nameEs: 'Naan',
          price: '$4',
          descEn: 'House naan, baked daily in a tanoor (clay oven)',
          descFa: 'نان خانگی، روزانه در تنور پخته می‌شود',
          descEs: 'Naan de la casa, horneado diariamente en tanoor (horno de barro)'
        },
      ]
    },
    {
      id: 'desserts',
      titleEn: 'Desserts', titleFa: 'دسرها', titleEs: 'Postres',
      items: [
        {
          nameEn: 'Bastani', nameFa: 'بستنی', nameEs: 'Bastani',
          price: '$10',
          descEn: 'Our FAMOUS rose water, saffron, and pistachio ice cream',
          descFa: 'بستنی معروف ما با گلاب، زعفران و پسته',
          descEs: 'Nuestro FAMOSO helado de agua de rosas, azafrán y pistacho'
        },
        {
          nameEn: 'Zoolbia & Bameyeh', nameFa: 'زولبیا و بامیه', nameEs: 'Zoolbia y Bameyeh',
          price: '$8',
          descEn: 'Fried pastries made with saffron and rose water syrup',
          descFa: 'شیرینی سرخ شده با شربت زعفران و گلاب',
          descEs: 'Pasteles fritos hechos con jarabe de azafrán y agua de rosas'
        },
        {
          nameEn: 'Baklava', nameFa: 'باقلوا', nameEs: 'Baklava',
          price: '$6',
          descEn: 'Made with ground nuts',
          descFa: 'تهیه شده با مغز خشکبار آسیاب شده',
          descEs: 'Hecho con nueces molidas'
        },
      ]
    },
    {
      id: 'beverages',
      titleEn: 'Beverages', titleFa: 'نوشیدنی‌ها', titleEs: 'Bebidas',
      items: [
        {
          nameEn: 'Doogh', nameFa: 'دوغ', nameEs: 'Doogh',
          price: '$5',
          descEn: 'Housemade with yogurt, salt, and crushed mint',
          descFa: 'دوغ خانگی با ماست، نمک و نعناع کوبیده',
          descEs: 'Hecho en casa con yogur, sal y menta triturada'
        },
        {
          nameEn: 'Bottled Doogh', nameFa: 'دوغ بطری', nameEs: 'Doogh Embotellado',
          price: '$5',
          descEn: 'Carbonated mint yogurt drink',
          descFa: 'نوشیدنی گازدار ماست و نعناع',
          descEs: 'Bebida carbonatada de yogur y menta'
        },
        {
          nameEn: 'Soft Drinks', nameFa: 'نوشابه', nameEs: 'Refrescos',
          price: '$4',
          descEn: '', descFa: '', descEs: ''
        },
        {
          nameEn: 'Hot or Iced Chai (Tea)', nameFa: 'چای داغ یا یخ', nameEs: 'Chai Caliente o Frío',
          price: '$4',
          descEn: '', descFa: '', descEs: ''
        },
        {
          nameEn: 'Wine', nameFa: 'شراب', nameEs: 'Vino',
          price: '$10 / $30',
          descEn: 'Cork fee $15',
          descFa: 'هزینه چوب پنبه ۱۵ دلار',
          descEs: 'Tarifa de descorche $15'
        },
        {
          nameEn: 'Beer (Domestic and Import)', nameFa: 'آبجو (داخلی و وارداتی)', nameEs: 'Cerveza (Nacional e Importada)',
          price: '$8 / $9',
          descEn: '', descFa: '', descEs: ''
        },
      ]
    },
  ];

  const getTitle = (s) => tx(s.titleEn, s.titleFa, s.titleEs);
  const getName = (i) => tx(i.nameEn, i.nameFa, i.nameEs);
  const getDesc = (i) => tx(i.descEn, i.descFa, i.descEs);

  return (
    <div className="menu-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <style>{`
        .menu-page { width: 100%; background: var(--lapis-deep); color: var(--ivory); min-height: 100vh; }

        /* Hero Section */
        .menu-hero {
          position: relative; width: 100%; height: 55vh; min-height: 380px;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
          text-align: center;
        }
        .menu-hero-bg {
          position: absolute; inset: 0;
          background-image: url('/images/menu-hero.jpg');
          background-size: cover; background-position: center; z-index: 0;
        }
        .menu-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(19,31,61,0.55) 0%, rgba(19,31,61,0.9) 100%);
          z-index: 1;
        }
        .menu-hero-content { position: relative; z-index: 2; max-width: 800px; padding: 0 1.5rem; }
        .menu-chapter {
          display: inline-block; font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 1rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--saffron-soft); margin-bottom: 1.25rem;
        }
        .menu-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          color: var(--saffron); margin: 0 0 1rem;
          letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600;
          text-shadow: 0 4px 30px rgba(0,0,0,0.7);
        }
        .menu-hero-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1.15rem; color: var(--ivory);
        }

        /* Sticky Category Navigation */
        .menu-cat-nav {
          position: sticky; top: var(--header-height); z-index: 100;
          background: rgba(19,31,61,0.97); backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(227,167,47,0.25); padding: 0.85rem 0;
        }
        .menu-cat-nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; gap: 0.5rem; padding: 0 1rem;
          overflow-x: auto; scrollbar-width: none;
        }
        .menu-cat-nav-inner::-webkit-scrollbar { display: none; }
        .menu-cat-btn {
          background: transparent; border: 1px solid rgba(227,167,47,0.3);
          color: var(--ivory); padding: 0.45rem 1rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem; letter-spacing: 0.1em;
          text-transform: uppercase; white-space: nowrap; cursor: pointer;
          transition: all 0.3s ease;
        }
        .menu-cat-btn:hover { background: rgba(227,167,47,0.1); color: var(--saffron); border-color: var(--saffron); }

        /* Content Layout */
        .menu-content {
          max-width: 1100px; margin: 0 auto;
          padding: 4rem 1.5rem 2rem;
          display: flex; flex-direction: column; gap: 4rem;
        }
        .menu-section { scroll-margin-top: 200px; }
        
        /* Section Headers */
        .section-header {
          text-align: center; margin-bottom: 2rem;
          display: flex; align-items: center; justify-content: center; gap: 1rem;
        }
        .section-header .line {
          flex: 1; max-width: 100px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--saffron), transparent);
        }
        .section-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.25rem);
          color: var(--saffron); margin: 0;
          letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600;
          white-space: nowrap;
        }
        .section-note {
          text-align: center; font-size: 0.9rem; color: var(--parchment);
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          margin: 0 auto 1.75rem; max-width: 700px; line-height: 1.5;
        }

        /* Menu Grid */
        .menu-rows {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 2rem;
        }

        /* Menu Items */
        .menu-row {
          display: flex; gap: 1rem; align-items: center;
          padding: 0.85rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(227,167,47,0.15);
          cursor: pointer; transition: all 0.25s ease;
          text-align: start; position: relative;
        }
        .menu-row:hover {
          background: rgba(227,167,47,0.06);
          border-color: rgba(227,167,47,0.45);
          transform: translateY(-2px);
        }
        .menu-row.featured {
          border-color: rgba(227,167,47,0.5);
          background: rgba(227,167,47,0.04);
        }
        .menu-row.featured::before {
          content: '★';
          position: absolute; top: -8px; inset-inline-start: 12px;
          background: var(--saffron); color: var(--lapis-deep);
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
        }

        /* Item Thumbnails */
        .item-thumb {
          flex: 0 0 76px; width: 76px; height: 76px;
          background: var(--lapis); overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(227,167,47,0.2);
        }
        .item-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .item-thumb.placeholder { color: var(--saffron); font-size: 1.5rem; }

        /* Item Information */
        .item-info { flex: 1; min-width: 0; }
        .item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; color: var(--ivory); margin: 0 0 0.15rem;
          font-weight: 600; letter-spacing: 0.02em;
        }
        .item-price {
          display: inline-block; margin-inline-start: 0.5rem;
          color: var(--saffron); font-weight: 600; font-size: 1rem;
        }
        .item-desc {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.92rem; color: var(--parchment); line-height: 1.45;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .item-tags { display: flex; gap: 0.4rem; margin-top: 0.35rem; }
        .item-tag {
          font-size: 0.65rem; padding: 0.1rem 0.45rem;
          border: 1px solid var(--teal); color: var(--teal);
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* Back to Top Button */
        .back-to-top-wrap { text-align: center; margin-top: 1.5rem; }
        .back-to-top {
          background: transparent; border: 1px solid rgba(227,167,47,0.4);
          color: var(--saffron);
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          padding: 0.5rem 1.25rem; cursor: pointer;
          font-size: 0.9rem; letter-spacing: 0.15em; text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .back-to-top:hover { background: rgba(227,167,47,0.1); }

        /* Legend */
        .menu-legend {
          max-width: 900px; margin: 2rem auto 4rem;
          text-align: center; padding: 2rem 1.5rem;
          border-top: 1px solid rgba(227,167,47,0.2);
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.95rem; color: var(--parchment); line-height: 1.7;
        }
        .menu-legend strong { color: var(--saffron); font-style: normal; }

        /* Modal */
        .dish-modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(8,12,24,0.92); backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem 1rem;
          animation: fadeIn 0.25s ease;
        }
        .dish-modal {
          background: var(--lapis);
          border: 1px solid rgba(227,167,47,0.4);
          display: inline-flex; flex-direction: column;
          position: relative;
          animation: scaleIn 0.35s cubic-bezier(0.2,0.8,0.2,1);
          box-shadow: 0 30px 80px rgba(0,0,0,0.7);
          overflow: hidden;
          max-width: min(90vw, 560px); max-height: 92vh;
        }
        .dish-modal-close {
          position: absolute; top: 0.6rem; inset-inline-end: 0.6rem;
          width: 32px; height: 32px;
          background: rgba(19,31,61,0.9);
          border: 1px solid rgba(227,167,47,0.5);
          color: var(--saffron); font-size: 0.85rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease; z-index: 2; border-radius: 50%;
        }
        .dish-modal-close:hover { background: var(--saffron); color: var(--lapis-deep); }
        .dish-modal-image-wrap {
          background: var(--ink); display: block; line-height: 0;
          max-height: 65vh; overflow: hidden;
        }
        .dish-modal-image {
          display: block;
          max-width: min(90vw, 560px); max-height: 65vh;
          width: auto; height: auto; object-fit: contain;
        }
        .dish-modal-body {
          padding: 1.5rem 1.75rem 1.75rem;
          text-align: center; overflow-y: auto;
        }
        .dish-modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 2.5vw, 1.7rem);
          color: var(--saffron); margin: 0 0 0.5rem;
          letter-spacing: 0.03em; font-weight: 600;
        }
        .dish-modal-price {
          display: inline-block;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; color: var(--saffron-soft); font-weight: 600;
          letter-spacing: 0.06em; margin-bottom: 0.85rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(227,167,47,0.4);
        }
        .dish-modal-desc {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1rem; line-height: 1.65; color: var(--parchment);
          margin: 0 auto; max-width: 440px;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { transform: scale(0.95) translateY(8px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        @media (max-width: 800px) { .menu-rows { grid-template-columns: 1fr; } }
        @media (max-width: 540px) {
          .item-thumb { flex: 0 0 64px; width: 64px; height: 64px; }
          .item-name { font-size: 1.05rem; }
          .item-desc { font-size: 0.85rem; }
          .dish-modal { max-width: 94vw; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="menu-hero">
        <div className="menu-hero-bg" />
        <div className="menu-hero-overlay" />
        <div className="menu-hero-content">
          <span className="menu-chapter">
            {tx('— The Menu —', '— منو —', '— El Menú —')}
          </span>
          <h1 className="menu-hero-title">
            {tx('Our Table', 'سفره‌ی ما', 'Nuestra Mesa')}
          </h1>
          <p className="menu-hero-sub">
            {tx(
              'Charcoal, saffron, and the patience of slow fire.',
              'ذغال، زعفران و صبر آتش آرام.',
              'Carbón, azafrán y la paciencia del fuego lento.'
            )}
          </p>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <nav className="menu-cat-nav" aria-label="Menu categories">
        <div className="menu-cat-nav-inner">
          {menuData.map((s) => (
            <button key={s.id} onClick={() => scrollToCategory(s.id)} className="menu-cat-btn">
              {getTitle(s)}
            </button>
          ))}
        </div>
      </nav>

      {/* Menu Content */}
      <div className="menu-content">
        {menuData.map((section) => (
          <section key={section.id} id={section.id} className="menu-section">
            <div className="section-header">
              <span className="line" />
              <h2>{getTitle(section)}</h2>
              <span className="line" />
            </div>

            {section.note && (
              <p className="section-note">{section.note}</p>
            )}

            <div className="menu-rows">
              {section.items.map((item) => (
                <button
                  key={item.nameEn}
                  type="button"
                  className={`menu-row ${item.featured ? 'featured' : ''}`}
                  onClick={(e) => openItem(item, e)}
                >
                  <div className={`item-thumb ${!item.image ? 'placeholder' : ''}`}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.classList.add('placeholder');
                          e.target.parentNode.innerHTML = '<span>❦</span>';
                        }}
                      />
                    ) : (
                      <span>❦</span>
                    )}
                  </div>
                  <div className="item-info">
                    <div className="item-name">
                      {getName(item)}
                      <span className="item-price">{item.price}</span>
                    </div>
                    {getDesc(item) && (
                      <div className="item-desc">{getDesc(item)}</div>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="item-tags">
                        {item.tags.map((tg) => (
                          <span key={tg} className="item-tag">
                            {tg === 'veg'  ? tx('VEG',       'گیاهی',      'VEG')
                           : tg === 'v'    ? tx('VEGAN',     'وگان',       'VEGANO')
                           : tg === 'v*'   ? tx('VEGAN OPT.','قابل وگان',  'VEGANO OPC.')
                           : tg === 'veg*' ? tx('VEG OPT.',  'قابل گیاهی', 'VEG OPC.')
                           : tg.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="back-to-top-wrap">
              <button className="back-to-top" onClick={scrollToTop}>
                ↑ {tx('Back to Top', 'بازگشت به بالا', 'Volver Arriba')}
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* Dietary Legend */}
      <div className="menu-legend">
        {tx(
          <><strong>veg</strong> = vegetarian &nbsp;·&nbsp; <strong>v</strong> = vegan &nbsp;·&nbsp; <strong>v*</strong> = vegan option &nbsp;·&nbsp; <strong>veg*</strong> = vegetarian option<br />Parties of 5 or more will be charged 20% gratuity.</>,
          <><strong>veg</strong> = گیاهی &nbsp;·&nbsp; <strong>v</strong> = وگان &nbsp;·&nbsp; <strong>v*</strong> = قابل وگان شدن &nbsp;·&nbsp; <strong>veg*</strong> = قابل گیاهی شدن<br />برای گروه‌های ۵ نفر و بیشتر ۲۰٪ انعام اضافه می‌شود.</>,
          <><strong>veg</strong> = vegetariano &nbsp;·&nbsp; <strong>v</strong> = vegano &nbsp;·&nbsp; <strong>v*</strong> = opción vegana &nbsp;·&nbsp; <strong>veg*</strong> = opción vegetariana<br />Grupos de 5 o más tendrán un cargo de propina del 20%.</>
        )}
      </div>

      {/* Modal */}
      {activeItem && (
        <div className="dish-modal-backdrop" onClick={() => setActiveItem(null)}>
          <div
            className="dish-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="dish-modal-close"
              onClick={() => setActiveItem(null)}
              aria-label="Close"
            >✕</button>

            {activeItem.image && (
              <div className="dish-modal-image-wrap">
                <img
                  src={activeItem.image}
                  alt={getName(activeItem)}
                  className="dish-modal-image"
                />
              </div>
            )}

            <div className="dish-modal-body">
              <h3 className="dish-modal-title">{getName(activeItem)}</h3>
              <div className="dish-modal-price">{activeItem.price}</div>
              {getDesc(activeItem) && (
                <p className="dish-modal-desc">{getDesc(activeItem)}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;

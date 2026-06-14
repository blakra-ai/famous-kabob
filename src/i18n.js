import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "HOME",
      menu: "MENU",
      about: "ABOUT US", 
      contact: "CONTACT",
      
      // Hero Section
      heroTitle: "FAMOUS KABOB",
      heroTagline: "Experience the rich flavors and warm hospitality of Old Tehran — where every dish tells a story of ancient Persia",
      exploreMenu: "EXPLORE OUR MENU",
      reserveTable: "RESERVE YOUR TABLE",
      discoverMore: "DISCOVER MORE",
      
      // Menu Page
      menuTitle: "Our Menu",
      menuSubtitle: "Authentic Persian Cuisine",
      
      // About Page  
      aboutTitle: "Our Story",
      aboutText: "Famous Kabob has been serving authentic Persian cuisine for over three generations, bringing the rich flavors and warm hospitality of Iran to your table.",
      
      // Contact Page
      contactTitle: "Visit Us",
      contactSubtitle: "We would love to host you",
      address: "Address",
      phone: "Phone", 
      hours: "Hours",
      reservationTitle: "Make a Reservation",
      nameLabel: "Full Name",
      phoneLabel: "Phone Number",
      dateLabel: "Date",
      timeLabel: "Time",
      guestsLabel: "Number of Guests",
      submitBtn: "Confirm Reservation",
      
      // Footer
      footerText: "Authentic Persian Cuisine Since 1985"
    }
  },
  fa: {
    translation: {
      // Navigation
      home: "خانه",
      menu: "منو",
      about: "درباره ما",
      contact: "تماس با ما",
      
      // Hero Section
      heroTitle: "کباب معروف",
      heroTagline: "طعم غنی و مهمان‌نوازی گرم تهران قدیم را تجربه کنید — جایی که هر غذا داستانی از ایران باستان روایت می‌کند",
      exploreMenu: "مشاهده منوی ما",
      reserveTable: "رزرو میز",
      discoverMore: "بیشتر بدانید",
      
      // Menu Page
      menuTitle: "منوی ما",
      menuSubtitle: "غذاهای اصیل ایرانی",
      
      // About Page
      aboutTitle: "داستان ما", 
      aboutText: "کباب معروف بیش از سه نسل است که غذاهای اصیل ایرانی سرو می‌کند و طعم غنی و مهمان‌نوازی گرم ایران را به میز شما می‌آورد.",
      
      // Contact Page
      contactTitle: "به ما سر بزنید",
      contactSubtitle: "خوشحال می‌شویم شما را میزبانی کنیم",
      address: "آدرس",
      phone: "تلفن",
      hours: "ساعات کاری", 
      reservationTitle: "رزرو میز",
      nameLabel: "نام کامل",
      phoneLabel: "شماره تلفن",
      dateLabel: "تاریخ",
      timeLabel: "زمان",
      guestsLabel: "تعداد مهمانان",
      submitBtn: "تأیید رزرو",
      
      // Footer
      footerText: "غذاهای اصیل ایرانی از سال ۱۹۸۵"
    }
  },
  es: {
    translation: {
      // Navigation
      home: "INICIO",
      menu: "MENÚ", 
      about: "NOSOTROS",
      contact: "CONTACTO",
      
      // Hero Section
      heroTitle: "FAMOUS KABOB",
      heroTagline: "Experimente los ricos sabores y la cálida hospitalidad del Viejo Teherán — donde cada plato cuenta una historia de la antigua Persia",
      exploreMenu: "EXPLORAR NUESTRO MENÚ",
      reserveTable: "RESERVAR SU MESA",
      discoverMore: "DESCUBRIR MÁS",
      
      // Menu Page
      menuTitle: "Nuestro Menú",
      menuSubtitle: "Auténtica Cocina Persa",
      
      // About Page
      aboutTitle: "Nuestra Historia",
      aboutText: "Famous Kabob ha estado sirviendo auténtica cocina persa durante más de tres generaciones, trayendo los ricos sabores y la cálida hospitalidad de Irán a su mesa.",
      
      // Contact Page
      contactTitle: "Visítanos",
      contactSubtitle: "Nos encantaría recibirle",
      address: "Dirección",
      phone: "Teléfono",
      hours: "Horario",
      reservationTitle: "Hacer una Reserva", 
      nameLabel: "Nombre Completo",
      phoneLabel: "Número de Teléfono",
      dateLabel: "Fecha",
      timeLabel: "Hora",
      guestsLabel: "Número de Invitados",
      submitBtn: "Confirmar Reserva",
      
      // Footer
      footerText: "Auténtica Cocina Persa Desde 1985"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;

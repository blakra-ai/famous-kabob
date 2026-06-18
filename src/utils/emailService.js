// src/utils/emailService.js
import emailjs from '@emailjs/browser';

// ============================================================
// EMAILJS CONFIGURATION
// Prefer environment variables; falls back to literals so this
// keeps working if env isn't set up yet.
// (Note: these values are public by design — they ship to the
//  browser. Protect them via "Allowed Origins" in the EmailJS
//  dashboard, NOT by hiding them.)
// ============================================================
const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};

const EMAILJS_CONFIG = {
  SERVICE_ID: env.VITE_EMAILJS_SERVICE_ID || 'service_dgmx2lv',
  RESTAURANT_TEMPLATE_ID: env.VITE_EMAILJS_RESTAURANT_TEMPLATE_ID || 'template_qbizayc', // Contact us
  CUSTOMER_TEMPLATE_ID: env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID || 'template_xwnumwd',     // Auto reply
  PUBLIC_KEY: env.VITE_EMAILJS_PUBLIC_KEY || 'gQ8uMqnz-vfvi6W2e',
};

const REQUEST_TYPE_LABELS = {
  CATERING: 'Catering Request',
  TABLE: 'Table Reservation',
};

const REPLY_TIMEFRAMES = {
  CATERING: 'We will get back to you within 12 hours',
  TABLE: 'We will get back to you within 30 minutes to 1 hour',
};

// ---------- helpers ----------

function formatDate(dateStr) {
  if (!dateStr) return 'Not specified';
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return 'Not specified';
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatTime(timeStr) {
  if (!timeStr) return 'Not specified';
  const d = new Date(`2000-01-01T${timeStr}`);
  if (Number.isNaN(d.getTime())) return 'Not specified';
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function buildMailto(toEmail, subject, body) {
  return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Send with a timeout + one retry, so transient network errors don't fail the booking.
async function sendWithRetry(serviceId, templateId, params, publicKey, { retries = 1, timeoutMs = 15000 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await Promise.race([
        emailjs.send(serviceId, templateId, params, publicKey),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email request timed out')), timeoutMs)
        ),
      ]);
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * (attempt + 1))); // simple backoff
      }
    }
  }
  throw lastError;
}

// ---------- main ----------

/**
 * Sends dual emails for booking requests.
 * @param {'CATERING'|'TABLE'} requestType
 * @param {Object} formData - Form submission data
 * @returns {Promise<{success: boolean, restaurantSent: boolean, customerSent: boolean, errors: Error[]}>}
 */
export async function sendBookingEmails(requestType, formData) {
  // ---- validation ----
  if (!REQUEST_TYPE_LABELS[requestType]) {
    throw new Error(`Invalid requestType: "${requestType}". Expected CATERING or TABLE.`);
  }
  if (!formData || typeof formData !== 'object') {
    throw new Error('formData is required.');
  }
  if (!formData.name || !formData.email) {
    throw new Error('Customer name and email are required.');
  }

  const label = REQUEST_TYPE_LABELS[requestType];
  const formattedDate = formatDate(formData.date);
  const formattedTime = formatTime(formData.time);

  // ---- admin action links ----
  const adminConfirmLink = buildMailto(
    formData.email,
    `${label} CONFIRMED`,
    `Hello ${formData.name},\n\nYour ${label.toLowerCase()} for ${formattedDate} at ${formattedTime} is CONFIRMED.\n\nWe look forward to serving you!\n\nFamous Kabob Restaurant\n(916) 804-7220`
  );

  const adminEditLink = buildMailto(
    formData.email,
    `${label} - Time Adjustment`,
    `Hello ${formData.name},\n\nRegarding your ${label.toLowerCase()} for ${formattedDate} at ${formattedTime}.\n\nWe can accommodate you with a slight time adjustment of about 30 minutes. Would [INSERT NEW TIME] work better for you?\n\nPlease reply to confirm.\n\nFamous Kabob Restaurant\n(916) 804-7220`
  );

  // ---- shared template params ----
  const templateParams = {
    request_type: label,
    customer_name: formData.name,
    customer_phone: formData.phone || 'Not provided',
    customer_email: formData.email,
    event_date: formattedDate,
    event_time: formattedTime,
    event_location: formData.location || (requestType === 'TABLE' ? 'Famous Kabob Restaurant' : 'Not specified'),
    guests: formData.guests || 'Not specified',
    service_type: formData.serviceType || (requestType === 'TABLE' ? 'Dine-in Reservation' : 'Catering Service'),
    notes: formData.notes || 'No additional notes provided.',
    reply_timeframe: REPLY_TIMEFRAMES[requestType],
    admin_confirm_link: adminConfirmLink,
    admin_edit_link: adminEditLink,
    submission_time: new Date().toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
      timeZoneName: 'short',
    }),
  };

  // ---- send both, independently ----
  const [restaurantOutcome, customerOutcome] = await Promise.allSettled([
    sendWithRetry(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY),
    sendWithRetry(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY),
  ]);

  const restaurantSent = restaurantOutcome.status === 'fulfilled';
  const customerSent = customerOutcome.status === 'fulfilled';

  const errors = [];
  if (!restaurantSent) {
    console.error('Restaurant notification failed:', restaurantOutcome.reason);
    errors.push(restaurantOutcome.reason);
  } else {
    console.log('Restaurant notification sent:', restaurantOutcome.value.status);
  }
  if (!customerSent) {
    console.error('Customer auto-reply failed:', customerOutcome.reason);
    errors.push(customerOutcome.reason);
  } else {
    console.log('Customer auto-reply sent:', customerOutcome.value.status);
  }

  // The restaurant notification is the critical one (it captures the lead).
  // If it fails, surface that as a hard error to the caller.
  if (!restaurantSent) {
    throw new Error(
      `Failed to send the restaurant notification for ${requestType.toLowerCase()}: ${restaurantOutcome.reason?.message || 'unknown error'}`
    );
  }

  return {
    success: restaurantSent && customerSent,
    restaurantSent,
    customerSent,
    errors,
  };
}

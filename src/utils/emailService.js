// src/utils/emailService.js
import emailjs from '@emailjs/browser';

// ============================================================
// EMAILJS CONFIGURATION - YOUR ACTUAL IDS
// ============================================================
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dgmx2lv',
  RESTAURANT_TEMPLATE_ID: 'template_qbizayc',    // Contact us ID
  CUSTOMER_TEMPLATE_ID: 'template_xwnumwd',      // Auto reply ID
  PUBLIC_KEY: 'gQ8uMqnz-vfvi6W2e'
};
// ============================================================

/**
 * Sends dual emails for booking requests
 * @param {'CATERING'|'TABLE'} requestType 
 * @param {Object} formData - Form submission data
 * @returns {Promise} - Results of both email sends
 */
export async function sendBookingEmails(requestType, formData) {
  const requestTypeLabels = {
    CATERING: 'Catering Request',
    TABLE: 'Table Reservation'
  };

  // Different reply timeframes based on request type
  const replyTimeframes = {
    CATERING: 'We will get back to you within 12 hours',
    TABLE: 'We will get back to you within 30 minutes to 1 hour'
  };

  // Format date and time for better display
  const formattedDate = formData.date
    ? new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    : 'Not specified';

  const formattedTime = formData.time
    ? new Date(`2000-01-01T${formData.time}`).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
      })
    : 'Not specified';

  // Admin confirmation links for "Yes Confirm" and "Edit Time" buttons
  const confirmSubject = encodeURIComponent(`${requestTypeLabels[requestType]} CONFIRMED`);
  const confirmBody = encodeURIComponent(
    `Hello ${formData.name},\n\nYour ${requestTypeLabels[requestType].toLowerCase()} for ${formattedDate} at ${formattedTime} is CONFIRMED.\n\nWe look forward to serving you!\n\nFamous Kabob Restaurant\n(916) 804-7220`
  );
  
  const editSubject = encodeURIComponent(`${requestTypeLabels[requestType]} - Time Adjustment`);
  const editBody = encodeURIComponent(
    `Hello ${formData.name},\n\nRegarding your ${requestTypeLabels[requestType].toLowerCase()} for ${formattedDate} at ${formattedTime}.\n\nWe can accommodate you with a slight time adjustment of about 30 minutes. Would [INSERT NEW TIME] work better for you?\n\nPlease reply to confirm.\n\nFamous Kabob Restaurant\n(916) 804-7220`
  );

  // Shared template parameters for both emails
  const templateParams = {
    request_type: requestTypeLabels[requestType],
    customer_name: formData.name,
    customer_phone: formData.phone,
    customer_email: formData.email,
    event_date: formattedDate,
    event_time: formattedTime,
    event_location: formData.location || (requestType === 'TABLE' ? 'Famous Kabob Restaurant' : 'Not specified'),
    guests: formData.guests,
    service_type: formData.serviceType || (requestType === 'TABLE' ? 'Dine-in Reservation' : 'Catering Service'),
    notes: formData.notes || 'No additional notes provided.',
    reply_timeframe: replyTimeframes[requestType],
    
    // Admin action links - use these in your EmailJS templates as button URLs
    admin_confirm_link: `mailto:${formData.email}?subject=${confirmSubject}&body=${confirmBody}`,
    admin_edit_link: `mailto:${formData.email}?subject=${editSubject}&body=${editBody}`,
    
    submission_time: new Date().toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
      timeZoneName: 'short'
    }),
  };

  try {
    // Send both emails concurrently for maximum speed
    const [restaurantResult, customerResult] = await Promise.all([
      // Email 1: Restaurant notification (goes to you)
      emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      ),
      // Email 2: Customer auto-reply
      emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
    ]);

    console.log('Restaurant notification sent:', restaurantResult.status);
    console.log('Customer auto-reply sent:', customerResult.status);

    return { success: true, restaurantResult, customerResult };

  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send ${requestType.toLowerCase()} emails: ${error.message}`);
  }
}

import emailjs from '@emailjs/browser';

export async function sendContactEmail(form) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured. Add its service, template, and public key to the web frontend environment.');
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: form.fullName,
      from_email: form.email,
      phone: form.phone,
      company_name: form.companyName || 'Not provided',
      inquiry_type: form.inquiryType,
      message: form.message,
      reply_to: form.email,
    },
    { publicKey }
  );
}

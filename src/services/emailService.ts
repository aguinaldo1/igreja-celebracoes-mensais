
import emailjs from '@emailjs/browser';

export const enviarEmailJS = async (email: string, texto: string) => {
  try {
    // Inicializar o EmailJS com sua chave pública
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'L6LaJJdHzs3Fnwp4h');
    
    const templateParams = {
      to_email: email,
      to_name: 'Igreja',
      subject: '🔔 Lembrete: Aniversários de Amanhã',
      message: texto,
      from_name: 'Sistema de Aniversários da Igreja'
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_50a8uwm',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_6qeilv8',
      templateParams
    );

    console.log('Email enviado com sucesso:', response);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
};

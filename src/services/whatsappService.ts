
export const enviarWhatsApp = async (webhookUrl: string, telefone: string, mensagem: string) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        telefone,
        mensagem,
        timestamp: new Date().toISOString(),
      }),
    });

    console.log('WhatsApp webhook acionado');
    return true;
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return false;
  }
};

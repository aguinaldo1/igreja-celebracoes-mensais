
import { Evento } from '@/pages/Index';

export const getEventosAmanha = (eventos: Evento[]) => {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  
  const diaAmanha = String(amanha.getDate()).padStart(2, '0');
  const mesAmanha = String(amanha.getMonth() + 1).padStart(2, '0');
  const dataAmanha = `${diaAmanha}/${mesAmanha}`;

  return eventos.filter(evento => evento.data === dataAmanha);
};

export const gerarTextoNotificacao = (eventos: Evento[]) => {
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const dataAmanha = amanha.toLocaleDateString('pt-BR');

  let texto = `🔔 Lembrete: Aniversários de Amanhã (${dataAmanha})\n\n`;

  const aniversarios = eventos.filter(e => e.tipo === 'aniversario');
  const casamentos = eventos.filter(e => e.tipo === 'casamento');

  if (aniversarios.length > 0) {
    texto += `🎂 Aniversários:\n`;
    aniversarios.forEach(evento => {
      texto += `- ${evento.nome}\n`;
    });
    texto += `\n`;
  }

  if (casamentos.length > 0) {
    texto += `💍 Aniversários de Casamento:\n`;
    casamentos.forEach(evento => {
      texto += `- ${evento.nome}\n`;
    });
    texto += `\n`;
  }

  texto += `📝 Lembre-se de criar o pôster no Canva e compartilhar!\n`;
  texto += `🙏 "Que Deus continue abençoando essas vidas!"`;

  return texto;
};

export const jaNotificouHoje = () => {
  const ultimaNotificacao = localStorage.getItem('ultima-notificacao');
  const hoje = new Date().toDateString();
  return ultimaNotificacao === hoje;
};

export const marcarNotificacaoEnviada = () => {
  const hoje = new Date().toDateString();
  localStorage.setItem('ultima-notificacao', hoje);
};

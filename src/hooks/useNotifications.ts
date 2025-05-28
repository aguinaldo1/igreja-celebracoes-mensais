
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Evento } from '@/pages/Index';
import { getEventosAmanha, gerarTextoNotificacao, jaNotificouHoje, marcarNotificacaoEnviada } from '@/utils/notificationUtils';
import { enviarEmailJS } from '@/services/emailService';
import { enviarWhatsApp } from '@/services/whatsappService';

export const useNotifications = (eventos: Evento[]) => {
  const [proximosEventos, setProximosEventos] = useState<Evento[]>([]);
  const [configuracao, setConfiguracao] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Carregar configuração salva
    const configSalva = localStorage.getItem('configuracao-notificacoes');
    if (configSalva) {
      setConfiguracao(JSON.parse(configSalva));
    }

    // Verificar eventos de amanhã
    verificarEventosAmanha();
    
    // Configurar verificação diária
    const intervalo = setInterval(verificarEventosAmanha, 60000 * 60); // Verifica a cada hora
    
    return () => clearInterval(intervalo);
  }, [eventos]);

  const verificarEventosAmanha = () => {
    const eventosAmanha = getEventosAmanha(eventos);
    
    if (eventosAmanha.length > 0) {
      setProximosEventos(eventosAmanha);
      
      // Verificar se já notificou hoje
      if (!jaNotificouHoje() && configuracao) {
        enviarNotificacoes(eventosAmanha);
        marcarNotificacaoEnviada();
      }
    }
  };

  const enviarNotificacoes = async (eventos: Evento[]) => {
    const textoNotificacao = gerarTextoNotificacao(eventos);
    let emailEnviado = false;
    let whatsappEnviado = false;

    try {
      // Notificação por Email usando EmailJS
      if (configuracao.notificacaoEmail && configuracao.email) {
        emailEnviado = await enviarEmailJS(configuracao.email, textoNotificacao);
        
        if (emailEnviado) {
          console.log('Email enviado para:', configuracao.email);
        } else {
          console.error('Falha ao enviar email');
        }
      }

      // Notificação por WhatsApp (via Zapier)
      if (configuracao.notificacaoWhatsApp && configuracao.webhookZapier) {
        whatsappEnviado = await enviarWhatsApp(
          configuracao.webhookZapier,
          configuracao.whatsapp,
          textoNotificacao
        );
      }

      // Feedback para o usuário
      if (emailEnviado || whatsappEnviado) {
        const canais = [];
        if (emailEnviado) canais.push('email');
        if (whatsappEnviado) canais.push('WhatsApp');
        
        toast({
          title: "Notificações enviadas!",
          description: `Lembretes enviados via ${canais.join(' e ')} para ${eventos.length} evento(s) de amanhã.`,
        });
      } else {
        toast({
          title: "Configuração necessária",
          description: "Configure o EmailJS para enviar notificações por email.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Erro ao enviar notificações:', error);
      toast({
        title: "Erro nas notificações",
        description: "Houve um problema ao enviar os lembretes.",
        variant: "destructive",
      });
    }
  };

  const testarNotificacao = () => {
    if (eventos.length > 0) {
      const eventoTeste = [eventos[0]];
      enviarNotificacoes(eventoTeste);
    }
  };

  return {
    proximosEventos,
    configuracao,
    testarNotificacao
  };
};

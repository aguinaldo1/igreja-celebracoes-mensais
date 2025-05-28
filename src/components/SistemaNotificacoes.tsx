
import React, { useEffect, useState } from 'react';
import { Bell, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Evento } from '@/pages/Index';
import emailjs from '@emailjs/browser';

interface SistemaNotificacoesProps {
  eventos: Evento[];
}

const SistemaNotificacoes: React.FC<SistemaNotificacoesProps> = ({ eventos }) => {
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
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    
    const diaAmanha = String(amanha.getDate()).padStart(2, '0');
    const mesAmanha = String(amanha.getMonth() + 1).padStart(2, '0');
    const dataAmanha = `${diaAmanha}/${mesAmanha}`;

    const eventosAmanha = eventos.filter(evento => evento.data === dataAmanha);
    
    if (eventosAmanha.length > 0) {
      setProximosEventos(eventosAmanha);
      
      // Verificar se já notificou hoje
      const ultimaNotificacao = localStorage.getItem('ultima-notificacao');
      const hoje = new Date().toDateString();
      
      if (ultimaNotificacao !== hoje && configuracao) {
        enviarNotificacoes(eventosAmanha);
        localStorage.setItem('ultima-notificacao', hoje);
      }
    }
  };

  const gerarTextoNotificacao = (eventos: Evento[]) => {
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

  const enviarEmailJS = async (email: string, texto: string) => {
    try {
      // Inicializar o EmailJS com sua chave pública
      emailjs.init('sua_chave_publica_emailjs');
      
      const templateParams = {
        to_email: email,
        to_name: 'Igreja',
        subject: '🔔 Lembrete: Aniversários de Amanhã',
        message: texto,
        from_name: 'Sistema de Aniversários da Igreja'
      };

      const response = await emailjs.send(
        'seu_service_id',
        'seu_template_id',
        templateParams
      );

      console.log('Email enviado com sucesso:', response);
      return true;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return false;
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
        const response = await fetch(configuracao.webhookZapier, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            telefone: configuracao.whatsapp,
            mensagem: textoNotificacao,
            timestamp: new Date().toISOString(),
          }),
        });

        whatsappEnviado = true;
        console.log('WhatsApp webhook acionado');
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

  return (
    <div className="space-y-4">
      {/* Instruções EmailJS */}
      {configuracao && configuracao.notificacaoEmail && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              📧 Configuração de Email Necessária
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 text-sm">
            <p className="mb-2">Para receber emails, configure o EmailJS:</p>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Acesse <strong>emailjs.com</strong> e crie uma conta</li>
              <li>Crie um serviço de email (Gmail, Outlook, etc.)</li>
              <li>Crie um template de email</li>
              <li>Copie as chaves do EmailJS e atualize o código</li>
            </ol>
            <p className="mt-2 text-xs text-blue-600">
              Instruções detalhadas no README do projeto
            </p>
          </CardContent>
        </Card>
      )}

      {proximosEventos.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Bell className="w-5 h-5" />
              Eventos de Amanhã!
            </CardTitle>
            <CardDescription className="text-orange-600">
              {proximosEventos.length} evento(s) para lembrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {proximosEventos.map(evento => (
                <div key={evento.id} className="flex items-center gap-2 text-orange-700">
                  <span className="font-medium">{evento.nome}</span>
                  <span className="text-sm">
                    {evento.tipo === 'aniversario' ? '🎂' : '💍'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {configuracao && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-green-600" />
              Sistema de Notificações Ativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {configuracao.notificacaoEmail && (
                <p>✅ Email: {configuracao.email}</p>
              )}
              {configuracao.notificacaoWhatsApp && (
                <p>✅ WhatsApp: {configuracao.whatsapp}</p>
              )}
              <p>⏰ Horário: {configuracao.horarioNotificacao}</p>
            </div>
            <Button 
              onClick={testarNotificacao} 
              variant="outline" 
              className="mt-3"
              disabled={eventos.length === 0}
            >
              Testar Notificação
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SistemaNotificacoes;


import React, { useState } from 'react';
import { Bell, Mail, MessageCircle, Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ConfiguracaoNotificacoesProps {
  onSalvarConfiguracao: (config: any) => void;
}

const ConfiguracaoNotificacoes: React.FC<ConfiguracaoNotificacoesProps> = ({ onSalvarConfiguracao }) => {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notificacaoEmail, setNotificacaoEmail] = useState(true);
  const [notificacaoWhatsApp, setNotificacaoWhatsApp] = useState(false);
  const [horarioNotificacao, setHorarioNotificacao] = useState('09:00');
  const [webhookZapier, setWebhookZapier] = useState('');
  const { toast } = useToast();

  const handleSalvar = () => {
    if (notificacaoEmail && !email) {
      toast({
        title: "Email obrigatório",
        description: "Digite seu email para receber notificações.",
        variant: "destructive",
      });
      return;
    }

    if (notificacaoWhatsApp && !webhookZapier) {
      toast({
        title: "Webhook obrigatório",
        description: "Configure o webhook do Zapier para WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    const configuracao = {
      email,
      whatsapp,
      notificacaoEmail,
      notificacaoWhatsApp,
      horarioNotificacao,
      webhookZapier
    };

    localStorage.setItem('configuracao-notificacoes', JSON.stringify(configuracao));
    onSalvarConfiguracao(configuracao);

    toast({
      title: "Configuração salva!",
      description: "Suas preferências de notificação foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Configuração de Notificações</h2>
        <p className="text-gray-600">Configure como deseja receber lembretes dos aniversários</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Preferências de Notificação
          </CardTitle>
          <CardDescription>
            Ative as notificações que deseja receber um dia antes de cada aniversário
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <Label className="text-base font-medium">Notificação por Email</Label>
              </div>
              {notificacaoEmail && (
                <Input
                  type="email"
                  placeholder="seu-email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
            <Switch
              checked={notificacaoEmail}
              onCheckedChange={setNotificacaoEmail}
            />
          </div>

          {/* WhatsApp */}
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <Label className="text-base font-medium">Notificação por WhatsApp</Label>
              </div>
              {notificacaoWhatsApp && (
                <div className="space-y-2">
                  <Input
                    placeholder="Seu número: +55 11 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                  <Input
                    placeholder="Webhook URL do Zapier"
                    value={webhookZapier}
                    onChange={(e) => setWebhookZapier(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Configure um Zap no Zapier conectando Webhook → WhatsApp
                  </p>
                </div>
              )}
            </div>
            <Switch
              checked={notificacaoWhatsApp}
              onCheckedChange={setNotificacaoWhatsApp}
            />
          </div>

          {/* Horário */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Horário das Notificações</Label>
            <Input
              type="time"
              value={horarioNotificacao}
              onChange={(e) => setHorarioNotificacao(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <Button onClick={handleSalvar} className="w-full bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>

      {/* Instruções */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">📱 Como Configurar WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ol className="space-y-2 text-sm">
            <li>1. Acesse <strong>zapier.com</strong> e crie uma conta gratuita</li>
            <li>2. Crie um novo Zap com trigger <strong>"Webhooks by Zapier"</strong></li>
            <li>3. Configure a ação para <strong>"WhatsApp Business"</strong></li>
            <li>4. Copie a URL do webhook e cole no campo acima</li>
            <li>5. Teste a configuração e ative o Zap</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracaoNotificacoes;

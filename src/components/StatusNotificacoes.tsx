
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatusNotificacoesProps {
  configuracao: any;
  onTestarNotificacao: () => void;
  temEventos: boolean;
}

const StatusNotificacoes: React.FC<StatusNotificacoesProps> = ({ 
  configuracao, 
  onTestarNotificacao, 
  temEventos 
}) => {
  if (!configuracao) return null;

  return (
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
          onClick={onTestarNotificacao} 
          variant="outline" 
          className="mt-3"
          disabled={!temEventos}
        >
          Testar Notificação
        </Button>
      </CardContent>
    </Card>
  );
};

export default StatusNotificacoes;

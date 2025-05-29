
import React from 'react';
import { Evento } from '@/pages/Index';
import { useNotifications } from '@/hooks/useNotifications';
import ProximosEventos from '@/components/ProximosEventos';
import StatusNotificacoes from '@/components/StatusNotificacoes';

interface SistemaNotificacoesProps {
  eventos: Evento[];
}

const SistemaNotificacoes: React.FC<SistemaNotificacoesProps> = ({ eventos }) => {
  const { proximosEventos, configuracao, testarNotificacao } = useNotifications(eventos);

  return (
    <div className="space-y-4">
      {/* Próximos Eventos */}
      <ProximosEventos eventos={proximosEventos} />

      {/* Status das Notificações */}
      <StatusNotificacoes 
        configuracao={configuracao}
        onTestarNotificacao={testarNotificacao}
        temEventos={eventos.length > 0}
      />
    </div>
  );
};

export default SistemaNotificacoes;

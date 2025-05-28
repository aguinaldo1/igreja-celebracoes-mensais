
import React from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Evento } from '@/pages/Index';

interface ProximosEventosProps {
  eventos: Evento[];
}

const ProximosEventos: React.FC<ProximosEventosProps> = ({ eventos }) => {
  if (eventos.length === 0) return null;

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Bell className="w-5 h-5" />
          Eventos de Amanhã!
        </CardTitle>
        <CardDescription className="text-orange-600">
          {eventos.length} evento(s) para lembrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {eventos.map(evento => (
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
  );
};

export default ProximosEventos;

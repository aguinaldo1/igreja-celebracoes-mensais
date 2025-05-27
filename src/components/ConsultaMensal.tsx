
import React, { useState } from 'react';
import { Calendar, Search, Trash2, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Evento } from '@/pages/Index';

interface ConsultaMensalProps {
  eventos: Evento[];
  onRemoverEvento: (id: string) => void;
}

const meses = [
  { numero: '01', nome: 'Janeiro' },
  { numero: '02', nome: 'Fevereiro' },
  { numero: '03', nome: 'Março' },
  { numero: '04', nome: 'Abril' },
  { numero: '05', nome: 'Maio' },
  { numero: '06', nome: 'Junho' },
  { numero: '07', nome: 'Julho' },
  { numero: '08', nome: 'Agosto' },
  { numero: '09', nome: 'Setembro' },
  { numero: '10', nome: 'Outubro' },
  { numero: '11', nome: 'Novembro' },
  { numero: '12', nome: 'Dezembro' }
];

const ConsultaMensal: React.FC<ConsultaMensalProps> = ({ eventos, onRemoverEvento }) => {
  const [mesSelecionado, setMesSelecionado] = useState('05');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'aniversario' | 'casamento'>('todos');
  const { toast } = useToast();

  const listarEventosDoMes = (mes: string) => {
    return eventos.filter(evento => evento.data.split('/')[1] === mes.padStart(2, '0'));
  };

  const eventosFiltrados = listarEventosDoMes(mesSelecionado).filter(evento => 
    filtroTipo === 'todos' ? true : evento.tipo === filtroTipo
  ).sort((a, b) => {
    const diaA = parseInt(a.data.split('/')[0]);
    const diaB = parseInt(b.data.split('/')[0]);
    return diaA - diaB;
  });

  const aniversarios = eventosFiltrados.filter(e => e.tipo === 'aniversario');
  const casamentos = eventosFiltrados.filter(e => e.tipo === 'casamento');

  const handleRemover = (id: string, nome: string) => {
    onRemoverEvento(id);
    toast({
      title: "Evento removido",
      description: `${nome} foi removido da agenda.`,
    });
  };

  const mesNome = meses.find(m => m.numero === mesSelecionado)?.nome || 'Mês';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Consulta Mensal</h2>
        <p className="text-gray-600">Visualize os eventos do mês selecionado</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mês</Label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {meses.map(mes => (
                    <SelectItem key={mes.numero} value={mes.numero}>
                      {mes.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Evento</Label>
              <Select value={filtroTipo} onValueChange={(value) => setFiltroTipo(value as typeof filtroTipo)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os eventos</SelectItem>
                  <SelectItem value="aniversario">Aniversários</SelectItem>
                  <SelectItem value="casamento">Casamentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultado da Consulta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Eventos de {mesNome}
          </CardTitle>
          <CardDescription>
            {eventosFiltrados.length} evento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {eventosFiltrados.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum evento encontrado para este mês.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Aniversários */}
              {(filtroTipo === 'todos' || filtroTipo === 'aniversario') && aniversarios.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    🎂 Aniversários ({aniversarios.length})
                  </h3>
                  <div className="space-y-2">
                    {aniversarios.map(evento => (
                      <div key={evento.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-purple-600" />
                          <div>
                            <span className="font-medium">{evento.nome}</span>
                            <span className="text-gray-600 ml-2">– {evento.data}</span>
                            {evento.observacoes && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {evento.observacoes}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemover(evento.id, evento.nome)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Casamentos */}
              {(filtroTipo === 'todos' || filtroTipo === 'casamento') && casamentos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
                    💍 Aniversários de Casamento ({casamentos.length})
                  </h3>
                  <div className="space-y-2">
                    {casamentos.map(evento => (
                      <div key={evento.id} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Heart className="w-4 h-4 text-pink-600" />
                          <div>
                            <span className="font-medium">{evento.nome}</span>
                            <span className="text-gray-600 ml-2">– {evento.data}</span>
                            {evento.observacoes && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {evento.observacoes}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemover(evento.id, evento.nome)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultaMensal;

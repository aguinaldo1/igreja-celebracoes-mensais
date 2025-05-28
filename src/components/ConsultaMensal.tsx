
import React, { useState } from 'react';
import { Calendar, Search, Trash2, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Evento } from '@/pages/Index';
import SeletorMes from '@/components/SeletorMes';

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
  // Define o mês atual como padrão
  const mesAtual = String(new Date().getMonth() + 1).padStart(2, '0');
  const [mesSelecionado, setMesSelecionado] = useState(mesAtual);
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
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Eventos do Mês</h2>
        <p className="text-sm sm:text-base text-gray-600">Visualize os eventos mensais</p>
      </div>

      {/* Navegação de Mês */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            Navegação
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <SeletorMes 
            mesSelecionado={mesSelecionado} 
            onMesChange={setMesSelecionado} 
          />
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            Filtrar por Tipo
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select value={filtroTipo} onValueChange={(value) => setFiltroTipo(value as typeof filtroTipo)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os eventos</SelectItem>
              <SelectItem value="aniversario">Aniversários</SelectItem>
              <SelectItem value="casamento">Casamentos</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Resultado da Consulta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            Eventos de {mesNome}
          </CardTitle>
          <CardDescription className="text-sm">
            {eventosFiltrados.length} evento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {eventosFiltrados.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-sm sm:text-base">Nenhum evento encontrado para este mês.</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Aniversários */}
              {(filtroTipo === 'todos' || filtroTipo === 'aniversario') && aniversarios.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-2 sm:mb-3 flex items-center gap-2">
                    🎂 Aniversários ({aniversarios.length})
                  </h3>
                  <div className="space-y-2">
                    {aniversarios.map(evento => (
                      <div key={evento.id} className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg border">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="font-medium text-sm sm:text-base truncate">{evento.nome}</span>
                              <span className="text-gray-600 text-xs sm:text-sm">– {evento.data}</span>
                            </div>
                            {evento.observacoes && (
                              <Badge variant="outline" className="text-xs mt-1 sm:mt-0 sm:ml-2">
                                {evento.observacoes}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemover(evento.id, evento.nome)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2 flex-shrink-0"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Casamentos */}
              {(filtroTipo === 'todos' || filtroTipo === 'casamento') && casamentos.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-pink-700 mb-2 sm:mb-3 flex items-center gap-2">
                    💍 Aniversários de Casamento ({casamentos.length})
                  </h3>
                  <div className="space-y-2">
                    {casamentos.map(evento => (
                      <div key={evento.id} className="flex items-center justify-between p-2 sm:p-3 bg-pink-50 rounded-lg border">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="font-medium text-sm sm:text-base truncate">{evento.nome}</span>
                              <span className="text-gray-600 text-xs sm:text-sm">– {evento.data}</span>
                            </div>
                            {evento.observacoes && (
                              <Badge variant="outline" className="text-xs mt-1 sm:mt-0 sm:ml-2">
                                {evento.observacoes}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemover(evento.id, evento.nome)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 sm:p-2 flex-shrink-0"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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


import React, { useState, useEffect } from 'react';
import { Calendar, Church, Plus, FileText, Users, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CadastroEventos from '@/components/CadastroEventos';
import ConsultaMensal from '@/components/ConsultaMensal';
import GeradorPoster from '@/components/GeradorPoster';
import ConfiguracaoNotificacoes from '@/components/ConfiguracaoNotificacoes';
import SistemaNotificacoes from '@/components/SistemaNotificacoes';

export interface Evento {
  id: string;
  tipo: 'aniversario' | 'casamento';
  nome: string;
  data: string; // DD/MM
  observacoes?: string;
}

const STORAGE_KEY = 'agenda-celebracoes-eventos';

const Index = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    try {
      const eventosSalvos = localStorage.getItem(STORAGE_KEY);
      if (eventosSalvos) {
        const eventosCarregados = JSON.parse(eventosSalvos);
        setEventos(eventosCarregados);
        console.log('Eventos carregados do localStorage:', eventosCarregados);
      } else {
        // Se não há dados salvos, usar dados de exemplo
        const eventosIniciais = [
          {
            id: '1',
            tipo: 'aniversario' as const,
            nome: 'Maria da Silva',
            data: '03/05',
            observacoes: 'Ministério do Louvor'
          },
          {
            id: '2',
            tipo: 'aniversario' as const,
            nome: 'João Pereira',
            data: '12/05',
            observacoes: 'Jovens'
          },
          {
            id: '3',
            tipo: 'casamento' as const,
            nome: 'Ana e Carlos',
            data: '07/05',
            observacoes: 'Líderes'
          },
          {
            id: '4',
            tipo: 'casamento' as const,
            nome: 'Júlia e Renato',
            data: '25/05',
            observacoes: 'Casais Novos'
          }
        ];
        setEventos(eventosIniciais);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventosIniciais));
        console.log('Eventos iniciais criados e salvos');
      }
    } catch (error) {
      console.error('Erro ao carregar eventos do localStorage:', error);
      setEventos([]);
    }
  }, []);

  // Salvar no localStorage sempre que os eventos mudarem
  useEffect(() => {
    if (eventos.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
        console.log('Eventos salvos no localStorage:', eventos);
      } catch (error) {
        console.error('Erro ao salvar eventos no localStorage:', error);
      }
    }
  }, [eventos]);

  const adicionarEvento = (novoEvento: Omit<Evento, 'id'>) => {
    const evento: Evento = {
      ...novoEvento,
      id: Date.now().toString()
    };
    setEventos(eventosAtuais => {
      const novosEventos = [...eventosAtuais, evento];
      console.log('Novo evento adicionado:', evento);
      return novosEventos;
    });
  };

  const removerEvento = (id: string) => {
    setEventos(eventosAtuais => {
      const novosEventos = eventosAtuais.filter(evento => evento.id !== id);
      console.log('Evento removido, ID:', id);
      return novosEventos;
    });
  };

  const salvarConfiguracao = (config: any) => {
    console.log('Configuração salva:', config);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-3 sm:mb-4">
            <Church className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
              Agenda de Celebrações
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            "O Senhor te abençoe e te guarde" - Números 6:24
          </p>
          <p className="text-xs sm:text-md text-gray-500 mt-1 sm:mt-2 px-2">
            Gerencie aniversários e casamentos da nossa comunidade
          </p>
        </div>

        {/* Sistema de Notificações */}
        <div className="mb-4 sm:mb-6">
          <SistemaNotificacoes eventos={eventos} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Total
              </CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-purple-700">{eventos.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-pink-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Aniversários
              </CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-pink-700">
                {eventos.filter(e => e.tipo === 'aniversario').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                Casamentos
              </CardTitle>
              <Church className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold text-blue-700">
                {eventos.filter(e => e.tipo === 'casamento').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <Tabs defaultValue="consulta" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
                <TabsTrigger value="consulta" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Consultar Mês</span>
                  <span className="sm:hidden">Consulta</span>
                </TabsTrigger>
                <TabsTrigger value="cadastro" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Cadastrar</span>
                  <span className="sm:hidden">Add</span>
                </TabsTrigger>
                <TabsTrigger value="poster" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Gerar Pôster</span>
                  <span className="sm:hidden">Pôster</span>
                </TabsTrigger>
                <TabsTrigger value="notificacoes" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
                  <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Notificações</span>
                  <span className="sm:hidden">Avisos</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="consulta">
                <ConsultaMensal eventos={eventos} onRemoverEvento={removerEvento} />
              </TabsContent>

              <TabsContent value="cadastro">
                <CadastroEventos onAdicionarEvento={adicionarEvento} />
              </TabsContent>

              <TabsContent value="poster">
                <GeradorPoster eventos={eventos} />
              </TabsContent>

              <TabsContent value="notificacoes">
                <ConfiguracaoNotificacoes onSalvarConfiguracao={salvarConfiguracao} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm px-2">
          <p>Feito com ❤️ para nossa comunidade de fé</p>
        </div>
      </div>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { Calendar, Church, Plus, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CadastroEventos from '@/components/CadastroEventos';
import ConsultaMensal from '@/components/ConsultaMensal';
import GeradorPoster from '@/components/GeradorPoster';

export interface Evento {
  id: string;
  tipo: 'aniversario' | 'casamento';
  nome: string;
  data: string; // DD/MM
  observacoes?: string;
}

const Index = () => {
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: '1',
      tipo: 'aniversario',
      nome: 'Maria da Silva',
      data: '03/05',
      observacoes: 'Ministério do Louvor'
    },
    {
      id: '2',
      tipo: 'aniversario',
      nome: 'João Pereira',
      data: '12/05',
      observacoes: 'Jovens'
    },
    {
      id: '3',
      tipo: 'casamento',
      nome: 'Ana e Carlos',
      data: '07/05',
      observacoes: 'Líderes'
    },
    {
      id: '4',
      tipo: 'casamento',
      nome: 'Júlia e Renato',
      data: '25/05',
      observacoes: 'Casais Novos'
    }
  ]);

  const adicionarEvento = (novoEvento: Omit<Evento, 'id'>) => {
    const evento: Evento = {
      ...novoEvento,
      id: Date.now().toString()
    };
    setEventos([...eventos, evento]);
  };

  const removerEvento = (id: string) => {
    setEventos(eventos.filter(evento => evento.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Church className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Agenda de Celebrações
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "O Senhor te abençoe e te guarde" - Números 6:24
          </p>
          <p className="text-md text-gray-500 mt-2">
            Gerencie aniversários e casamentos da nossa comunidade
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Eventos
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{eventos.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-pink-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Aniversários
              </CardTitle>
              <Users className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-700">
                {eventos.filter(e => e.tipo === 'aniversario').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Casamentos
              </CardTitle>
              <Church className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">
                {eventos.filter(e => e.tipo === 'casamento').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="consulta" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="consulta" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Consultar Mês
                </TabsTrigger>
                <TabsTrigger value="cadastro" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Cadastrar
                </TabsTrigger>
                <TabsTrigger value="poster" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Gerar Pôster
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
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Feito com ❤️ para nossa comunidade de fé</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

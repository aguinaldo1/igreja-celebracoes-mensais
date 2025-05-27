
import React, { useState } from 'react';
import { Plus, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Evento } from '@/pages/Index';

interface CadastroEventosProps {
  onAdicionarEvento: (evento: Omit<Evento, 'id'>) => void;
}

const CadastroEventos: React.FC<CadastroEventosProps> = ({ onAdicionarEvento }) => {
  const [tipo, setTipo] = useState<'aniversario' | 'casamento'>('aniversario');
  const [nome, setNome] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !dia || !mes) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, dia e mês.",
        variant: "destructive",
      });
      return;
    }

    const diaNum = parseInt(dia);
    const mesNum = parseInt(mes);

    if (diaNum < 1 || diaNum > 31 || mesNum < 1 || mesNum > 12) {
      toast({
        title: "Data inválida",
        description: "Por favor, verifique o dia e mês informados.",
        variant: "destructive",
      });
      return;
    }

    const data = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}`;

    onAdicionarEvento({
      tipo,
      nome,
      data,
      observacoes
    });

    // Limpar formulário
    setNome('');
    setDia('');
    setMes('');
    setObservacoes('');

    toast({
      title: "Evento cadastrado!",
      description: `${tipo === 'aniversario' ? 'Aniversário' : 'Casamento'} de ${nome} foi adicionado com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Novo Evento</h2>
        <p className="text-gray-600">Adicione aniversários e casamentos à nossa agenda</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-600" />
            Novo Evento
          </CardTitle>
          <CardDescription>
            Preencha os dados do evento comemorativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo do Evento */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Tipo de Evento</Label>
              <RadioGroup value={tipo} onValueChange={(value) => setTipo(value as 'aniversario' | 'casamento')}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-purple-50">
                  <RadioGroupItem value="aniversario" id="aniversario" />
                  <Label htmlFor="aniversario" className="flex items-center gap-2 cursor-pointer">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    Aniversário Pessoal
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-pink-50">
                  <RadioGroupItem value="casamento" id="casamento" />
                  <Label htmlFor="casamento" className="flex items-center gap-2 cursor-pointer">
                    <Heart className="w-4 h-4 text-pink-600" />
                    Aniversário de Casamento
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-base font-medium">
                {tipo === 'aniversario' ? 'Nome Completo' : 'Nome dos Cônjuges'}
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={tipo === 'aniversario' ? 'Ex: Maria da Silva' : 'Ex: Ana e Carlos'}
                className="text-base"
              />
            </div>

            {/* Data */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dia" className="text-base font-medium">Dia</Label>
                <Input
                  id="dia"
                  type="number"
                  min="1"
                  max="31"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  placeholder="Ex: 15"
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mes" className="text-base font-medium">Mês</Label>
                <Input
                  id="mes"
                  type="number"
                  min="1"
                  max="12"
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  placeholder="Ex: 5"
                  className="text-base"
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes" className="text-base font-medium">
                Observações (opcional)
              </Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex: Ministério do Louvor, Jovens, Líderes..."
                className="text-base resize-none"
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Evento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroEventos;

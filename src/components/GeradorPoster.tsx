
import React, { useState } from 'react';
import { FileText, Copy, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Evento } from '@/pages/Index';

interface GeradorPosterProps {
  eventos: Evento[];
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

const GeradorPoster: React.FC<GeradorPosterProps> = ({ eventos }) => {
  const [mesSelecionado, setMesSelecionado] = useState('05');
  const { toast } = useToast();

  const gerarTextoPoster = (mes: string) => {
    const mesNome = meses.find(m => m.numero === mes)?.nome || 'Mês';
    const eventosDoMes = eventos.filter(evento => evento.data.split('/')[1] === mes.padStart(2, '0'));
    
    const aniversarios = eventosDoMes
      .filter(e => e.tipo === 'aniversario')
      .sort((a, b) => parseInt(a.data.split('/')[0]) - parseInt(b.data.split('/')[0]));
    
    const casamentos = eventosDoMes
      .filter(e => e.tipo === 'casamento')
      .sort((a, b) => parseInt(a.data.split('/')[0]) - parseInt(b.data.split('/')[0]));

    let texto = `🎉 Aniversariantes do Mês – ${mesNome}\n`;
    texto += `"O Senhor te abençoe e te guarde" – Números 6:24\n\n`;

    if (aniversarios.length > 0) {
      texto += `🎂 Aniversários:\n`;
      aniversarios.forEach(evento => {
        texto += `- ${evento.nome} – ${evento.data}\n`;
      });
      texto += `\n`;
    }

    if (casamentos.length > 0) {
      texto += `💍 Aniversários de Casamento:\n`;
      casamentos.forEach(evento => {
        texto += `- ${evento.nome} – ${evento.data}\n`;
      });
      texto += `\n`;
    }

    if (aniversarios.length === 0 && casamentos.length === 0) {
      texto += `Não há celebrações programadas para este mês.\n\n`;
    }

    texto += `Parabéns! Que Deus continue abençoando suas vidas!\n`;
    texto += `Com carinho, sua família da Igreja 💒`;

    return texto;
  };

  const textoPoster = gerarTextoPoster(mesSelecionado);

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(textoPoster);
      toast({
        title: "Texto copiado!",
        description: "O texto do pôster foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto. Tente selecionar e copiar manualmente.",
        variant: "destructive",
      });
    }
  };

  const baixarTexto = () => {
    const mesNome = meses.find(m => m.numero === mesSelecionado)?.nome || 'Mês';
    const blob = new Blob([textoPoster], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aniversariantes-${mesNome.toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Arquivo baixado!",
      description: `O texto do pôster de ${mesNome} foi baixado.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerador de Pôster</h2>
        <p className="text-gray-600">Crie textos prontos para WhatsApp e Canva</p>
      </div>

      {/* Seleção do Mês */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Selecionar Mês
          </CardTitle>
          <CardDescription>
            Escolha o mês para gerar o pôster
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
            <SelectTrigger className="max-w-xs">
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
        </CardContent>
      </Card>

      {/* Preview do Pôster */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Preview do Pôster
          </CardTitle>
          <CardDescription>
            Texto pronto para usar no WhatsApp ou Canva
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={textoPoster}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-gray-50 border-2 border-dashed border-gray-300"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={copiarTexto} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Copy className="w-4 h-4 mr-2" />
              Copiar Texto
            </Button>
            <Button onClick={baixarTexto} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Baixar como .txt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dicas de Uso */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">💡 Dicas de Uso</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-700">
          <ul className="space-y-2 text-sm">
            <li>• <strong>WhatsApp:</strong> Copie o texto e cole diretamente nos grupos</li>
            <li>• <strong>Canva:</strong> Use o texto como base para criar designs personalizados</li>
            <li>• <strong>Impressão:</strong> Baixe o arquivo para usar em editores de texto</li>
            <li>• <strong>Lembrete:</strong> Configure um lembrete para o dia 25 de cada mês</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeradorPoster;

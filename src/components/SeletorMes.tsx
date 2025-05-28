
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SeletorMesProps {
  mesSelecionado: string;
  onMesChange: (mes: string) => void;
}

const meses = [
  { numero: '01', nome: 'Janeiro', abrev: 'Jan' },
  { numero: '02', nome: 'Fevereiro', abrev: 'Fev' },
  { numero: '03', nome: 'Março', abrev: 'Mar' },
  { numero: '04', nome: 'Abril', abrev: 'Abr' },
  { numero: '05', nome: 'Maio', abrev: 'Mai' },
  { numero: '06', nome: 'Junho', abrev: 'Jun' },
  { numero: '07', nome: 'Julho', abrev: 'Jul' },
  { numero: '08', nome: 'Agosto', abrev: 'Ago' },
  { numero: '09', nome: 'Setembro', abrev: 'Set' },
  { numero: '10', nome: 'Outubro', abrev: 'Out' },
  { numero: '11', nome: 'Novembro', abrev: 'Nov' },
  { numero: '12', nome: 'Dezembro', abrev: 'Dez' }
];

const SeletorMes: React.FC<SeletorMesProps> = ({ mesSelecionado, onMesChange }) => {
  const mesAtual = meses.find(m => m.numero === mesSelecionado);
  
  const mesAnterior = () => {
    const indiceAtual = meses.findIndex(m => m.numero === mesSelecionado);
    const novoIndice = indiceAtual === 0 ? 11 : indiceAtual - 1;
    onMesChange(meses[novoIndice].numero);
  };

  const proximoMes = () => {
    const indiceAtual = meses.findIndex(m => m.numero === mesSelecionado);
    const novoIndice = indiceAtual === 11 ? 0 : indiceAtual + 1;
    onMesChange(meses[novoIndice].numero);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Desktop: Navegação com setas */}
      <div className="hidden sm:flex items-center gap-4 flex-1">
        <Button
          variant="outline"
          size="sm"
          onClick={mesAnterior}
          className="p-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex-1 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {mesAtual?.nome || 'Mês'}
          </h3>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={proximoMes}
          className="p-2"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile: Select dropdown */}
      <div className="sm:hidden flex-1">
        <Select value={mesSelecionado} onValueChange={onMesChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {meses.map(mes => (
              <SelectItem key={mes.numero} value={mes.numero}>
                <span className="sm:hidden">{mes.abrev}</span>
                <span className="hidden sm:inline">{mes.nome}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile: Navegação com setas (compacta) */}
      <div className="sm:hidden flex gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={mesAnterior}
          className="p-1 h-8 w-8"
        >
          <ChevronLeft className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={proximoMes}
          className="p-1 h-8 w-8"
        >
          <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default SeletorMes;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ConfiguracaoEmailInfo: React.FC = () => {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          📧 Configuração de Email Necessária
        </CardTitle>
      </CardHeader>
      <CardContent className="text-blue-700 text-sm">
        <p className="mb-2">Para receber emails, configure o EmailJS:</p>
        <ol className="space-y-1 list-decimal list-inside">
          <li>Acesse <strong>emailjs.com</strong> e crie uma conta</li>
          <li>Crie um serviço de email (Gmail, Outlook, etc.)</li>
          <li>Crie um template de email</li>
          <li>Copie as chaves do EmailJS e atualize o código</li>
        </ol>
        <p className="mt-2 text-xs text-blue-600">
          Instruções detalhadas no README do projeto
        </p>
      </CardContent>
    </Card>
  );
};

export default ConfiguracaoEmailInfo;

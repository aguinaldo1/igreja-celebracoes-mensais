# 📅 Agenda de Aniversários da Igreja

Um sistema completo e carinhoso para gerenciar aniversários e datas especiais da nossa comunidade religiosa. Com notificações automáticas, geração de pôsteres e instalação como aplicativo no celular!

## ✨ Funcionalidades

### 🎂 Gestão de Eventos
- **Cadastro de Aniversários**: Registre aniversários dos membros
- **Aniversários de Casamento**: Mantenha registro das datas especiais dos casais
- **Consulta Mensal**: Visualize todos os eventos de cada mês
- **Organização por Ministérios**: Adicione observações sobre ministérios e grupos

### 🔔 Sistema de Notificações Inteligente
- **Lembretes Automáticos**: Receba avisos um dia antes de cada evento
- **Múltiplos Canais**: Email e WhatsApp
- **Texto Personalizado**: Mensagens prontas para usar no Canva
- **Configuração Flexível**: Escolha horário e canais de sua preferência

### 🎨 Geração de Conteúdo
- **Pôsteres Automáticos**: Texto formatado para criar no Canva
- **Templates Prontos**: Mensagens carinhosas e bíblicas
- **Compartilhamento Fácil**: Pronto para Instagram e grupos do WhatsApp

### 📱 Progressive Web App (PWA)
- **Instalação no Celular**: Funciona como um app nativo
- **Funciona Offline**: Acesso aos dados mesmo sem internet
- **Ícone na Tela**: Acesso rápido direto da tela inicial
- **Notificações Push**: Alertas mesmo com o app fechado

## 🚀 Como Usar

### 1. Primeira Configuração
1. Acesse o aplicativo no seu navegador
2. Vá para a aba "Notificações"
3. Configure seu email e/ou WhatsApp
4. Salve as configurações

### 2. Cadastrando Eventos
1. Clique na aba "Cadastrar"
2. Escolha o tipo: Aniversário ou Casamento
3. Preencha nome, data (DD/MM) e observações
4. Salve o evento

### 3. Consultando Eventos
1. Use a aba "Consultar Mês"
2. Navegue pelos meses com as setas
3. Veja todos os eventos organizados por data

### 4. Gerando Pôsteres
1. Acesse "Gerar Pôster"
2. Selecione o mês desejado
3. Copie o texto gerado
4. Use no Canva para criar o design
5. Poste nas redes sociais

## ⚙️ Configuração da Esteira CI/CD (GitHub Actions + Vercel)

Esta seção é essencial para configurar o deploy automático no Vercel através do GitHub Actions.

### Pré-requisitos
1. Conta no GitHub (repositório já conectado)
2. Conta no Vercel
3. Projeto já importado no Vercel

### Passo 1: Obter Credenciais do Vercel

#### 1.1 VERCEL_TOKEN
1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Clique em "Create Token"
3. Dê um nome para o token (ex: "GitHub Actions CI/CD")
4. Selecione o escopo necessário
5. Clique em "Create"
6. **Copie o token imediatamente** (não será mostrado novamente)

#### 1.2 VERCEL_ORG_ID
1. Acesse [vercel.com/teams](https://vercel.com/teams)
2. Clique no seu time/organização
3. Vá em "Settings" > "General"
4. Copie o "Team ID" (este é o VERCEL_ORG_ID)

#### 1.3 VERCEL_PROJECT_ID
1. Acesse seu projeto no Vercel
2. Vá em "Settings" > "General"
3. Copie o "Project ID"

### Passo 2: Configurar Secrets no GitHub

1. Vá para o seu repositório no GitHub
2. Clique em "Settings" (aba do repositório)
3. No menu lateral, clique em "Secrets and variables" > "Actions"
4. Clique em "New repository secret"
5. Adicione cada secret:

#### Secrets Obrigatórios:
```
Nome: VERCEL_TOKEN
Valor: [seu token do Vercel]

Nome: VERCEL_ORG_ID  
Valor: [seu team/org ID do Vercel]

Nome: VERCEL_PROJECT_ID
Valor: [seu project ID do Vercel]
```

#### Secrets para Notificações (Opcionais):
```
Nome: VITE_EMAILJS_PUBLIC_KEY
Valor: L6LaJJdHzs3Fnwp4h

Nome: VITE_EMAILJS_SERVICE_ID
Valor: service_50a8uwm

Nome: VITE_EMAILJS_TEMPLATE_ID
Valor: template_6qeilv8

Nome: VITE_ZAPIER_WEBHOOK_URL
Valor: https://hooks.zapier.com/hooks/catch/23114378/2jli2w9/
```

### Passo 3: Verificar Configuração

Após configurar os secrets:

1. Faça um commit qualquer no repositório
2. Vá para a aba "Actions" do GitHub
3. Verifique se o workflow está executando
4. Aguarde a conclusão do deploy
5. Acesse seu site no Vercel para verificar se está funcionando

### 🔄 Fluxo de Deploy Automático

A partir de agora, a cada push para a branch `main`:

1. ✅ **Análise de Código**: ESLint e verificações de qualidade
2. ✅ **Build de Teste**: Verifica se o projeto compila
3. ✅ **Testes**: Executa todos os testes automatizados
4. ✅ **Análise de Segurança**: CodeQL para detectar vulnerabilidades
5. ✅ **Deploy Preview**: Deploy de preview no Vercel
6. ✅ **Deploy Produção**: Deploy automático em produção
7. ✅ **Audit de Performance**: Lighthouse CI para métricas de performance
8. ✅ **Notificações**: Status do deploy via GitHub

### 🛡️ Segurança dos Secrets

- ✅ **Criptografados**: Todos os secrets são criptografados pelo GitHub
- ✅ **Acesso Restrito**: Apenas workflows autorizados podem acessar
- ✅ **Não Expostos**: Jamais aparecem nos logs públicos
- ✅ **Auditoria**: Todas as utilizações são logadas
- ✅ **Rotação**: Podem ser atualizados a qualquer momento

### 🐛 Troubleshooting CI/CD

#### Deploy Falha com Erro de Token
```bash
Error: Invalid token
```
**Solução**: Verificar se o VERCEL_TOKEN foi configurado corretamente

#### Projeto Não Encontrado
```bash
Error: Project not found
```
**Solução**: Verificar VERCEL_PROJECT_ID e VERCEL_ORG_ID

#### Build Falha
```bash
Error: Build failed
```
**Solução**: Verificar se todas as dependências estão no package.json

## 📧 Configuração de Email (EmailJS)

Para receber notificações por email, você precisa configurar o EmailJS:

### Passo 1: Criar Conta no EmailJS
1. Acesse [emailjs.com](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Confirme seu email

### Passo 2: Configurar Serviço de Email
1. No painel do EmailJS, vá em "Email Services"
2. Clique em "Add New Service"
3. Escolha seu provedor (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. Anote o **Service ID**

### Passo 3: Criar Template de Email
1. Vá em "Email Templates"
2. Clique em "Create New Template"
3. Use este template:

```
Assunto: {{subject}}

Olá {{to_name}},

{{message}}

Atenciosamente,
{{from_name}}
```

4. Anote o **Template ID**

### Passo 4: Obter Chave Pública
1. Vá em "Account" > "General"
2. Copie sua **Public Key**

### Passo 5: Atualizar o Código
No arquivo `src/components/SistemaNotificacoes.tsx`, substitua:
- `'sua_chave_publica_emailjs'` pela sua Public Key
- `'seu_service_id'` pelo seu Service ID  
- `'seu_template_id'` pelo seu Template ID

## 📱 Instalando no Celular

### Android
1. Abra o site no Chrome
2. Toque no menu (3 pontinhos)
3. Selecione "Instalar app" ou "Adicionar à tela inicial"
4. Confirme a instalação
5. O ícone aparecerá na sua tela inicial

### iPhone
1. Abra o site no Safari
2. Toque no ícone de compartilhar
3. Selecione "Adicionar à Tela de Início"
4. Confirme e nomeie o atalho

## 💬 Configuração do WhatsApp (Zapier)

### Passo 1: Criar Conta no Zapier
1. Acesse [zapier.com](https://zapier.com/)
2. Crie uma conta gratuita

### Passo 2: Criar um Zap
1. Clique em "Create Zap"
2. **Trigger**: Escolha "Webhooks by Zapier"
3. **Event**: Selecione "Catch Hook"
4. Copie a URL do webhook fornecida

### Passo 3: Configurar Ação
1. **Action**: Escolha "WhatsApp Business" ou "Telegram"
2. Configure sua conta do WhatsApp/Telegram
3. Mapeie os campos:
   - **Número**: Use o campo `telefone` do webhook
   - **Mensagem**: Use o campo `mensagem` do webhook

### Passo 4: Testar e Ativar
1. Teste o Zap
2. Ative o Zap
3. Cole a URL do webhook no app

## 🛠 Para Desenvolvedores

### Tecnologias Utilizadas
- **React 18** - Interface moderna e responsiva
- **TypeScript** - Tipagem segura
- **Tailwind CSS** - Estilização rápida e consistente
- **Shadcn/UI** - Componentes elegantes
- **EmailJS** - Envio de emails sem backend
- **Vite** - Build rápido e otimizado

### Instalação Local
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Estrutura do Projeto
```
src/
├── components/          # Componentes React
│   ├── CadastroEventos.tsx
│   ├── ConsultaMensal.tsx
│   ├── GeradorPoster.tsx
│   ├── ConfiguracaoNotificacoes.tsx
│   └── SistemaNotificacoes.tsx
├── pages/              # Páginas da aplicação
│   └── Index.tsx
└── types/              # Definições de tipos
```

## 🚀 Deploy

### Deploy Automático (Recomendado)
Com a esteira de CI/CD configurada, o deploy acontece automaticamente:
- Push para `main` → Deploy automático
- Pull Requests → Deploy de preview
- Monitoramento contínuo de qualidade

### Deploy Manual na Vercel
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push

### Deploy Manual na Netlify
1. Conecte seu repositório à Netlify
2. Configure o comando de build: `npm run build`
3. Pasta de publicação: `dist`

## 🙏 Versículos e Inspiração

> *"Lembre-se do seu Criador nos dias da sua juventude"* - Eclesiastes 12:1

> *"O Senhor te abençoe e te guarde"* - Números 6:24

Este sistema foi criado com amor para fortalecer os laços da nossa comunidade, lembrando-nos de celebrar cada vida e cada momento especial que Deus nos concede.

## 🤝 Contribuindo

Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias  
- Contribuir com código
- Compartilhar ideias

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no GitHub
- Entre em contato com a liderança da igreja
- Consulte a documentação

---

**Feito com ❤️ para nossa comunidade de fé**

*"Porque onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles."* - Mateus 18:20

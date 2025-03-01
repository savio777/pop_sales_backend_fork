# Sistema de Gestão de Colaboradores e Roteirização de Visitas

## Descrição

Este sistema é uma plataforma SaaS (Software como Serviço) voltada para o gerenciamento de empresas e colaboradores, com foco em funções como vendas, entregas, cobranças e promoções. O sistema inclui funcionalidades para monitoramento de rotas, gestão de colaboradores, controle de desempenho, e muito mais.

O software oferece funcionalidades avançadas, como geolocalização, integração com meios de pagamento, e um painel de controle para administradores e empresas. Ele foi desenvolvido utilizando as tecnologias mais modernas e práticas para garantir desempenho, escalabilidade e facilidade de manutenção.

## Regras de Negócio

### 1. Níveis de Usuário

#### Admin
- Autenticação com diferentes níveis de permissão.
- Gerenciamento de Empresas (Cadastrar, listar, atualizar e alterar status de empresas).
- Monitoramento de Relatórios (visitas, vendas, entregas e cobranças por empresa e colaborador).

#### Empresa
- Autenticação segura para acesso ao painel administrativo.
- Gerenciamento de Dados (Atualizar informações e cadastrar endereços de clientes).
- Gerenciamento de Colaboradores (Cadastrar, editar e alterar status de colaboradores).
- Gestão de Rota e Serviços (criar, listar, atualizar e remover rotações e serviços, atribuir atividades a colaboradores).
- Monitoramento e Rastreamento (Localização em tempo real, identificação de cliente e serviço, análise de desempenho de vendas).

### 2. Check-in e Check-out
- **Check-in**: Registra data, hora e localização do colaborador com restrição geográfica.
- **Check-out**: Registra data, hora e localização, além de um formulário de finalização com base no serviço prestado.

### 3. Colaboradores e Módulos de Trabalho
- **Promotor, Vendedor, Entregador, Cobrador**: Cada módulo tem funcionalidades específicas como registro de atividades, visualização de rotas e formulários de avaliação.

### 4. Avaliação de Atendimento
- Envio de link para o cliente avaliar o atendimento do colaborador.

### 5. Registro de Problemas e Ocorrências
- Registro de ocorrências como clientes ausentes e problemas com produtos.

### 6. Sistema de Pontuação e Bonificação
- Ranking e bônus para colaboradores mais produtivos.

### 7. Distribuição do Sistema como Serviço (SaaS)
- Integração com meios de pagamento e planos de assinatura.
- Controle de Acesso (bloqueio de acesso para inadimplentes).

### 8. Fluxo de Atribuição de Tarefas aos Colaboradores
- Criação de rotações, atividades e atribuição para os colaboradores.

---

## Tecnologias Utilizadas

- **Geolocalização**: Google Cloud API
- **Linguagem de Programação**: TypeScript
- **Frontend**: React.js, TSX, HTML, CSS, JavaScript
- **Estilização**: Tailwind CSS
- **Gerenciamento de Filas**: RabbitMQ
- **Validação de Dados**: Zod
- **Cache**: Redis
- **ORM**: Prisma.js
- **Padrões de Arquitetura**: Repository Pattern, Factory Pattern
- **Testes**: Unitários, Integração (E2E) com Vitest e Supertest
- **Gerenciamento de Estado**: Zustand
- **Tempo Real**: WebSocket
- **UI/UX Design**: Figma

---

## Funcionalidades

### Administrador
- **Gerenciamento de Empresas**: Cadastro, listagem, atualização e alteração de status das empresas.
- **Relatórios**: Gerar relatórios sobre visitas, vendas, entregas e cobranças realizadas.
  
### Empresa
- **Painel Administrativo**: Acesso seguro para gerenciamento da empresa.
- **Gerenciamento de Rota**: Criação, edição e exclusão de rotas.
- **Monitoramento de Colaboradores**: Visualizar dados de colaboradores e rastrear suas atividades.

### Colaboradores
- **Módulos**: O sistema oferece diferentes módulos de trabalho (Promotor, Vendedor, Entregador, Cobrador), cada um com suas responsabilidades e funcionalidades específicas.
- **Rotas e Atividades**: Cada colaborador tem uma rota específica e atividades a serem realizadas, que são monitoradas em tempo real.

---

## Instruções de Instalação

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Banco de dados MySQL
- Redis
- Google Cloud API para Geolocalização

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/MendoncaGabriel/pop_sales_backend.git

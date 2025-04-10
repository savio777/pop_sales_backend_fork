# Sistema de Gestão de Colaboradores e Roteirização de Visitas  

## 📌 Descrição  

Este sistema é uma plataforma **SaaS (Software como Serviço)** voltada para o **gerenciamento de empresas e colaboradores**, focando em funções como **vendas, entregas, cobranças e promoções**.  

O sistema oferece funcionalidades como:  
✅ **Monitoramento de rotas** via geolocalização  
✅ **Gestão de colaboradores** e controle de desempenho  
✅ **Integração com meios de pagamento**  
✅ **Painel de controle para administradores e empresas**  

O software foi desenvolvido com **tecnologias modernas** para garantir **desempenho, escalabilidade e facilidade de manutenção**.  

---  

## 🚀 Tecnologias Utilizadas  

- **🗺️ Geolocalização**: Google Cloud API  
- **💻 Linguagem de Programação**: TypeScript  
- **🎨 Frontend**: React.js, TSX, HTML, CSS, JavaScript  
- **💅 Estilização**: Tailwind CSS  
- **📦 Gerenciamento de Filas**: RabbitMQ  
- **✅ Validação de Dados**: Zod  
- **⚡ Cache**: Redis  
- **🛢️ ORM**: Prisma.js  
- **🏗️ Padrões de Arquitetura**: Repository Pattern, Factory Pattern  
- **🧪 Testes**: Unitários e de Integração (E2E) com Vitest e Supertest  
- **📡 Tempo Real**: WebSocket  

---  

## 🛠️ Instalação  

### 📌 Pré-requisitos  

Antes de começar, certifique-se de ter instalado:  

- **Node.js** (versão 18 ou superior)  
- **NPM ou Yarn**  
- **Banco de dados PostgreSQL**  
- **Redis**  
- **Google Cloud API para Geolocalização**  

### 📥 Passo a passo  

1️⃣ **Clone este repositório:**  
```bash
git clone https://github.com/MendoncaGabriel/pop_sales_backend.git
cd pop_sales_backend
```  

2️⃣ **Instale as dependências:**  
```bash
npm install
```  

3️⃣ **Suba os containers Docker:**  
```bash
docker compose up -d
```  

4️⃣ **Execute as migrations:**  
```bash
npx prisma migrate deploy
```  

5️⃣ **Popule o banco de dados com as seeds:**  
```bash
npx prisma db seed
```  

---  

## 🌍 Configuração das Variáveis de Ambiente  

1. Verifique o arquivo **`.env.example`** na raiz do projeto como modelo.  
2. Crie um arquivo **`.env`** na raiz do projeto.  
3. Preencha os campos corretamente.  
4. Certifique-se de que o arquivo **`.env`** está listado no **`.gitignore`** para evitar vazamento de informações sensíveis.  


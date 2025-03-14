# Requisitos do Projeto Backend

## Requisitos Funcionais

- [x] **Autenticação e Autorização**
  - [x] Admin deve ter diferentes níveis de permissão.
  - [x] Empresas devem ter autenticação segura para acessar o painel administrativo.
  - [x] Colaboradores devem ser autenticados de acordo com o módulo (Promotor, Vendedor, Entregador, Cobrador).
  
- [X] **Gerenciamento de Empresas**
  - [x] Admin pode cadastrar novas empresas.
  - [x] Admin pode listar todas as empresas registradas.
  - [x] Admin pode atualizar os dados de uma empresa.
  - [X] Admin pode alterar o status de uma empresa (Ativa/Inativa).
  - [x] Admin pode listar colaboradores de uma empresa específica.

- [X] **Gerenciamento de Colaboradores**
  - [X] Admin pode cadastrar novos colaboradores. (endpoint de signup)
  - [X] Admin pode editar os dados de um colaborador.
  - [x] Admin pode alterar o status de um colaborador (Ativo/Inativo).
  - [x] Admin pode definir os módulos de atuação (Promotor, Vendedor, Entregador, Cobrador).
  
- [X] **Gestão de Rota e Serviços (tasks)**
  - [X] Empresa pode criar, listar (listar minhas rotações, Gestor: listar rotações criadas), XxeditarxX e remover rotações.
  - [X] Empresa pode criar, listar, atualizar e remover serviços.
  - [X] Empresa pode relacionar serviços a uma rotação.
  <!-- serviço e rotação ja estara relacionadas ao usuario uma vez criada -->
  <!-- - [ ] Empresa pode atribuir atividades a colaboradores (serviços e rotações). -->
  
- [ ] **Monitoramento e Rastreamento**
  - [ ] Empresa pode visualizar a localização do colaborador em tempo real.
  - [ ] Empresa pode identificar cliente e serviço em atendimento.
  - [ ] Sistema deve identificar tempo de permanência em cada cliente.
  - [ ] Sistema deve calcular a quantidade de visitas realizadas.
  - [ ] Sistema deve calcular o tempo médio entre visitas.
  - [ ] Sistema deve calcular a média de vendas por vendedor (quantidade e valores).

- [ ] **Check-in e Check-out**
  - [ ] Check-in registra data, hora e localização do colaborador.
  - [ ] Check-in tem restrição geográfica (raio de 20 metros do endereço do cliente).
  - [ ] Não é permitido check-in fora da rota planejada.
  - [ ] Check-out registra data, hora e localização.
  - [ ] Check-out tem restrição geográfica (raio de 20 metros do endereço do cliente).
  - [ ] Check-out exige preenchimento de formulário de finalização do serviço.
  - [ ] Não é permitido check-out fora do horário programado.
  - [ ] Não é permitido check-out sem check-in prévio.

- [ ] **Avaliação de Atendimento**
  - [ ] Cliente pode avaliar o atendimento do colaborador através de um link.

- [ ] **Registro de Problemas e Ocorrências**
  - [ ] Sistema deve permitir o registro de problemas como: cliente ausente, problemas com produto, reabastecimento urgente.

- [ ] **Sistema de Pontuação e Bonificação**
  - [ ] Sistema deve calcular ranking baseado no desempenho dos colaboradores.
  - [ ] Colaboradores mais produtivos devem receber bônus.

- [ ] **Distribuição do Sistema como Serviço (SaaS)**
  - [ ] Sistema deve integrar com meio de pagamento digital.
  - [ ] Sistema deve oferecer planos de assinatura (mensalidade ou anuidade).
  - [ ] Sistema deve ter controle de acesso, com bloqueio automático para inadimplentes.
  - [ ] Sistema deve enviar notificação de pagamento pendente (3 dias antes do vencimento).
  - [ ] Sistema deve enviar notificação de pagamento recebido.

- [ ] **Fluxo de Atribuição de Tarefas aos Colaboradores**
  - [ ] Empresa cria rotações com endereços a serem visitados.
  - [ ] Empresa cria atividades (Entrega, Venda, Promotoria, Cobrança).
  - [ ] Sistema atribui atividades a colaboradores (relacionando serviço e rotação).
  - [ ] Colaborador pode ter múltiplas funções na mesma rota.
  - [ ] Sistema realiza monitoramento de execução através de check-in, check-out e rastreamento.

---

## Requisitos Não Funcionais

- [ ] **Desempenho**
  - [ ] O sistema deve garantir alta disponibilidade e baixo tempo de resposta.
  - [ ] O sistema deve suportar um número significativo de usuários simultâneos sem degradação de desempenho.

- [ ] **Escalabilidade**
  - [ ] O sistema deve ser escalável para suportar aumento de número de empresas, colaboradores e rotas.

- [ ] **Segurança**
  - [ ] O sistema deve utilizar autenticação segura (JWT, OAuth).
  - [ ] O sistema deve proteger os dados dos colaboradores e empresas com criptografia.
  - [ ] O sistema deve ser protegido contra SQL Injection, XSS e CSRF.
  
- [ ] **Usabilidade**
  - [ ] O sistema deve ser fácil de usar, com APIs bem documentadas e intuitivas.
  
- [ ] **Manutenibilidade**
  - [ ] O código deve ser modular, limpo e bem documentado para facilitar a manutenção e a inclusão de novas funcionalidades.
  - [ ] O sistema deve ser desenvolvido com testes unitários e de integração para garantir qualidade.

- [ ] **Compatibilidade**
  - [ ] O sistema deve ser compatível com os principais navegadores e dispositivos.

- [ ] **Monitoramento**
  - [ ] O sistema deve ser capaz de monitorar falhas e performance através de logs e métricas.

---

## Regras de Negócio

- [ ] **Autenticação e Controle de Acesso**
  - [ ] Admin deve ter o controle completo sobre as empresas e colaboradores.
  - [ ] Empresas só podem acessar suas próprias informações.
  - [ ] Colaboradores só têm acesso ao que lhes é designado (rota, atividades).

- [ ] **Atribuição de Tarefas**
  - [ ] A atribuição de tarefas deve ser feita com base nas funções dos colaboradores.
  - [ ] Um colaborador pode ser atribuído a múltiplas tarefas dentro de uma mesma rota.

- [ ] **Relatórios**
  - [ ] Relatórios devem ser gerados com base em visitas, vendas, entregas e cobranças realizadas.
  - [ ] Relatórios podem ser filtrados por empresa, colaborador e período.

- [ ] **Limitações de Check-in e Check-out**
  - [ ] Check-in deve ser feito dentro de um raio de 20 metros do cliente.
  - [ ] Check-out só pode ser feito após um check-in válido.
  - [ ] Não é permitido realizar check-in ou check-out fora da rota planejada ou após o horário programado.

- [ ] **Bonificação e Ranking**
  - [ ] O ranking de colaboradores é baseado no desempenho de vendas, visitas, e entregas.
  - [ ] Bônus são atribuídos aos colaboradores mais produtivos com base no ranking.

- [ ] **Pagamentos e Controle de Acesso**
  - [ ] Empresas que não realizarem o pagamento de sua assinatura terão o acesso bloqueado automaticamente.
  - [ ] Notificações devem ser enviadas 3 dias antes do vencimento e após o pagamento recebido.

- [ ] **Registro de Problemas**
  - [ ] O sistema deve permitir o registro de problemas de qualquer tipo que ocorra durante a visita, como cliente ausente ou falha no serviço.


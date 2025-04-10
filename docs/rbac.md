# Estrutura sugerida para padronização:
Ação: Defina o que o usuário pode fazer.
- Exemplos: create, read, update, delete, manage, access.
Recurso: A entidade sobre a qual a ação será realizada.
- Exemplos: user, product, order, admin, role.

# Com ultilizar:
isto serve para criação de string de roles no banco de dados na table de permissions

Admin
- create.user
- delete.user

User
- get.user
- update.user


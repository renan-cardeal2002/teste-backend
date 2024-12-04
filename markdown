Premissas Assumidas no Desenvolvimento

1. Cadastro de Clientes:
   - Há verificação de duplicidade automática para o e-mail.
   - Todos os campos são obrigatórios

2. Planos de Clientes:
   - O sistema suporta dois tipos de planos:
     - `prePago`: Clientes devem ter saldo disponível para envio de mensagens.
     - `posPago`: Clientes podem enviar mensagens até o limite mensal configurado.
   - Novos planos podem ser adicionados facilmente no futuro.
   - Os planos estão em um Enum no back-end, caso haja necessidade no futuro, pode ser criada uma tabela no banco.

3. Envio de Mensagens:
   - Cada SMS enviado custa R$ 0,25, e esse valor é fixo para todos os clientes.
   - O envio de mensagens via WebSocket foi implementado, e a mensagem é salva no banco antes do envio.

4. Banco de Dados:
   - O PostgreSQL foi escolhido como banco de dados, rodando em um container Docker.
   - As tabelas foram criadas com base nos requisitos de cliente, plano e envio de mensagens.
   - Estão sendo inseridos dados no banco assim que iniciado o container docker.

5. Tecnologias Utilizadas:
   - Backend desenvolvido com NestJS, usando TypeORM para acesso ao banco de dados.
   - Frontend desenvolvido com Angular 18, e Socket.IO para comunicação em tempo real.

6. Tratamento de Erros:
   - Exceções HTTP personalizadas foram utilizadas para erros comuns, como saldo insuficiente e limite ultrapassado.

8. Escopo:
   - O sistema está preparado para ser executado localmente via Docker Compose.
   - Foram criados testes unitários para o módulo "cliente".
   - Ao acessar http://localhost:3000/ estou mostrando alguma das principais funcionalidades, além do envio de mensagem.
   - O foco do projeto foi no back-end, com o front para complementar e mostrar melhor a funcionalidade de enviar mensagem via WebSocket.
   - Não foi criado login no front-end.


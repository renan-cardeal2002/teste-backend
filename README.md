## Descrição

Teste técnico back-end Grupo Irrah. <br>
*Renan Cardeal Rinandi Ribeiro*

## Instalação

```bash
$ npm install
```

## Rodar a aplicação

```bash
# iniciar banco de dados
$ cd docker
$ docker-compose up -d

# desenvolvimento
$ npm run start:dev

# produção
$ npm run start:prod

# rodar aplicação com docker
$ docker build -t big-chat-brasil .
$ docker run -p 3000:3000 big-chat-brasil

```

## Teste

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

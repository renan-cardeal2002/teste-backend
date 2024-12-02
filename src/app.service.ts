import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly htmlInitial = `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste Backend Grupo Irrah</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background: linear-gradient(135deg, #18162A, #01040D);
        color: #FF0188;
      }
      .container {
        text-align: center;
        background-color: #18162A;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      h3 {
        font-size: 2.5rem;
        margin-bottom: 20px;
      }
      .routes {
        background-color: #01040D;
        padding: 20px;
        border-radius: 8px;
        color: #FFF;
        font-size: 0.8rem;
        text-align: left;
        line-height: 1.6;
        overflow: auto;
        max-height: 300px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>TESTE BACKEND GRUPO IRRAH</h3>
      <div>ROTAS CRIADAS</div>
      <div class="routes">
        <ul>
          <li>[post] {url}/importarCadastros -- insere os dados do ambiente de apresentação</li>
          <li>[get] {url}/consultarSaldoCliente</li>
          <li>[get] {url}/consultarMovimentosCliente</li>
          <li>[get] {url}/consultarDadosCliente</li>
          <li>[post] {url}/inserirMovimentoCliente</li>
          <li>[put] {url}/alterarLimiteCliente</li>
          <li>[put] {url}/alterarPlanoCliente</li>
        </ul>
      </div>
    </div>
  </body>
  </html>`;

  getInitial(): string {
    return this.htmlInitial;
  }
}

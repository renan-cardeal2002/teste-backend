CREATE TABLE IF NOT EXISTS clientes
(
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(100) NOT NULL UNIQUE,
    telefone        VARCHAR(15)  NOT NULL,
    cpf_responsavel VARCHAR(11)  NOT NULL,
    cnpj            VARCHAR(14)  NOT NULL,
    nome_empresa    VARCHAR(100) NOT NULL,
    senha           VARCHAR(30)  NOT NULL
);

CREATE TABLE IF NOT EXISTS financeiro
(
    id               SERIAL PRIMARY KEY,
    cliente_id       INT NOT NULL,
    plano_id         INT NOT NULL,
    saldo            DECIMAL(10, 2) DEFAULT 0.00,
    limite_mensal    DECIMAL(10, 2) DEFAULT 0.00,
    limite_utilizado DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (cliente_id) REFERENCES clientes (id)
);

CREATE TABLE IF NOT EXISTS movimentos
(
    id              SERIAL PRIMARY KEY,
    cliente_id      INT NOT NULL,
    tipo            INT NOT NULL,
    valor           DECIMAL(10, 2) NOT NULL,
    observacao      VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS mensagens
(
    id             SERIAL PRIMARY KEY,
    cliente_id     INT REFERENCES clientes (id) ON DELETE CASCADE,
    numero_destino VARCHAR(15) NOT NULL,
    is_whatsapp    BOOLEAN       DEFAULT FALSE,
    texto          TEXT        NOT NULL,
    data_envio     TIMESTAMP     DEFAULT NOW(),
    custo          DECIMAL(5, 2) DEFAULT 0.25,
    FOREIGN KEY (cliente_id) REFERENCES clientes (id)
);


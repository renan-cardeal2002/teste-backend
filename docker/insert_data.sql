INSERT INTO clientes
    (nome, email, telefone, cpf_responsavel, cnpj, nome_empresa, senha)
VALUES ('Renan Cardeal', 'grupo_irrah@example.com', '44999998888', '12345678900', '11222333000199', 'Grupo Irrah',
        'Senha123$'),
       ('Jhonatan Silva', 'jonathan@example.com', '44999997777', '12345678955', '11222333000199', 'Grupo Irrah',
        'Senha123$');

INSERT INTO financeiro
    (cliente_id, plano_id, saldo, limite_mensal, limite_utilizado)
VALUES (1, 1, 0.00, 0.00, 0.00),
       (2, 2, 0.00, 100.00,0.00);

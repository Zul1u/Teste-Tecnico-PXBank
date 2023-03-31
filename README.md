# Teste Tecnico PXBank

# Sumário
* [Contexto Rápido](#contexto-rapido)
* [Rodando o Projeto](#rodando-o-projeto)
* [Principais Tecnologias Usadas](#principais-tecnologias-usadas)

# Contexto Rápido

Este projeto foi desenvolvido como um teste técnico para a empresa [PXBank](https://www.pxbank.com.br/), seguindo as
instruções fornecidas na descrição do teste para implementar todas as funcionalidades necessárias.

# Rodando o Projeto

Para rodar este projeto, é necessário ter o MySQL ou o Docker instalados em sua máquina.

Antes de qualquer coisa, você precisa clonar o projeto em sua máquina. Para fazer isso, execute um dos comandos abaixo:
```
SSH: git clone git@github.com:Zul1u/Teste-Tecnico-PXBank.git
```
```
HTTPS: git clone https://github.com/Zul1u/Teste-Tecnico-PXBank.git
```

Caso decida utilizar o Docker, execute este comando no seu terminal:
```
docker container run --name container-mysql -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql
```

## Rodando o Back-end


1. Abra o terminal e acesse o diretório backend do projeto.

2. Para instalar todas as dependências do projeto, execute o seguinte comando:

```
npm install
```

3. Para criar e popular o banco de dados, execute o seguinte comando:
```
npm run migrate:dev
```

4. Para rodar a API, execute o seguinte comando:
```
npm run dev
```

Certifique-se de ter o Node.js instalado em sua máquina antes de executar os comandos acima. Para mais informações sobre como instalar o Node.js, consulte a documentação oficial em [nodejs.org](https://nodejs.org/en).

### Reiniciando o banco de dados

Se por algum motivo você precisar reiniciar o banco de dados, utilize o seguinte comando:

```
npm run migrate:reset
```
Isso irá apagar todas as tabelas e dados do banco de dados e executar novamente as migrações para criar as tabelas e inserir os dados iniciais.


## Rodando o Fornt-end

1. Abra outro terminal e acesse o diretório frontend do projeto.

2. Para instalar todas as dependências do projeto, execute o seguinte comando:

```
npm install
```
3. Para rodar o projeto, execute um dos comandos abaixo:
```
npm start
```
ou
```
npm run dev
```
# Principais Tecnologias Usadas
### No Back-end
* [NodeJS](https://nodejs.org/en) 
* [Express](https://expressjs.com/pt-br/)
* [MySQL](https://www.mysql.com/)
* [Prisma (ORM)](https://www.prisma.io/)
* [Eslint](https://eslint.org/)
* [Cors](https://expressjs.com/en/resources/middleware/cors.html)
### No Front-end
* [ReactJS](https://react.dev/)
* [Axios](https://axios-http.com/docs/intro)
* [eslint](https://eslint.org/)
* [React Router Dom](https://reactrouter.com/en/main)

##

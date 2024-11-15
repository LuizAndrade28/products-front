# Frontend (React)

## Descrição

Esse é o frontend de uma aplicação CRUD de Produtos, desenvolvido em React. A aplicação permite que o usuário crie, visualize, edite e exclua produtos por meio de uma interface simples e intuitiva, por meio da biblioteca de UI (MUI) para estilização da interface, fornecendo uma experiência visual agradável.

## Como Configurar e Rodar o Projeto Localmente

> [!IMPORTANT]
> ### Instruções de Instalação
> Este projeto usa Node.js e npm. Para configurar seu ambiente de desenvolvimento, siga estes passos:

### Pré-requisitos:

- Node.js (LTS)
- npm

## 1. Configuração

Clone o repositório e navegue até o diretório:

```sh
git@github.com:LuizAndrade28/products-front.git
cd products-front
```

### 2. Instale as dependências:

```sh
npm install
```

### 3. Inicie o servidor de desenvolvimento:

```sh
npm start
```

## Observações
> [!TIP]
> Certifique-se de que o backend está sendo executado em http://localhost:3005 para que as requisições funcionem corretamente.

### Configuração de Axios
O frontend está configurado para fazer requisições à API do backend em http://localhost:3005. Essa configuração pode ser encontrada no arquivo onde o axios.create está definido.

### Funcionalidades
- Listagem de Produtos: Exibe uma lista de produtos com nome, preço, quantidade em estoque e botões para editar e excluir.
- Cadastro de Produto: Formulário para adicionar novos produtos com campos para Nome, Preço, Quantidade e Descrição.
- Edição de Produto: Permite editar as informações de um produto existente.
- Exclusão de Produto: Exclui um produto com um botão e confirmação da ação.
- Navegação Suave: Ao clicar em "Editar", o formulário é exibido automaticamente.

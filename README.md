# ✈️ Flight System – Pilops Challenge

Sistema de gerenciamento de voos desenvolvido como desafio técnico para a Pilops, simulando uma plataforma de carreira virtual na aviação.

O projeto é dividido em:

Frontend em React

Backend em Node.js 

Dados simulados via arquivo JSON

## Decisões Técnicas

### Separação entre Frontend e Backend
Optei por separar frontend e backend para organizar melhor o projeto e simular um cenário mais próximo do mercado, facilitando o entendimento e a manutenção do código.

### CSS puro
Todo o estilo foi feito com CSS puro. Preferi não utilizar bibliotecas de estilo para praticar os conceitos básicos de CSS e ter mais controle sobre o layout.

### Paginação no backend
A paginação foi implementada no backend para evitar o envio de muitos dados de uma vez e simular como uma API real costuma funcionar.

### React + Vite no frontend
Utilizei React para trabalhar com componentes e Vite para facilitar o desenvolvimento, já que ele é rápido e simples de configurar.

## O que faria diferente com mais tempo

### Banco de dados
Utilizaria um banco de dados real, como PostgreSQL ou MongoDB, em vez de dados em arquivo, para melhorar a organização e escalabilidade.

### Autenticação
Implementaria autenticação com login e proteção de rotas para deixar o sistema mais próximo de um ambiente real.

### Testes
Criaria testes básicos no frontend e backend para garantir que as funcionalidades continuem funcionando após mudanças no código.

### Melhor tratamento de erros
Melhoraria as mensagens de erro da API e adicionaria logs para facilitar o debug.

### Filtros e ordenação
Permitiria filtrar e ordenar os voos por data, rota ou aeronave, melhorando a experiência do usuário.

### Responsividade
Trabalharia melhor a responsividade da aplicação, garantindo uma boa experiência em dispositivos móveis, tablets e diferentes tamanhos de tela.

## 🚀 Tecnologias

Este projeto foi construído utilizando as seguintes tecnologias:

-  [React]  
-  [NodeJS]  
-  [TypeScript] 
-  [CSS]

## 📂 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/walisson27/flight-system

# Instale as dependências
npm install
# Rode o projeto
npm run dev
---------------------------
# Acesse a pasta do backend
cd backend
# Instale as dependências
npm install
# Rode o projeto
npm run dev

# React Base - Frontend do Microserviço de Subscriptions

Este é o frontend do projeto de gerenciamento de subscriptions e disparo de emails, desenvolvido com **Next.js** e diversas tecnologias modernas para garantir uma experiência de usuário fluida, escalável e internacionalizada.

---

## 🚀 Sobre o projeto

O frontend é responsável pela interface web que permite aos usuários criar, editar e gerenciar templates de email e subscriptions. Foi desenvolvido para se integrar ao backend em .NET 9 e microserviços AWS, fornecendo uma aplicação rápida, responsiva e segura.

---

## 📦 Tecnologias principais

- **Next.js** 15 (com Turbopack) — Framework React para SSR e SSG com otimizações de performance
- **React 19** — Biblioteca de UI
- **Redux Toolkit & React-Redux** — Gerenciamento global de estado
- **MUI (Material-UI)** — Biblioteca de componentes UI estilizados e responsivos
- **Formik + Yup** — Validação e gerenciamento avançado de formulários
- **Axios** — Para requisições HTTP ao backend
- **i18next + react-i18next** — Internacionalização e suporte a múltiplos idiomas
- **Dayjs** — Manipulação e formatação de datas
- **React World Flags** — Exibição de bandeiras para seleção de idiomas/regiões
- **Emotion** — Estilização CSS-in-JS

---

## ⚙️ Scripts disponíveis

- `dev` — Executa a aplicação em modo desenvolvimento com Hot Reload usando Turbopack  
- `build` — Compila a aplicação para produção  
- `start` — Inicia a aplicação compilada em modo produção  
- `lint` — Executa o ESLint para verificar padrões de código  
- `format` — Formata o código com Prettier  

---

## 📝 Como rodar localmente

1. Clone o repositório  
2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute em modo desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

---

## 🌐 Internacionalização

O projeto suporta múltiplos idiomas via **i18next** e possui bandeiras para seleção visual dos idiomas, facilitando a experiência para usuários globais.

---

## 🛠️ Estrutura do projeto

- **/pages** — Rotas e páginas da aplicação  
- **/components** — Componentes reutilizáveis e UI  
- **/store** — Configuração do Redux Toolkit e slices  
- **/services** — Integração com API backend via Axios  
- **/locales** — Arquivos de tradução para i18next  
- **/styles** — Estilos globais e temas usando Emotion e MUI

---

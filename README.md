<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

# Projecto To Do List(Frontend)

## Tecnologias Utilizadas

- **Framework Frontend**: Vue 3 com TypeScript
- **Store**: Pinia
- **Biblioteca UI**: Primevue
- **Framework CSS**: Tailwindcss

## Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Miguel-Domingos/todo-frontend.git
   cd todo-frontend

   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

## Configuração das variáveis de ambiente(.env)

### 1. criar o .env

Renomeie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 2. Adicione as seguintes variáveis de ambiente ao arquivo .env :

```env
VITE_API_URL= "<url_da_api>"
```

**exemplo**: VITE_API_URL= "http://minha-api.com"

## Iniciar o servidor de desenvolvimento

Usando npm

```bash
npm run dev
```

Usando yarn

```bash
yarn dev
```

## Ambiente de Produção

Caso deseja acessar a aplicação online, pode seguir pelo link: [Todo List](https://frontend-todo-mu.vercel.app/)

**Credencias**

- Email: admin@gmail.com
- Senha: 12345678

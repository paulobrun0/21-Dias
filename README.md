# Desafio 21 Dias - Rastreador de Metas

Um aplicativo web moderno e interativo para rastrear suas metas diárias usando a metodologia do "Desafio 21 Dias". Diga adeus às folhas impressas!

## 🎯 Características

- **Interface Interativa**: 21 círculos (um para cada dia), cada um com 4 quadrantes (A, B, C, D) que podem ser clicados para marcar metas
- **Cores Significativas**: 
  - Branco: Vazio
  - Verde: Concluído
  - Azul: Em Progresso
  - Amarelo: Destaque
- **Persistência Local**: Seus dados são salvos automaticamente no navegador (localStorage)
- **Sem Servidor**: Aplicativo 100% estático, funciona offline
- **Design Minimalista**: Interface limpa e focada, inspirada em Bauhaus
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Exportar Dados**: Baixe seus dados em formato JSON

## 🚀 Como Usar

### Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/desafio-21-dias.git
cd desafio-21-dias
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

4. Abra seu navegador em `http://localhost:3000`

### Hospedagem no GitHub Pages

#### Opção 1: Usando GitHub Actions (Recomendado)

1. Faça push do repositório para GitHub
2. Crie um arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
        env:
          VITE_BASE_URL: /desafio-21-dias/
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

3. Vá para as configurações do repositório → Pages
4. Selecione "Deploy from a branch" e escolha `gh-pages`

#### Opção 2: Deploy Manual

1. Build o projeto:
```bash
pnpm build
```

2. Copie o conteúdo de `dist/public` para a branch `gh-pages`
3. Push para GitHub

## 🎨 Design

O aplicativo segue a filosofia de **Minimalismo Geométrico com Foco Motivacional**:

- **Tipografia**: Montserrat (títulos), Poppins (corpo), Roboto Mono (números)
- **Paleta de Cores**: Amarelo vibrante (#FFD700), Verde (#10B981), Azul (#3B82F6), Cinza neutro
- **Animações**: Transições suaves de 300ms, pulsos motivacionais
- **Espaçamento**: Generoso, respeitando a respiração visual

## 📊 Estrutura do Projeto

```
desafio-21-dias/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ChallengeCircle.tsx    # Componente dos círculos
│   │   ├── hooks/
│   │   │   └── useChallengeState.ts   # Gerenciamento de estado
│   │   ├── pages/
│   │   │   └── Home.tsx               # Página principal
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css                  # Estilos globais
│   ├── index.html
│   └── public/
├── vite.config.ts
├── package.json
└── README.md
```

## 💾 Dados

Os dados são armazenados em `localStorage` com a chave `desafio-21-dias-state`. A estrutura é:

```json
{
  "days": [
    {
      "day": 1,
      "quadrants": [
        { "id": "A", "color": "#FFFFFF" },
        { "id": "B", "color": "#FFFFFF" },
        { "id": "C", "color": "#FFFFFF" },
        { "id": "D", "color": "#FFFFFF" }
      ]
    }
    // ... mais 20 dias
  ],
  "startDate": "2026-03-10",
  "completedDays": 0
}
```

## 🛠️ Tecnologias

- **React 19**: Framework UI
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Estilização
- **Vite**: Build tool
- **shadcn/ui**: Componentes UI
- **Lucide React**: Ícones

## 📱 Responsividade

- **Desktop**: Grid 5x5 + 1 com sidebar
- **Tablet**: Grid ajustado com sidebar colapsível
- **Mobile**: Grid 3x7 com controles otimizados

## 🔒 Privacidade

- Nenhum dado é enviado para servidores
- Tudo é processado localmente no seu navegador
- Você tem controle total sobre seus dados

## 📝 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Lembre-se**: 21 dias é o tempo que leva para criar um hábito. Você consegue! 💪

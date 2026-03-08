# 🪺 The Nest — Interface de Estruturação de Squads Agênticos

> Interface de criação e gestão de hierarquias de agentes de IA para a plataforma TESS AI.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)

## 🌐 Demo Online

> **Acesso recomendado:** Visualize a interface diretamente pelo link abaixo, sem necessidade de instalar nada.

[![Ver Demo](https://img.shields.io/badge/🚀_Acessar_Demo-Vercel-black?style=for-the-badge)](https://tess-agents-creator-rh1rd0zod-kamilacondefs-7204s-projects.vercel.app/)

A seção "Como Rodar" abaixo é para quem preferir rodar o projeto localmente.

---

Aproveito para deixar o link do Figma, não há protótipo, somente as telas estáticas, sua navegação está toda aqui ao rodar os códigos. Este é o link, caso queiram ver: https://www.figma.com/design/dV8O4WFxVUXQvJvk7CmVPt/Desafio-T%C3%A9cnico---Bip-Brasil--KAMILA-CONDE---c%C3%B3pia-?node-id=2-753&t=JMSOlw0v6TVfeee8-1

---

## 📋 Índice

- [Como Rodar](#-como-rodar)
- [Stack Técnica](#-stack-técnica)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Decisões de Design & Product Mindset](#-decisões-de-design--product-mindset)
- [Funcionalidades](#-funcionalidades)

---

## 🚀 Como Rodar

### Pré-requisitos

- **Node.js** >= 18
- **npm** ou **bun**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/kamilacondefs/tess-agents-creator.git
cd tess-agents-creator

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:8080`.

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run test` | Executa testes com Vitest |

---

## 🛠 Stack Técnica

| Tecnologia | Uso |
|---|---|
| **React 18** | UI Library — componentes reativos |
| **TypeScript** | Tipagem estática e segurança de tipos |
| **Vite** | Bundler e dev server ultra-rápido |
| **Tailwind CSS** | Utility-first CSS com design tokens customizados |
| **Framer Motion** | Animações de layout fluidas nos cards |
| **shadcn/ui** | Componentes base acessíveis |
| **Lucide React** | Ícones consistentes |

---

## 🏗 Arquitetura do Projeto

```
src/
├── contexts/
│   └── SquadContext.tsx        # Estado global do Squad (Context API)
├── types/
│   └── squad.ts                # Tipos, modelos LLM, papéis, fluxos
├── components/
│   └── nest/
│       ├── NestSidebar.tsx      # Sidebar com árvore de navegação
│       ├── NestHeader.tsx       # Header com nome do squad e ações
│       ├── HierarchyCanvas.tsx  # Canvas principal com hierarquia visual
│       ├── AgentCard.tsx        # Card recursivo de agente/subagente
│       └── AgentConfigPanel.tsx # Painel lateral de configuração
├── pages/
│   └── Index.tsx               # Layout principal (1440x960px)
└── index.css                   # Design tokens TESS AI
```

### Fluxo de Dados

```
SquadContext (estado centralizado)
    ├── NestSidebar (leitura: árvore de agentes)
    ├── HierarchyCanvas → AgentCard (leitura + ações: CRUD de agentes)
    ├── AgentConfigPanel (leitura + escrita: configuração detalhada)
    └── NestHeader (leitura + escrita: metadados do squad)
```

O estado é gerenciado via **React Context** com `useCallback` para otimização de re-renders. A estrutura hierárquica é flat (array de agentes com `parentId`), simplificando operações CRUD e permitindo escalabilidade para dezenas de agentes.

---

## 🧠 Decisões de Design & Product Mindset

### "Por que essa estrutura é a melhor forma de um usuário gerir um time de IAs?"

#### 1. Metáfora Organizacional, não Técnica

A interface usa a metáfora de **organograma de equipe**, não fluxograma de software:

- Usuários corporativos pensam em **times e hierarquias**, não em nós e arestas
- Cada agente é um "membro da equipe" com papel, especialidade e cor própria
- A relação Agente Principal → Subagente replica a dinâmica de um líder delegando tarefas

#### 2. Três Zonas de Interação

| Zona | Componente | Função |
|------|-----------|--------|
| **Navegação** | Sidebar esquerda | Visão macro da árvore — "onde estou?" |
| **Estruturação** | Canvas central | Composição visual da hierarquia — "como organizo?" |
| **Configuração** | Painel direito | Detalhamento individual — "como configuro?" |

Essa separação evita sobrecarga cognitiva: o usuário nunca precisa ver tudo ao mesmo tempo.

#### 3. Escalabilidade Visual sem Poluição

- **Cards compactos** com informação progressiva (nome + role + modelo)
- **Subagentes colapsados** sob seus pais com contagem resumida
- **Scroll natural** no canvas com grid de fundo para orientação espacial
- **Cores únicas por agente** para identificação rápida em hierarquias densas

#### 4. Conexões de Fluxo como Propriedade, não como Linha

Em vez de setas entre caixas, o tipo de conexão é uma **propriedade do subagente**:

| Tipo | Descrição |
|------|-----------|
| `Reporta` | Envia resultado final ao principal |
| `Delega` | Recebe tarefas do principal |
| `Consulta` | Troca informações bidirecionalmente |
| `Stream` | Envia dados em tempo real |

Mais limpo visualmente e mais intuitivo que conectores visuais frágeis.

#### 5. Seleção de LLM por Agente

Cada agente pode usar um modelo diferente, refletindo a realidade de custos:

- **Coordenador** → Claude 3.5 Sonnet (mais capaz)
- **Subagentes** → GPT-4o Mini (rápido, barato)
- Permite otimização de custo-benefício do squad inteiro

#### 6. Fidelidade à Marca TESS AI

Identidade visual reverse-engineered da plataforma:

- Paleta escura com fundo `#0F0F11` e superfícies `#1A1A2E`
- Roxo accent (`#7C3AED`) consistente com a marca
- Border-radius de 12px seguindo o padrão da plataforma
- Micro-interações via Framer Motion para feeling premium

#### 7. Estado Flat com Derivação

```typescript
// Array flat — simples de manipular
agents: Agent[] // cada um com parentId: string | null

// Derivação sob demanda
getMainAgents()      // parentId === null
getSubAgents(id)     // parentId === id
```

Simplifica operações CRUD e evita bugs de mutação profunda em árvores aninhadas.

---

## ✨ Funcionalidades

- [x] Criar agentes principais e subagentes
- [x] Hierarquia visual com cards conectados
- [x] Configuração de papel/role por agente (7 papéis)
- [x] Seleção de modelo LLM individual (8 modelos)
- [x] Tipos de conexão de fluxo (4 tipos)
- [x] Prompt de sistema personalizado
- [x] Sidebar com árvore de navegação
- [x] Remoção de agentes (cascata para subagentes)
- [x] Animações de layout com Framer Motion
- [x] Design para Surface Pro 8 (1440x960px)
- [x] Design tokens fiéis à identidade TESS AI

---

## 📐 Formato de Tela

Interface projetada para **Surface Pro 8 (1440x960px)** com container fixo, garantindo fidelidade na exportação via HTML.toDESIGN para o Figma.

---

*Desenvolvido como parte do TESS Architect Challenge.*

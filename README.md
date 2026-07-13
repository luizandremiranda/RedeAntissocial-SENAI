# Rede Antissocial

<p align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome">
</p> <p align="center">
  Uma rede social moderna inspirada no Facebook, com design profissional e funcionalidades interativas completas.
</p>

---

## Sobre o Projeto

A **Rede Antissocial** é uma aplicação web de rede social desenvolvida com HTML5, CSS3 e JavaScript puro. O projeto foi criado como um estudo de front-end, replicando a interface e as funcionalidades essenciais de uma rede social popular, com uma identidade visual única baseada na paleta de cores **vinho, vermelho e cinza**.

## Funcionalidades

| Funcionalidade | Descrição |
| --- | --- |
| **Feed de Posts** | Exibe 6 posts de exemplo com texto, imagem e interações |
| **Curtir** | Botão de curtir com animação de coração e contador dinâmico |
| **Comentar** | Sistema de comentários com resposta em tempo real |
| **Excluir Posts** | Menu dropdown com opção de excluir posts |
| **Publicar** | Criação de novos posts diretamente no feed |
| **Stories** | Visualização de stories com modal e auto-fechamento |
| **Chat** | Chat flutuante com mensagens e respostas automáticas |
| **Amigos Online** | Lista de amigos com status e atividade |
| **Sugestões** | Cards de sugestões de novos amigos para seguir |
| **Tema Claro/Escuro** | Alternância entre modos com persistência via localStorage |
| **Responsivo** | Layout adaptável para desktop, tablet e mobile |
| **Notificações** | Sistema de badges com animação de pulso |
| **Toast** | Notificações toast para feedback visual ao usuário |

## Paleta de Cores

A identidade visual do projeto utiliza uma paleta sofisticada:

| Cor | Hex | Uso |
| --- | --- | --- |
| Vinho Principal | `#7b1a2e` | Navbar, títulos, elementos primários |
| Vermelho Acento | `#c41230` | Botões de ação, destaques |
| Vermelho Claro | `#e53935` | Curtidas, ícones de destaque |
| Cinza Fundo | `#e8e0e2` | Background do corpo |
| Cinza Texto | `#6b5a5e` | Textos secundários |
| Cinza Suave | `#9a8a8e` | Textos auxiliares |

## Estrutura do Projeto

```
rede-antissocial/
├── index.html          # Estrutura HTML completa
├── style.css           # Estilos CSS com tema claro e escuro
├── js/
│   └── script.js       # JavaScript com todas as funcionalidades
├── imagens/            # Pasta para imagens locais (opcional )
└── README.md           # Documentação do projeto
```

## Tecnologias Utilizadas

- **HTML5** — Estrutura semântica e moderna

- **CSS3** — Variáveis CSS, Grid Layout, Flexbox, animações, tema escuro

- **JavaScript (ES6+)** — Manipulação DOM, eventos, localStorage

- **Font Awesome 6** — Ícones vetoriais

- **Google Fonts** — Tipografia Poppins

- **pravatar.cc** — Avatares aleatórios para demonstração

- **picsum.photos** — Imagens aleatórias para posts

## Como Executar

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/rede-antissocial.git
cd rede-antissocial
```

1. **Abra o arquivo:**

Simplesmente abra o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor ou instalação de dependências.

1. **Ou use a extensão Live Server do VS Code para desenvolvimento com recarregamento automático.**

## Funcionalidades Detalhadas

### Tema Claro / Escuro

O botão de lua/sol na navbar alterna entre os temas. A preferência é salva no `localStorage` e restaurada automaticamente ao recarregar a página.

### Curtir e Comentar

Cada post possui botões de curtir com animação de batimento cardíaco e sistema de comentários com suporte a Enter para envio rápido.

### Chat

Clique em qualquer amigo na barra lateral direita para abrir o chat. O sistema simula respostas automáticas após envio de mensagens.

### Stories

Clique em qualquer story para visualizá-lo em tela cheia. O story fecha automaticamente após 5 segundos ou ao clicar no botão X.

### Publicar Post

Preencha o campo de texto na caixa de nova postagem e clique em "Publicar". O post será adicionado ao feed com animação e notificação toast.

## Responsividade

| Breakpoint | Layout |
| --- | --- |
| **> 1200px** | Sidebar esquerda + Feed + Sidebar direita (3 colunas ) |
| **900px - 1200px** | Feed + Sidebar direita (2 colunas) |
| **< 900px** | Feed em coluna única |
| **< 600px** | Layout mobile compacto |

## Autor

**Luiz André** — Aluno de Front-end SENAI

## Licença

Este projeto é de uso educacional. Sinta-se à vontade para utilizar, modificar e aprender com o código.

---

<p align="center">
Desenvolvido com <i class="fa-solid fa-heart"></i> e muita dedicação.
</p>

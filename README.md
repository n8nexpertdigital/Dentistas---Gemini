# ProtegeMais Seguros — site institucional

Site institucional estático para uma empresa de seguros, em português (pt-BR).
Sem dependências, sem build: HTML, CSS e JavaScript puros.

> **Empresa fictícia.** Nome, telefones, endereço, números e depoimentos são
> ilustrativos e servem apenas de demonstração.

## Páginas

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Home: hero com formulário de cotação, produtos, diferenciais, como funciona, depoimentos, FAQ e chamada final |
| `sobre.html` | História, valores, números da empresa e áreas de atendimento |
| `contato.html` | Formulário de atendimento, canais de contato e aviso de sinistro |

## Estrutura

```
.
├── index.html
├── sobre.html
├── contato.html
├── favicon.svg
├── css/
│   └── styles.css     # design system (variáveis de cor, componentes, responsivo)
└── js/
    └── main.js        # menu mobile, máscara de telefone, validação e envio dos formulários
```

## Como executar

Basta abrir o `index.html` no navegador. Para servir localmente:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Recursos implementados

- Layout responsivo (desktop, tablet e celular) com menu hambúrguer no mobile
- Dois formulários com validação em JavaScript (nome, e-mail, telefone, seleção e aceite)
- Máscara automática de telefone — `(11) 99999-0000` para celular e `(11) 3333-4444` para fixo
- Links dos cards de produto pré-selecionam o assunto no formulário de contato
  (ex.: `contato.html?seguro=residencial`)
- FAQ em `<details>` nativo, sem JavaScript
- HTML semântico, `aria-*` nos controles interativos e foco visível nos campos

## Personalização

- **Cores, tipografia e espaçamentos:** variáveis CSS no bloco `:root` de `css/styles.css`
- **Nome, telefones e endereço:** presentes no cabeçalho, no rodapé e em `contato.html`
- **Envio real dos formulários:** hoje `enviarFormulario()` em `js/main.js` apenas exibe a
  confirmação e limpa o formulário; substitua pela chamada ao seu backend
  (há um exemplo com `fetch` comentado no próprio arquivo)

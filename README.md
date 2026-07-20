# Prisma Contabilidade — Site institucional

Site institucional (landing page) para um escritório de contabilidade, desenvolvido em
**HTML, CSS e JavaScript puros** — sem dependências, frameworks ou build. Basta abrir o
`index.html` no navegador.

## ✨ Recursos

- **Design moderno e responsivo** (desktop, tablet e mobile)
- **Header fixo** com navegação e menu hambúrguer no mobile
- **Seção Hero** com painel de métricas animado
- **Serviços** — abertura de empresa, contabilidade mensal, departamento pessoal,
  planejamento tributário, imposto de renda e BPO financeiro
- **Sobre / diferenciais** com lista de benefícios
- **Contadores animados** de estatísticas
- **Planos e preços** com destaque para o plano mais popular
- **Depoimentos** de clientes
- **FAQ** em accordion (`<details>`)
- **Formulário de contato** com validação client-side
- **Botão flutuante de WhatsApp**
- **Animações de revelação** ao rolar a página
- Acessibilidade: navegação por teclado, `aria-labels` e regiões de status

## 📁 Estrutura

```
.
├── index.html    # Marcação e conteúdo de todas as seções
├── styles.css    # Estilos, tema (variáveis CSS) e responsividade
└── script.js     # Menu, scroll, contadores, reveal e formulário
```

## 🚀 Como usar

Abra o arquivo diretamente:

```bash
# opção 1 — abrir no navegador
open index.html        # macOS
xdg-open index.html    # Linux

# opção 2 — servidor local
python3 -m http.server 8000
# acesse http://localhost:8000
```

## 🎨 Personalização

- **Cores:** edite as variáveis em `:root` no início do `styles.css` (`--navy`, `--green`, etc.).
- **Nome/marca:** substitua "Prisma Contabilidade" no `index.html`.
- **Contato:** atualize telefone, e-mail, endereço e o número do WhatsApp
  (`https://wa.me/55...`) no `index.html`.
- **Planos e preços:** ajuste os valores e itens na seção `#planos`.
- **Formulário:** em `script.js`, o envio é simulado. Conecte seu backend, serviço de
  e-mail ou CRM no `setTimeout` do handler de `submit`.

> Os dados exibidos (empresa, CNPJ, telefones, estatísticas) são **fictícios** e servem
> apenas como exemplo. Substitua pelas informações reais antes de publicar.

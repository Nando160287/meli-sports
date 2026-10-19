# Meli Sports — Web Rádio

Projeto de estudo feito com HTML, CSS e JavaScript puro, com os arquivos separados.

## Arquivos

- `index.html` — estrutura e conteúdo da página.
- `style.css` — cores, layout, animações e adaptação para celular.
- `script.js` — menu mobile, player de áudio, validação dos formulários e modal de entrada.

## Como abrir

1. Baixe ou extraia a pasta do projeto.
2. Abra o arquivo `index.html` no navegador.
3. Para editar o projeto, abra os três arquivos em um editor como Visual Studio Code.

## Como ativar a transmissão

Abra `script.js` e localize esta linha:

```js
const STREAM_URL = "";
```

Coloque dentro das aspas a URL de streaming fornecida pelo serviço de rádio. O endereço precisa ser uma URL compatível com o player HTML5 e permitir reprodução no navegador. Não há URL real incluída porque ela depende do serviço usado pela Meli Sports.

## Atenção sobre cadastro e login

Os formulários desta versão são apenas demonstrações de interface: validam os campos no navegador, mas não enviam dados para a rádio, não criam contas e não autenticam usuários. Não use senhas reais. Para disponibilizar cadastro/login de verdade, será necessário um backend ou serviço de autenticação seguro, armazenamento apropriado e uma política de privacidade.

## Programação

Os programas e horários são exemplos fictícios para personalização. Edite os cartões e horários diretamente no `index.html` para refletir a grade real.
# meli-sports

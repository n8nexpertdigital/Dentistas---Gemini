/* ==========================================================================
   ProtegeMais Seguros — comportamento do site
   Site estático: os formulários apenas validam e exibem confirmação.
   Para uso real, envie os dados para um backend em enviarFormulario().
   ========================================================================== */

(function () {
  'use strict';

  /* ----- Ano corrente no rodapé ----- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ----- Menu responsivo ----- */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu-principal');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em um link (útil no mobile).
    menu.addEventListener('click', function (evento) {
      if (evento.target.tagName === 'A' && menu.classList.contains('aberto')) {
        menu.classList.remove('aberto');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      }
    });
  }

  /* ----- Máscara simples de telefone: (11) 99999-0000 ----- */
  function aplicarMascaraTelefone(campo) {
    campo.addEventListener('input', function () {
      var digitos = campo.value.replace(/\D/g, '').slice(0, 11);
      var texto = digitos;

      if (digitos.length > 2) {
        texto = '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2);
      }
      if (digitos.length > 6) {
        var corte = digitos.length > 10 ? 7 : 6; // celular (9 dígitos) x fixo (8)
        texto = '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2, corte) + '-' + digitos.slice(corte);
      }
      campo.value = texto;
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('input[type="tel"]'), aplicarMascaraTelefone);

  /* ----- Validação ----- */
  var REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function marcarErro(campo, temErro) {
    var wrapper = campo.closest('.campo');
    if (wrapper) wrapper.classList.toggle('campo--erro', temErro);
  }

  function campoValido(campo) {
    var valor = (campo.value || '').trim();

    if (campo.type === 'checkbox') return campo.checked;
    if (campo.required && valor === '') return false;
    if (campo.type === 'email') return REGEX_EMAIL.test(valor);
    if (campo.type === 'tel') return valor.replace(/\D/g, '').length >= 10;
    if (campo.id === 'cot-nome' || campo.id === 'ct-nome') return valor.length >= 3 && valor.indexOf(' ') > 0;
    if (campo.minLength > 0) return valor.length >= campo.minLength;

    return true;
  }

  function validarFormulario(form) {
    var campos = form.querySelectorAll('input, select, textarea');
    var primeiroInvalido = null;

    Array.prototype.forEach.call(campos, function (campo) {
      if (campo.type === 'submit') return;

      var valido = campoValido(campo);

      if (campo.type === 'checkbox') {
        // O aviso do aceite fica fora do bloco .campo, então é alternado direto.
        var erroAceite = document.getElementById(
          campo.id === 'cot-aceite' ? 'erro-aceite' : 'erro-aceite-contato'
        );
        if (erroAceite) erroAceite.classList.toggle('visivel', !valido);
      } else {
        marcarErro(campo, !valido);
      }

      if (!valido && !primeiroInvalido) primeiroInvalido = campo;
    });

    if (primeiroInvalido) primeiroInvalido.focus();
    return primeiroInvalido === null;
  }

  /* ----- Envio (simulado) ----- */
  function enviarFormulario(form, idAviso) {
    // Aqui entraria a chamada real ao backend, por exemplo:
    // fetch('/api/cotacao', { method: 'POST', body: new FormData(form) })
    Array.prototype.forEach.call(form.querySelectorAll('.campo--erro'), function (campo) {
      campo.classList.remove('campo--erro');
    });
    Array.prototype.forEach.call(document.querySelectorAll('.campo__erro.visivel'), function (erro) {
      erro.classList.remove('visivel');
    });

    var aviso = document.getElementById(idAviso);
    if (aviso) {
      aviso.classList.add('visivel');
      aviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.reset();
  }

  function ligarFormulario(idForm, idAviso) {
    var form = document.getElementById(idForm);
    if (!form) return;

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      if (validarFormulario(form)) enviarFormulario(form, idAviso);
    });

    // Limpa o destaque de erro assim que o campo passa a ser válido.
    form.addEventListener('input', function (evento) {
      var campo = evento.target;
      if (campo.type === 'checkbox') return;
      if (campoValido(campo)) marcarErro(campo, false);
    });
  }

  ligarFormulario('form-cotacao', 'aviso-cotacao');
  ligarFormulario('form-contato', 'aviso-contato');

  /* ----- Pré-seleção vinda dos cards de seguro (contato.html?seguro=auto) ----- */
  var tipoSeguro = new URLSearchParams(window.location.search).get('seguro');
  var assunto = document.getElementById('ct-assunto');

  if (tipoSeguro && assunto) {
    var rotulos = {
      auto: 'seguro auto',
      residencial: 'seguro residencial',
      vida: 'seguro de vida',
      viagem: 'seguro viagem',
      empresarial: 'seguro empresarial',
      portateis: 'seguro de portáteis'
    };
    var rotulo = rotulos[tipoSeguro];

    if (rotulo) {
      assunto.value = 'cotacao';
      var mensagem = document.getElementById('ct-mensagem');
      if (mensagem && mensagem.value === '') {
        mensagem.value = 'Gostaria de receber uma cotação de ' + rotulo + '.';
      }
    }
  }
})();

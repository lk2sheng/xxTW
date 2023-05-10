﻿
/* ------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web - Departamento de Informática - FCUL.       */
/* Exercícios da aula teórico-prática sobre JavaScript (parte 3).            */
/* ------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";

/* ------------------------------------------------------------------------- */
/*                                                                CONSTANTES */
/* ------------------------------------------------------------------------- */

/** Número de tentativas por omissão. */
const NUMERO_TENTATIVAS_OMISSAO = 10;

/** Valor aleatório mínimo por omissão. */
const MINIMO_ALEATORIO_OMISSAO = 1;

/** Valor aleatório máximo por omissão. */
const MAXIMO_ALEATORIO_OMISSAO = 100;

/* ------------------------------------------------------------------------- */

/** Célula que guarda o número de tentativas na tabela de configuração. */
const TD_NUMERO_TENTATIVAS = "tdNumeroTentativas";

/** Célula que guarda o valor aleatório mínimo na tabela de configuração. */
const TD_MINIMO_ALEATORIO = "tdMinimoAleatorio";

/** Célula que guarda o valor aleatório máximo na tabela de configuração. */
const TD_MAXIMO_ALEATORIO = "tdMaximoAleatorio";

/* ------------------------------------------------------------------------- */

/** Identificador do botão para mudar o número de tentativas. */
const BOTAO_NUMERO_TENTATIVAS = "btnPedeNumeroTentativas";

/** Identificador do botão para mudar o valor aleatório mínimo. */
const BOTAO_MINIMO_ALEATORIO = "btnPedeMinimoAleatorio";

/** Identificador do botão para mudar o valor aleatório máximo. */
const BOTAO_MAXIMO_ALEATORIO = "btnPedeMaximoAleatorio";

/** Identificador do botão para iniciar um jogo. */
const BOTAO_INICIA_JOGO = "btnIniciaJogo";

/** Identificador do botão de fazer uma nova tentativa. */
const BOTAO_FAZ_TENTATIVA = "btnFazTentativa";

// Identifucador do botao oara cancelar o jogo
const BOTAO_CANCELA_JOGO = "btnCancelaJogo";

/* ------------------------------------------------------------------------- */

/** Identificador do parágrafo da mensagem de boas vindas. */
const PARAGRAFO_MENSAGEM = "pMensagem";

/* ------------------------------------------------------------------------- */

/** Acertou no número aleatório. */
const RESULTADO_ACERTOU = "Acertou!";

/** Valor da tentativa ficou abaixo do número aleatório. */
const RESULTADO_ABAIXO = "Demasiado baixo";

/** Valor da tentativa ficou acima do número aleatório. */
const RESULTADO_ACIMA = "Demasiado alto";

// Jogo cancelado
const RESULTADO_CANCELOU = "O jogo foi cancelado";

/* ------------------------------------------------------------------------- */

// Tempo em jogo
const SPAN_TEMPO_JOGO = "spanTempoJogo";

/* ------------------------------------------------------------------------- */
/*                                                         VARIÁVEIS GLOBAIS */
/* ------------------------------------------------------------------------- */

/** Configuração do jogo, que pode ser alterada pelo utilizador. */
let configuracao = {

  /** Número de tentativas para adivinhar o número aleatório. */
  numeroTentativas: NUMERO_TENTATIVAS_OMISSAO,

  /** Valor aleatório mínimo. */
  minimoAleatorio: MINIMO_ALEATORIO_OMISSAO,

  /** Valor aleatório máximo. */
  maximoAleatorio: MAXIMO_ALEATORIO_OMISSAO
};

/* ------------------------------------------------------------------------- */

/** Estado do jogo, que vai sendo preenchido no decorrer do jogo. */
let jogo = {

  /** Número aleatório gerado no início do jogo, baseado na configuração. */
  numeroAleatorio: null,

  /**
   * Array com todas as tentativas de adivinhar o número por parte do
   * utilizador. A última tentativa está no final do array.
   */
  tentativas: null,

  // definie o inicio do contador de tempo do jogo
  inicio: null
};

/* ------------------------------------------------------------------------- */
/*                                                INICIALIZAÇÃO DA APLICAÇÃO */
/* ------------------------------------------------------------------------- */

// A função principal() é automaticamente invocada quando o documento HTML
// tiver sido completamente carregado pelo browser, incluindo o ficheiro CSS.
// Uma vantagem de usar addEventListener() em vez de window.onload é serem
// permitidos vários event listeners (funções invocadas) para um mesmo evento.
window.addEventListener("load", principal);

/* ------------------------------------------------------------------------- */

/**
 * Primeira função a ser executada após o browser completar o carregamento
 * de toda a informação presente no documento HTML. Ver window.onload na
 * última linha deste script.
 */
function principal() {

  // Mostra a configuração por omissão do jogo.
  mostraConfiguracaoJogo();

  // Associa comportamento a elementos na página HTML.
  defineEventListenersParaElementosHTML();

  // O jogo está pronto a usar.
  document.getElementById(PARAGRAFO_MENSAGEM).innerHTML =
    "Bem vindo ao jogo de adivinha o número!";
}

/* ------------------------------------------------------------------------- */
/*                                                INTERFACE COM O UTILIZADOR */
/* ------------------------------------------------------------------------- */

/**
 * Mostra a configuração atual do jogo no documento HTML, incluindo o número
 * de tentativas permitidas ao utilizador e o valor aleatório mínimo e máximo,
 * substituindo eventuais valores já existentes.
 */
function mostraConfiguracaoJogo() {

  document.getElementById(TD_NUMERO_TENTATIVAS).innerHTML =
    configuracao.numeroTentativas;
  document.getElementById(TD_MINIMO_ALEATORIO).innerHTML =
    configuracao.minimoAleatorio;
  // Exercício: Colocar aqui o código em falta.
  document.getElementById(TD_MAXIMO_ALEATORIO).innerHTML =
    configuracao.maximoAleatorio;


}

/* ------------------------------------------------------------------------- */

/**
 * Associa event listeners a elementos no documento HTML, em particular botões.
 * Com esta abordagem, evitam-se atributos onclick ou similares, e faz-se uma
 * melhor separação entre conteúdo, em HTML, e comportamento, em JavaScript.
 */
function defineEventListenersParaElementosHTML() {

  document.getElementById(BOTAO_NUMERO_TENTATIVAS).
    addEventListener("click", pedeNumeroTentativas);

  document.getElementById(BOTAO_MINIMO_ALEATORIO).
    addEventListener("click", pedeMinimoAleatorio);

  document.getElementById(BOTAO_MAXIMO_ALEATORIO).
    addEventListener("click", pedeMaximoAleatorio);

  document.getElementById(BOTAO_INICIA_JOGO).
    addEventListener("click", iniciaJogo);

  document.getElementById(BOTAO_FAZ_TENTATIVA).
    addEventListener("click", fazTentativa);

  document.getElementById(BOTAO_CANCELA_JOGO).
    addEventListener("click", cancelaJogo);
}

/* ------------------------------------------------------------------------- */

/**
 * Pede ao utilizador o número de tentativas para conseguir adivinhar o número
 * aleatório. O jogo termina se esse número de tentativas for atingido.
 */
function pedeNumeroTentativas() {

  configuracao.numeroTentativas = pedeNumeroInteiro(1, Infinity);
  
  mostraConfiguracaoJogo();
}

/* ------------------------------------------------------------------------- */

/**
 * Pede ao utilizador o valor aleatório mínimo admissível no jogo, o qual tem
 * de ser inferior ou igual ao valor aleatório máximo em vigor.
 */
function pedeMinimoAleatorio() {

  // Exercício: Colocar aqui o código da função.
  configuracao.minimoAleatorio = pedeNumeroInteiro(-Infinity,configuracao.maximoAleatorio);

  mostraConfiguracaoJogo();
}

/* ------------------------------------------------------------------------- */

/**
 * Pede ao utilizador o valor aleatório máximo admissível no jogo, o qual tem
 * de ser superior ou igual ao valor aleatório mínimo em vigor.
 */
function pedeMaximoAleatorio() {

  // Exercício: Colocar aqui o código da função.
  configuracao.maximoAleatorio = pedeNumeroInteiro(configuracao.minimoAleatorio,Infinity);

  mostraConfiguracaoJogo();
}

/* ------------------------------------------------------------------------- */

/**
 * Pede um número inteiro ao utilizador, o qual tem de estar dentro do
 * intervalo de validade recebido nos parâmetros da função. O pedido é feito
 * as vezes necessárias até ser obtido um valor válido.
 * 
 * O texto do pedido deve ser na forma seguinte, em que A e B são os limites
 * do intervalo de validade:
 * 
 *  - Digite um número inteiro entre A e B.
 * 
 * Se o utilizador introduzir um valor inválido (como texto, T), o pedido
 * seguinte deve ser precedido de uma das seguintes mensagens:
 * 
 *  - O valor 'T' não é um número inteiro.
 *  - O número N está fora do intervalo de validade.
 * 
 * Assume-se que os parâmetros que definem o intervalo de validade têm
 * argumentos corretos, isto é, que são números inteiros e que o valor mínimo
 * é menor que o máximo.
 * 
 * @param {number} minimo O menor número inteiro permitido.
 * @param {number} maximo O maior número inteiro permitido.
 * @returns {number} O número inteiro introduzido pelo utilizador.
 */
 function pedeNumeroInteiro(minimo, maximo) {

  // Exercício: Colocar aqui o código da função.
  let numero;
  do {
    numero = parseInt(prompt (`Digite um numero inteiro entre ${minimo} e ${maximo}.`));
      if (Number.isNaN(numero)){
        alert(`O valor ${numero} não é um número inteiro.`)
      }
      else if (numero < minimo || numero > maximo){
        alert(`O número ${numero} está fora do intervalo de validade.`)
      }
    } 
    while (Number.isNaN() || numero < minimo || numero > maximo);
    return numero;
  }


/* ------------------------------------------------------------------------- */

/**
 * Remove da tabela de tentativas do documento HTML as linhas com os dados de
 * tentativas anteriores, ficando apenas a linha de cabeçalho.
 */
function removeTentativasAnteriores() {

  // A função Document.querySelectorAll() retorna todos os elementos HTML que
  // satisfazem o seletor CSS indicado no argumento. Neste caso, são obtidos
  // todos os tr, exceto o primeiro (que é o da linha de cabeçalho da tabela),
  // dentro da secção de tentativas.
  let linhasTentativasAnteriores =
    document.querySelectorAll("section#secTentativas tr + tr");

  // Para apagar as linhas das tentativas anteriores é necessário invocar
  // Node.removeChild() sobre o elemento pai dessas linhas, daí o recurso à
  // propriedade Node.parentNode.
  for (let linhaTentativaAnterior of linhasTentativasAnteriores) {
    linhaTentativaAnterior.parentNode.removeChild(linhaTentativaAnterior);
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Acrescenta uma linha na tabela de tentativas do documento HTML, contendo o
 * número da tentativa que acabou de ser feita, o valor escolhido pelo
 * utilizador, e qual o resultado (igual, inferior, ou superior ao número
 * gerado aleatoriamente no início do jogo).
 * 
 * @param {number} numeroTentativa O número da tentativa feita pelo utilizador.
 * @param {number} valorTentativa O valor escolhido pelo utilizador.
 * @param {string} resultadoTentativa O resultado da tentativa (ex. acertou).
 */
function mostraTentativaAtual(numeroTentativa, valorTentativa,
                              resultadoTentativa) {

  // Construção da nova linha a acrescentar à tabela de tentativas.
  let novaLinhaTentativa = document.createElement("tr");
  novaLinhaTentativa.innerHTML = "<td>" + numeroTentativa    + "</td>" +
                                 "<td>" + valorTentativa     + "</td>" +
                                 "<td>" + resultadoTentativa + "</td>";

  // A função Document.querySelector() retorna o primeiro elemento HTML que
  // satisfaz o seletor CSS no argumento. Neste caso, é selecionado o último
  // tr dentro da secção de tentativas, e a propriedade Node.parentNode
  // devolve o elemento pai desse tr. O elemento pai é necessário para se
  // poder invocar Node.appendChild(), que acrescenta a nova linha no final
  // da tabela de tentativas.
  document.querySelector("section#secTentativas tr:last-of-type")
          .parentNode.appendChild(novaLinhaTentativa);
}

/* ------------------------------------------------------------------------- */

/**
 * Permite que o utilizador faça mais uma tentativa para adivinhar o número e,
 * se acertar ou tiver esgotado as tentativas, termina o jogo.
 */
function fazTentativa() {

  let valorTentativa = null;
  let resultadoTentativa = null;

  // Obtém e armazena o valor da próxima tentativa para adivinhar o número.
  valorTentativa = pedeNumeroInteiro(configuracao.minimoAleatorio,
                                     configuracao.maximoAleatorio);

  jogo.tentativas.push(valorTentativa);

  // Constrói mensagem informativa para aparecer na tabela de tentativas.
  if (valorTentativa == jogo.numeroAleatorio) {
    resultadoTentativa = RESULTADO_ACERTOU;

  } else if (valorTentativa < jogo.numeroAleatorio) {
    resultadoTentativa = RESULTADO_ABAIXO;

  } else if (valorTentativa > jogo.numeroAleatorio) {
    resultadoTentativa = RESULTADO_ACIMA;
  }

  // Adiciona uma linha à tabela de tentativas do utilizador.
  mostraTentativaAtual(jogo.tentativas.length, valorTentativa,
                       resultadoTentativa);

  // Verifica se o jogo terminou.
  if (valorTentativa == jogo.numeroAleatorio ||
      jogo.tentativas.length >= configuracao.numeroTentativas) {
    terminaJogo(resultadoTentativa);
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Inicializa o estado de um novo jogo, e atualiza a interface com o
 * utilizador, impedindo alterações na configuração do jogo.
 */
function iniciaJogo() {

  // A configuração do jogo não pode ser alterada enquanto este não terminar.
  document.getElementById(BOTAO_INICIA_JOGO).disabled = true;
  document.getElementById(BOTAO_NUMERO_TENTATIVAS).disabled = true;
  document.getElementById(BOTAO_MINIMO_ALEATORIO).disabled = true;
  // Exercício: Colocar aqui o código em falta.
  document.getElementById(BOTAO_MAXIMO_ALEATORIO).disabled = true;
  // Inicialização do estado do jogo.
  jogo.numeroAleatorio =
    geraNumeroInteiroAleatorio(configuracao.minimoAleatorio,
                               configuracao.maximoAleatorio);
  jogo.tentativas = [];

  // Inicializa o valor do tempo de início do jogo
  jogo.inicio = Math.floor(Date.now() / 1000);

  // Inicia o temporizador periódico para mostrar o tempo de jogo
  temporizadorTempoJogo = setInterval(mostraTempoJogo, 1000);

  // Podem estar a ser mostradas tentativas anteriores se este não for o
  // primeiro jogo, as quais devem ser removidas da tabela para se poder
  // começar o novo jogo.
  removeTentativasAnteriores();

  // Permite que o utilizador faça tentativas para adivinhar o número.
  document.getElementById(BOTAO_FAZ_TENTATIVA).disabled = false;
  document.getElementById(BOTAO_CANCELA_JOGO).disabled = false;
}

/* ------------------------------------------------------------------------- */
function cancelaJogo() {

  terminaJogo(RESULTADO_CANCELOU);
}
/* ------------------------------------------------------------------------- */

/**
 * Termina um jogo, mostrando uma mensagem com o resultado ao utilizador, e
 * atualiza a interface para permitir a configuração de um novo jogo.
 * 
 * @param {string} resultado Se acertou ou não no número.
 */
function terminaJogo(resultado) {

  // Mensagem a apresentar ao utilizador com o resultado do jogo.
  let mensagemResultadoJogo = null;

  // Valor da última tentativa feita pelo utilizador.
  let valorTentativaFinal = jogo.tentativas[jogo.tentativas.length - 1];

  // Neste jogo não é possível fazer mais tentativas para adivinhar o número.
  document.getElementById(BOTAO_FAZ_TENTATIVA).disabled = true;
  document.getElementById(BOTAO_CANCELA_JOGO).disabled = true;

  // Apresenta a mensagem de resultado do jogo ao utilizador.
  switch (resultado) {

    case RESULTADO_ACERTOU:
      mensagemResultadoJogo =
        "Acertou! Era mesmo o número " + valorTentativaFinal + ".";
      break;

    case RESULTADO_CANCELOU:
      mensagemResultadoJogo = 
        "O jogo foi cancelado.";
      break;

    default:
      mensagemResultadoJogo = "Talvez tenha mais sorte no próximo jogo!";
      break;
  }

  alert(mensagemResultadoJogo);

  // Permite a configuração e início de um novo jogo.
  document.getElementById(BOTAO_NUMERO_TENTATIVAS).disabled = false;
  document.getElementById(BOTAO_MINIMO_ALEATORIO).disabled = false;
  document.getElementById(BOTAO_MAXIMO_ALEATORIO).disabled = false;
  document.getElementById(BOTAO_INICIA_JOGO).disabled = false;
}

/* ------------------------------------------------------------------------- */

/**
 * @param {number} [minimo] O menor número aleatório permitido.
 * @param {number} [maximo] O maior número aleatório permitido.
 * @returns {number} Um número inteiro aleatório dentro do intervalo permitido.
 */
function geraNumeroInteiroAleatorio(minimo = MINIMO_ALEATORIO_OMISSAO,
                                    maximo = MAXIMO_ALEATORIO_OMISSAO) {

  // Exercício: Colocar aqui o código da função.
  const intervalo = maximo - minimo + 1;
  const numeroAleatorio = Math.floor(Math.random()*intervalo) + minimo;

  return numeroAleatorio;
}

/* ------------------------------------------------------------------------- */

function mostraTempoJogo () {

  let tempoDecorrido = Math.floor(Date.now() / 1000) - jogo.inicio;

  SPAN_TEMPO_JOGO = tempoDecorrido;

  if(terminaJogo()){
     // Pare o temporizador periodico do medidor de tempo
  clearInterval(temporizadorTempoJogo);
  }
}
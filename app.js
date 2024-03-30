// let titulo = document.querySelector('h1')
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p')
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaNumerosSorteados = [];
let numLimite = 10;
let numSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavra = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavra}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute>numSecreto){
            exibirTextoNaTela('p','O número é menor!');
        }else{
            exibirTextoNaTela('p','O número é maior!');
        } tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let NumeroEscolhido =  parseInt(Math.random()*numLimite+1);
    let quantElemtLista = listaNumerosSorteados.length;

    if (quantElemtLista == numLimite){
        quantElemtLista = [];
    }

    if (listaNumerosSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(NumeroEscolhido);
        console.log(listaNumerosSorteados);
        return NumeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
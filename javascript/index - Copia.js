function contarPalavras(str) {
    return str.trim().split(/\s+/).length;
  }

function FileHelper(){
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom){
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;
    }
}

function id_Tecla(){
    return;
}

function carrregarEventosBotoes(){
    document.getElementById("Q").onclick = function() {id_Tecla = 'Q';}
    document.getElementById("W").onclick = function() {id_Tecla = 'W';}
    document.getElementById("E").onclick = function() {id_Tecla = 'E';}
    document.getElementById("R").onclick = function() {id_Tecla = 'R';}
    document.getElementById("T").onclick = function() {id_Tecla = 'T';}
    document.getElementById("Y").onclick = function() {id_Tecla = 'Y';}
    document.getElementById("U").onclick = function() {id_Tecla = 'U';}
    document.getElementById("I").onclick = function() {id_Tecla = 'I';}
    document.getElementById("O").onclick = function() {id_Tecla = 'O';}
    document.getElementById("P").onclick = function() {id_Tecla = 'P';}
    document.getElementById("A").onclick = function() {id_Tecla = 'A';}
    document.getElementById("S").onclick = function() {id_Tecla = 'S';}
    document.getElementById("D").onclick = function() {id_Tecla = 'D';}
    document.getElementById("F").onclick = function() {id_Tecla = 'F';}
    document.getElementById("G").onclick = function() {id_Tecla = 'G';}
    document.getElementById("H").onclick = function() {id_Tecla = 'H';}
    document.getElementById("J").onclick = function() {id_Tecla = 'J';}
    document.getElementById("K").onclick = function() {id_Tecla = 'K';}
    document.getElementById("L").onclick = function() {id_Tecla = 'L';}
    document.getElementById("Z").onclick = function() {id_Tecla = 'Z';}
    document.getElementById("X").onclick = function() {id_Tecla = 'X';}
    document.getElementById("C").onclick = function() {id_Tecla = 'C';}
    document.getElementById("V").onclick = function() {id_Tecla = 'V';}
    document.getElementById("B").onclick = function() {id_Tecla = 'B';}
    document.getElementById("N").onclick = function() {id_Tecla = 'N';}
    document.getElementById("M").onclick = function() {id_Tecla = 'M';}
}

function carregarArquivoDeCategoria(){

    let categoria = obterCategoriaEscolhida();
    let palavras = FileHelper.readStringFromFileAtPath ('../txt/' + categoria + '.txt');

    return palavras; 
}

function sortearPalavra(palavras){
    let palavra = '';
    let palavraSorteada = '';
    let qtdPalavras = contarPalavras(palavras);
    
    if(qtdPalavras > 1){
        palavra = palavras.split("\n");
        let palavraSelecionada = Math.floor(Math.random() * qtdPalavras);
        palavraSorteada = palavra[palavraSelecionada];
    }
    else{
        palavraSorteada = palavras;
    }

    palavraSorteada = palavraSorteada.replaceAll(/[^a-z]/gi, '');

    return palavraSorteada;
}

function desenharTracosIniciais(palavraSorteada){

    const traco = '_';
    let tamTracosPalavra = document.getElementById("palavra").innerHTML.length;
    while(tamTracosPalavra < palavraSorteada.length){
        document.getElementById("palavra").innerHTML = document.getElementById("palavra").innerHTML + traco;
        tamTracosPalavra++;
    }
    let vetPalavra = [];
    for(let j = 0; j < palavraSorteada.length; j++){
        if(vetPalavra[j] == undefined){
            vetPalavra[j] = '_';
        }
    }

    return vetPalavra;
}

function desativarBotaoECampoJasei(){
    document.getElementById('inputjaSei').disabled = true;
    document.getElementById('btnjaSei').disabled = true;
    document.getElementById('btnjaSei').style.opacity = 0.5;
}

function ativarBotaoECampoJasei(){
    document.getElementById('inputjaSei').disabled = false;
    document.getElementById('btnjaSei').disabled = false;
    document.getElementById('btnjaSei').style.opacity = 1;
}

function ganharVarinhaMagica(){
    if(document.getElementById("palavra").innerHTML.indexOf("_") == -1){
        qtdFragmentosVarinha++;
    }
    if(document.getElementById("palavra").innerHTML.indexOf("_") == -1 && qtdFragmentosVarinha == 3){
        qtdVarinhas++;
        document.getElementById('qtdVarinhas').innerHTML = qtdVarinhas;
        qtdFragmentosVarinha = 0;
    }
}

function escreverNaTelaColorindoBotoes(palavraSorteada, vetPalavra, musicaAcertouLetra,
    musicaAcertouPalavra, musicaPerdeuJogo, musicaErrouLetra){

    let statusRank = 0;
    let idQtdChances = document.getElementById("qtdChances");
    let letraPesquisada = document.getElementById(id_Tecla).innerText;
    if(document.getElementById("palavra").innerHTML.includes("_")){
        for(let i = 0; i < palavraSorteada.length; i++){
            if(letraPesquisada == palavraSorteada[i]){
                document.getElementById(id_Tecla).style.background = "lightgreen";
                document.getElementById(id_Tecla).style.transition = "0.8s";
                document.getElementById(letraPesquisada).disabled = true;
                vetPalavra[i] = letraPesquisada;
                document.getElementById("palavra").innerHTML = vetPalavra.join("");
                musicaAcertouLetra.play();
                if(document.getElementById("palavra").innerHTML.indexOf("_") == -1){
                    for(let i = 0; i < vetLetras.length; i++){
                        document.getElementById(vetLetras[i]).disabled = true;
                        document.getElementById(vetLetras[i]).style.border = 'solid lightgray 0.1px';
                    }
                    musicaAcertouPalavra.play();
                    desativarBotaoVarinha();
                    desativarBotaoECampoJasei();
                    mostrarBotaoProximaPalavra();
                    qtdPontos++;         
                    document.getElementById('qtdPontos').innerHTML = qtdPontos;
                    document.getElementById('btnProximaPalavra').textContent = 'Próxima palavra';
                    ganharVarinhaMagica();
                    statusJogo = '';  
                }
            }
            else{ 
                if(i == palavraSorteada.length-1){
                    if(document.getElementById(id_Tecla).style.background != "lightgreen"){
                        document.getElementById(letraPesquisada).style.background = "rgb(223, 114, 114)";
                        document.getElementById(letraPesquisada).style.transition = "0.8s";
                        document.getElementById(letraPesquisada).disabled = true;
                        qtdChances--;
                        idQtdChances.innerHTML = qtdChances;
                        musicaErrouLetra.play();
                        if(qtdChances == 0){
                            musicaPerdeuJogo.play();
                            for(let i = 0; i < vetLetras.length; i++){
                                document.getElementById(vetLetras[i]).disabled = true;
                                document.getElementById(vetLetras[i]).style.border = 'solid lightgray 0.1px';
                            }
                            document.getElementById('msgGameOver').innerHTML =
                            'Que pena você perdeu, a sua pontuação foi de ' + qtdPontos + ' pontos,' + 
                            ' a palavra era ' + palavraSorteada;
                            exibirGameOver();
                            desativarBotaoVarinha();
                            demonstrarBotaoAlterarJogador();
                            desativarBotaoECampoJasei();
                            statusJogo = 'perdi';
                            statusRank = verificarAtualizacaoRanking();
                            let linhaCompleta = statusRank[1];
                            let linhaCompleta2 = statusRank[2];
                            statusRank = statusRank[0];
                            if(statusRank != 0 && statusRank != undefined){
                                atualizarRanking(statusRank);
                                if(statusRank == 1 || statusRank == 2){
                                    ordenarRanking(linhaCompleta, linhaCompleta2);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}





function ordenarRanking(linhaCompleta, linhaCompleta2){

    linhaCompleta = linhaCompleta.substring(1, linhaCompleta.length);
    linhaCompleta2 = linhaCompleta2.substring(1, linhaCompleta2.length);

    let valorSubstituido = linhaCompleta.replace(/[^0-9]/g, '')
    valorSubstituido = parseInt(valorSubstituido);

    let valorSubstituido2 = linhaCompleta2.replace(/[^0-9]/g, '')
    valorSubstituido2 = parseInt(valorSubstituido2);

    let vet = obterValoresRanking();

    if(valorSubstituido > vet[1]){
        document.getElementById('segundoLugar').innerHTML = '2' + linhaCompleta;
        if(valorSubstituido2 > vet[2]){
            document.getElementById('terceiroLugar').innerHTML = '3' + linhaCompleta2;
        }
    }
    else{
        if(valorSubstituido > vet[2]){
            document.getElementById('terceiroLugar').innerHTML = '3' + linhaCompleta;
        }
    }
}

function validarPalavraDigitada(palavraSorteada, musicaPerdeuJogo, musicaAcertouPalavra){
    
    porcentagemRestante = calcularPorcentagemRestante(palavraSorteada);
    qtdLetrasRestantes = calcularQtdLetrasRestantes(palavraSorteada);
    let statusRank = 0;

    let pontuacaoAConceder = calcularPontuacaoPalavraDigitada(porcentagemRestante, qtdLetrasRestantes);

    if(document.getElementById('inputjaSei').value == ''){
       alert('Favor digitar a palavra');
    }
    else{
        document.getElementById('inputjaSei').value = document.getElementById('inputjaSei').value.toUpperCase();
        desativarBotaoECampoJasei();

        if(document.getElementById('inputjaSei').value == palavraSorteada){
            musicaAcertouPalavra.play();
            document.getElementById('palavra').innerHTML = palavraSorteada;
            desativarBotaoVarinha();
            qtdPontos = qtdPontos + pontuacaoAConceder;
            document.getElementById('qtdPontos').innerHTML = qtdPontos;
            mostrarBotaoProximaPalavra();
            ganharVarinhaMagica();
            document.getElementById('btnProximaPalavra').textContent = 'Próxima palavra';
            statusJogo = '';    
        }
        else{
            musicaPerdeuJogo.play();
            document.getElementById('msgGameOver').innerHTML =
                            'Que pena você perdeu, a sua pontuação foi de ' + qtdPontos + ' pontos,' + 
                            ' a palavra era ' + palavraSorteada;
            desativarBotaoVarinha();
            exibirGameOver();
            demonstrarBotaoAlterarJogador();
            statusJogo = 'perdi';
            statusRank = verificarAtualizacaoRanking();
            let linhaCompleta = statusRank[1];
            let linhaCompleta2 = statusRank[2];
            statusRank = statusRank[0];
            if(statusRank != 0 && statusRank != undefined){
                atualizarRanking(statusRank);
                if(statusRank == 1 || statusRank == 2){
                    ordenarRanking(linhaCompleta, linhaCompleta2);
                }
            }
        }
        for(let i = 0; i < vetLetras.length; i++){
            document.getElementById(vetLetras[i]).disabled = true;
            document.getElementById(vetLetras[i]).style.border = 'solid lightgray 0.1px';
        }
        desativarBotaoECampoJasei();
    }
}

function desabilitarBotoesInutilizaveis(categoriaEscolhida){

    if(categoriaEscolhida == 'Objeto'){
        return;
    }

    const vetTeclasFruta = ['Q', 'Y', 'Z'];
    const vetTeclasNome = ['K', 'X'];
    const vetTeclasTime = ['Q', 'W', 'Y', 'K', 'X'];
    const vetTeclasPais = ['W', 'Y', 'K'];
    const vetTeclasCor = ['Q', 'W', 'Y', 'F', 'K'];
    const vetTeclasComida = ['K', 'Y'];
    const vetTeclasLugar = ['W', 'Y', 'K', 'X'];
    const vetTeclasAnimal = ['W', 'Y', 'K'];

    let vetLetrasDesabilitadas = [''];

    switch(categoriaEscolhida) {
        case 'Fruta':
            vetLetrasDesabilitadas = vetTeclasFruta;
        break;
        case 'Nome':
            vetLetrasDesabilitadas = vetTeclasNome;
        break;
        case 'Time':
            vetLetrasDesabilitadas = vetTeclasTime;
        break;
        case 'País':
            vetLetrasDesabilitadas = vetTeclasPais;
        break;
        case 'Cor':
            vetLetrasDesabilitadas = vetTeclasCor;
        break;
        case 'Comida':
            vetLetrasDesabilitadas = vetTeclasComida;
        break;
        case 'Animal':
            vetLetrasDesabilitadas = vetTeclasAnimal;
        break;
        case 'Lugar':
            vetLetrasDesabilitadas = vetTeclasLugar;
        break;
    }

    for(let i = 0; i < vetLetrasDesabilitadas.length; i++){
        document.getElementById(vetLetrasDesabilitadas[i]).disabled = true;
        document.getElementById(vetLetrasDesabilitadas[i]).style.color = 'lightgray';
        document.getElementById(vetLetrasDesabilitadas[i]).style.border = 'solid lightgray 0.1px';
    }
}


function calcularQtdLetrasRestantes(palavraSorteada){

    let cont =  0;
    let vet = [];

    for(let i = 0; i < palavraSorteada.length; i++){
        vet = document.getElementById('palavra').innerHTML;
        if(vet[i] == '_'){
            cont++
        }
    }

    return cont;
}


function calcularPontuacaoPalavraDigitada(porcentagemRestante, qtdLetrasRestantes){

    let numPrimeiraCasa = 0;
    let numSegundaCasa = 0;
    let pontuacaoAConceder = 0;

    porcentagemRestante = porcentagemRestante.toString();
    numPrimeiraCasa = Math.floor(porcentagemRestante.substring(0, 1));
    numSegundaCasa = Math.floor(porcentagemRestante.substring(1, 2));

    porcentagemRestante =  Math.floor(porcentagemRestante);

    if(porcentagemRestante == 100){
        pontuacaoAConceder = 10;
    }

    if(pontuacaoAConceder != 10){
        if(qtdLetrasRestantes == 1){
            pontuacaoAConceder = 1;
        }
        else{
            if(numSegundaCasa == 0 || numSegundaCasa < 5){
                pontuacaoAConceder = numPrimeiraCasa;
            }
            else{
                    pontuacaoAConceder =  numPrimeiraCasa + 1;
                }
            }
        }

    return pontuacaoAConceder;

}

function calcularPorcentagemRestante(palavraSorteada){

    let porcentagem = 100;
    let porcentagemRestante = 0;
    let porcentagemPorLetra = 0;

    porcentagemPorLetra = porcentagem/palavraSorteada.length;
    porcentagemRestante = (porcentagemPorLetra * calcularQtdLetrasRestantes(palavraSorteada));

    return  Math.round(porcentagemRestante);
}

function obterCategoriaEscolhida(){

    let categoriaEscolhida = document.getElementById('temas').value;

    return categoriaEscolhida;
}

function ativarBotoesPainel(){
    for(let i = 0; i < vetLetras.length; i++){
        document.getElementById(vetLetras[i]).disabled = false;
        document.getElementById(vetLetras[i]).style.color = 'black';
    }
}

function desativarBotoesPainel(){
    for(let i = 0; i < vetLetras.length; i++){
        document.getElementById(vetLetras[i]).disabled = true;
    }
}

function descolorirTeclas(){
    for(let i = 0; i < vetLetras.length; i++){
        document.getElementById(vetLetras[i]).style.background = 'buttonface';
        document.getElementById(vetLetras[i]).style.borderTop = 'outset gray 0.1px';
        document.getElementById(vetLetras[i]).style.borderBottom = 'outset lightgray 0.1px';
        document.getElementById(vetLetras[i]).style.borderLeft = 'outset gray 0.1px';
        document.getElementById(vetLetras[i]).style.borderRight = 'outset lightgray 0.1px';
        document.getElementById(vetLetras[i]).style.borderRadius = '3px';
    }
}

function desativarBotaoVarinha(){

    document.getElementById('varinha').disabled = true;
    document.getElementById('varinha').style.opacity = 0.5;
    document.getElementById('varinha').style.border = 'solid grey 0.1px';   
}


function ativarBotaoJogarEcampoNome(){
    document.getElementById('btnJogar').disabled = false;
    document.getElementById('btnJogar').style.opacity = 1;
    document.getElementById('inputNome').disabled = false;
}

function desativarBotaoJogarEcampoNome(){

    document.getElementById('btnJogar').disabled = true;
    document.getElementById('btnJogar').style.opacity = 0.5;
    document.getElementById('inputNome').disabled = true;
}

function habilitarBotaoVarinha(){
    document.getElementById('varinha').disabled = false;
    document.getElementById('varinha').style.opacity = 1;
}
function buscarNovaPalavra(){

    modalGameOver.style.display = "none";

    if(document.getElementById("alteraJogador").style.visibility == 'visible'){
        esconderBotaoAlterarJogador();
    }

    nomeJogador = document.getElementById("inputNome").value;

    if(document.getElementById("btnJogar").disabled == false){
        return 0;
    }
    else{

    esconderBotaoProximaPalavra();

    if(statusJogo == 'perdi'){
        qtdPontos = 0;
        document.getElementById('qtdPontos').innerHTML = qtdPontos;
        qtdChances = 5;
        document.getElementById('qtdChances').innerHTML = qtdChances;
        qtdVarinhas = 1;
        document.getElementById('qtdVarinhas').innerHTML = qtdVarinhas;
    }

    if(qtdPontos == 0 || statusJogo == 'perdi'){
        qtdVarinhas = 1;
        document.getElementById('qtdVarinhas').innerHTML = qtdVarinhas;
    }

    if(document.getElementById('btnProximaPalavra').textContent == 'Novo jogo'){
        qtdPontos=0;
        document.getElementById('qtdPontos').innerHTML = qtdPontos;
    }
    document.getElementById('inputjaSei').value = '';
    qtdChances = 5;
    document.getElementById('qtdChances').innerHTML = qtdChances;
    document.getElementById("palavra").innerHTML = '';
    descolorirTeclas();
    let palavrasDaCategoria = carregarArquivoDeCategoria();
    palavraSorteada = sortearPalavra(palavrasDaCategoria);
    vetTracos = desenharTracosIniciais(palavraSorteada);
    ativarBotoesPainel();
    ativarBotaoECampoJasei();
    categoriaEscolhida = obterCategoriaEscolhida();
    desabilitarBotoesInutilizaveis(categoriaEscolhida);

        if(qtdVarinhas > 0){
            habilitarBotaoVarinha();
        }
    }   
}

function obterLetrasRestantes(palavraSorteada){

    let vetLetrasRestantes = [];
    let aux = document.getElementById('palavra').innerHTML;
    let aux2 = [];
    vetLetrasRestantes = palavraSorteada;

    for(let i = 0; i < vetLetrasRestantes.length; i++){
        if(aux[i] != vetLetrasRestantes[i]){
            aux2[i] = vetLetrasRestantes[i];
        }   
    }

    aux2 = aux2.filter(function(item) {
        return item !== undefined;
    })

    vetLetrasRestantes = aux2;

    return vetLetrasRestantes;
}


function sortearLetraVarinhaMagica(letrasRestantes){

    let letraSelecionada = Math.floor(Math.random() * letrasRestantes.length);
    letraSorteada = letrasRestantes[letraSelecionada];

    return letraSorteada;

}

function preencherPalavraComLetraSorteada(letraSorteada, vetPalavra, palavraSorteada){

    if(document.getElementById("palavra").innerHTML.includes("_")){
        for(let i = 0; i < palavraSorteada.length; i++){
            if(letraSorteada == palavraSorteada[i]){
                document.getElementById(letraSorteada).style.background = "lightgreen";
                document.getElementById(letraSorteada).style.transition = "0.8s";
                document.getElementById(letraSorteada).disabled = true;
                vetPalavra[i] = letraSorteada;
                document.getElementById("palavra").innerHTML = vetPalavra.join(""); 
                if(document.getElementById("palavra").innerHTML.indexOf("_") == -1){
                    for(let i = 0; i < vetLetras.length; i++){
                        document.getElementById(vetLetras[i]).disabled = true;
                        document.getElementById(vetLetras[i]).style.border = 'solid lightgray 0.1px';
                    }
                    desativarBotaoVarinha();
                    desativarBotaoECampoJasei();
                    mostrarBotaoProximaPalavra();
                    qtdPontos++;
                    document.getElementById('qtdPontos').innerHTML = qtdPontos;
                    document.getElementById('btnProximaPalavra').textContent = 'Próxima palavra';      
                 }
            }
        }
    }
}

function botaoVarinha(palavraSorteada, musicaVarinha){
    
    qtdVarinhas--;
    document.getElementById('qtdVarinhas').innerHTML = qtdVarinhas;
    musicaVarinha.play();

    let letrasRestantes = [];
    let letraSorteada = '';

    letrasRestantes = obterLetrasRestantes(palavraSorteada);
    letraSorteada = sortearLetraVarinhaMagica(letrasRestantes);
    preencherPalavraComLetraSorteada(letraSorteada, vetTracos, palavraSorteada);
    ganharVarinhaMagica();

    if(qtdVarinhas == 0){
        desativarBotaoVarinha();
    }
}

function jogar(){

    if(document.getElementById("inputNome").value == ''){
        alert('Informe o nome');
    }
    else{
        desativarBotaoJogarEcampoNome();
        buscarNovaPalavra();
    }
}

function exibirGameOver(){
    modalGameOver.style.display = "block";
}


function exibirRegras(){
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  window.onload = function() {
    document.getElementById("inputNome").focus();
  }

function alterarJogador(){
    qtdPontos = 0;
    qtdVarinhas = 1;
    qtdChances = 5;
    document.getElementById("qtdPontos").innerHTML = qtdPontos;
    document.getElementById("qtdVarinhas").innerHTML = qtdVarinhas;
    document.getElementById("qtdChances").innerHTML = qtdChances;
    modalGameOver.style.display = "none";
    document.getElementById("inputNome").value = "";
    document.getElementById("inputNome").focus();
    ativarBotaoJogarEcampoNome();
    document.getElementById("alteraJogador").disabled = true;
    document.getElementById("alteraJogador").style.opacity = 0.5;
    esconderBotaoProximaPalavra();
}


function esconderBotaoAlterarJogador(){
    document.getElementById("alteraJogador").style.visibility = 'hidden';
}

function demonstrarBotaoAlterarJogador(){
    document.getElementById("alteraJogador").style.visibility = 'visible';
    document.getElementById("alteraJogador").style.opacity = 1;
    document.getElementById("alteraJogador").disabled = false;
}

function esconderBotaoProximaPalavra(){
    document.getElementById("btnProximaPalavra").style.visibility = 'hidden';
}

function mostrarBotaoProximaPalavra(){
    document.getElementById("btnProximaPalavra").style.visibility = 'visible';
}











function verificarAtualizacaoRanking(){

    let vet = [];
    let rankAserAtualizado = 0;
    let vetPontosRanking = obterValoresRanking();

    if(qtdPontos > vetPontosRanking[0]){
        rankAserAtualizado = 1;
        vet[0] = rankAserAtualizado;
        vet[1] = document.getElementById('primeiroLugar').innerHTML;
        vet[2] = document.getElementById('segundoLugar').innerHTML;
    }
    else{
        if(qtdPontos > vetPontosRanking[1]){
            rankAserAtualizado = 2;
            vet[0] = rankAserAtualizado;
            vet[1] = document.getElementById('segundoLugar').innerHTML;
            vet[2] = document.getElementById('terceiroLugar').innerHTML;
    }
    else{
        if(qtdPontos > vetPontosRanking[2]){
            rankAserAtualizado = 3;
            vet[0] = rankAserAtualizado;
            vet[1] = vetPontosRanking[2];
        }
    }

}

 return vet;

}

function atualizarRanking(rank){

    let id = '';
    let mascara = '';
    let posicao = '';

    switch(rank){
        case 1:
            id = "primeiroLugar";
            posicao = '1';
          break;
        case 2:
            id = "segundoLugar";
            posicao = '2';
          break;
        case 3:
            id = "terceiroLugar";
            posicao = '3';
        break;
      }

      mascara = posicao + 'º' + ' ' + nomeJogador + ' ' + qtdPontos + 'pts';

      document.getElementById(id).innerHTML = mascara;
}


function formatarValoresRanking(valor){

    valor = valor.substring(5);
    valor = valor.replace(/[^0-9]/g, '')
    valor = parseInt(valor);

    return valor;
}

function obterValoresRanking(){

    let vet = [];

    let primeiroLugar = document.getElementById("primeiroLugar").innerHTML;
    let segundoLugar = document.getElementById("segundoLugar").innerHTML;
    let terceiroLugar = document.getElementById("terceiroLugar").innerHTML;

    primeiroLugar = formatarValoresRanking(primeiroLugar);
    segundoLugar = formatarValoresRanking(segundoLugar);
    terceiroLugar = formatarValoresRanking(terceiroLugar);

    vet[0] = primeiroLugar;
    vet[1] = segundoLugar;
    vet[2] = terceiroLugar;

    return vet;
}

inputNome.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btnJogar").click();
    }
  });

  inputjaSei.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btnjaSei").click();
    }
  });

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
  }


var btn = document.getElementById("btnJogar");
var modal = document.getElementById("myModal");
var modalGameOver = document.getElementById("myModalGameOver");
let nomeJogador = '';

carrregarEventosBotoes();
FileHelper();
esconderBotaoProximaPalavra();
esconderBotaoAlterarJogador();
desativarBotaoECampoJasei();
desativarBotaoVarinha();


let vet = [''];
let qtdChances = 5;
let qtdVarinhas = 1;
let qtdPontos = 0;
let statusJogo = '';
let qtdFragmentosVarinha = 0;
let aux = qtdPontos;

let musicaAcertouLetra = new Audio('../musics/acertouLetra.wav');
let musicaAcertouPalavra = new Audio('../musics/acertouPalavra.wav');
let musicaErrouLetra = new Audio('../musics/errouLetra.wav');
let musicaPerdeuJogo = new Audio('../musics/perdeuJogo.wav');
let musicaVarinha = new Audio('../musics/varinhaSong.wav');

musicaErrouLetra.volume = 0.2;
musicaAcertouLetra.volume = 0.7;
musicaVarinha.volume = 0.3;
musicaAcertouPalavra.volume = 0.4;
musicaPerdeuJogo.volume = 0.4;


document.getElementById("palavra").innerHTML = '_';
const vetLetras = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O',
                   'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K',
                   'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

desativarBotoesPainel();


//criar opção de cronômetro baseado no video lá

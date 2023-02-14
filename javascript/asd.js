
/*
function carregarArquivoDeRanking(){

    let ranking = FileHelper.readStringFromFileAtPath ('../txt/ranking.txt');

    return ranking; 
}

function formatarRanking(lista){

    let item = [''];

    item = lista.split("\n");

    return item;
}

function lerRanking(){

    let ranking = carregarArquivoDeRanking();

    if(ranking != ''){
        let rankingFormatado = formatarRanking(ranking);
        let aux = document.getElementById("ranking").innerHTML;
    
        for(let i = 0; i < rankingFormatado.length; i++){
            document.getElementById("ranking").innerHTML = aux + rankingFormatado[i] + '<br>' + '<br>';
            aux = document.getElementById("ranking").innerHTML;
        }
    }
}
*/
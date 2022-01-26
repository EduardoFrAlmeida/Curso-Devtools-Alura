(function(){
	"use strict"

	$("#pegaInfo").click(function(){
		$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", function(res){
				console.log(res);
				res.instrucoes.forEach(function(instrucao){
						controladorDeCartoes.adicionaCartao(instrucao.conteudo, instrucao.cor)
				});
		});
	});
})()

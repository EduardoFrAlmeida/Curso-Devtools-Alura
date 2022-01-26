(function(){
	"use strict"

	var usuario = "deco@alura.com.br"

	$(document).on("carrega", function(){
		$.getJSON(
			"https://ceep.herokuapp.com/cartoes/carregar?callback=?",
			{usuario: localStorage.getItem("usuario")},
			function(res){
				res.cartoes.forEach(function(cartao){
					controladorDeCartoes.adicionaCartao(cartao.conteudo, cartao.cor);
				});

				$(document).trigger("precisaSincronizar");
			}
		);
	})

	$("#sync").click(function(){
		$(document).trigger("precisaSincronizar");
	});

	$(document).on("precisaSincronizar", function(){
		$("#sync").removeClass("botaoSync--sincronizado");
		$("#sync").addClass("botaoSync--esperando");
	});

	$(document).on("precisaSincronizar", function(){

		var cartoes = [];

		$(".cartao").each(function(){
			var cartao= {};
			cartao.conteudo = $(this).find(".cartao-conteudo").html();
			cartao.cor = $(this).css("background-color");
			cartoes.push(cartao);
		});

		var mural = {
			 usuario: localStorage.getItem("usuario")
			,cartoes: cartoes
		}

		$.ajax({
			 url: "https://ceep.herokuapp.com/cartoes/salvar"
			,method: "POST"
			,data: mural
			,success: function(res){
				$("#sync").addClass("botaoSync--sincronizado");
				console.log(res.quantidade + " salvos em " + res.usuario);

				var quantidadeRemovidos = controladorDeCartoes.idUltimoCartao() - res.quantidade
				console.log(quantidadeRemovidos + " cartoes removidos")
			}
			,error: function(res){
				$("#sync").addClass("botaoSync--deuRuim");
			}
			,complete: function(res){
				$("#sync").removeClass("botaoSync--esperando");
			}
		});
	});

	function pegaUsuario(){
		return localStorage.getItem("usuario");
	}

	function estaLogado(){
		if(pegaUsuario()) {
			return true;
		}
		return false;
	}

})();

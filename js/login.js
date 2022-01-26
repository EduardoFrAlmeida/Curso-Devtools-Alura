(function(){

	if(localStorage.getItem("usuario")){
		$(document).trigger("carrega");
		$("#logar").text("Deslogar");
	}

	$("#logar").click(toggleLogin);

	function loga(){
		var usuario = prompt("Digite seu email");
		localStorage.setItem("usuario", usuario);
		$(document).trigger("carrega");
	}

	function desloga(){
		localStorage.removeItem("usuario");
		$(".cartao").remove();
	}

	function toggleLogin(){
		var usuario = localStorage.getItem("usuario");

		if(usuario){
			desloga();
			$("#logar").text("Logar");
		}else {
			loga();
			$("#logar").text("Deslogar");
		}

	}


})();
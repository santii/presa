var modoSimulacao = false;
var timeVerificar;
var simulacao;
var iteracoesPresasCapturadas = [];

$(document).ready(function() {
	timeVerificar = setInterval(
     				function() {
     					verificarSimulacao()
     				}, 3000);
});


function iniciarSimulacao() {
	modoSimulacao = true;
	simulacao = new Simulacao();
	simulacao.configurar();
	simulacao.iniciar();
}
function verificarSimulacao() {
	if (modoSimulacao) {
		simulacao.verificarSeAcabou();
	}
}

function Simulacao() {
	this.numeroTestes = 100;
	this.testesRealizados = 0;
	this.resultado = [];

	this.verificarSeAcabou = function() {
	    if ((algoritmo.iteracoes >= algoritmo.numeroMaximoIteracoes) || algoritmo.simulacaoInterrompida) {

	    	if (algoritmo.getNumeroPresas() != 0) {
		    	var i;
		    	for (i = (parseInt($("#nroPresas").val()) - algoritmo.getNumeroPresas()); i < $("#nroPresas").val(); i++) {
		    		iteracoesPresasCapturadas.push("");		
		    	}
		    }
	    	var res = (this.resultado.length  + 202) + "," + (algoritmo.getNumeroPresas() == 0) + "," + $("#nroPredadores").val() + "," + $("#nroPresas").val() + "," +  ($("#motivacaoPresas").val() == "C") + "," + iteracoesPresasCapturadas.join() + ";";
	    	this.resultado.push(res);
	    	if (this.testesRealizados < this.numeroTestes) {
	    		console.info(JSON.stringify(simulacao.resultado));
	    		this.iniciar();
	    	} else {
	    		console.log(JSON.stringify(this.resultado));
	    		clearTimeout(timeVerificar);
	    		alert("SimulacaoFinalizada");
	    	}
	    }
	}

	this.configurar = function() {
		$("#nroLinhas").val(30);
		$("#nroColunas").val(30);
		$("#nroPredadores").val(10);
		$("#nroPresas").val(3);
		$("#motivacaoPresas").val("S");
	}

	this.iniciar = function() {
		iniciar();
		$("#velocidadeIteracoes").val(100);
		algoritmo.setVelocidade(16);
		this.testesRealizados++;
	}
}

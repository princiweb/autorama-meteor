var posicao = 0;

var pilotos = [];

Meteor.methods({
	incrementar: function(){
		console.log(posicao);
		return posicao+=10;
	},
	obterPosicao: function(){
		return posicao;
	},
	adicionarPilotos: function(id){
		var piloto = {
			id: id,
			posicao:0
		}
		pilotos.push(piloto);
		console.log(pilotos)
		
		Streamy.broadcast('Pilotos', { data: pilotos });
	},
	resetarPilotos: function(){
		pilotos = [];
	}
});

Streamy.on('posicao', function(d, s) {
	Streamy.broadcast('posicao', { data: d.data, id: d.id });
});
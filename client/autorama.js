
var posicao = 0;
var pilotos = [];

Template.pista.events({
	'click .run': function (event) {
		var left = parseInt($('#carro-' + Session.get('id')).css('left'));
		
		posicao = left + 50;
		
		$('#carro-' + Session.get('id')).css('left', posicao);
		
		Streamy.emit('posicao', { data: posicao, id: Session.get('id') });
	},
	'click .reset': function(event){
		Meteor.call("resetarPilotos");
	}
});


Streamy.on('posicao', function(d) {
	$('#carro-' + d.id).css('left', d.data);
});

Streamy.on('Pilotos', function(d) {
	pilotos = d.data;
	Session.set('pilotos', pilotos);
});

Template.pista.helpers({
	faixas: function(){
		return Session.get('pilotos');
	}
});

Template.pista.onRendered(function(){
	var id = getRandomInt(0,100000000);
	Session.set('id', id);
	Meteor.call("adicionarPilotos", id);

});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
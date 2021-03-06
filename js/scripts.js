function createColumn() {
	var $column = $('<div>').addClass('column');
  	var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
  	var $columnCardList = $('<ul>').addClass('column-list');
  	var $columnDelete = $('<button>').addClass('btn-delete').text('x');
  	var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');


  	$columnDelete.click(function() {
    	self.removeColumn();
  	});
  	$columnAddCard.click(function(event) {
		self.addCard(new Card('prompt'("Wpisz nazwę karty"))); 
  	});

	$column.append($columnTitle)
    	.append($columnDelete)
    	.append($columnAddCard)
    	.append($columnCardList);

	return $column;
  	Column.prototype = {
    	addCard: function(card) {
      		this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
      		this.$element.remove();
    	}
	};
}

function Card(description) {
	var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard(); //

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		$cardDelete.click(function(){
       		self.removeCard();
		});

		$card.append($cardDelete)
			.append($cardDescription);

	return $card;
		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		}
	}
}

var board = {
    name: 'Tablica Kanban',
    	addColumn: function(column) {
      		this.$element.append(column.$element);
      		initSortable();
    	},
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-card-list').sortable({
      	connectWith: '.column-card-list',
      	placeholder: 'card-placeholder'
      }).disableSelection();
	}

	$('.create-column')
  		.click(function(){
		var name = prompt('Wpisz nazwę kolumny');
		var column = new Column(name);
    	board.addColumn(column);
});  
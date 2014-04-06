if(illustrator.version > 14 && scriptographer.version > 2.9){
	script.coordinateSystem = 'bottom-up';
}

var components = {	
	change:{
		type: 'button',
		value: 'Replace',
		onClick: function(){
			var found = document.getItems({selected: true});
			if(found.length > 0 && document.activeSymbol != null){
				for(i = 0; i < found.length; i++){
					var mySymbol = new PlacedSymbol(document.activeSymbol);
					mySymbol.position = found[i].position;
					found[i].remove();
				}
			} else {
				Dialog.alert('Please select objects on the Artboard and a symbol from the Symbols panel to replace them with.');
			}
		}
	}
}

var palette = new Palette('Symbol Replace', components);
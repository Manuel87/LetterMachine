//easy String Replacement for Symbols
//2011-11-10 edited by Manuel von Gebhardi

var MySuggestion = "";
var allLetterSymbols=new Array();

  for(var i = 0; i < document.symbols.length; i++) {
        allLetterSymbols[document.symbols[i].name] = document.symbols[i];
        
        }
///Dialog
if(document.activeSymbol) {

var components = {
        deletefirst: { label: 'renamefirst to Letter', value: 1 }
       
			};
	var values = Dialog.prompt('Delete: ' + document.activeSymbol.name + ',...' , components);

} else { Dialog.alert("please select a Symbol");};



print("Lettered //////////////");

	if (values) {
    
    
    
    for(var i = 0; i < document.symbols.length; i++) {
       
    
      
         if(document.symbols[i].isSelected()){

        
        if(document.symbols[i].definition.children['Letter']) {
            print("already Letter grouped");
        } else {
        
            ///delete  
            for(var j = 0; j < values.deletefirst; j++) {  
            print(document.symbols[i].definition.children[j]);
            document.symbols[i].definition.children[j].name = 'Letter';
            }

        }
    }
    
    
    }

print("Lettered Finished//////////////");
}



//////////////////////////
function getScale(Item, variable, New) {
    var Old = Item.bounds[variable];
    scaleAmount = 1 / Old * New;
    return scaleAmount;
}

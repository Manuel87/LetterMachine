


var textItems = document.getItems({ 
	type: 'TextItem', 
	selected: true 
});


var symbol = document.symbols['A']; 
var allLetterSymbols=new Array();
var LetterNumbers=new Array();
var widthBefore = 0;
var mySpacing = 0; //before first letter
var newPosition = 0;

//textItems[0].position.x;

//var newPosition_y = textItems[0].position.y;



for(var i = 0; i < document.symbols.length; i++) {
//allFonts.push(document.symbols[i][f]);
//LetterNumbers.push(document.symbols[i].name);
allLetterSymbols[document.symbols[i].name] = document.symbols[i];
}

//print(allLetterSymbols["F"].name);
print("Position = " + textItems[0].position.x);

if (textItems.length > 0) { 
	
	/*var components = {
		doit: { label: 'really want to do?', value: true }
	};
	var values = Dialog.prompt('Mesh:', components);
	
	
	if (values) {*/
    
    var textItem = textItems[0]; 
      
	var characters = textItem.range.characters; 
    
   
	for(var i = 0; i < characters.length; i++) { 
		var character = characters[i]; 
        var content = textItem.content[i]
        if (placedSymbol){widthBefore = placedSymbol.bounds.width};
        var placedSymbol = new PlacedSymbol(allLetterSymbols[content], new Point(0, 0));

        placedSymbol.scale(1, -1);
        newPosition = newPosition + widthBefore/2 + placedSymbol.bounds.width/2 + mySpacing;
     
        placedSymbol.position = new Point(newPosition, placedSymbol.bounds.height/2);
        var mySpacing = textItem.characterStyle.tracking;
        }
  
print("YHER " + placedSymbol.name);
print(textItem.content[0]); 
print("CHAR" + textItem.characterStyle.tracking);


//textItem.characterStyle.font  = app.fonts["Arial"];
//var outline = textItem.createOutline();
//outline.fillColor = new CMYKColor(1, 0, 0, 0);
    

}









//print('Textzeichen: ' + placedSymbol.bounds.width);









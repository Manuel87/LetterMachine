


var textItems = document.getItems({ 
	type: 'TextItem', 
	selected: true 
});


var symbol = document['symbols']['A']; 
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
//print("Position = " + textItems[0].position.x);

if (textItems.length > 0) { 
	
	
		//doit: { label: 'transform_x', value: 1.0 };
   
    var components = {
        trans_symbols: { label: 'transform Symbols', value: false },
		transform_x: { label: 'transform x', value: 1.0 },
        transform_y: { label: 'transform y', value: 1.0 },
		shear_x: { label: 'shear x', value: 0.0 },
        shear_y: { label: 'shear y', value: 0.0 },
        shear_ausgleich: { label: 'shearAusgleich', value:0.0 }
	};
	var values = Dialog.prompt('Mesh:', components);
    
        	
	if (values) {
    print(values.transform_x);
    
    var textItem = textItems[0]; 
      
	var characters = textItem.range.characters; 
    
   
	for(var i = 0; i < characters.length; i++) { 
		 
        
        var character = characters[i]; 
        var content = textItem.content[i]
        
       
        
        if (placedSymbol){widthBefore = placedSymbol.bounds.width};
        var placedSymbol = new PlacedSymbol(allLetterSymbols[content], new Point(0, 0));

        placedSymbol.scale(1, -1);
        newPosition = newPosition + widthBefore/2 + placedSymbol.bounds.width/2 + mySpacing + values.shear_ausgleich;
     
        placedSymbol.position = new Point(newPosition, placedSymbol.bounds.height/2);
        var mySpacing = textItem.characterStyle.tracking;
        
        if(values.trans_symbols){
        allLetterSymbols[content].definition.scale(values.transform_x,values.transform_y);
        allLetterSymbols[content].definition.shear(values.shear_x,values.shear_y);
      
       } else { placedSymbol.scale(values.transform_x,values.transform_y);
        placedSymbol.shear(values.shear_x,values.shear_y);
}

       
                  }
  
//print("YHER " + placedSymbol.name);
//print(textItem.content[0]); 
//print("CHAR" + textItem.characterStyle.tracking);


//textItem.characterStyle.font  = app.fonts["Arial"];
//var outline = textItem.createOutline();
//outline.fillColor = new CMYKColor(1, 0, 0, 0);
    

}




}




//print('Textzeichen: ' + placedSymbol.bounds.width);









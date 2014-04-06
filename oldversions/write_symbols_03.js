


var textItems = document.getItems({ 
	type: 'TextItem', 
	selected: true 
});


var allLetterSymbols=new Array();
var LetterNumbers=new Array();
var widthBefore = 0;
var mySpacing = 0; //before first letter
var newPosition = 0;
var MySuggestion = "";
//textItems[0].position.x;

//var newPosition_y = textItems[0].position.y;



for(var i = 0; i < document.symbols.length; i++) {
allLetterSymbols[document.symbols[i].name] = document.symbols[i];
}

////////suggested Fontname
if (document.activeSymbol) {
MySuggestion = document.activeSymbol.name
} else {
MySuggestion = document.symbols[0].name
}
////getting the Fontname
var SplitName = MySuggestion.split(" ");
MySuggestion = SplitName[0];
SplitName = MySuggestion.split(""); 
//cut off
if(SplitName[SplitName.length-1] != "_"){
SplitName.pop(); }//deletes last element
if(SplitName[SplitName.length-1] != "_"){
SplitName.pop(); }//deletes last element, if there is no " ", like 'A1'
if(SplitName[SplitName.length-1] != "_"){
SplitName.pop(); }//deletes last element, if the number is larger than 9 >10,11,..
//fontname found?
MySuggestion = SplitName.join(""); //print: name_
//////////////////




if (textItems.length > 0) { 
	
	
		
   ///DIALOG
    var components = {
        fontname: { label: 'fontname', value: MySuggestion },
        newHeight: { label: 'new Height(pt)', value: 1200 },
        trans_symbols: { label: 'transform Symbols', value: false },
		transform_x: { label: 'transform x', value: 1.0 },
        transform_y: { label: 'transform y', value: 1.0 },
		shear_x: { label: 'shear x', value: 0.0 },
        shear_y: { label: 'shear y', value: 0.0 },
        shear_ausgleich: { label: 'shearAusgleich', value:0.0 },
        monospace: { label: 'Monspaced', value:false},
        monospaceWidth: { label: 'MetricWidth', value: 500 },
	};
	var values = Dialog.prompt('Mesh:', components);
    
        
            
    ///Do it            	
	if (values) {
    print(values.transform_x);
    
    var textItem = textItems[0]; 
    var characters = textItem.range.characters; 

    
	for(var i = 0; i < characters.length; i++) { 
		 
        
        //var character = characters[i]; 
        var content = textItem.content[i]
        
       
        
        if (placedSymbol){
        widthBefore = MetricWidth};
        
        var placedSymbol = new PlacedSymbol(allLetterSymbols[values.fontname + content], new Point(0, 0));
        
        //MirrorProblem
        placedSymbol.scale(1, -1);
        //newHeight
        placedSymbol.scale(getScale(placedSymbol, values.newHeight));
        
        
        ////if Monospaced
        if (values.monospace) {
            MetricWidth = values.monospaceWidth;
            widthBefore = values.monospaceWidth;
        } else {
            MetricWidth = placedSymbol.bounds.width;
        }
        
        
        newPosition = newPosition + widthBefore/2 + MetricWidth/2 + mySpacing + values.shear_ausgleich;
        placedSymbol.position = new Point(newPosition, placedSymbol.bounds.height/2);
        
        
        //get Spacing out of the TextItem
        var mySpacing = textItem.characterStyle.tracking;
        
        if(values.trans_symbols){
        allLetterSymbols[content].definition.scale(values.transform_x,values.transform_y);
        allLetterSymbols[content].definition.shear(values.shear_x,values.shear_y);
      
       } else { 
        placedSymbol.scale(values.transform_x,values.transform_y);
        placedSymbol.shear(values.shear_x,values.shear_y);
        }

       
                  }

    

}



} else {Dialog.alert("please select a Textitem")}



//////////////////////////
function getScale(Item, newHeight) {
    oldHeight = Item.bounds.height;
    scaleAmount = 1 / oldHeight * newHeight;
return scaleAmount;
}





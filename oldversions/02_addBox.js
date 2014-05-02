//easy String Replacement for Symbols
//2011-11-10 edited by Manuel von Gebhardi


var allLetterSymbols=new Array();

  for(var i = 0; i < document.symbols.length; i++) {
        allLetterSymbols[document.symbols[i].name] = document.symbols[i];
        
        }
///Dialog
if(document.activeSymbol) {



var components = {
        boxName: { label: 'boxName', value: getSuggestion(document.activeSymbol) + "box" },
        AddBox: { label:'add Box', value: false},
        setWidth: { label: 'set Width', value: true },
        addWidth: { label: 'add to Letter(pts)', value: 100 }
			};
	var values = Dialog.prompt('Rename Symbols: ' + document.activeSymbol.name + ',...' , components);

} else { Dialog.alert("please select a Symbol");};


print("setBox started //////////////");

	if (values) {
    
    
    
    for(var i = 0; i < document.symbols.length; i++) {
       
    
      
         if(document.symbols[i].isSelected()){

        
          print("this: " + document.symbols[i]);
        /////set Symbol
        //////////////////
         
          
          if(document.symbols[i].definition.children['box'])
         {  print("Box already added");
         
            } else {
        if( values.AddBox == true) {
         
         ///get Box - Symbol
        var placedSymbol = new PlacedSymbol(allLetterSymbols[values.boxName], new Point(0, 0));
        placedSymbol.name = "box";
        //MirrorProblem
        placedSymbol.scale(1, -1);
        
   
        if(document.symbols[i].definition.children['Letter']) {
            print("already Letter grouped");
        } else {
        
        /// create and place Group
        var Letter = new Group();
        Letter.name = "Letter";
        document.symbols[i].definition.appendTop(Letter);
        }
        
        /// put the items inot the Group
        var ItemsLength= document.symbols[i].definition.children.length;
        for(var k = 0; k < ItemsLength-1; k++) {   
            var symbolType = document.symbols[i].definition.children[1].toString().split(" ")[0];
            
        if(symbolType != 'Group')
            {
            var LetterItems = document.symbols[i].definition.children[1];
            document.symbols[i].definition.children['Letter'].appendTop(LetterItems);
           } 
        }
      
        
        
        
        ///place Box
        document.symbols[i].definition.appendTop(placedSymbol);
   
        
document.symbols[i].definition.children['box'].translate(document.symbols[i].definition.children['Letter'].position);

    //document.symbols[i].definition.placedSymbol.translate(new Point(0,0))
   
       // document.symbols[i].appendTop(placedSymbol);

        ///printing names
        }
        print("jjjjjjJ");
        
        }
                
              if(values.setWidth == true && document.symbols[i].definition.children['box']) {
        var newWidth = document.symbols[i].definition.children['Letter'].controlBounds.width + values.addWidth;
          //getScale(Item, variable, NewAmount);
          newScaleAmount = getScale(document.symbols[i].definition.children['box'], "width", newWidth)
         document.symbols[i].definition.children['box'].scale(newScaleAmount, 1);
        }    
                
            }

  
    }
    
    
    
}

print("setBox Finished//////////////");




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
function getSuggestion(MySymbol) {


//////// select a Symbol > and you will 
//////// get the Fontname!!!!!
//// (if you named as fontname + "_" + Character)
if (MySymbol) {
MySuggestion = MySymbol.name
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
return MySuggestion;
}




//////////////////////////
function getScale(Item, variable, New) {
    
    var Old = Item.bounds[variable];
    
    
    scaleAmount = 1 / Old * New;
return scaleAmount;
}

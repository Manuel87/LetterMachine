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
        boxName: { label: 'boxName', value: getSuggestion(document.activeSymbol) + "box" },
       // selectedFont: { label: 'search for', value: getSuggestion(document.activeSymbol) },
        setWidth: { label: 'Set Sidebearings', value: true },
        addWidth_left: { label: 'Left', value: 60 },
        addWidth_right: { label: 'Right', value: 60 }
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
          
            
          
          
          
          }else {
         
         
         ///get Box - Symbol
        var placedSymbol = new PlacedSymbol(allLetterSymbols[values.boxName], new Point(0, 0));
        placedSymbol.name = "box";
        //MirrorProblem
        placedSymbol.scale(1, -1);
        
   
        if(document.symbols[i].definition.children['Letter']) {
            print("already Letter grouped");
        } else {
        // get all items
        var myFirstChild = document.symbols[i].definition.firstChild;
        
        /// create and place Group
        var Letter = new Group();
        Letter.name = "Letter";
        document.symbols[i].definition.appendTop(Letter);
        document.symbols[i].definition.children['Letter'].appendTop(myFirstChild);
        
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
        document.symbols[i].definition.appendBottom(placedSymbol);
   
        
document.symbols[i].definition.children['box'].translate(document.symbols[i].definition.children['Letter'].position);

    //document.symbols[i].definition.placedSymbol.translate(new Point(0,0))
   
       // document.symbols[i].appendTop(placedSymbol);

        ///printing names
        }
        mybox = document.symbols[i].definition.children['box'];
        myLetter = document.symbols[i].definition.children['Letter']        
                
                
                
              if(values.setWidth == true && mybox) {
              	new_addWidth_left = mybox.controlBounds.height / 1000 * values.addWidth_left;
              	new_addWidth_right = mybox.controlBounds.height / 1000 * values.addWidth_right;
              	//print("jj");
              	//print(mybox.controlBounds.height);
              	//print(values.addWidth_left);
              	print(new_addWidth_left);
              	
             	//new_addWidth_left = mybox.height / 1000 * values.addWidth_right;
              	
              	
        var noWidth = document.symbols[i].definition.children['Letter'].controlBounds.width;    	
        var newWidth = noWidth + new_addWidth_left + new_addWidth_right;
          //getScale(Item, variable, NewAmount);
          
          
          // clear right Sidebearings (0)
          resetnewScaleAmount = getScale(mybox, "width", noWidth)
          mybox.scale(resetnewScaleAmount, 1, myLetter.strokeBounds.leftCenter);
          
          
          // clear left Sidebearing
          mybox.position = myLetter.position;
          
          // set right Sidebearing
          newScaleAmount = getScale(mybox, "width", newWidth)
          mybox.scale(newScaleAmount, 1, myLetter.strokeBounds.leftCenter);
         
         
         
          //set left Sidebearing
          mybox.position -= new Point(new_addWidth_left, 0);
          
          
         //mybox.position = document.symbols[i].definition.children['Letter'].position - new Point(values.addWidth_left, 0);
        }    
                
            }

  
    }
    
    
}

print("setBox Finished//////////////");




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

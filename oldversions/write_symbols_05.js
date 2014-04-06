
//writeFile();
var data = readFile();
print("datee = " + data[0]);

var textItems = document.getItems({ 
	type: 'AreaText', //TextItem
	selected: true 
});


var allLetterSymbols=new Array();
var LetterNumbers=new Array();
var widthBefore = 0;
var mySpacing = 0; //before first letter
var myLeading = 1; //before first letter
var newPosition = 0;
var MySuggestion = "";
var GroupCount = data[0];
var zeilenumbruch = 1;
var zeilenumbruch_before = 1;
var umbruch = false;
GroupCount++;
var LineGroupCount = 0;




for(var i = 0; i < document.symbols.length; i++) {
allLetterSymbols[document.symbols[i].name] = document.symbols[i];
allLetterSymbols[document.symbols[i].name].alt = 0; //alternatives
}



		//////// select a Symbol > and you will 
		//////// get the Fontname!!!!!
		//// (if you named as fontname + "_" + Character)
		if (document.activeSymbol) {
			MySuggestion = document.activeSymbol.name
		} else {
			if(document.symbols[0]){
			MySuggestion = document.symbols[0].name
			}
			else {Dialog.alert("Please Add a Symbol and name it as the Character you need, for example: 'A' or ' ') (Window > Symbols)")}
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
        newHeight: { label: 'new Height(pt)', value: data[1] },
        alternativesRun: { label: 'run through alternatives', value: data[2] },
        AltRandom: { label: 'by random', value: data[3] },
        monospace: { label: 'Monspaced', value: data[4]},
        monospaceWidth: { label: 'MetricWidth', value: data[5] },
        trans_symbols: { label: 'transform Symbols', value: data[6] },
		transform_x: { label: 'transform x', value: data[7] },
        transform_y: { label: 'transform y', value: data[8] },
		shear_x: { label: 'shear x', value: data[9] },
        shear_y: { label: 'shear y', value: data[10] },
        shear_ausgleich: { label: 'shearAusgleich', value:data[11] },
        showMissingLetters: { label: 'showMissingLetters', value: data[12]},
        deleteLast: { label: 'delete last', value: data[13]},
        resetValues: { label: 'resetValues', value: data[14]}
        
        /*{ type: 'button', value: 'delete Before',
 		onClick: function() { deleteBefore(); }}*/
	};
	var values = Dialog.prompt('Write with Symbols:', components);
    
        
            
    ///Do it            	
	if (values) {
      var Symbolgroup = new Group();
Symbolgroup.name = "symbolfont_" + GroupCount;

var Linegroup = new Group();
Linegroup.name = "symbolfont_" + LineGroupCount;
   
   if (values.resetValues) {
    var data = [GroupCount=0,
    values.newHeight = 1200, 
    values.alternativesRun = true, 
    values.AltRandom = false, 
    values.monospace = false, 
    values.monospaceWidth = 500, 
    values.trans_symbols = false, 
    values.transform_x = 1.0, 
    values.transform_y = 1.0, 
    values.shear_x = 0.0, 
    values.shear_y = 0.0, 
    values.shear_ausgleich = 0.0, 
    values.showMissingLetters = false,
    values.deleteLast = false,
    values.resetValues = false];
    }
    
    writeFile();
    
    ///Delete Lastone
    if(values.deleteLast) {
    deleteBefore();
    }
    
    
    
    var textItem = textItems[0]; 
    var characters = textItem.range.characters; 

    
	for(var i = 0; i < characters.length; i++) { 
		 
        
        //var character = characters[i]; 
        var content = textItem.content[i]
        
        //getting the Symbol of the Character
		mainCharacter =  allLetterSymbols[values.fontname + content];
       	
       	
       	
     	if (mainCharacter){
       
        ///.... first letter not affecting in xPosition
	        if (placedSymbol){
	        	widthBefore = MetricWidth};
	        
	        
		        ////CharacterAlternatives
		        ///saving an Counter into the main Character
		        
		        
		        ////CharacterAlternatives – Random
		    	 	if(values.AltRandom && mainCharacter.altLength >0) {
		             	mainCharacter.alt = randomFromTo(0,mainCharacter.altLength);
	         
	           		 }
	        	
	        	////CharacterAlternatives – 1,2,3,4,...	
		        if(values.alternativesRun && allLetterSymbols[values.fontname + content + " " + mainCharacter.alt])
		            {
		           placingCharacter = values.fontname + content + " " + mainCharacter.alt;
		            mainCharacter.altLength = mainCharacter.alt;
		            } else {
		            placingCharacter = values.fontname + content;
		            mainCharacter.altLength = mainCharacter.alt-1
		            mainCharacter.alt = 0; //reset 
		            }
		           
		            mainCharacter.alt++;
		           
	       
        
        
	        	/////set Symbol
	       		 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	       		 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	       		 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	       		 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	       		 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	       		 
			   
		        var placedSymbol = new PlacedSymbol(allLetterSymbols[placingCharacter], new Point(0, 0));
		        
		        //COlor
		        placedSymbol.fillColor = new RGBColor(1, 0, 1);
		        
		        
		        
		        //MirrorProblem
		        placedSymbol.scale(1, -1);
		        
		      //Baselineshift // vertical Spacing / per line
		         	var myBaselineShift = -characters[i].characterStyle.baselineShift;
		       
		        
		    } ///END – mainCharacter  / ist there a Symbol?
		else {
				print(quote(content));
				//Zeilenumbruch or weicher Zeilenumbruch
				
				
				if(content == "\r" || content == "\u0003")
				{	print("Zeilenumbruch");
					umbruch = true;
					
				//Leading // vertical Spacing / per line 
		         var myLeading = 1 / characters[i+1].characterStyle.fontSize * characters[i+1].characterStyle.leading;
		       	
		       	
				
				} else if(values.showMissingLetters){
				
					//Symbol is missing >>> Replaced by MARKER
					print("missingSymbol: " + content  + " = " + quote(content));
					
					
					
				
					var placedSymbol = new MarkerObject(content);
					
					mySpacing = values.newHeight / 1000 * 20;
				

					
					//var placedSymbol = new PointText(new Point(newPosition, placedSymbol.bounds.height/2));
					
					
		       	 }
		     }
		        
		        //newHeight
		        if(values.newHeight > 0){
		       	 	placedSymbol.scale(getScale(placedSymbol, values.newHeight));
		        }
		        
		        
		       
		        
		        ////if Monospaced
		        if (values.monospace) {
		            MetricWidth = values.monospaceWidth;
		            widthBefore = values.monospaceWidth;
		        } else {
		            MetricWidth = placedSymbol.bounds.width;
		        }
        
        			
        			if(umbruch)
        			{	
        				
        				zeilenumbruch_before = zeilenumbruch;
						zeilenumbruch+= myLeading ;
						newPosition = -MetricWidth/2;
						
						
						
						
						
						Symbolgroup.appendTop(Linegroup);
						
						var Linegroup = new Group();
						Linegroup.name = "symbolfont_" + LineGroupCount;
						LineGroupCount++;
						umbruch = false
					
				} else {
					
		        		newPosition = newPosition + widthBefore/2 + MetricWidth/2 + mySpacing + values.shear_ausgleich;
		        		placedSymbol.position = new Point(newPosition, placedSymbol.bounds.height/2 + (values.newHeight * myLeading * zeilenumbruch)+ myBaselineShift);
		        
				
		        
		        
		        //get Spacing out of the TextItem / except first letter
		        var mySpacing = values.newHeight / 1000 * textItem.characterStyle.tracking;
		       
		        
		        ///Transforming the Symbol itself..
		        if(values.trans_symbols){
		            allLetterSymbols[content].definition.scale(values.transform_x,values.transform_y);
		            allLetterSymbols[content].definition.shear(values.shear_x,values.shear_y);
		        } else { ///just the instances
		            placedSymbol.scale(values.transform_x,values.transform_y);
		            placedSymbol.shear(values.shear_x,values.shear_y);
		        }

				Linegroup.appendTop(placedSymbol);
				
				if(i == characters.length-1) {
					Symbolgroup.appendTop(Linegroup);
					
					
					
	
//						var TestItems = document.getItems({ 
//		
//						});
//						print(TestItems.length + "come")
//						for(var i = 0; i < TestItems.length; i++) { 
//							TestItems[i].fillColor = new RGBColor(1, 0, 1);
//						
//						}
					}
       }
    		
    	} ///END – For-schleife

}



} else {Dialog.alert("please select a Textitem")}






//////////////////////////
function getScale(Item, newHeight) {
    oldHeight = Item.bounds.height;
    scaleAmount = 1 / oldHeight * newHeight;
return scaleAmount;
}


///////////////////////
function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
    }


//////////////  DELETE //
function deleteBefore(){
var deleteItems = document.getItems({ 
	selected: false
});
for(var i = 0; i < deleteItems.length; i++) { 
//deleteItems[i].remove();
//print(deleteItems[i]);
}
if (deleteItems['symbolfont_' + (GroupCount-1)]) {
print("DELE" + deleteItems);
deleteItems['symbolfont_' + (GroupCount-1)].remove();
print("items removed.");
}
}


///f
function writeFile() { 
//var data = GroupCount;
//var data = [GroupCount, testarray, 1, 2, 3, 'four', { five: 6 }];

 var data = [GroupCount, values.newHeight, values.alternativesRun, values.AltRandom, values.monospace, values.monospaceWidth, values.trans_symbols, values.transform_x, values.transform_y, values.shear_x, values.shear_y, values.shear_ausgleich, values.showMissingLetters, values.deleteLast, values.resetValues];
  

var file = new File(script.file.parent, 'file.json');
print(file);
// If file exists, we need to remove it first in order to overwrite its content.
if (file.exists())
    file.remove();
file.open();
file.write(Json.encode(data));
file.close();

}


function readFile() {
print("reading File");
var file = new File(script.file.parent, 'file.json');
file.open();
var data = Json.decode(file.readAll());
file.close();
print(data);
print("reading finished");
return data;
}

function drawSymbol() {
	print("YEAH" + values.newHeight)
	}
	
	
	
	
 

    function quote(string) {
 var escapable = /[\\\"\x00-\x1f\x7f-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) :
            string;
    }
    
function MarkerObject(content) {
 					 
 					MissingLetter = new PointText(new Point(0,values.newHeight*0.8));
	
					MissingLetter.content = content;
					MissingLetter.characterStyle.fontSize = values.newHeight;
					MissingLetter.characterStyle.fillColor = new RGBColor(1, 1, 1);
					
					MissingLetter.characterStyle.font = characters[0].characterStyle.font;
					
					
					rect = new Path.Rectangle([0, 0, values.newHeight*0.09*MissingLetter.bounds.width, values.newHeight])
					rect.fillColor = new RGBColor(1, 0, 0);
		
					var myobject = new Group();
					myobject.appendTop(rect);
					myobject.appendTop(MissingLetter);
					
					return myobject;
					}


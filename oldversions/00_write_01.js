








//Change default VALUES
///////////////////////////////////
//var data = [GroupCount=0,
//newHeight = 0, 
//
//alternativesRun = true, 
//AltRandom = false, 
//monospace = false, 
//monospaceWidth = 12, 
//
//trans_symbols = false, 
//transform_x = 1.0, 
//transform_y = 1.0, 
//shear_x = 0.0, 
//shear_y = 0.0, 
//shear_ausgleich = 0.0, 
//
//showMissingLetters = false,
//deleteLast = true,
//resetValues = false];
//   
//writeFile('default', data);
				  





function init() {
	
		
		//readFile('last');
		var data = readFile('last'); //array data[0]
		GroupCount = data[0];
		
		
		
		
		//////// select a Symbol > and you will 
		//////// get the Fontname!!!!!
		//// (if you named as fontname + "_" + Character)
		if (document.activeSymbol) {
			MySuggestion = document.activeSymbol.name
		} else {
			if(document.symbols[0]){
			MySuggestion = document.symbols[0].name
			}
			else {Dialog.alert("please Add a Symbol and name it as the Character you need, for example: 'A' or just' ' (Windows > Symbols)")}
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




		
		//print("hallo" + rootPoint.x);
		//var rootposition_x = textItems[0].bounds.x - textItems[0].bounds.width;
		//var rootposition_y = textItems[0].bounds.y;




	
	
	// Define the values object:
var values = {
	fontname: MySuggestion,
	
//	newHeight: data[1],
	
	
	alternativesRun: data[2],
	AltRandom: data[3],
	monospace: data[4],
	monospaceWidth: data[5],
	trans_symbols: data[6],
	transform_x: data[7],
	transform_y: data[8],
	shear_x: data[9],
	shear_y: data[10],
	shear_ausgleich: data[11],
	showMissingLetters: data[12],
	deleteLast: data[13],
	resetValues: data[14]
	
};


//values.rootPoint = new Point(textItems[0].bounds.x - textItems[0].bounds.width, textItems[0].bounds.y); 		
 
// Define the palette components to edit each value:
    var components = {
       	swatchAll: {
		type: 'menu-entry',
		value: 'show options',
		onSelect: function() {
			if (components.trans_symbols.visible) {
			components.trans_symbols.visible = false;
			components.trans_symbols.label = "h ";
			
			} else {
				
			components.trans_symbols.visible = true;
			components.trans_symbols.label = "transform Symbols";}
			}
		},
       
//        fontname: { 
//        	label: 'fontname', value: MySuggestion },
        fontname: {
        		type:'list', label: 'Type',
        		options: ['future_', 'fleischfont_', 'black01_','select word'] 	
        },
        newHeight: { 
        	label: 'Size(pt)', value: data[1] },
        alternativesRun: { label: 'alternatives', value: data[2] },
        AltRandom: { label: '- by random', value: data[3] },
        monospace: { label: 'monspaced', value: data[4]},
        monospaceWidth: { label: '- width ', value: data[5] },
       
       ///// -––- - - -- - - - - extra options  - - -- - 
      ///// - - - -- - - - -- -- -- - - -- - - - - - - - 
//        trans_symbols: { label: 'transform Symbols', value: data[6] },
//		transform_x: { label: 'transform x', value: data[7] },
//        transform_y: { label: 'transform y', value: data[8] },
//	shear_x: { label: 'slanted x [-1 - 1]', value: data[9], 
//		type: 'slider', range: [-1.0, 1.0], steppers: true },
//	 shear_y: { label: 'slanted y [-1 - 1]', value: data[10], 
//		type: 'slider', range: [-1.0, 1.0], steppers: true },
//	 shear_ausgleich: { label: 'shearAusgleich', value:data[11] },
        
        
        showMissingLetters: { label: 'show missing Letters', value: data[12]},
        deleteLast: { label: 'delete last', value: data[13]},
        
        
//        resetValues: { label: 'resetValues', value: data[14]},
       
//        font: {
//		type: 'font', label: 'Font', value: 'Helvetica Regular'
//				},
				
		clear: {
			type: 'button', value: 'reset',
			onClick: function(){
				
				print("RESET");	
				
				data = 	readFile('default');
				
				values.alternativesRun = data[2];
				values.AltRandom = data[3];
				values.monospace = data[4];
				values.monospaceWidth = data[5];
				values.trans_symbols = data[6];
				values.transform_x = data[7];
				values.transform_y = data[8];
				values.shear_x = data[9];
				values.shear_y = data[10];
				values.shear_ausgleich = data[11];
				values.showMissingLetters = data[12];
				values.deleteLast = data[13];
				values.resetValues = data[14];
				
			}
		},
		
		update: {
		type: 'button', value: 'Update' },
      	
      	create: {
		type: 'button', value: 'Create',
		onClick: function(){
			textItems = document.getItems({ 
			type: 'TextItem', //TextItem // AreaText
			selected: true 
	
			});

			//document?
			if(document) {
			
				//textItem?
				if (textItems.length > 0) { 
					values.newHeight = textItems[0].range.characters[0].characterStyle.fontSize;
					values.rootPoint = new Point(textItems[0].bounds.x - textItems[0].bounds.width - 100, textItems[0].bounds.y);
					
				
				 		///Delete Lastone
					    if(values.deleteLast) {
					    deleteBefore(GroupCount);
					    print("DELLELELEL");
					    }
					    
					   GroupCount++;
					    
					    var data = [GroupCount, values.newHeight, values.alternativesRun, values.AltRandom, values.monospace, values.monospaceWidth, values.trans_symbols, values.transform_x, values.transform_y, values.shear_x, values.shear_y, values.shear_ausgleich, values.showMissingLetters, values.deleteLast, values.resetValues];
					    
					    
					    print("writedata");
					    print(values.monospaceWidth);
					    writeFile('last', data);
	    
						print("values = " + values);
						writeSymbols(values, GroupCount);
						
				} else {Dialog.alert("please select a Textarea")}
						
			} else {Dialog.alert("please open a Document")}
		} 
		
		   
	} // END - Components
		

 };  

       
//        fontname: { label: 'fontname' },
//        newHeight: { label: 'new Height(pt)', value },
//        alternativesRun: { label: 'run through alternatives', value },
//        AltRandom: { label: 'by random', value },
//        monospace: { label: 'Monspaced', value: data[4]},
//        monospaceWidth: { label: 'MetricWidth', value: data[5] },
//        trans_symbols: { label: 'transform Symbols', value: data[6] },
//		transform_x: { label: 'transform x', value: data[7] },
//        transform_y: { label: 'transform y', value: data[8] },
//		shear_x: { label: 'shear x', value: data[9] },
//        shear_y: { label: 'shear y'},
//        shear_ausgleich: { label: 'shearAusgleich'},
//        showMissingLetters: { label: 'showMissingLetters'},
//        deleteLast: { label: 'delete last'},
//        resetValues: { label: 'resetValues'},
//        font: {
//		type: 'font', label: 'Font'
//	},
        
        /*{ type: 'button', value: 'delete Before',
 		onClick: function() { deleteBefore(); }}*/
	
	//var values = Dialog.prompt('Write with Symbols:', components);
    // Now we create the palette window:
    
  
var paletteFontMachine = new Palette('FontMachine - pixel', components, values);   
           
           
           
      
           
        
        
        
        
       
        
        
        
        
} //-END - init        
        
     
        
         
         
 //init menu        
init();      
         
         
         
         
         
         
           
            
    ///Do it 
   
 function writeSymbols(values, GroupCount){ 
 	
 	
 	
 	
 	
 	
print("jj")



//var data = readFile('last'); 	


//  var data = [GroupCount, values.newHeight, values.alternativesRun, values.AltRandom, values.monospace, values.monospaceWidth, values.trans_symbols, values.transform_x, values.transform_y, values.shear_x, values.shear_y, values.shear_ausgleich, values.showMissingLetters, values.deleteLast, values.resetValues];
//     

 	print("write..rootpoint" + values.rootPoint.x);

	
print("grpupcount" + GroupCount)
 	   
var allLetterSymbols=new Array();
var LetterNumbers=new Array();
var widthBefore = 0;
var mySpacing = 0; //before first letter
var myLeading = 1; //before first letter
var newPosition = values.rootPoint.x;
var MySuggestion = "";
var zeilenumbruch = 0;
var zeilenumbruch_before = 1;
var umbruch = false;
var LineGroupCount = 0;



for(var i = 0; i < document.symbols.length; i++) {
allLetterSymbols[document.symbols[i].name] = document.symbols[i];
allLetterSymbols[document.symbols[i].name].alt = 0; //alternatives
}  	
               	
               	
               	
	if (values) {
      var Symbolgroup = new Group();
Symbolgroup.name = "symbolfont_" + GroupCount;

var Linegroup = new Group();
Linegroup.name = "symbolfont_" + LineGroupCount;
   
 
    
    
    var textItem = textItems[0]; 
    var characters = textItem.range.characters; 

    
		// is there a font or symbol for the first letter ???!!! 
   if(allLetterSymbols[values.fontname + textItem.content[0]]) {
         	
         	
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
			
				 //Strinumwandlung
				//print(quote(content));
				
				
				//Zeilenumbruch or weicher Zeilenumbruch
				
				
				if(content == "\r" || content == "\u0003")
				{	print("Zeilenumbruch");
					umbruch = true;
					
				//Leading // vertical Spacing / per line /depending on firt letter, of the line
		         var myLeading = 1 / characters[i+1].characterStyle.fontSize * characters[i+1].characterStyle.leading;
		       	print("leading = " + myLeading);
				
				
				} else if(values.showMissingLetters){
				
					//Symbol is missing >>> Replaced by MARKER
					//print("missingSymbol: " + content  + " = " + quote(content));
					
					var placedSymbol = new MarkerObject(content, values.newHeight, characters[0].characterStyle.font);
					mySpacing = values.newHeight / 1000 * 20;
					
					
		       	 }
		       	 else {print("fontmissing? / …??")}
		     }
		        
		        //newHeight
		        if(values.newHeight > 0){
		       	 	placedSymbol.scale(getScale(placedSymbol, values.newHeight));
		        }
		        
		         
		        ////if Monospaced
		        if (values.monospace) {
		            MetricWidth = values.monospaceWidth;
		           //widthBefore = values.monospaceWidth;
		        } else {
		            MetricWidth = placedSymbol.bounds.width;
		        }
		        
		        
        
        			
        			if(umbruch)
        			{	
        				
        				zeilenumbruch_before = zeilenumbruch;
						zeilenumbruch+= myLeading ;
						newPosition = values.rootPoint.x -MetricWidth/2;
						
						
						
						
						
						Symbolgroup.appendTop(Linegroup);
						
						var Linegroup = new Group();
						Linegroup.name = "symbolfont_" + LineGroupCount;
						LineGroupCount++;
						umbruch = false
					
				} else {
					
		        		newPosition = newPosition + widthBefore/2 + MetricWidth/2 + mySpacing + values.shear_ausgleich;
		        		placedSymbol.position = new Point(newPosition, values.rootPoint.y + placedSymbol.bounds.height/2 + (values.newHeight * myLeading * zeilenumbruch)+ myBaselineShift);
		        //placedSymbol.position = new Point(newPosition, values.rootPoint.y + placedSymbol.bounds.height/2 + (values.newHeight * myLeading * zeilenumbruch)+ myBaselineShift);
				
		        
		        
		        //get Spacing out of the TextItem / except first letter
		        var mySpacing = values.newHeight / 1000 * textItem.characterStyle.tracking;
		       
		        
		        ///Transforming the Symbol itself..
		        if(values.trans_symbols){
		            allLetterSymbols[content].definition.scale(values.transform_x,values.transform_y);
		            allLetterSymbols[content].definition.shear(-values.shear_x,-values.shear_y);
		        } else { ///just the instances
		            placedSymbol.scale(values.transform_x,values.transform_y);
		            placedSymbol.shear(-values.shear_x,-values.shear_y);
		        }

				Linegroup.appendTop(placedSymbol);
				
				if(i == characters.length-1) {
					Symbolgroup.appendTop(Linegroup);
					
//					return Symbolgroup;
					
	
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
    	
    	
		} 	else {print("font/symbol is missing")}
	}
	
} //END – writeSymbols










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
function deleteBefore(GroupCount){
print("deleting");
var deleteItems = document.getItems({ 
	selected: false
});
for(var i = 0; i < deleteItems.length; i++) { 
//deleteItems[i].remove();
//print(deleteItems[i]);
}
if (deleteItems['symbolfont_' + (GroupCount)]) {
print("DELE" + deleteItems);
deleteItems['symbolfont_' + (GroupCount)].remove();
print("items removed.");
}
}


///f
function writeFile(file, data) { 
//var data = GroupCount;
//var data = [GroupCount, testarray, 1, 2, 3, 'four', { five: 6 }];


  

var file = new File(script.file.parent, file + '.json');
print(file);
// If file exists, we need to remove it first in order to overwrite its content.
if (file.exists())
    file.remove();
file.open();
file.write(Json.encode(data));
file.close();

}


function readFile(file) {
print("reading File");
var file = new File(script.file.parent, file+'.json');
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
    
function MarkerObject(content, newHeight, markerFont) {
 					 
 					MissingLetter = new PointText(new Point(0,newHeight*0.8));
	
					MissingLetter.content = content;
					MissingLetter.characterStyle.fontSize = newHeight;
					MissingLetter.characterStyle.fillColor = new RGBColor(1, 1, 1);
					
					MissingLetter.characterStyle.font = markerFont;
					
					
					rect = new Path.Rectangle([0, 0, newHeight*0.09*MissingLetter.bounds.width, newHeight]);
					rect.fillColor = new RGBColor(1, 0, 0);
		
					var myobject = new Group();
					myobject.appendTop(rect);
					myobject.appendTop(MissingLetter);
					
					return myobject;
					}




// var data = [GroupCount=0,
//				    values.newHeight = 1200, 
//				    values.alternativesRun = true, 
//				    values.AltRandom = false, 
//				    values.monospace = false, 
//				    values.monospaceWidth = 500, 
//				    values.trans_symbols = false, 
//				    values.transform_x = 1.0, 
//				    values.transform_y = 1.0, 
//				    values.shear_x = 0.0, 
//				    values.shear_y = 0.0, 
//				    values.shear_ausgleich = 0.0, 
//				    values.showMissingLetters = false,
//				    values.deleteLast = false,
//				    values.resetValues = false];

			
//		function onKeyDown(event) {
//    // The character of the key that was pressed
//  
//   if(Key.isDown('ds')) {
//    
//		
//			  if (values.resetValues) {
//				    var data = [GroupCount=0,
//				    values.newHeight = 1200, 
//				    values.alternativesRun = true, 
//				    values.AltRandom = false, 
//				    values.monospace = false, 
//				    values.monospaceWidth = 500, 
//				    values.trans_symbols = false, 
//				    values.transform_x = 1.0, 
//				    values.transform_y = 1.0, 
//				    values.shear_x = 0.0, 
//				    values.shear_y = 0.0, 
//				    values.shear_ausgleich = 0.0, 
//				    values.showMissingLetters = false,
//				    values.deleteLast = false,
//				    values.resetValues = false];
//				    }
//				    
//				
//				    ///Delete Lastone
//				    if(values.deleteLast) {
//				    deleteBefore(GroupCount);
//				    print("DELLELELEL");
//				    }
//				    
//				   GroupCount++;
//				    
//				    var data = [GroupCount, values.newHeight, values.alternativesRun, values.AltRandom, values.monospace, values.monospaceWidth, values.trans_symbols, values.transform_x, values.transform_y, values.shear_x, values.shear_y, values.shear_ausgleich, values.showMissingLetters, values.deleteLast, values.resetValues];
//				    writeFile(data);
//    
//			print("values = " + values);
//			writeSymbols(values, GroupCount);
//			}
//			
//			}

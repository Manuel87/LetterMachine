 var componentsStart = {
 	/* create: {
		type: 'button', value: 'create letter'}, */
load: {
		type: 'button', value: 'load letters',
		onClick: function(){
//			Dialog.chooseDirectory("choose")
			var file = Dialog.fileOpen("choose File");
			
			var SymbolDoc = new Document(file);
			print(document.size);
			print(SymbolDoc.symbols[2].name);
			print(documents[documents.length-2]);
			documents[1].activate();
			print("test");
			print(SymbolDoc.symbols[2].name);
			
			for(var i = 0; i < SymbolDoc.symbols.length; i++) {
				newSymbol = new Symbol(SymbolDoc.symbols[i].definition);
				newSymbol.name = SymbolDoc.symbols[i].name;
			}
			SymbolDoc.close();
			
		//	documents[0].activate()
//			file.open();
			}
		},

start: {
		type: 'button', value: 'start LetterMachine',
		onClick: function(){
			include('00_write.js');
			
			}
		}
	 }
 
//var values = Dialog.prompt('LetterMachine:', components);

var paletteStart = new Palette('Start - LetterMachine', componentsStart);

 var componentsStart = {
load: {
		type: 'button', value: 'load letters',
		onClick: function(){
//			Dialog.chooseDirectory("choose")
			var file = Dialog.fileOpen("choose File");
						file.open();
var data = Ai.decode(file.readAll());
			//var testDoc = new PlacedFile(file);//new Document(file);

//			file.open();
			}
		},
create: {
		type: 'button', value: 'create letter'},
start: {
		type: 'button', value: 'start LetterMachine',
		onClick: function(){
			include('00_write.js');
			
			}
		}
	 }
 
//var values = Dialog.prompt('LetterMachine:', components);

var paletteStart = new Palette('geting started with FontMachine', componentsStart);

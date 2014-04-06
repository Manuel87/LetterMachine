
//print(document.symbols[0].name);

var allLetterSymbols=new Array();
var LetterNumbers=new Array();
var splitname=new Array();


 var components = {
        newname: { label: 'new Name', value: "" },
		splitString: { label: 'split String', value: "_" }
	};
	var values = Dialog.prompt('Rename selected Symbols', components);

	if (values) {
for(var i = 0; i < document.symbols.length; i++) {
if(document.symbols[i].isSelected()){

    splitname[i] = document.symbols[i].name.split(values.splitString);
    splitname[i][0] = values.newname;

    document.symbols[i].name = splitname[i].join(values.splitString)  ;
    print(document.symbols[i].name);
}

}
}
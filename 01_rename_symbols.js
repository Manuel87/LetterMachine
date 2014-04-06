//easy String Replacement for Symbols
//2011-11-10 edited by Manuel von Gebhardi


var currentName = "";
var newName = "";

///Dialog
if(document.activeSymbol) {
var components = {
        SearchString: { label: 'search for', value: "" },
		ReplaceString: { label: 'replaced by', value: "" },
        
        BeforeString: { label: 'add before', value: "" },
        AfterString: { label: 'add after', value: "" }
	};
	var values = Dialog.prompt('Rename Symbols: ' + document.activeSymbol.name + ',...' , components);

} else { Dialog.alert("please select a Symbol");};


print("Renaming started //////////////");

	if (values) {
    for(var i = 0; i < document.symbols.length; i++) {
        if(document.symbols[i].isSelected()){

        currentName = document.symbols[i].name
        newName = ReplaceString(currentName, values.SearchString, values.ReplaceString);
  
        document.symbols[i].name = values.BeforeString + newName + values.AfterString;
    
        ///printing names
        print(document.symbols[i].name);
        }

    }
}

print("Renaming Finished//////////////");




///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// function original created by Ralf Pfeifer - 2007-10-27

function ReplaceString(SourceString, SearchString, ReplaceString)
        {   
            // Error Check
            if ((SourceString == null) || (SearchString == null))           { return null; }
            if ((SourceString.length == 0) || (SearchString.length == 0))   { return SourceString; }

            // No ReplaceString?
            if ((ReplaceString == null) || (ReplaceString.length == 0))    { ReplaceString = ""; }

            var SearchStringLength = SearchString.length;
            var ReplaceStringLength = ReplaceString.length;
            var Pos = SourceString.indexOf(SearchString, 0);

            while (Pos >= 0)
            {
                SourceString = SourceString.substring(0, Pos) + ReplaceString + SourceString.substring(Pos + SearchStringLength);
                Pos = SourceString.indexOf(SearchString, Pos + ReplaceStringLength);
            }
            return SourceString;
        }
        


function disableAndUncheckHasDefaultIfDisplayed(){
  let hasDefaultField = document.querySelector("#hasDefaultValField");
  if(hasDefaultField!=undefined){
    hasDefaultField.checked = false;
    hasDefaultField.value = false;
    hasDefaultField.disabled = true ;
  }
}

function disableAndRemoveValueOfDefaultValueField(){
  let defaultValField = document.querySelector("#defaultValue");
  if(defaultValField!=undefined){
    defaultValField.disabled = true;
    defaultValField.value ="";
    // il faut penser a désactiver l'icone calendrier et le button clear
  }
}

function enableAndResetHasDefaultField(){
    let hasDefaultField = document.querySelector("#hasDefaultValField");
  if(hasDefaultField!=undefined){
    hasDefaultField.checked = true;
    hasDefaultField.value = true;
    hasDefaultField.disabled = false ;
  }
}

function enableAndResetDefaultValueField(){
  let defaultValField = document.querySelector("#defaultValue");
  if(defaultValField!=undefined){
    defaultValField.disabled = false;
    resetDefaultValue();
  }
}


/*let multiValueCheckBox =document.querySelector("#multiValId");
multiValueCheckBox.addEventListener("change",function(){
  let self = this ;
  if(self.checked){
    // Bloquer le champs has default et le champs default value
    disableAndUncheckHasDefaultIfDisplayed();
    disableAndRemoveValueOfDefaultValueField();
  }
  else {
    // autoriser le champs has default et le default value
    enableAndResetHasDefaultField();
    enableAndResetDefaultValueField();
  }
});*/



function onChangeMultiValue(input){


	resetDefaultValue();
	resetRangeFields();

	if(input.options[input.selectedIndex].value=='true'){
	disableAndUncheckHasDefaultIfDisplayed();
		// On d�sactive le champs de default value
		document.forms['editDataForm'].elements['defaultValue'].disabled=true;

		// On active le champs de "Autorized value"
		setDisableRangeFields(false);

	}
	else{
	enableAndResetHasDefaultField();
		var emptyRangeValueChecked=false;
		// On active le champs de default value
		if(document.forms['editDataForm'].elements['addEmptyRange'])
		{
			if(document.forms['editDataForm'].elements['addEmptyRange'].checked==true)
			{
				emptyRangeValueChecked=true;
			}
		}
		if(emptyRangeValueChecked==false)
		{
			document.forms['editDataForm'].elements['defaultValue'].disabled=false;
		}
		// On active le champs de "Autorized value"
		setDisableRangeFields(false);


	}


	// si c'est un type boolean
	if(document.forms['editDataForm'].elements['attrType1'].checked){
		// On d�sactive le champs de "Autorized value"
		// Car un boolean ne peut avoir de valeur autoris�es
		setDisableRangeFields(true);
	}


	// Si c'est un type Date
	if(document.forms['editDataForm'].elements['attrType4'].checked){
		// On d�sactive le champs de "Autorized value"
		setDisableRangeFields(true);
		// On d�sactive le champs de default value
		document.forms['editDataForm'].elements['defaultValue'].disabled=true;
	}


}

//S63 IR-999016-3DEXPERIENCER2022x check multiValue in EditMode for hasDefault
function onChangeEditMultiValue(input){

	console.log("test");
	resetEditDefaultValue();
	resetEditRangeFields();

	if(input.options[input.selectedIndex].value=='true'){
	disableAndUncheckHasDefaultIfDisplayed();
		// On d�sactive le champs de default value
		document.forms['editDataForm'].elements['defaultValue'].disabled=true;

		// On active le champs de "Autorized value"
		setDisableRangeFields(false);

	}
	else{
	enableAndResetHasDefaultField();
		var emptyRangeValueChecked=false;
		// On active le champs de default value
		if(document.forms['editDataForm'].elements['addEmptyRange'])
		{
			if(document.forms['editDataForm'].elements['addEmptyRange'].checked==true)
			{
				emptyRangeValueChecked=true;
			}
		}
		if(emptyRangeValueChecked==false)
		{
			document.forms['editDataForm'].elements['defaultValue'].disabled=false;
		}
		// On active le champs de "Autorized value"
		setDisableRangeFields(false);


	}


	// si c'est un type boolean
	if(Type=="Boolean"){
		// On désactive le champs de "Autorized value"
		// Car un boolean ne peut avoir de valeur autorisées
		setDisableRangeFields(true);
	}
	
	
	// Si c'est un type Date
	if(Type=="Date"){
		// On désactive le champs de "Autorized value"
		setDisableRangeFields(true);
		// On désactive le champs de default value
		document.forms['editDataForm'].elements['defaultValue'].disabled=true;
	}


}

function createHiddenHasDefaultField(){
let hiddenInputHasDefault = document.createElement("input");
    hiddenInputHasDefault.hidden=true;
    hiddenInputHasDefault.id="hiddenHasDefVal";
    hiddenInputHasDefault.name="hiddenHasDefVal";
    hiddenInputHasDefault.type="text";
    hiddenInputHasDefault.value="true";
    return hiddenInputHasDefault;
}

 function handleClickHasDefault(self){
   let hiddenInputHasDefault = document.querySelector("#hiddenHasDefVal")
        if(hiddenInputHasDefault == undefined){
        hiddenInputHasDefault = createHiddenHasDefaultField();
        self.parentElement.appendChild(hiddenInputHasDefault);
        }

  if(self.checked){
    self.value=true;
    hiddenInputHasDefault.value="true";
    // autoriser le champs default value si necessaire
    enableAndResetDefaultValueField();
  }
  else{
    self.value=false;
  // Creer un input invisible pour stocker la valeur
   hiddenInputHasDefault.value="false";
    // Bloquer et Vider le champs default value
   disableAndRemoveValueOfDefaultValueField();
  }
}

//S63 IR-999016-3DEXPERIENCER2022x create an edit version method
 function handleClickHasDefaultEdit(self){

  if(self.checked){
    self.value=true;
    // autoriser le champs default value si necessaire
    enableAndResetDefaultValueField();
    //enableAddEmptyRange();
  }
  else{
    self.value=false;
    // Bloquer et Vider le champs default value
   disableAndRemoveValueOfDefaultValueField();
   //disableAddEmptyRange();
  }
}

//S63 IR-999016-3DEXPERIENCER2022x override resetDefaultValue method
function resetDefaultValue()
  {
	// BMN2-IR-347926 03/02/15
	document.forms['editDataForm'].elements['defaultValue_msvalue'].value = '#0';
	
	if ((document.forms['editDataForm'].elements['attrType0'] && document.forms['editDataForm'].elements['attrType0'].checked) || (Type=!undefined && Type=="Integer")) {
		document.forms['editDataForm'].elements['defaultValue'].value='0';
	}
	else if((document.forms['editDataForm'].elements['attrType3'] && document.forms['editDataForm'].elements['attrType3'].checked) || (document.forms['editDataForm'].elements['attrType5'] && document.forms['editDataForm'].elements['attrType5'].checked) || (Type=!undefined && (Type=="Magnitude" || Type=="Real"))){
		document.forms['editDataForm'].elements['defaultValue'].value='0.0';
	}
	else 
	{
		document.forms['editDataForm'].elements['defaultValue'].value='';
					
		
		}
	
  }

// Test JS sur codepen.io
/*
-------------------
<!DOCTYPE html>
<html>
    <head>
        <title>Cours JavaScript</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="cours.css">
        <script src='cours.js' async></script>
    </head>

    <body>

 <form id="myForm" action="/action_page.php">
  <!--<input id="hasDefault" type="checkbox" value=true checked>HasDefault<br><br>-->
  <input id="multiVal" type="checkbox" value=false >Multi Value<br><br>
  <label for="fname">Default Value:</label>
  <input type="text" id="defValue" name="fname"><br><br>
  <input type="submit" value="Submit">
</form>

</html>
-------------------
checkboxHasDefaul = document.querySelector("#hasDefault");
defaultValueInput = document.querySelector("#defValue");
multivalueCheckBox  = document.querySelector("#multiVal");
form = document.querySelector('#myForm');
form.addEventListener("hasDefaultChange",function(tmp,t){
//alert("bubble");
  let hasDefault = checkboxHasDefaul != null ? checkboxHasDefaul.checked : false;
  let multivalue = multivalueCheckBox.checked
  let isDefaultValDisabled = defaultValueInput.disabled

  if(isDefaultValDisabled && !multivalue && hasDefault){
    defaultValueInput.disabled=false;
  }
  else if(!isDefaultValDisabled && (multivalue || !hasDefault )){
    defaultValueInput.disabled=true;
  }
});
defaultValueInput.addEventListener("hasDefaultChange",function(tmp,t){

});

defaultValueInput.addEventListener("multivalChange",function(tmp){
  alert("multi value has changed");
    if(this.disabled){
    alert("le input est grisé")
  }
});

if(checkboxHasDefaul!=undefined){
  checkboxHasDefaul.addEventListener("change",function(){
    let event = new CustomEvent("hasDefaultChange",{bubbles:true});
    defaultValueInput.dispatchEvent(event,{hasdefault:true})
  //form.dispatchEvent(event)
});
}
multivalueCheckBox.addEventListener("change",function(){
    //let event = new Event("multivalChange");
   let event = new CustomEvent("hasDefaultChange",{bubbles:true});
    defaultValueInput.dispatchEvent(event)
});
*/

"use strict";

function Util() {};

Util.prepareCalcNum = function (num) {
	// console.log(num+ " kommt1 "+ typeof num.toString());
    return Number( (num.toString().replace(",", ".")) );
}

Util.prepareShowNum = function (num) {
	// console.log(num+ " kommt2 "+ typeof num.toString());
    return (num.toString().replace(".", ","));
}

// Rounds a number towards two decimals after comma 
Util.roundTowardsTwoDec = function (num) {
	return Math.round(num * 100) / 100;
}

Util.processNumberInputField = function (field) {
	var val; 
	if (!field.value && !field.innerHTML) {
		field.value = "";
		return;
	} else if (field.value) {
		if (field.value === "") {
			field.value = "";
			return;
		} else {
			val = field.value;
		}
	} else if (field.innerHTML) {
		if (field.innerHTML === "") {
			field.innerHTML = "";
			return;
		} else {
			val = field.innerHTML;
		}
	}

	var valueCalcStr = Util.prepareCalcNum(val);

	if (!isNaN(valueCalcStr)) {	
		// zaokraglic do 2 miejsc po przecinku
		var valueCalcNum = Util.roundTowardsTwoDec(Number(valueCalcStr));
		var valueShowStr =  Util.prepareShowNum(valueCalcNum.toString()) ;
		
		// do not show decimal zero 
		if (field.value) {
			field.value = valueShowStr;
		} else if (field.innerHTML) {
			field.innerHTML = valueShowStr;
		}
	}
}

/*
Parse a field value in the correct presentation style. 
It means that the value will be round towards 2 deimals after comma
and the comma will be used as the decimal separator 

Parameter:
	- value: value as string

returns
	a string 
 */
Util.processNumberInput = function (value) {
	if (!isNaN(value)) {	
		var valueNum = Number(value);
		var valueNum = Util.roundTowardsTwoDec(valueNum);
		var valueStr = valueNum.toString();
		return valueStr;
	} else {
		return null;
	}
}	

Util.checkSpecialCharacters = function (str) {
	var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?]/);
	return pattern.test(str);
}

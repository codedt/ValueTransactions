"use strict";

function TransactionView() {
	this.getConversionRate = function  () {
		return document.getElementById('txtConversionRate').value;
	}
	
	this.getTransactionName = function () {
		return document.getElementById('txtTransactionName').value;
	}
	
	this.getTransactionAmount = function () {
		return document.getElementById('txtAmountEUR').value;
	}

	this.getResultAmount = function () {
		return document.getElementById('cpResult').innerHTML;
	}

	this.updateValuePresentation = function (targetName) {
		var target = document.getElementById(targetName);
		Util.processNumberInputField(target);
	}

	this.updateAmountPLN = function (value, line) {
		var tblLines = document.getElementById('transactionTable')
				.children[1].children;
		tblLines[line].children[2].innerHTML = value;
	}

	this.showResult = function (result) {
		document.getElementById('cpResult').innerHTML = result;
	}

	this.showSumLine = function (sumEUR, sumPLN) {
		var trSum = document.getElementById('trSum');
		trSum.children[1].innerHTML = sumEUR;
		trSum.children[2].innerHTML = sumPLN;
	}

	this.changeLanguage = function (lan) {
		var spans = document.getElementsByTagName('span');
		for (var s of spans) {
			let prefix = s.id.substring(0,5);
			if (prefix === 'text_') {
				s.innerHTML = Messages.getText(s.id, lan); // aufgabe View
			}
		}

		var inputs = document.getElementsByTagName('input');
		for (var i of inputs) {
			if (i.placeholder) {
				i.placeholder = Messages.getText("placeholder_"+ i.id, lan);
			}
		}

		var buttons = document.getElementsByTagName('button');
		for (var b of buttons) {
			if (b.id === 'addTransaction' ||
					b.id === 'dropTransaction') {
				b.innerHTML = Messages.getText("button_"+ b.id, lan);
			}
		}		
	}

	this.showHighestTrans = function (highestTransText) {
		var secHighestTrans = document.getElementById('secHighestTrans');
		secHighestTrans.innerHTML = highestTransText;
	}

	this.createNewLine = function (numOfRows) {
		var newLine = document.createElement('tr');
		for (var i = 0; i < numOfRows; i++) {
			newLine.appendChild( document.createElement('td') );
		};
		newLine.classList.add('hoverEffectTblLine');		
		
		return newLine;
	}

	this.addValuesToLastRow = function (val) {
		if (val.length !== 3 ) {
			// check if the same number of values is passed as the number 
			// of columns exist 
			throw("The number of parameters has to correlate to the number of columns");
			return;
		}
		var i = 0;
		for (var v of val) {
			getLastRow().children[i++].innerHTML = v;
		}
	}

	this.addNodeToTableBody = function (node) {
		document.getElementById('transactionTable').children[1]
				.appendChild(node);
	}

	this.markLine = function (line) {
		line.classList.toggle('transaction-table-line-marked');
	}

	this.unmarkOtherLines = function (currLine) {
		for (var i = 0; i < currLine.parentNode.children.length; i++) {
		 	var line = currLine.parentNode.children[i];
		 	if (line !== currLine) {
				line.classList.remove('transaction-table-line-marked');
		 	}
		}
	}

	//	Activates or Disables the drop-transaction button
	this.updateDropButton = function (p_markedLine) {
		var dropTransaction = document.getElementById('dropTransaction');
		if (!p_markedLine) {
			dropTransaction.disabled = "disabled";
		} else {
			dropTransaction.disabled = "";
		}

	}

	this.showErrors = function (errors, focus) {
		var errSpan = document.getElementById('errorSpan');
		errSpan.innerHTML = "";
		for (var i = 0; i < errors.length; i++) {
			if (i > 0) { errSpan.innerHTML += '<br />'; }
			errSpan.innerHTML += errors[i];
		}
		errors.splice(0);

		var errBox = document.getElementById('errorBox');
		errBox.classList.remove('elementHidden');
		setTimeout(function() {
			errBox.classList.add('elementHidden');
			errSpan.innerHTML = "";
		}, 3000);

		setFocusAppropriate(focus);
	}

	function getLastRow() {
		var length = document.getElementById('transactionTable')
				.children[1].children.length;

		return document.getElementById('transactionTable')
				.children[1].children[length - 1];
	}

	function getNumberOfRows() {
		return getLastRow().parentNode.children.length;
	}

	//	Sets the focus to the given element
	function setFocusAppropriate(controlName) {
		var element = document.getElementById(controlName);
		if (element) {
			element.focus();
		}

	}
	this.setFocusAppropriate = function (controlName) {
		var element = document.getElementById(controlName);
		if (element) {
			element.focus();
		}

	}	



	//	Clears the input fields
	this.clearInputFields = function () {
		var txtTransactionName = document.getElementById("txtTransactionName");
		var txtAmountEUR = document.getElementById("txtAmountEUR");
		var cpResult = document.getElementById("cpResult");

		txtTransactionName.value = "";
		txtAmountEUR.value = "";
		cpResult.innerHTML = "0";
	}
}
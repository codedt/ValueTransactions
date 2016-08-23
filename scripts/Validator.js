"use strict";

function Validator() {
	var self = this;

	var errorManager = new Errors();

	var transNames = [];

	this.validateInputs = function (targetName, language) {
		var txtTransactionName = document.getElementById("txtTransactionName");
		var txtAmountEUR = document.getElementById("txtAmountEUR");
		var errorOn = false;
		var errortext;

		if (targetName == "adding" || targetName == "txtConversionRate") {
			if (txtConversionRate.value == "") {
				if (targetName == "adding") {
					errortext = Messages.getText("err_conversionRateEmpty", language);
					errorManager.addError(errortext, "txtConversionRate");
					markBoxRed(txtConversionRate);
					errorOn = true;
				}
			} else if (isNaN( Util.prepareCalcNum(txtConversionRate.value) ) || 
					txtConversionRate.value.includes(".")) {
				errortext = Messages.getText("err_conversionRateNumber", language);
				errorManager.addError(errortext, "txtConversionRate");
				markBoxRed(txtConversionRate);
				errorOn = true;
			}
		}

		if (targetName == "adding" || targetName == "txtTransactionName") {
			if (txtTransactionName.value == "") {
				if (targetName == "adding") { 
					errortext = Messages.getText("err_transactionNameEmpty", language);
					errorManager.addError(errortext, "txtTransactionName");
					markBoxRed(txtTransactionName);
					errorOn = true;
				}
			} else if (!isNaN(txtTransactionName.value.charAt(0))) {
				errortext = Messages.getText("err_transactionNameNumber", language);
				errorManager.addError(errortext, "txtTransactionName");
				markBoxRed(txtTransactionName);
				errorOn = true;
			} 
			else if (Util.checkSpecialCharacters(txtTransactionName.value)) {
				errortext = Messages.getText("err_transactionNameSpecialChar", language);
				errorManager.addError(errortext, "txtTransactionName");
				markBoxRed(txtTransactionName);
				errorOn = true;
			}
		}

		if (targetName == "adding" || targetName == "txtAmountEUR") {
			if (txtAmountEUR.value == "") {
				if (targetName == "adding") { 
					errortext = Messages.getText("err_amountEUREmpty", language);
					errorManager.addError(errortext, "txtAmountEUR");
					markBoxRed(txtAmountEUR); 
					errorOn = true;
				}
			} else if (isNaN( Util.prepareCalcNum(txtAmountEUR.value) ) ||
					txtAmountEUR.value.includes(".")) {
				errortext = Messages.getText("err_amountEURNotNumber", language);
				errorManager.addError(errortext, "txtAmountEUR");
				markBoxRed(txtAmountEUR);
				errorOn = true;
			} 
		}

		if (targetName == "adding" && 
				transNames.indexOf(txtTransactionName.value) !== -1) {
			errortext = Messages.getText("err_transactionNameExists", language);
			errorManager.addError(
					errortext, "txtTransactionName");
			markBoxRed(txtTransactionName);
			errorOn = true;
		}

		if (errorOn) {
			return false;
		} else {
			return true;
		}
	}

	this.validateInputForAdding = function (language) {
		if (self.validateInputs('adding', language)) {
			return true;
		} else {
			return false;
		}
	}

	this.addError = function (message, targetName) {
		errorManager.addError( message );
		markBoxRed( document.getElementById(targetName) );
	}

	this.getErrors = function () {
		return errorManager.getErrors();
	}

	this.firstErrField = function () {
		return errorManager.firstErrField;
	}

	this.notifyTransNames = function (names) {
		transNames = names;
	}

	/* 
		Highlights the given element by setting its border red
	 */
	function markBoxRed(t) {
		t.classList.add('redMarked');
		setTimeout(function() {
			t.classList.remove('redMarked');
		}, 3000);
	}


}
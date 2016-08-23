"use strict";

function TransactionModel() {
	var maxLengthTransName = 30;

	var model = {
		get model() {
			return this.model;
		}
	}

	var validator = new Validator();

	var transView = new TransactionView();

	// Table-Manager
	var tableManager = new TableManager(transView);

	// the current Transaction
	var currTransaction = new Transaction();

	// set of all transactions
	var transactionList = [];

	var transNames = [];

	var highestTransText = [];

	var currentLanguage = "pl";

	this.processConversion = function (targetName) {
		if (validator.validateInputs(targetName, currentLanguage)) {
			// hat nur auswirkung auf das anzeige format in der form
			transView.updateValuePresentation(targetName);
			var conversionRate = getConversionRate();
			var transaction = getTransactionInput(); 
			calculate(conversionRate, transaction);
			currTransaction = transaction;
			
			transView.showResult( transaction.amountPLN );
		} else {
			showErrors();
		}
		updateAmounts();
	}

	this.processTransnameOnblur = function (targetName) {
		if (validator.validateInputs(targetName, currentLanguage)) {
			var conversionRate = getConversionRate();
			var transaction = getTransactionInput(); 
			calculate(conversionRate, transaction);
			currTransaction = transaction;

			transView.showResult( transaction.amountPLN );
		} else {
			showErrors();
		}
	}

	this.processTransnameOnkeyup = function (targetName) {
		if (txtTransactionName.value.length > maxLengthTransName) {
			txtTransactionName.value = txtTransactionName.value.substring(0, maxLengthTransName);
			var text1 = Messages.getText("err_maxnumTransname1", currentLanguage);
			var text2 = Messages.getText("err_maxnumTransname2", currentLanguage);
			validator.addError(text1 +maxLengthTransName+ text2, targetName);
			showErrors();
		}
	}

	this.processAmount = function (targetName) {
		if (validator.validateInputs(targetName, currentLanguage)) {
			transView.updateValuePresentation(targetName);
			var conversionRate = getConversionRate();
			var transaction = getTransactionInput(); 
			calculate(conversionRate, transaction);
			currTransaction = transaction;

			transView.showResult( transaction.amountPLN );
		} else {
			showErrors();
		}
	}

	this.processAddTransaction = function (targetName) {
		if (!validator.validateInputForAdding(currentLanguage)) {
			showErrors();
			return false;
		}

		addTransaction();
		transView.clearInputFields();
		transView.setFocusAppropriate("txtTransactionName");
		calcTransSumAndHighestTrans();
	}

	this.processDropTransaction = function (targetName) {
		if (!tableManager.markedLine.getLine) {
			return;
		}

		dropLineFromTable();
	}

	this.processLanguage = function (targetValue) {
		changeLanguage(targetValue);
	}

	function addTransaction() {
		tableManager.addLineToTable(
			currTransaction.transName,
			currTransaction.amount,
			currTransaction.amountPLN
		);

		transactionList.push(currTransaction);
		rememberTransname(currTransaction.transName);
	}

	function getConversionRate() {
		return Util.prepareCalcNum( transView.getConversionRate() );
	}

	function getTransactionInput() {
		var trans = new Transaction();

		trans.transName = transView.getTransactionName();
		trans.amount = Util.prepareCalcNum(transView.getTransactionAmount());

		return trans;
	}

	function changeLanguage(lan) {
		if (lan !== currentLanguage) {
			currentLanguage = lan;

			transView.changeLanguage(lan);

			var text1 = Messages.getText("text_highest_transName", 
					currentLanguage);
			var text2 = Messages.getText("text_highest_amount", 
					currentLanguage);
			highestTransText[0] = text1;
			highestTransText[3] = text2;
			highestTransText[6] = text2;
			transView.showHighestTrans( prepareHighestTransText() );
		}
	}

	function showErrors() {
		transView.showErrors( validator.getErrors(), validator.firstErrField() );
	}


	 
	//	Writes the new transation to the 'g_transNames'-array
	function rememberTransname(name) {
		transNames.push(name);
		notifyTransNames();
	}

	
	//	Drops the given transation from the 'g_transNames'-array
	function deleteTransname(name) {
		if (transNames.indexOf(name) !== -1) {
			transNames.splice(transNames.indexOf(name), 1);
			notifyTransNames();
		}
	}

	function deleteTrans(name) {
		for (let t of transactionList) {
			if (t.transName === name) {
				// drop Trans
				let ind = transactionList.indexOf(t);
				transactionList.splice(ind, 1);
				break;
			}
		}
	}

	function notifyTransNames() {
		validator.notifyTransNames( transNames );
	}

	// Drop an marked entry from the transaction table 
	function dropLineFromTable() {
		let transNameToDrop = tableManager.markedLine.getLine.children[0]
				.innerHTML;
		deleteTransname(transNameToDrop);
		deleteTrans(transNameToDrop);

		tableManager.dropCurrentLine();
		tableManager.updateTableVisibility();
		tableManager.updateDropButton();

		calcTransSumAndHighestTrans();
	}


	/*
	Calculate the sum line of the saved transactions and display it 
	in the table footer. 

	Calculates the highest transaction ans 
	display it near to the transaction table
	 */
	function calcTransSumAndHighestTrans() {
		if (tableManager.numberOfRows.getNum < 1) {
			return;
		}

		var sumAmountEURCalcNum = 0;
		var sumAmountPLNCalcNum = 0;
		var lineHighestTrans = 0, amountHighestTrans = 0;

		for (var i = 0; i < transactionList.length; i++) {
			sumAmountEURCalcNum += Number( 
					Util.prepareCalcNum( transactionList[i].amount ) );

			sumAmountPLNCalcNum += Number( 
					Util.prepareCalcNum( transactionList[i].amountPLN ) );

			// find out the highest transaction 
			if ( Number(transactionList[i].amount) > amountHighestTrans ) {
				lineHighestTrans = i;
				amountHighestTrans = transactionList[i].amount;
			}
		}

		var sumAmountEURShowStr = Util.prepareShowNum(
				sumAmountEURCalcNum.toString());
		var sumAmountPLNShowStr = Util.prepareShowNum(
				sumAmountPLNCalcNum.toString());

		// show sumLine at the bottom of the table
		transView.showSumLine( sumAmountEURShowStr, sumAmountPLNShowStr );

		Util.processNumberInputField(trSum.children[1]);
		Util.processNumberInputField(trSum.children[2]);

		var text1 = Messages.getText("text_highest_transName", currentLanguage);
		var text2 = Messages.getText("text_highest_amount", currentLanguage);

		highestTransText[0] = text1;
		highestTransText[1] = " <br />";
		highestTransText[2]	= transactionList[lineHighestTrans].transName + " | ";
		highestTransText[3] = text2; 
		highestTransText[4] = " EUR ";
		highestTransText[5]	= transactionList[lineHighestTrans].amount + " |  ";
		highestTransText[6] = text2;
		highestTransText[7] =" PLN ";
		highestTransText[8]	= transactionList[lineHighestTrans].amountPLN;	

		transView.showHighestTrans( prepareHighestTransText() );
	}

	function prepareHighestTransText() {
		var text = "";
		for (var i = 0; i < highestTransText.length; i++) {
			text += highestTransText[i];
		}
		return text;
	}

	/*
	Calculate from the given inputs the amount in PLN an displays 
	it on the form
	 */
	function calculate(conversionRate, trans) {
		conversionRate = Util.processNumberInput(conversionRate);
		trans.amount = Util.processNumberInput(trans.amount);
		var conversionRateCalc = Number(conversionRate);
		var transAmountCalc = Number(trans.amount);
		var resultValueCalcNum = (conversionRateCalc * transAmountCalc);
		var resultValue = resultValueCalcNum.toString();
		resultValue = Util.processNumberInput(resultValue);

		trans.amountPLN = Util.prepareShowNum(resultValue);
	}

	/*
	Update the saved transactions in the transaction table and 
	calls the 'calcTransSumAndHighestTrans'-method  
	*/
	function updateAmounts() {
		for (var i = 0; i < transactionList.length; i++) {
			let newVal = getConversionRate() * transactionList[i].amount;
			transactionList[i].amountPLN = Util.processNumberInput( newVal );
			transView.updateAmountPLN( transactionList[i].amountPLN, i );
		}
		if (tableManager.numberOfRows.getNum > 0) {
			calcTransSumAndHighestTrans();
		}
	}

};


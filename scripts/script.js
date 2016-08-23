"use strict";

// load other script-Files
addScriptFile('scripts/Util.js');
addScriptFile('scripts/TransactionModel.js');
addScriptFile('scripts/Transaction.js');
addScriptFile('scripts/TableManager.js');
addScriptFile('scripts/TransactionView.js');
addScriptFile('scripts/Validator.js');
addScriptFile('scripts/Errors.js');
addScriptFile('scripts/Messages.js');

var transModel;

window.onload = loadHandler;

this.ab = function (x) {
	console.log(x);
}

function loadHandler() {
	registerAllEventHandlers();

	/* get the model instance */
		//  the singleton-pattern could be used here
	transModel = new TransactionModel();
}

function registerAllEventHandlers() {
	var txtConversionRate = document.getElementById('txtConversionRate');
	var txtTransactionName = document.getElementById('txtTransactionName');
	var txtAmountEUR = document.getElementById('txtAmountEUR');
	var addTransaction = document.getElementById('addTransaction');
	var dropTransaction = document.getElementById('dropTransaction');
	var spanLanguage0 = document.getElementsByClassName('lang')[0];
	var spanLanguage1 = document.getElementsByClassName('lang')[1];
	var spanLanguage2 = document.getElementsByClassName('lang')[2];
		
	txtConversionRate.onblur = ConversionHandler;
	txtTransactionName.onblur = TransactionNameHandler;
	txtTransactionName.onkeyup = TransactionNameHandler;
	txtAmountEUR.onblur = AmountHandler;
	addTransaction.onclick = addTransactionHanlder;
	dropTransaction.onclick = dropTransactionHandler;
	spanLanguage0.onclick = languageHandler;
	spanLanguage1.onclick = languageHandler;
	spanLanguage2.onclick = languageHandler;
}

function ConversionHandler(evt) {
	transModel.processConversion(evt.originalTarget.id);
}

function TransactionNameHandler(evt) {
	if (evt.type == "blur"){
		transModel.processTransnameOnblur(evt.originalTarget.id);
	} else if (evt.type == "keyup"){
		transModel.processTransnameOnkeyup(evt.originalTarget.id);
	}
}

function AmountHandler(evt) {
	transModel.processAmount(evt.originalTarget.id);
}

function addTransactionHanlder(evt) {
	transModel.processAddTransaction(evt.originalTarget.id);
}

function dropTransactionHandler(evt) {
	transModel.processDropTransaction(evt.originalTarget.id);
}

function languageHandler(evt) {
	transModel.processLanguage(evt.originalTarget.innerHTML);
}
/* ### handler-functions - End ### */ 


function addScriptFile(scriptPath) {
	var newScript = document.createElement('script');
	newScript.setAttribute('src', scriptPath);
	document.head.appendChild(newScript);
}


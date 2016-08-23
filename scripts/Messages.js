"use strict";

function Messages() {};

Messages.getText = function (item, language) {
	if (language.toLowerCase() === "pl") {
		return messages_pl[item];
	} else if (language.toLowerCase() === "en") {
		return messages_en[item];
	} else if (language.toLowerCase() === "de") {
		return messages_de[item];
	}
}

var messages_pl = {
	text_title: "Transakcje Walutowe",
	text_heading: "Transakcje Walutowe",
	text_conversionRate: "Przelicznik walutowy:",
	text_transactionName: "Nazwa transakcji:",
	text_amountEUR: "Kwota EUR:",
	text_amountPLN: "Kwota PLN:",

	placeholder_txtConversionRate: "(przelicznik)",
	placeholder_txtTransactionName: "(nazwa)",
	placeholder_txtAmountEUR: "(kwota transakcyjna)",

	button_addTransaction: "Dodaj",
	button_dropTransaction: "Usuń",

	text_tbl_transactionName: "Nazwa transakcji",
	text_tbl_amountEUR: "Kwota",
	text_tbl_amountPLN: "Kwota",
	text_tbl_sumTransaction: "Suma transakcji:",

	text_highest_transName: "Najwyższa transakcja:",
	text_highest_amount: "kwota",

	err_conversionRateEmpty: "Proszę wprowadź przelicznik walutowy w PLN",
	err_conversionRateNumber: "Przelicznik walutowy musi być liczbą",
	err_transactionNameEmpty: "Proszę wprowadź nazwę transakcji",
	err_transactionNameNumber: "Nazwa transakcji nie może zaczynać się cifrą",
	err_transactionNameSpecialChar: "Nazwa transakcji nie może zawierać znaków specjalnych",
	err_amountEUREmpty: "Proszę wprowadź kwotę w euro",
	err_amountEURNotNumber: "Kwota transakcyjna musi być liczbą",
	err_transactionNameExists: "Transakcja z taką nazwą już istnieje",
	err_maxnumTransname1: "Nazwa nie może mieć więcej niż ",
	err_maxnumTransname2: " znaków"
}

var messages_en = {
	text_title: "Currency Transactions",
	text_heading: "Currency Transactions",
	text_conversionRate: "Conversion rate:",
	text_transactionName: "Transaction name:",
	text_amountEUR: "Amount EUR:",
	text_amountPLN: "Amount PLN:",

	placeholder_txtConversionRate: "(conversion rate)",
	placeholder_txtTransactionName: "(name)",
	placeholder_txtAmountEUR: "(transaction amount)",

	button_addTransaction: "Add",
	button_dropTransaction: "Drop",

	text_tbl_transactionName: "Transaction name",
	text_tbl_amountEUR: "Amount",
	text_tbl_amountPLN: "Amount",
	text_tbl_sumTransaction: "Transaction sum:",

	text_highest_transName: "Highest transaction:",
	text_highest_amount: "amount",

	err_conversionRateEmpty: "Please Insert a conversion rate in PLN",
	err_conversionRateNumber: "Conversion rate must be a number",
	err_transactionNameEmpty: "Please insert a transaction name",
	err_transactionNameNumber: "Transaction name must not begin with a digit",
	err_transactionNameSpecialChar: "Transaction name must not contain special characters",
	err_amountEUREmpty: "Please insert an amount in euro",
	err_amountEURNotNumber: "Transaction amount must be a number",
	err_transactionNameExists: "A transaction with this name exists already",
	err_maxnumTransname1: "The name must not have more than ",
	err_maxnumTransname2: " characters"
}

var messages_de = {
	text_title: "Währungstransaktionen",
	text_heading: "Währungstransaktionen",
	text_conversionRate: "Umrechnungskurs:",
	text_transactionName: "Transaktionsbezeichnung:",
	text_amountEUR: "Betrag EUR:",
	text_amountPLN: "Betrag PLN:",

	placeholder_txtConversionRate: "(Währungskurs)",
	placeholder_txtTransactionName: "(Bezeichnung)",
	placeholder_txtAmountEUR: "(Transaktionsbetrag)",

	button_addTransaction: "Hinzufügen",
	button_dropTransaction: "Entfernen",

	text_tbl_transactionName: "Transaktionsbezeichnung",
	text_tbl_amountEUR: "Betrag",
	text_tbl_amountPLN: "Betrag",
	text_tbl_sumTransaction: "Transaktionssumme:",

	text_highest_transName: "Höchste Transaktion:",
	text_highest_amount: "Betrag",

	err_conversionRateEmpty: "Ein Währungskurs in PLN muss eingegeben werden",
	err_conversionRateNumber: "Der Währungskurs muss eine Nummer sein",
	err_transactionNameEmpty: "Eine Transaktionsbezeichnung muss eingegeben werden",
	err_transactionNameNumber: "Die Transaktionsbezeichnung kann nicht mit einer Ziffer beginnen",
	err_transactionNameSpecialChar: "Die Transaktionsbezeichnung kann keine Sonderzeichen enthalten",
	err_amountEUREmpty: "Einen Betrag in Euro eingeben",
	err_amountEURNotNumber: "Der Transaktionsbetrag muss eine Zahl sein",
	err_transactionNameExists: "Eine Transaktion mit diesem Namen existiert bereits",
	err_maxnumTransname1: "Die maximale Anzahl für die Transaktionsbezeichnung sind ",
	err_maxnumTransname2: " Zeichen"
}
"use strict";

function Errors() {

	var firstErrField = {
		get firstErrField() {
			return this.firstErrField;
		}, 
		set firstErrField(e) {
			this.firstErrField = e;
		}
	}

	var errorList = new Array();

	this.addError = function (e, fieldName) {
		errorList.push(e);

		// remember the first field where an error is thrown
		if (errorList.length == 1) {
			this.firstErrField = fieldName;
		}
	}

	this.getErrors = function () {
		return errorList;
	}
}
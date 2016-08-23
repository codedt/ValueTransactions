"use strict";

function Transaction() {
	var transName = { 		// transName of the transaction
		get transName(){
			return this.transName;
		},
		set transName(n){
			this.transName = n;
		}
	}

	var amount = {			// its amount 
		get amount() {
			return this.amount;
		},
		set amount(a) {
			this.amount = a;
		}
	}

	var amountPLN = {		// its PLN amount 
		get amountPLN() {
			return this.amountPLN;
		},
		set amountPLN(a) {
			this.amountPLN = a;
		}
	}
}
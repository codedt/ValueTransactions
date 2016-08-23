"use strict";

function TableManager(viewer) {

	var self = this;

	this.markedLine = {
		line: undefined,
		get getLine() {
			return this.line;
		},
		set setLine(l) {
			this.line = l;
		}
	}

	this.numberOfRows = {
		num: 0,
		get getNum() {
			return this.num;
		},
		set setNum(n) {
			this.num = n;
		}
	}

	this.addLineToTable = function (name, amount, result) {
		var newLine = viewer.createNewLine(3);

		newLine.onclick = function () {
			viewer.markLine(newLine);
			if (newLine.classList.contains('transaction-table-line-marked')) {
				self.markedLine.setLine = newLine;
				viewer.unmarkOtherLines(newLine);
			} else {
				self.markedLine.setLine = null;
			}
			viewer.updateDropButton(self.markedLine.getLine);
		}

		viewer.addNodeToTableBody(newLine);

		this.numberOfRows.setNum = this.numberOfRows.getNum + 1;

		// add values to the new line
		var values = [ name, amount, result ];
		viewer.addValuesToLastRow(values);

		updateTableVisibility(this); // hier self seinsetzten
		viewer.updateDropButton();
	}

	this.dropCurrentLine = function () {
		self.markedLine.getLine.remove();
		self.markedLine.setLine = undefined;
		self.numberOfRows.setNum = self.numberOfRows.getNum - 1;
	}

	//	Displays or hides the transaction table 
	function updateTableVisibility(t) {
		if (t.numberOfRows.getNum > 0) {
			document.getElementById('transactionTable').classList.remove('elementHidden');
			document.getElementById('secHighestTrans').classList.remove('elementHidden');
		} else {
			document.getElementById('transactionTable').classList.add('elementHidden');
			document.getElementById('secHighestTrans').classList.add('elementHidden');
		}
	}

	this.updateTableVisibility = function () {
		updateTableVisibility(self);
	}

	//	Activates or Disables the drop-transaction button
	this.updateDropButton = function () {
		var dropTransaction = document.getElementById('dropTransaction');
		if (!self.markedLine.getLine) {
			dropTransaction.disabled = "disabled";
		} else {
			dropTransaction.disabled = "";
		}
	}

}
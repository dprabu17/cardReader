//http://developmentby.me/javascript-credit-card-parser/
function SwipeParser(strParse) {
	//var strParse = "%B9401153168494303^                         /^1299101000000000000?;9401153168494303=1299101000000?";

	//boolean values to determine which method to parse
   
	blnCarrotPresent = false;
	blnEqualPresent = false;
	blnBothPresent = false;

	strCarrotPresent = strParse.indexOf("^");
	strEqualPresent = strParse.indexOf("=");

	if (strCarrotPresent > 0) {
		blnCarrotPresent = true;
	}

	if (strEqualPresent > 0) {
		blnEqualPresent = true;
	}
	
	if (blnEqualPresent == true && blnCarrotPresent == true) {
		//contains both equal and carrot
		strParse = '' + strParse + ' ';
		arrSwipe = new Array(4);
		arrSwipe = strParse.split("^");
		
		if (arrSwipe.length > 2) {
			account = stripAlpha(arrSwipe[0].substring(1, arrSwipe[0].length));
			account_name = arrSwipe[1];
			exp_month = arrSwipe[2].substring(2, 4);
			exp_year = '20' + arrSwipe[2].substring(0, 2);
			console.log(account + "name " + account_name + "---- " + exp_month + "----" + exp_year);
			alert("Account : " + account + "\n" + "Name : " + account_name + "\n" + "Month : " + exp_month + "\n" + "Year : "+exp_year);
		} else {
			alert("Error Parsing Card.  \r\n Please Contact MIS/IT! \r\n");
		}

	} else if (blnCarrotPresent == true) {
		//carrot only delimiter
		strParse = '' + strParse + ' ';
		arrSwipe = new Array(4);
		arrSwipe = strParse.split("^");

		if (arrSwipe.length > 2) {
			account = stripAlpha(arrSwipe[0].substring(1, arrSwipe[0].length));
			account_name = arrSwipe[1];
			exp_month = arrSwipe[2].substring(2, 4);
			exp_year = '20' + arrSwipe[2].substring(0, 2);
			console.log(account + "name " + account_name + "---- " + exp_month + "----" + exp_year);
			alert("Account : " + account + "\n" + "Name : " + account_name + "\n" + "Month : " + exp_month + "\n" + "Year : "+exp_year);
		} else {
			alert("Error Parsing Card.  \r\n Please Contact MIS/IT! \r\n");
		}

	} else if (blnEqualPresent == true) {
		//equal only delimiter
		sCardNumber = strParse.substring(1, strEqualPresent);
		sYear = strParse.substr(strEqualPresent + 1, 2);
		sMonth = strParse.substr(strEqualPresent + 3, 2);

		account = sAccountNumber = stripAlpha(sCardNumber);
		exp_month = sMonth
		exp_year = '20' + sYear;
        console.log(account + "----" + exp_month + "----" + exp_year);
		alert("Account : " + account + "\n" + "Month : " + exp_month + "\n" + "Year : "+exp_year);
	}
}
function stripAlpha(sInput) {
	alert("stripAlpha " + sInput);
	if (sInput == null) return '';
	return sInput.replace(/[^0-9]/g, '');
}

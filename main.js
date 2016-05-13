document.addEventListener("DOMContentLoaded", function() {

	document.getElementById("error").addEventListener("click", function(){
		removeAlert();
	});

	document.getElementById("checkPage").addEventListener("click", function(){
		var errorMessage = checkInputs();
		console.log(errorMessage);
		if (errorMessage) return inputErrorAlert(errorMessage);

		var searchUrl = buildUrl();

		$(document).on({
			ajaxStart: function() { $("body").addClass("loading");    },
       		ajaxStop: function() { $("body").removeClass("loading");  }
		});

		$.ajax({
			method: 'GET',
			url: searchUrl,
			success: function(data, textStatus, xhr){
				//console.log(data);
				var newUrl = archiveUrlCheck(data);
				console.log(newUrl);
				chrome.tabs.update({url: newUrl});
				//window.location = newUrl;
				//return false;
			},
			//error: ,
			//dataType: "json",
		});
		
	});
});

function archiveUrlCheck (data) {
	var uriArr = data.mementos.closest.uri;
	for (var i = 0; i < uriArr.length; i++) {
		if (uriArr[i].indexOf("archive.org") > -1) return uriArr[i];
	} 
	return uriArr[0];
}

function inputErrorAlert(errorType){
	$('#alert p').html(errorType + ", please try again!");
 	$('#alert').css("display", "inline-block");
  	$('#alert button').focus();
}

function removeAlert(){
	$('#alert').css("display", "none");
}

function checkInputs(){
	var day = document.getElementById('day').value;
	var month = document.getElementById('month').value;
	var year = document.getElementById('year').value;
	var currentDate = new Date();
	if (!day && !month && !year) return false;
	if (isNaN(Number(month)) || month > 12) return "Invalid Month value";
	if (isNaN(Number(day)) || day > 31) return "Invalid Day value";
	if (isNaN(Number(year)) || year > currentDate.getFullYear()) return "Invalid Year value";
	return false;
}

function buildUrl () {
	var baseURL = "http://timetravel.mementoweb.org/api/json/";
	var desiredURL = document.getElementById('url').value;
	var day = document.getElementById('day').value;
	var month = document.getElementById('month').value;
	var year = document.getElementById('year').value;
	if (!day) day = "01";
	if (day.length < 2) day = "0" + day;   
	if (!month) month = "01";
	if (month.length < 2) month = "0" + month; 
	if (!year) year = "1990";
	if (year.length < 4) {
		if(year <= 16) year = "20" + year;
		else year = "19" + year;
	}
	if (!desiredURL) desiredURL = "apple.com";
	var sendURL = baseURL + year + month + day + "/" + desiredURL;
	console.log(sendURL);
	return sendURL;
}
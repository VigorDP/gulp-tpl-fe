$.ajax({
	url: "../backend1/feeds/" + 1223 + "/",
	type: "GET",
	dataType: "json",
	timeout: 30000
});

$.ajax({
	url: "../backend2/feeds/" + 1223 + "/",
	type: "GET",
	dataType: "json",
	timeout: 30000
});
function fnProcessFilter(event) {
	frames[event.data.openerFrame].location.href = event.data.url;
}
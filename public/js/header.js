function Header() {
	this.init = function(){	
		$('.lucid-output').hide();
		$('.container-fluid .feed').hide();
		$('.container-fluid .vm').hide();
		this.initEvents();
	},
	
	this.initEvents = function() {	
				$('.application .nav-link').on('click', function (e) {
					 $('.container-fluid .api').hide();
					 $('.container-fluid .feed').hide();
					 $('.container-fluid .vm').hide();
					 $('.container-fluid .'+$(this).attr('id')).show();
					 
				});				
				$('.action-button').on('click', function (e) {
					var myObject = new Object();
					 myObject['application'] = $("div.container-fluid .application .active").attr('id');
					 myObject['site'] = $(".site .active").text();
					 myObject['environment'] = $(this).closest("div.container-fluid").find("div.environment").find(".active").text();
					 myObject['location'] = $(this).closest("div.location-row").find("a.location").text();
					 myObject['api'] = $(this).text();
					 myObject['queryparam'] = $(this).closest("div.location-row").find("input.input-param").val();
					 var _datatype = 'getData';
					 if(myObject['application'] == 'feed') {
						 _datatype='syncItem';
					 } else if(myObject['application'] == 'vm') {
						 _datatype='rdp';
					 }
					$.ajax({
						type: 'post',
						url: _datatype,
						contentType: 'application/json',
						dataType: 'jsonp',
						data: JSON.stringify(myObject),
						beforeSend: function() {
							$("body").addClass("loading");
						},
						success: function(data) {
							$("body").removeClass("loading");
							header.printResult(data);
						}
					});
					e.preventDefault();
					e.stopPropagation();
				});
								
	},
	this.printResult = function(data) {				
		$("textarea#lucid-output-data").val(data);
		$('.lucid-output').show();
	}
}
	const header = new Header();
	

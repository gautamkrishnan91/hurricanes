var ocean_atlantic = "true", ocean_nepacific = "true", ocean_ncpacific = "true";
var showall = "true", showparticular = "false";
var orderby = "alphabetical";
var time = "false", interval1 = "false", interval2 = "false", landfall = "default", windspeedmin = 0, windspeedmax = 165, pressuremin = 882, pressuremax = 1024;
var first_time = "true";

$(document).ready(function(){
	$(".sidebar").css("height",$(document).height());
	$("#graphs").css("height",$(document).height());
	$( "#filterAccordion" ).accordion();
	$("#orderby, #filterby").css("visibility","hidden");
	
	$( "#month" ).selectmenu()
	.selectmenu( "menuWidget" )
        .addClass( "menuOverflow" );
	
	$( "#year" ).selectmenu()
	.selectmenu( "menuWidget" )
        .addClass( "menuOverflow" );

    $(function() {
		$( "#wind-slider" ).slider({
			range: true,
			min: 0,
			max: 165,
			values: [0,165],
			slide: function( event, ui ) {
				$( "#windSpeedMin" ).html("Min: " + ui.values[ 0 ]);
				windspeedmin = ui.values[ 0 ];
				$( "#windSpeedMax" ).html("Max: " + ui.values[ 1 ]);
				windspeedmax = ui.values[ 1 ];
			}
		});
		$( "#pressure-slider" ).slider({
			range: true,
			min: 882,
			max: 1024,
			values: [882,1024],
			slide: function( event, ui ) {
				$( "#pressureMin" ).html("Min: " + ui.values[ 0 ]);
				pressuremin = ui.values[ 0 ];
				$( "#pressureMax" ).html("Max: " + ui.values[ 1 ]);
				pressuremax = ui.values[ 0 ];
			}
		});
	});
	// Show slideout menu even if selectbox is enabled in filter option
	$(".ui-selectmenu-menu, #ui-datepicker-div").hover(
		function(){
			$("#filterby").addClass('selected');
		},
		function(){
			$("#filterby").removeClass('selected');
		}
	);
	
	// Watson's code
	ocean_atlantic = "true", ocean_nepacific = "true", ocean_ncpacific = "true";
     showall = "false", showparticular = "top5";
     orderby = "alphabetical";
     time = "false", interval1 = "false", interval2 = "false", landfall = "default", windspeedmin = 0, windspeedmax = 165, pressuremin = 882, pressuremax = 1024;
     $("#showparticular").prop("checked",true);
     $("#top5").prop("checked",true);
	
	// ajax_call();

});
// Check controls here

// Setting defaults
$("#showall").prop("checked", true);

/* For show options */
$("#showparticular").click( function(){
	if($('#showparticular').is(':checked')) {
		$("#top5").prop("checked", true);
	}
});
$("#showall").click( function(){
	$("#top5,#top10,#ourtop5,#individual").prop("checked", false);
});
$("#top5,#top10,#ourtop5,#individual").click(function(){
	if($('#top5,#top10,#ourtop5,#individual').is(':checked')) {
		$("#showparticular").prop("checked", true);
	}
});
/* For filter */
$("#season").click( function(){
	if($('#season').is(':checked')) {
		$("#atlanticseason").prop("checked", true);
	}
});
$("#atlanticseason,#pacificseason").click(function(){
	if($('#atlanticseason,#pacificseason').is(':checked')) {
		$("#season").prop("checked", true);
	}
});
$("#season, #particulardate, #particularmonth, #particularyear, #selectedinterval").change(function () {
	if($('#particulardate').is(':checked')){
		$("#atlanticseason, #pacificseason").prop("checked", false);	
	}
});
$("#particulardatepicker,#fromdatepicker").datepicker({
	defaultDate: '01/01/2010',
	changeMonth: true,
    changeYear: true
});
$("#enddatepicker").datepicker({
	defaultDate: '01/01/2011',
	changeMonth: true,
    changeYear: true
});


// On change of controls
// Ocean selection controls
$("#atlantic, #nepacific, #ncpacific").click(function(){
	if($('#atlantic').is(':checked')) { ocean_atlantic = "true"; } else if(!$('#atlantic').is(':checked')) { ocean_atlantic = "false"; }
	if($('#nepacific').is(':checked')) { ocean_nepacific = "true"; } else if(!$('#nepacific').is(':checked')) { ocean_nepacific = "false"; }
	if($('#ncpacific').is(':checked')) { ocean_ncpacific = "true"; } else if(!$('#ncpacific').is(':checked')) { ocean_ncpacific = "false"; }
});
// Show controls
$("#showall").click( function(){
	showall = "true";
	showparticular = "false";
});
$("#top5,#top10,#ourtop5,#individual,#showparticular").click(function(){
	if($('#top5,#top10,#ourtop5,#individual').is(':checked')) {
		if($('#top5').is(':checked')) { showparticular = "top5"; showall = "false"}
		if($('#top10').is(':checked')) { showparticular = "top10"; showall = "false"}
		if($('#ourtop5').is(':checked')) { showparticular = "ourtop5"; showall = "false"}
		if($('#individual').is(':checked')) { showparticular = "individual"; showall = "false"}
	}
});
// Order controls
$("#alphabetical,#chronological,#maxwind,#minpressure").click(function(){
	if($('#alphabetical').is(':checked')) { orderby = "alphabetical";}
	if($('#chronological').is(':checked')) { orderby = "chronological";}
	if($('#maxwind').is(':checked')) { orderby = "maxwind";}
	if($('#minpressure').is(':checked')) { orderby = "minpressure";}
	console.log(orderby);
});

// Filter controls
// For season
$("#time,#atlanticseason,#pacificseason").click(function(){
	if($('#atlanticseason').is(':checked')) { time = "atlanticseason";}
	if($('#pacificseason').is(':checked')) { time = "pacificseason";}
	$("#particulardatepicker").val("Pick a date");
	$('#year').val('All');
	$("#year").selectmenu("refresh");
	$('#month').val('Select month');
	$("#month").selectmenu("refresh");
	$("#fromdatepicker").val("Pick a date");
	$("#enddatepicker").val("Pick a date");
	interval1 = "false"; interval2 = "false";
});
// On selecting particular date
$("#particulardate").click(function(){
	$("#particulardatepicker").val("01/01/2010");
	time = $("#particulardatepicker").val();
	$('#year').val('All');
	$("#year").selectmenu("refresh");
	$('#month').val('Select month');
	$("#month").selectmenu("refresh");
	$("#atlanticseason, #pacificseason").prop("checked", false);
	$("#fromdatepicker").val("Pick a date");
	$("#enddatepicker").val("Pick a date");
	interval1 = "false"; interval2 = "false";
})
$("#particulardatepicker").change(function(){
	time = $("#particulardatepicker").val();
	$("#particulardate").prop("checked", true);
	$("#atlanticseason, #pacificseason").prop("checked", false);
	$('#year').val('All');
	$("#year").selectmenu("refresh");
	$('#month').val('Select month');
	$("#month").selectmenu("refresh");
	$("#fromdatepicker").val("Pick a date");
	$("#enddatepicker").val("Pick a date");
	interval1 = "false"; interval2 = "false";
});
// On selecting particular month
$("#particularmonth").click(function(){
	$('#month').val('January');
	$("#month").selectmenu("refresh");
	$("#atlanticseason, #pacificseason").prop("checked", false);
	time = "January";
	$("#particulardatepicker").val("Pick a date");
	$('#year').val('All');
	$("#year").selectmenu("refresh");
	$("#fromdatepicker").val("Pick a date");
	$("#enddatepicker").val("Pick a date");
	interval1 = "false"; interval2 = "false";
});
$('#month').selectmenu({
    change: function( event, ui ) {
    	time = (ui.item.value);
    	$("#particulardatepicker").val("Pick a date");
    	$("#particularmonth").prop("checked", true);
    	$("#atlanticseason, #pacificseason").prop("checked", false);
    	$('#year').val('All');
		$("#year").selectmenu("refresh");
		$("#fromdatepicker").val("Pick a date");
		$("#enddatepicker").val("Pick a date");
		interval1 = "false"; interval2 = "false";
    }
});
// On selecting particular year
$("#particularyear").click(function(){
	$('#year').val('2014');
	$("#year").selectmenu("refresh");
	$('#month').val('Select month');
	$("#month").selectmenu("refresh");
	time = "2014";
	$("#particulardatepicker").val("Pick a date");
	$("#atlanticseason, #pacificseason").prop("checked", false);
	$("#fromdatepicker").val("Pick a date");
	$("#enddatepicker").val("Pick a date");
	interval1 = "false"; interval2 = "false";
});
$('#year').selectmenu({
    change: function( event, ui ) {
    	time = (ui.item.value);
    	$("#particulardatepicker").val("Pick a date");
    	$("#particularyear").prop("checked", true);
    	$("#atlanticseason, #pacificseason").prop("checked", false);
    	$('#month').val('Select month');
		$("#month").selectmenu("refresh");
		$("#fromdatepicker").val("Pick a date");
		$("#enddatepicker").val("Pick a date");
		interval1 = "false"; interval2 = "false";
    }
});
// On selecting particular interval
$("#selectedinterval").click(function(){
	$("#particulardatepicker").val("Pick a date");
	$("#selectedinterval").prop("checked", true);
	$("#atlanticseason, #pacificseason").prop("checked", false);	
	$('#year').val('All');
	$("#year").selectmenu("refresh");
	$('#month').val('Select month');
	$("#month").selectmenu("refresh");
	$("#fromdatepicker").val("01/01/2010");
	$("#enddatepicker").val("01/01/2011");
});
$("#fromdatepicker, #enddatepicker").change(function(){
	if(($("#fromdatepicker").val()!="Pick a date") && ($("#enddatepicker").val()!="Pick a date")){
		time = "false";
		interval1 = $("#fromdatepicker").val();
		interval2 = $("#enddatepicker").val();
		console.log(interval1,interval2);
		$("#particulardatepicker").val("Pick a date");
    	$("#selectedinterval").prop("checked", true);
    	$("#atlanticseason, #pacificseason").prop("checked", false);	
    	$('#year').val('All');
		$("#year").selectmenu("refresh");
		$('#month').val('Select month');
		$("#month").selectmenu("refresh");
	}
});
// Landfall Controls
$("#landfallmade, #landfallnotmade").click(function(){
	if($('#landfallmade').is(':checked')) { landfall = "landfallmade"; }
	if($('#landfallnotmade').is(':checked')) { landfall = "landfallnotmade"; }
	console.log(landfall);
});

// Clearing filters
$("#cleartime, #clearlandfall, #clearwindspeed, #clearpressure").click(function(){
	var element = $(this).attr("id");
	if(element=="cleartime"){
		$("#particulardatepicker").val("Pick a date");
		$('#year').val('All');
		$("#year").selectmenu("refresh");
		$('#month').val('Select month');
		$("#month").selectmenu("refresh");
		$("#fromdatepicker").val("Pick a date");
		$("#enddatepicker").val("Pick a date");
		interval1 = "false"; interval2 = "false";
		$("#atlanticseason, #pacificseason, #season, #particulardate, #particularmonth, #particularyear, #selectedinterval").prop("checked", false);
		time = "false";
	}
	if(element=="clearlandfall"){
		$("#landfallmade, #landfallnotmade").prop("checked", false);
		landfall = "default";
	}
	if(element=="clearwindspeed"){
		var $slider = $("#wind-slider");
		$slider.slider("values", 0, 0);
		$slider.slider("values", 1, 165);
		$( "#windSpeedMin" ).html("Min: " + "0");
		windspeedmin = 0;
		$( "#windSpeedMax" ).html("Max: " + "165");
		windspeedmax = 165;
	}
	if(element=="clearpressure"){
		var $slider = $("#pressure-slider");
		$slider.slider("values", 0, 882);
		$slider.slider("values", 1, 1024);
		$( "#pressureMin" ).html("Min: " + "882");
		pressuremin = 882;
		$( "#pressureMax" ).html("Max: " + "1024");
		pressuremax = 1024;
	}
});

// Sending on button click
$(".actionbutton").click(function(){
	ajax_call();
	first_time = "true";
	// Updating filter count
	var ocean_count = 0;
	if(ocean_atlantic=="true"){ocean_count++;}
	if(ocean_nepacific=="true"){ocean_count++;}
	if(ocean_ncpacific=="true"){ocean_count++;}
	$("#ocean-number").html(ocean_count);

	var filter_count = 0;
	if((time != "false")||(interval1 != "false")||(interval2 != "false")){ filter_count++; }
	if(landfall != "default"){ filter_count++; }
	if((windspeedmin != "0")||(windspeedmax != "165")){ filter_count++; }
	if((pressuremin != "882")||(pressuremax != "1024")){ filter_count++; }

	$("#filter-number").html(filter_count);	
	if(filter_count>0){$("#filternumber2").show();}
	if(filter_count==0){$("#filternumber2").hide();}
});
function ajax_call() {

	// Watson's code
	var var_ret;
	var hid = [];
	var hname = [];
	var startdate = [];

	var xmlhttp=false;
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	  xmlhttp = new XMLHttpRequest();
	}
	var text = $("#text").val();
	var query = "../php/getData.php?ocean_atlantic="+ocean_atlantic+"&ocean_nepacific="+ocean_nepacific+"&ocean_ncpacific="+ocean_ncpacific+"&showall="+showall+"&showparticular="+showparticular+"&orderby="+orderby+"&time="+time+"&interval1="+interval1+"&interval2="+interval2+"&landfall="+landfall+"&windspeedmin="+windspeedmin+"&windspeedmax="+windspeedmax+"&pressuremin="+pressuremin+"&pressuremax="+pressuremax;
	xmlhttp.open("GET", query, true);
	xmlhttp.onreadystatechange=function() 
	{
		if (xmlhttp.readyState==4) 
		{
			var_ret = JSON.parse(xmlhttp.responseText);
			//alert((xmlhttp.responseText));
			//console.log((var_ret));
			alert(var_ret.length);
			if (var_ret.length == 0)
			{
				alert("Sorry! No hurricane records for the given fiters.");
			}
			else
			{
					for(i=0;i<var_ret.length;i++)
					{
						hid.push(var_ret[i][0]);
						hname.push(var_ret[i][1]);
						startdate.push(var_ret[i][2]);
					}
					//alert(hid);
					//alert(hname);
					//alert(startdate);
					var hurricaneList = document.getElementById("Hurricane_list");
					hurricaneList.innerHTML = " ";
					alert(hname.length);
					for(i=0;i<hname.length;i++)
					{ 		
						var newListItem = document.createElement("li");
						//alert(hname[i].substr(0,2));
						if(hid[i] == hname[i])
						{
							if (hname[i].substr(0,2) == "AL")
							{
								newListItem.innerHTML = "ATLANTIC " + hname[i].substr(2,2) + " " + hname[i].substr(4,(hname[i].length-2));
							}
							else if ((hname[i].substr(0,2) == "EP") || (hname[i].substr(0,2) == "CP"))
							{
							newListItem.innerHTML = "PACIFIC " + hname[i].substr(2,2) + " " + hname[i].substr(4,(hname[i].length-2));
							}
						}
						else
						{
						//var newListItem = document.createElement("li");
						newListItem.innerHTML = hname[i].substring(0,hname[i].length-4) + " " + hname[i].substr(-4,hname[i].length);
						}
						hurricaneList.appendChild(newListItem);
					}
					alert(hid);
					get_Id(hid);
					//heatMap();
			}
		}
	}
	xmlhttp.send(null)
	return false;
}

// GRAPHS
//First graph
$("#section1 .switch1").click(function(){
	$("#section1 .switcher").css("left","0");
	$("#section1 .switcher").css("border-radius","10px 0 0 10px");
	$("#section1 .switch2").css("color","#333");
	$("#section1 .switch1").css("color","#FFF");
	$("#section1 .graphs-container").css("margin-left","-1984px");
});	
$("#section1 .switch2").click(function(){
	$("#section1 .switcher").css("left","200px");
	$("#section1 .switcher").css("border-radius","0 10px 10px 0");
	$("#section1 .switch1").css("color","#333");
	$("#section1 .switch2").css("color","#FFF");
	$("#section1 .graphs-container").css("margin-left","0");
});	

//Second Graph
$("#section2 .switch1").click(function(){
	$("#section2 .switcher").css("left","0");
	$("#section2 .switcher").css("border-radius","10px 0 0 10px");
	$("#section2 .switch2").css("color","#333");
	$("#section2 .switch1").css("color","#FFF");
	$("#section2 .graphs-container").css("margin-left","-1984px");
});	
$("#section2 .switch2").click(function(){
	$("#section2 .switcher").css("left","300px");
	$("#section2 .switcher").css("border-radius","0 10px 10px 0");
	$("#section2 .switch1").css("color","#333");
	$("#section2 .switch2").css("color","#FFF");
	$("#section2 .graphs-container").css("margin-left","0");
});	

// Hide filter and order section for selected categories of hurricanes
$("#showparticular, #top5, #top10, #ourtop5, #individual").click(function(){
	$("#orderby, #filterby").css("visibility","hidden");
});
$("#showall").click(function(){
	$("#orderby, #filterby").css("visibility","visible");
});

// Play pause controls
$(".play").click(function(){
	$(this).hide();
	$(".pause").show();	
});
$(".pause").click(function(){
	$(this).hide();
	$(".play").show();
});
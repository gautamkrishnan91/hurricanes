
    var streets=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
           //maxZoom: 18,
           id: 'mapbox.streets',
          continuousWorld: 'true',
          noWrap: 'true'
       });

       var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
           //maxZoom: 18,
           id: 'mapbox.streets-satellite',
          continuousWorld: 'true',
          noWrap: 'true'
       });

       var dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
           //maxZoom: ,
           id: 'mapbox.dark',
          continuousWorld: 'true',
          noWrap: 'true'
       });
      
       var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
           //maxZoom: 18,
           id: 'mapbox.outdoors',
          continuousWorld: 'true',
          noWrap: 'true'
       });

       var pirates = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
           //maxZoom: 18,
           id: 'mapbox.pirates',
          continuousWorld: 'false',
          noWrap: 'false'
       });
    var windLayer = L.layerGroup([]);
     
     var map=L.map('map',{layers: [pirates,windLayer],
                center: [30.8833, -97.0167],
               zoom: 6,
              continuousWorld: 'false',
              noWrap: 'false'
                  });

 var baseMaps = { "Streets" : streets,
             "Satellite" : satellite,
             "Dark": dark,
             "Outdoors": outdoors,
             "Pirates" : pirates
         };
    var myIcon = L.icon({
    iconUrl: 'images/hurricane.gif',  	//This is a rotating marker that is used during Season Playback
    iconSize: [38, 38],
    iconAnchor: [19, 37],
	});
       

        var myTropicalIcon = L.icon({
    iconUrl: 'images/Tornado-512.png',	// This is a static marker that is used during general playback
    iconSize: [38, 38],
    iconAnchor: [19, 37],
	});	 

      var step=1000;
      var speed=step/4;
      console.log(speed);
      var markerLayer = []; 						// Create Layer for each component related to the hurricane
	  var polyLayer = [];
	  var quadrophonicLayer= [];
      var pointsAdded = []; 						// This variable keeps track of latlong values added for each hurricane 
	  var var_ret=[];								// Stores the values fetched from php query
	  var limit= [];								// Stores the total lat long values for a particular hurricane
	  var identity= ["AL012001","AL022001","AL032001","AL042001","AL052001","AL062001","AL072001","AL082001","AL092001","AL102001","AL112001","AL122001","AL132001","AL142001","AL152001","AL162001","AL172001","AL012002","AL022002","AL032002"];
	  var startdates=[20010605,20010711,20010802,20010814,20010822,20010901,20010907,20010911,20010919,20010921,20011004,20011006,20011011,20011027,20011029,20011104,20011123,20020714,20020804,20020805];
	  var enddates=[20010619,20010712,20010808,20010822,20010829,20010917,20010919,20010921,20010920,20010927,20011009,20011008,20011015,20011031,20011106,20011106,20011204,20020719,20020809,20020808]
	  var j=0; 
	  var timer=0;  //timer clock tick - ticks at 1 day per second by default
	  var flag=true; // 
	  var resume=false;
	  var playstate=[];
	  var playbySeason=true;
	  var season=true;

	  create_date();
	  var tomorrow = new Date(startdates[0]);
	  //****************------------------------------***********************
	  //**********-----------------------------------------------************
	  
	  
	  
	  function get_Identity(hurr_list,sdates,edates,pbs)  //This function accepts list of hurricanes, start date , end date of each hurricane and plotbyseason bool value
	  {
	  		identity=hurr_list;
	  		startdates=sdates;
	  		enddates=edates;
	  		playbySeason=pbs;
			create_date();
	  		if(playbySeason)
	  		{
	  			var tomorrow = new Date(startdates[0]);
	  			start_Timer();
	  		}
	  		else
	  			plot_all_hurricanes();

	  }

	 
	 function create_date()
	 {
	 	for(s=0; s<startdates.length;s++)
	 	{
	 		startdates[s]=new Date(startdates[s].toString().substring(0, 4)+"/"+startdates[s].toString().substring(4,6)+"/"+startdates[s].toString().substring(6,8));
	 		enddates[s]= new Date(enddates[s].toString().substring(0, 4)+"/"+enddates[s].toString().substring(4,6)+"/"+enddates[s].toString().substring(6,8));
	 	}
	 	
	 }
	 function start_Timer() //Timer Function that plays hurricanes based on date
	{
		
		document.getElementById("progressBar").setAttribute("max",(Math.floor((enddates[enddates.length-1] - startdates[0]) /(60*60*24*1000)))) ;
		 document.getElementById("progressBar").setAttribute("value",(Math.floor((tomorrow - startdates[0]	) /(60*60*24*1000)))) ;
	console.log("j"+j);

		if(j<identity.length && +startdates[j]===+tomorrow)
		{
			
				map.removeLayer(map._layers);
			
			
			get_Data(identity[j],j);

			console.log(j);
			j++;
		}
		tomorrow.setDate(tomorrow.getDate() + 1)
		
		//document.getElementById("details").innerHTML=tomorrow +"<br>"+"Next Hurricane is "+identity[j]+"<br>"+"and will start forming on :"+startdates[j];	
		
		
		//alert(pointsAdded+" "+pointsAdded[j-1]);

		 if ( tomorrow < enddates[enddates.length-1] && season==true ) window.setTimeout(function(){start_Timer();},step);
		 /*if(timer == identity.length)
		 {
		 	
		 	timer=0;
		 	j=0;
		 }*/
}

	 
function resume_plotting()  // Reload State variables once resumed
{

	//markerLayer.clearLayers();
	flag=true;
	if(playbySeason)markerLayer[j-1].clearLayers();
	else markerLayer[j].clearLayers();
	var resume_state = localStorage.getItem("current_state");
	pointsAdded = JSON.parse(resume_state);
	console.log(pointsAdded);
	if(playbySeason==true)
	{
		season=true;
		for(x=0;x<j;x++)
		{
			if(pointsAdded[x]<limit[x])
				get_Data(identity[x],x);

		}
		
		start_Timer();
	}
	else
		plot_all_hurricanes();
	
	
}

function pause_plotting() //Pause Plotting when pause is pressed
{	
	
	console.log("Points Added = "+pointsAdded[0]+" limit ="+limit[0]);
	season=false;
	flag=false;
	for(k=0;k<pointsAdded.length;k++)
	var hurricane_state = pointsAdded;
	localStorage.setItem("current_state", JSON.stringify(hurricane_state));
	var resume_state = localStorage.getItem("current_state");
	//console.log(resume_state);

}


 function plot_all_hurricanes() //Plot hurricanes that do not have a particular chronological order
{
	flag=false;
	playbySeason=false;
	document.getElementById("progressBar").setAttribute("max",(identity.length-1)) ;
		 document.getElementById("progressBar").setAttribute("value",(j) );
	
			//document.getElementById("details").innerHTML="<br>"+"Current Hurricane is "+identity[j]+"<br>"+"and started forming on :"+startdates[j];
				
			console.log(j);
			get_Data(identity[j],j);
			
	
	
} 

function increase_speed() //Speed Controller function
{
	if(playbySeason)
	{
		step=step-100;
		speed=step/4;
	}
	else
	{
		
		speed=speed-100;
	}
}
function decrease_speed()
{
	if(playbySeason)
	{
		step=step+100;
		speed=step/4;
	}
	else
	{
		speed=speed+100;
	}
	
}



function get_Data(hurr_id,hurr_no)   // Fetch data for each individual hurricane
	{

		 var latvalues=[];
      var lngvalues=[];
      var hwind=[];
      var h34=[];
      var h50=[];
      var h64=[];
      var hstatus=[];
	  var polyline = L.polyline([]);
	  if(markerLayer[hurr_no]==null)
	  {
	   markerLayer[hurr_no]=L.layerGroup([]);	
	  polyLayer[hurr_no]=L.layerGroup([]);
	   quadrophonicLayer[hurr_no]=L.layerGroup([]);
	  polyLayer[hurr_no].addTo(map);
	  markerLayer[hurr_no].addTo(map);
	  quadrophonicLayer[hurr_no].addTo(map);	
	}
	  if(playbySeason)
		var marker = L.marker([0, 0],{icon: myIcon});
	else
		var marker = L.marker([0,0],{icon: myTropicalIcon});

		flag=true;
		console.log(hurr_id);
		var xmlhttp=false;
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
		{
		  xmlhttp = new XMLHttpRequest();
		}
		
		var query = "../php/getPlotData.php?query="+hurr_id;
		xmlhttp.open("GET", query, false);
		xmlhttp.onreadystatechange=function() 
		{
			if (xmlhttp.readyState==4) 
			{			
				
					var_ret = JSON.parse(xmlhttp.responseText);
					console.log(var_ret);
			}
					//console.log(var_ret[0][6]);
					//console.log(var_ret);
					

				var polyline = L.polyline([]).addTo(polyLayer[hurr_no]);
				//var pointsAdded = [];
				
				var latvalues = [];
				var lngvalues = [];
				if(pointsAdded[hurr_no]==null)	pointsAdded[hurr_no]=0;
				limit[hurr_no]=var_ret.length-1;
				console.log("limit "+limit[hurr_no]);
				
				for(i=0;i<var_ret.length;i++)
				{
					latvalues.push(+var_ret[i][6]);
				
					lngvalues.push(0-var_ret[i][7]); 

					hwind.push(+var_ret[i][8]); 

						h34.push((((+var_ret[i][10])+(+var_ret[i][11])+(+var_ret[i][12])+(+var_ret[i][13]))/4)*1852);
						h50.push((((+var_ret[i][14])+(+var_ret[i][15])+(+var_ret[i][16])+(+var_ret[i][17]))/4)*1852);
						h64.push((((+var_ret[i][18])+(+var_ret[i][19])+(+var_ret[i][20])+(+var_ret[i][21]))/4)*1852);

					hstatus.push(var_ret[i][5]);


				}
				
				if(pointsAdded[hurr_no]==limit[hurr_no])
					pointsAdded[hurr_no]--;		
				draw_hurricanes();  // Draw each hurricane
				
	
		
			function draw_hurricanes() 
			{

				 var colorline='blue';
				// Below code draws polyline along the path of the hurricane
			   polyline.addLatLng(
			   L.latLng(latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded[hurr_no]]));
			   if(hwind[pointsAdded[hurr_no]]>40 && playbySeason==true)
			   	  colorline= 'red';
			   	else
			   	 colorline= 'blue';
			   polyline.setStyle(
			   	{
                color: colorline,
                weight: 2,
                opacity: .7,
                dashArray: '15,5',
                lineJoin: 'round'
            });
			  /* L.circle([latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded]],(hwind[pointsAdded[hurr_no]]-100)*5000,{
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.2,
			    stroke: false
			}).addTo(map);*/
      			if(h34[pointsAdded[hurr_no]]!=(-999) || h50[pointsAdded[hurr_no]]!=(-999) || h64[pointsAdded[hurr_no]]!=(-999))
      			{
      				
				      L.circle([latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded[hurr_no]]],h34[pointsAdded[hurr_no]],{
							    color: 'Green',
							    fillColor: '#009900', //Red
							    fillOpacity: 0.2,
							    stroke: false
							}).addTo(quadrophonicLayer[hurr_no]);
				      L.circle([latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded[hurr_no]]],h50[pointsAdded[hurr_no]],{
							    color: 'Amber',
							    fillColor: '#FFBF00', //Amber
							    fillOpacity: 0.2,
							    stroke: false
							}).addTo(quadrophonicLayer[hurr_no]);
				      L.circle([latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded[hurr_no]]],h64[pointsAdded[hurr_no]],{
							    color: 'Red',
							    fillColor: '#C0392B', //Red
							    fillOpacity: 0.2,
							    stroke: false
							}).addTo(quadrophonicLayer[hurr_no]);
		 	 	}

			
			  if(identity.length==1) map.setView([latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded[hurr_no]]]);
			  window.setInterval(function() {
			  	
					marker.bindPopup(hurr_id);
			  	 marker.on('mouseover', function (e) {
            			
       			 });
       			 
        			
       			marker.setLatLng(L.latLng(latvalues[pointsAdded[hurr_no]],lngvalues[pointsAdded[hurr_no]]));},speed);
			  	
					
					
       			marker.addTo(markerLayer[hurr_no]);
       			

			   if (++pointsAdded[hurr_no] < limit[hurr_no] && flag==true) window.setTimeout(function(){draw_hurricanes();},speed);
			   if(flag==false)
			   {
			   		
			   }
			   if(pointsAdded[hurr_no] == limit[hurr_no] )
			  {
			  	if(!playbySeason)
			  	{
			  		if ( ++j < identity.length) plot_all_hurricanes();
			  	}
			  	map.removeLayer(markerLayer[hurr_no]);
			  	map.removeLayer(polyLayer[hurr_no]);
			  	map.removeLayer(quadrophonicLayer[hurr_no]);

			   	
			  }
			   
			}
		}

	


		
		xmlhttp.send(null)
		console.log("here "+j);

		return false;	
		
	}
		function clearMap() {
    map.eachLayer(function (layer) {
    map.removeLayer(layer);
});

}

// Integration code
$(".play").click(function(){
	if(first_time=="true"){
		start_Timer();
	}
	else{
		resume_plotting();
	}
	first_time = "false";
});
$(".pause").click(function(){
	pause_plotting();
});
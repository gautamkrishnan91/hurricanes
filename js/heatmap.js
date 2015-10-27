 
 //var heatLayer = L.layerGroup([]);
var pointsAdded1 = 0;
function heatMap()
{
  windLayer.eachLayer(function(layer)
  {
      map.removeLayer(layer);
  });
  windLayer.clearLayers();
  pressureLayer.clearLayers();
  circleLayer.clearLayers();
  typeLayer.clearLayers();
  pressureLayer.eachLayer(function(layer)
  {
      map.removeLayer(layer);
  });

  circleLayer.eachLayer(function(layer)
  {
      map.removeLayer(layer);
  });
  for(k=0;k<polyLayer.length;k++)
  {
    polyLayer[k].clearLayers();
    markerLayer[k].clearLayers();
    quadrophonicLayer[k].clearLayers();
  }
  
	var heat_return;
	var xmlhttp1 = false;
	if (!xmlhttp1 && typeof XMLHttpRequest!='undefined') 
    {
      xmlhttp1 = new XMLHttpRequest();
    }
                  var querydata = "/php/getHeatData.php?query=";
                  
                xmlhttp1.open("GET", querydata, false);
                xmlhttp1.onreadystatechange=function() 
                {
                        if (xmlhttp1.readyState==4) 
                           { 
                           		var latvalues1;
                                var lngvalues1;
                                var windspeed1;
                                var pressure1;
                                var htype1;
                                var hstatus1;
                                var h34h;
                                var h50h;
                                var h64h;
                                
                           		heat_return = JSON.parse(xmlhttp1.responseText);
                           		console.log(heat_return);
                           		for(j=0;j<heat_return.length;j++)
                           		{
                           		 latvalues1= +heat_return[j][6];
                           		 lngvalues1= 0-heat_return[j][7];
                                 windspeed1= +heat_return[j][8];
                                 h34h = ((((+heat_return[j][10])+(+heat_return[j][11])+(+heat_return[j][12])+(+heat_return[j][13]))/4)*1852);
                                 h50h= ((((+heat_return[j][14])+(+heat_return[j][15])+(+heat_return[j][16])+(+heat_return[j][17]))/4)*1852);
                                 h64h= ((((+heat_return[j][18])+(+heat_return[j][19])+(+heat_return[j][20])+(+heat_return[j][21]))/4)*1852);     
                                 heatdraw();
                                 
								}

                                alert(latvalues1);
                                alert(lngvalues1);
                                alert(h34h);
                                alert(h50h);
                                alert(h64h); 
                                var pointsAdded1 = 0;  
                                function heatdraw()
                                {
                                    
                                		L.circle([latvalues1,lngvalues1],h34h,{
                                                                color: 'Blue',
                                                                fillColor: '#3366FF', 
                                                                fillOpacity: 0.4,
                                                                stroke: false
                                                            }).addTo(heatLayer);
                                        L.circle([latvalues1,lngvalues1],h50h,{
                                                                color: 'Yellow',
                                                                fillColor: '#FFFF4D',
                                                                fillOpacity: 0.6,
                                                                stroke: false
                                                            }).addTo(heatLayer);
                                       	L.circle([latvalues1,lngvalues1],h64h,{
                                                                color: 'Red',
                                                                fillColor: '#FF0000',
                                                                fillOpacity: 0.8,
                                                                stroke: false
                                                            }).addTo(heatLayer);
                                        heatLayer.addTo(map);
                               	}             
                           }
                 }
	xmlhttp1.send(null)
    return false;
}
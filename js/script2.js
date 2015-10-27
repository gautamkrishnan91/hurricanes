
      //var map = L.map('map').setView([38.8833,-97.0167], 9);
       var hdat=null;
      
      var latvalues=[];
        var lngvalues=[];
        var pointsAdded = 0;


  

function get_Id(identity)
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
  
    heatLayer.clearLayers();
  
  
  for(i=0;i<identity.length;i++)
  {
    getData(identity[i]);
  }
}

                  var pressureLayer = L.layerGroup([]);
                  var circleLayer = L.layerGroup([]);
                  var typeLayer = L.layerGroup([]);
var overLayers = {"Windspeed based":windLayer,
                  "Quadrophonic":circleLayer,
                  "Pressure based":pressureLayer,
                  "Hurricane Type":typeLayer};

  /*var map=L.map('map',{layers: [pirates,windLayer],
                center: [20.8833, -97.0167],
                  zoom: 3});*/
L.control.layers(baseMaps,overLayers).addTo(map);  


                                
                                  var temp = 0;
function getData(id)
{
  
//  map.removeLayer(line);
  var var_ret;
  var xmlhttp=false;
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
    {
      xmlhttp = new XMLHttpRequest();
    }
                  var querydata = "/php/getDataStatic.php?query="+id;
                xmlhttp.open("GET", querydata, false);
                xmlhttp.onreadystatechange=function() 
                {
                        if (xmlhttp.readyState==4) 
                           { 
                                var_ret = JSON.parse(xmlhttp.responseText);
                                
                                var latvalues = [];
                                var lngvalues = [];
                                var windspeed = [];
                                var pressure = [];
                                var htype = [];
                                var hstatus = [];
                                var h34 = [];
                                var h50 = [];
                                var h64 = [];
                                var hname = var_ret[0][1];

                                for(j=0;j<var_ret.length;j++)
                                        {       latvalues.push(+var_ret[j][6]);
                                                //console.log(("latvalues"+var_ret[j][6]));
                                                lngvalues.push(0-var_ret[j][7]);
                                                windspeed.push(+var_ret[j][8]);
                                                pressure.push(+var_ret[j][9]); 
                                                h34.push((((+var_ret[j][10])+(+var_ret[j][11])+(+var_ret[j][12])+(+var_ret[j][13]))/4)*1852);
                                                h50.push((((+var_ret[j][14])+(+var_ret[j][15])+(+var_ret[j][16])+(+var_ret[j][17]))/4)*1852);
                                                h64.push((((+var_ret[j][18])+(+var_ret[j][19])+(+var_ret[j][20])+(+var_ret[j][21]))/4)*1852);     
                                                hstatus.push(var_ret[j][5]);                            
                                                
                                              if (latvalues.length == 2)
                                              {
                                                //alert("gonna draw");
                                                    
                                                    //console.log(latvalues+"before adding and reducing"+latvalues.length);
                                                    add();
                                                     latvalues[0] = latvalues[1] ;
                                                      latvalues.length--;
                                                      //console.log(latvalues+"After adding and reducing"+latvalues.length);
                                                    lngvalues[0] = lngvalues[1] ;
                                                      lngvalues.length--;
                                                      windspeed[0] = windspeed[1] ;
                                                      windspeed.length--;
                                                    pressure[0] = pressure[1] ;
                                                      pressure.length--;

                                                    h34[0] = h34[1] ;
                                                      h34.length--;
                                                    h50[0] = h50[1] ;
                                                      h50.length--;
                                                      h64[0] = h64[1] ;
                                                      h64.length--;
                                                    hstatus[0] = hstatus[1] ;
                                                      hstatus.length--;
                                                    
                                              }
                                        }
                                        //alert(latvalues);
                                        //alert(lngvalues);
                                
                                function add()
                                {
                                  var pointsAdded = 0;
                                  //console.log(latvalues + "As received in add func"+" --"+windspeed+"--"+windspeed.length+"--"+pointsAdded);
                                     
                                  if(pointsAdded < windspeed.length)
                                  { 
                                    //Draw a new line for every hurricane
                                   var polyline1 = L.polyline([]);
                                  var circle1 = L.circle([]);
                                  var polyline2 = L.polyline([]);

                                  //Call draw function for drawing lines for the coordinates
                                  draw(polyline1,circle1,polyline2);
                                  }
                                  
                                  //If in case the pointsadded are not cleared then clear all related variables
                                  else
                                  { 
                                    //console.log(pointsAdded);
                                    pointsAdded = 0;
                                  }
                                }
                                function draw(polyline1,circle1,polyline2)
                                {  
                                    //Note down the coordinates being added
                                    
                                    var cord_color = ["#5EBAFF","#00FAF4","#FFFFCC","#FFE775","#FFC140","#FF8F20","#FF6060","black"];
                                    var ind;
                                    
                                      if (windspeed[pointsAdded] <= 33 && windspeed[pointsAdded] > 0)
                                    {
                                      ind =0;
                                    }
                                    else if (windspeed[pointsAdded] <= 63 && windspeed[pointsAdded] > 33)
                                     {
                                      ind =1;
                                     }
                                    else if (windspeed[pointsAdded] <= 82 && windspeed[pointsAdded] > 63 )
                                     {
                                      ind =2;
                                     }
                                     else if (windspeed[pointsAdded] <= 95 && windspeed[pointsAdded] > 82 )
                                     {
                                      ind =3;
                                     }
                                     else if (windspeed[pointsAdded] <= 112 && windspeed[pointsAdded] > 95)
                                     {
                                      ind =4;
                                     }
                                     else if (windspeed[pointsAdded] <= 136 && windspeed[pointsAdded] > 112)
                                     {
                                      ind =5;
                                     }
                                     else if (windspeed[pointsAdded] >= 137)
                                     {
                                      ind =6;
                                     }
                                     else 
                                     {
                                      //alert("Point not mapped : " +windspeed[pointsAdded]);
                                      ind =7;
                                      //console.log("Color id : "+ ind);
                                     }
                                     
                                    
                                      //console.log(windspeed[pointsAdded]+" "+ind); 
                                     var cord_color1 = ["#FF0000","#FFFF29","#52FF00","#000000","#63FF16","#63FF16","#52FF00","#FFBC38","#CCB790","Gray"];
                                     
                                     var hstatus_ind = 0;

                                     if(hstatus[pointsAdded] == " HU")
                                     {
                                      //alert("Hurricane spotted");
                                        hstatus_ind = 0;
                                     }
                                     else if(hstatus[pointsAdded] == " TS")
                                     {
                                        hstatus_ind = 1;
                                     }
                                     else if(hstatus[pointsAdded] == " TD")
                                     {
                                        hstatus_ind = 2;
                                     }

                                     else if(hstatus[pointsAdded] == " EX")
                                     {
                                        hstatus_ind = 3;
                                     }

                                     else if(hstatus[pointsAdded] == " WW")
                                     {
                                        hstatus_ind = 4;
                                     }

                                     else if(hstatus[pointsAdded] == " LO")
                                     {
                                        hstatus_ind = 5;
                                     }
                                      else if(hstatus[pointsAdded] == " SD")
                                     {
                                        hstatus_ind = 6;
                                     }
                                     else if(hstatus[pointsAdded] == " SS")
                                     {
                                        hstatus_ind = 7;
                                     }
                                     else if(hstatus[pointsAdded] == " DB")
                                     {
                                        hstatus_ind = 8;
                                     }
                                     else
                                     {
                                      hstatus_ind = 9;
                                     }

                                         var cssIcon = L.divIcon({
                                            // Specify a class name we can refer to in CSS.
                                            className: 'css-icon',
                                            html: hstatus[pointsAdded],
                                            // Set marker width and height
                                            });
                                       var  markertypes=L.marker([0,0],{icon:cssIcon});

                                       markertypes.setLatLng(L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded])).addTo(typeLayer);
                                        markertypes.on('mouseover', function (e) {
                                          document.getElementById("details").innerHTML="<br>"+"Selected Hurricane is "+hname+"  Windspeed : "+windspeed[pointsAdded]+"<br>Pressure(in millibars) :" + pressure[pointsAdded] + "  Status :"+ hstatus[pointsAdded]});
                                         



                                      if(h34[pointsAdded]!=(-999) || h50[pointsAdded]!=(-999) || h64[pointsAdded]!=(-999))
                                                 {
                                                      L.circle([latvalues[pointsAdded],lngvalues[pointsAdded]],h34[pointsAdded],{
                                                                color: 'Blue',
                                                                fillColor: '#009900 ', //Red
                                                                fillOpacity: 0.4,
                                                                stroke: false
                                                            }).addTo(circleLayer);
                                                      L.circle([latvalues[pointsAdded],lngvalues[pointsAdded]],h50[pointsAdded],{
                                                                color: 'Amber',
                                                                fillColor: '#FFBF00 ', //Amber
                                                                fillOpacity: 0.6,
                                                                stroke: false
                                                            }).addTo(circleLayer);
                                                      L.circle([latvalues[pointsAdded],lngvalues[pointsAdded]],h64[pointsAdded],{
                                                                color: 'Red',
                                                                fillColor: '#C0392B ', //Red
                                                                fillOpacity: 0.8,
                                                                stroke: false
                                                            }).addTo(circleLayer);
                                                  }
                                                   
                                         
                                    
                                                  //For pressure layer
                                    if ( (pressure[pointsAdded] == 9999))
                                    {
                                      dashArrayAttr = "1,0";
                                      colorPressure = "Gray";
                                    }
                                    else
                                    {
                                        if((pressure[pointsAdded] > 965) && (pressure[pointsAdded] < 9999))
                                        {
                                          dashArrayAttr = "5,10";
                                        }
                                        else
                                        {
                                          dashArrayAttr = "2,1";
                                        }
                                      colorPressure = "black";
                                    }

                                    polyline2.setStyle({
                                      color : colorPressure,
                                      weight : 2,
                                      opacity : 0.7,
                                      dashArray : dashArrayAttr,
                                      lineJoin: "round"});
                                    




                                    //console.log(latvalues+"--"+lngvalues+"--"+h34+"--"+h50+"--"+h64+"--"+hstatus+"--"+pointsAdded);
                                    //Draw the coordinates
                                    //Polylines for wind speed based.
                                    //Condition for drawing properly from one end to another.
                                   if (pointsAdded == 0)
                                    {
                                      if (((lngvalues[pointsAdded] > 0 ) && (lngvalues[pointsAdded+1] > 0)) || ((lngvalues[pointsAdded] < 0 ) && (lngvalues[pointsAdded+1] < 0)))
                                      {
                                          //console.log("Plotted"+latvalues+"--"+lngvalues+"--"+pointsAdded);
                                          polyline1.setStyle({color : cord_color[ind],opacity : 1,weight : 5, smoothFactor : 100});
                                          polyline1.addLatLng(L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));
                                          polyline1.on('mouseover', function (e) {
                                          document.getElementById("details").innerHTML="<br>"+"Selected Hurricane is "+hname+"  Windspeed : "+windspeed[pointsAdded]+"<br>Pressure(in millibars) :" + pressure[pointsAdded] + "  Status :"+ hstatus[pointsAdded]});
                                          //Polylines for pressure based.
                                          //polyline2.setStyle({color : cord_color1[hstatus_ind],opacity : 1,weight : 5, smoothFactor : 100});
                                          polyline2.addLatLng(L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));
                                          polyline2.on('mouseover', function (e) {
                                          document.getElementById("details").innerHTML="<br>"+"Selected Hurricane is "+hname+"  Windspeed : "+windspeed[pointsAdded]+"<br>Pressure(in millibars) :" + pressure[pointsAdded] + "  Status :"+ hstatus[pointsAdded]});
                                          
                                          polyline1.addTo(windLayer);
                                          polyline2.addTo(pressureLayer);
                                      }
                                    }
                                    else
                                      {

                                          //console.log("Plotted"+latvalues+"--"+lngvalues+"--"+pointsAdded);
                                          polyline1.setStyle({color : cord_color[ind],opacity : 1,weight : 5, smoothFactor : 100});
                                          polyline1.addLatLng(L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));
                                          polyline1.on('mouseover', function (e) {
                                          document.getElementById("details").innerHTML="<br>"+"Selected Hurricane is "+hname+"  Windspeed : "+windspeed[pointsAdded]+"<br>Pressure(in millibars) :" + pressure[pointsAdded] + "  Status :"+ hstatus[pointsAdded]});
                                          //Polylines for pressure based.
                                          //polyline2.setStyle({color : cord_color1[hstatus_ind],opacity : 1,weight : 5, smoothFactor : 100});
                                          polyline2.addLatLng(L.latLng(latvalues[pointsAdded],lngvalues[pointsAdded]));
                                          polyline2.on('mouseover', function (e) {
                                          document.getElementById("details").innerHTML="<br>"+"Selected Hurricane is "+hname+"  Windspeed : "+windspeed[pointsAdded]+"<br>Pressure(in millibars) :" + pressure[pointsAdded] + "  Status :"+ hstatus[pointsAdded]});
                                          
                                          polyline1.addTo(windLayer);
                                          polyline2.addTo(pressureLayer); 
                                      }
                                  
                                    //Run loop for drawing all hurricane coordinates
                                    if(++pointsAdded < latvalues.length)
                                    {
                                      draw(polyline1,circle1,polyline2);//latvalues,lngvalues,windspeed,pressure);    
                                    }
                                    else
                                    {
                                      pointsAdded = 0;
                                    }
                                }
                    }
            }
            xmlhttp.send(null);
                return false;
}

    
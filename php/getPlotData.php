<?php
    // 6. Getting the parameters from the previous page, although we aren't doing anything with it as of now.
    
   $choice = $_GET['query'];
   $return_arrall = array();

    $con = mysql_connect("localhost","root","MziDik1X");
    if(!$con) die('General Connection Error!');                                          
   mysql_select_db("hurricanes", $con);

   $sub = substr("$choice",0,2);
   
   if ($sub == "AL")
   {
   $query = "select * from Atlantic where hid like '$choice'";
   $result = mysql_query($query);
    }
   else if (($sub == "EP") || ($sub == "CP"))
   {
   $query = "select * from Pacific where hid like '$choice'";
   $result = mysql_query($query);   
   }

   while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
   {
       array_push($return_arrall,array($row['hid'],$row['hname'],$row['hdate'],$row['htime'],$row['htype'],$row['hstatus'],$row['hlat'],$row['hlon'],$row['hwind'],$row['hpres'],$row['h34ne'],$row['h34se'],$row['h34sw'],$row['h34nw'],$row['h50ne'],$row['h50se'],$row['h50sw'],$row['h50nw'],$row['h64ne'],$row['h64se'],$row['h64sw'],$row['h64nw']));
   }     
       echo json_encode($return_arrall);
?>
<?php
	// 6. Getting the parameters from the previous page, although we aren't doing anything with it as of now.
	$_GET['ocean_atlantic'];
    $_GET['ocean_nepacific'];
    $_GET['ocean_ncpacific'];
    $_GET['showall'];
    $_GET['showparticular'];
    $_GET['orderby'];
    $_GET['time'];
    $_GET['interval1'];
    $_GET['interval2'];
    $_GET['landfall'];
    $_GET['windspeedmin'];
    $_GET['windspeedmax'];
    $_GET['pressuremin'];
    $_GET['pressuremax'];

    echo $_GET['ocean_atlantic']." + ".
    $_GET['ocean_nepacific']." + ".
    $_GET['ocean_ncpacific']." + ".
    $_GET['showall']." + ".
    $_GET['showparticular']." + ".
    $_GET['orderby']." + ".
    $_GET['time']." + ".
    $_GET['interval1']." + ".
    $_GET['interval2']." + ".
    $_GET['landfall']." + ".
    $_GET['windspeedmin']." + ".
    $_GET['windspeedmax']." + ".
    $_GET['pressuremin']." + ".
    $_GET['pressuremax'];

	// $return_arr = array();
	// $con = mysql_connect("sql3.freesqldatabase.com","sql392638","lN2%wC2*");
	// if(!$con) die('General Connection Error!');									      
 //    mysql_select_db("sql392638", $con);
 //    $query = "select * from atlantic";
 //    $result = mysql_query($query);
 //    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
 //    	 $row_array['hid'] = $row['hid'];
 //    	 array_push($return_arr,$row_array);
 //    }
 //    echo json_encode($return_arr);

?>
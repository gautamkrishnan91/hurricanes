 <?php
    // 6. Getting the parameters from the previous page, although we aren't doing anything with it as of now.
    $ocean_atlantic = $_GET['ocean_atlantic'];
    $ocean_nepacific = $_GET['ocean_nepacific'];
    $ocean_ncpacific = $_GET['ocean_ncpacific'];
    $showall = $_GET['showall'];
    $showparticular = $_GET['showparticular'];
    $orderby = $_GET['orderby'];
    $time = $_GET['time'];
    $interval1 = $_GET['interval1'];
    $interval2 = $_GET['interval2'];
    $landfall = $_GET['landfall'];
    $windspeedmin = $_GET['windspeedmin'];
    $windspeedmax = $_GET['windspeedmax'];
    $pressuremin = $_GET['pressuremin'];
    $pressuremax = $_GET['pressuremax'];

    $query = "";

    /*echo $ocean_atlantic." + ".
    $ocean_nepacific." + ".
    $$ocean_ncpacific." + ".
    $showall." + ".
    $showparticular." + ".
    $orderby." + ".
    $time." + ".
    $interval1." + ".
    $interval2." + ".
    $landfall." + ".
    $windspeedmin." + ".
    $windspeedmax." + ".
    $pressuremin." + ".
    $pressuremax;*/

    $returnid = array();


    $con = mysql_connect("localhost","root","MziDik1X");
    if(!$con) die('General Connection Error!');                                       
    mysql_select_db("hurricanes", $con);


    //Ocean Selection.
    if ($ocean_atlantic == "true")
    {
        if($ocean_nepacific == "true")
        {
            if($ocean_ncpacific == "true")
            {
                $ocean_option = "like '%'";//All 3 selected.
            }
            if($ocean_ncpacific == "false")
            {
                $ocean_option = "not like 'CP%'";//Only AL and EP.
            }
        }
        if($ocean_nepacific == "false")
        {
            if($ocean_ncpacific == "true")
            {
                $ocean_option = "not like 'EP%'";//Only AL and CP
            }
            if($ocean_ncpacific == "false")
            {
                $ocean_option = "like 'AL%'";//Only AL
            }
        }
    }
    else if ($ocean_atlantic == "false")
    {
        if($ocean_nepacific == "true")
        {
            if($ocean_ncpacific == "true")
            {
                $ocean_option = "not like 'AL%'";//Only CP and EP.
            }
            if($ocean_ncpacific == "false")
            {
                $ocean_option = "like 'EP%'";//Only EP.
            }
        }
        if($ocean_nepacific == "false")
        {
            if($ocean_ncpacific == "true")
            {
                $ocean_option = "like 'CP%'";//Only CP.
            }
            if($ocean_ncpacific == "false")
            {
                $ocean_option = "like ''";//None.
            }
        }
    }


if ($showparticular == "top5")//if top 5 is selected.
{
    $query = "select * from Summary where hid $ocean_option order by maxwind desc limit 5";
    //echo $query;
    $result = mysql_query($query);
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
    {
    array_push($returnid,array($row['hid'],$row['hname'],$row['startdate'],$row['maxwind']));
    }
    echo json_encode($returnid);
}                          
else if ($showparticular == "top10")//if top 10 is selected.
{
    $query = "select * from Summary where hid $ocean_option order by maxwind desc limit 10";
    $result = mysql_query($query);
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
    {
    array_push($returnid,array($row['hid'],$row['hname'],$row['startdate'],$row['maxwind']));
    }
    echo json_encode($returnid);
}
else if ($showparticular == "ourtop5")
{
    ;//echo "i got it";
}
else 
{
    if ($orderby == "alphabetical")//Ordering in alphabetical order.
    {
        $order_option = "hname";
    }
    else if ($orderby == "chronological")//Ordering in chronological order.
    {
        $order_option = "startdate";
    }
    else if($orderby == "maxwind")//Ordering by maximum windspeed.
    {
        $order_option = "maxwind DESC";
    }
    else if ($orderby == "minpressure")
    {
        $order_option = "minpressure";
    }
    
    if ($landfall == "landfallmade")
    {
        $ocean_option = $ocean_option." AND htype like 'L'";
    }
    else if ($landfall == "landfallnotmade")
    {
    $ocean_option = $ocean_option." AND htype not like 'L'";    
    }
    else if($landfall == "default")
    {
    $ocean_option = $ocean_option." AND htype like '%'";        
    }

    //Checking for windspeed filter.
    if (($windspeedmin == 0) && ($windspeedmax == 165))
    {
        $ocean_option = $ocean_option." AND maxwind between '-99' and '$windspeedmax'";
    }
    else
    {
        $ocean_option = $ocean_option." AND maxwind between '$windspeedmin' and '$windspeedmax'";
    }


    if ($time == "atlanticseason")//Season between june 1st and november 30th
    {
           $ocean_option =  $ocean_option." AND substr(startdate,5) between '0601' and '1130'";
    }
    else if ($time == "pacificseason")//Season between 15th May and 30th November
    {
            $ocean_option = $ocean_option." AND substr(startdate,5) between '0515' and '1130'";
    }
    else if ((strlen($time) == 4) && ($time != 'June') && ($time != 'July'))//Setting the year filter.
    {
            $ocean_option = $ocean_option." AND substr(startdate,1,4) like '$time'";
    }
    else if ($time == "January")
    {
                $time = "01";
    }
            else if ($time == "February")
            {
                $time = "02";
            }
            else if ($time == "March")
            {
                $time = "03";
            }
            else if ($time == "April")
            {
                $time = "04";
            }
            else if ($time == "May")
            {
                $time = "05";
            }
            else if ($time == "June")
            {
                $time = "06";
            }
            else if ($time == "July")
            {
                $time = "07";
            }
            else if ($time == "August")
            {
                $time = "08";
            }
            else if ($time == "September")
            {
                $time = "09";
            }
            else if ($time == "October")
            {
                $time = "10";
            }
            else if ($time == "November")
            {
                $time = "11";
            }
            else if ($time == "December")
            {
                $time = "12";
            }
            //Setting the particular date filter
            else if (strlen($time) == 10)
            {
                $month = substr($time,0,2);
                $day = substr($time,3,2);
                $year = substr($time,6,4);
                $ocean_option = $ocean_option." AND '$year$month$day' between startdate and enddate ";
            }
            
            //Setting the particular month filter.
            if (strlen($time) == 2)
            {
            $ocean_option = $ocean_option." AND substr(startdate,5,2) like '$time'";
            }


                //Checking for pressure filter.
                if  (($pressuremin == 882) && ($pressuremax == 1024))
                {
                    $ocean_option = $ocean_option." AND minpressure between '$pressuremin' and '9999'";
                }
                else
                {
                    $ocean_option = $ocean_option." AND minpressure between '$pressuremin' and '$pressuremax'"; 
                }


                if(($showparticular != 'top5') && ($showparticular != 'top10') && ($showparticular != 'ourtop5'))
                {            
                 if (($interval1 == 'false') && ($interval2 == 'false'))//No interval selected.
                                    {
                                               $query = "select hid,startdate,hname from Summary where hid $ocean_option order by $order_option";
                                                $result = mysql_query($query);
                                                while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
                                                {
                                                array_push($returnid,array($row['hid'],$row['hname'],$row['startdate'],$row['maxwind']));
                                                }
                                                echo json_encode($returnid);
                                    }
                                else if($interval1 != 'false' && $interval2 != 'false') //For a given interval.
                                {
                                                $month1 = substr($interval1,0,2);
                                                $day1 = substr($interval1,3,2);
                                                $year1 = substr($interval1,6,4);

                                                $month2 = substr($interval2,0,2);
                                                $day2 = substr($interval2,3,2);
                                                $year2 = substr($interval2,6,4);
                                                
                                                $ocean_option = $ocean_option." AND startdate between '$year1$month1$day1' and '$year2$month2$day2'";

                                                $query = "select hid,startdate,hname from Summary where hid $ocean_option order by $order_option";
                                                $result = mysql_query($query);
                                                while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
                                                {
                                                array_push($returnid,array($row['hid'],$row['hname'],$row['startdate'],$row['maxwind']));
                                                }
                                                echo json_encode($returnid);
                                }
                 }               
 }
 ?>
<?php
header('Content-Type: text/plain');
$data = json_decode($_POST['units'], $assoc =true);
//print_r($_POST);
krsort($data);
$gen=$data[gen];
$count=3;
print $gen.'------ ';
foreach ( $data as $key => $value )
{
	if($count>0 AND $value!=''){
		print $key.'===';
		print_r( $value );
		print '.................. ';
		$count--;
	}
}
	
  print_r( $_POST );
  exit();
 ?>
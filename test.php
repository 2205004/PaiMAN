<?php
  header('Content-Type: text/plain');
  $test = utf8_encode($_POST['test']); // Don't forget the encoding
  $data = json_decode($_POST['test']);
  print_r( $data );
  
  function print_arr($array){
	echo "<pre>" . print_r($array, true) . "</pre>";
}
  echo";;;;";
  exit();
 ?>
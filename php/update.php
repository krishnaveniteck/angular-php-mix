<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  
  $request = json_decode($postdata);
	
  if ((int)$request->data->id < 1 || trim($request->data->model) == '' || (int)$request->data->price < 1) {
    return http_response_code(400);
  }

  $id    = mysqli_real_escape_string($con, (int)$request->data->id);
  $model = mysqli_real_escape_string($con, trim($request->data->model));
  $price = mysqli_real_escape_string($con, (int)$request->data->price);

  $sql = "UPDATE `cars` SET `model`='$model',`price`='$price' WHERE `id` = '{$id}' LIMIT 1";

  if (mysqli_query($con, $sql)) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}
<?php

require 'connect.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);

    if (trim($request->data->model) == '' || (int)$request->data->price < 1) {
        return http_response_code(400);
    }

    $model = mysqli_real_escape_string($con, trim($request->data->model));
    $price = mysqli_real_escape_string($con, (int)$request->data->price);

    $sql = "INSERT INTO `cars` (`id`, `model`, `price`) VALUES (null, '{$model}', '{$price}')";

    if (mysqli_query($con, $sql)) {
        http_response_code(201);

        $car = [
            'model' => $model,
            'price' => $price,
            'id' => mysqli_insert_id($con)
        ];

        echo json_encode(['data'=>$car]);
    } else {
        http_response_code(422);
    }
}

?>
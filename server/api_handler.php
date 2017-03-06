<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/server/DBManager.php';

function return_error_message($message)
{
  http_response_code(400);
  echo $message;
  exit;
}

$path = explode('/', $_SERVER['PATH_INFO']);

if (count($path) == 0) {
  return_error_message('Wrong API path is given.');
}

$result = array();

if (strcmp($path[0], 'restaurant') === 0) {
  array_push($result, 'Restaurant!');
} else {
  return_error_message('Error!');
}

header('Content-Type: application/json');

echo json_encode($result);

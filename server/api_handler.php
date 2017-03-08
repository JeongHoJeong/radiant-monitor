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

if (strcmp($path[0], 'restaurants') === 0) {
  if (!isset($_GET['offset'])) {
    return_error_message('offset is not set.');
  } else if (!isset($_GET['limit'])) {
    return_error_message('limit is not set.');
  }

  DBManager::connect();

  $result['payload'] = DBManager::query('SELECT * FROM Restaurant WHERE hidden=0 LIMIT ?, ?', [$_GET['offset'], $_GET['limit']]);
  $result['totalCount'] = DBManager::query('SELECT COUNT(*) AS count FROM Restaurant WHERE hidden=0')[0]['count'];

  DBManager::close();
} else if (strcmp($path[0], 'restaurant') === 0) {
  if (!isset($_GET['id'])) {
    return_error_message('id is not set.');
  }

  DBManager::connect();
  $restaurant = DBManager::query('SELECT * FROM Restaurant WHERE id = ?', [$_GET['id']]);
  DBManager::close();

  if (count($restaurant) === 0) {
    return_error_message('There is no such restaurant.');
  } else {
    $result = $restaurant[0];
  }
} else {
  return_error_message('There is no matching API.');
}

header('Content-Type: application/json');
echo json_encode($result);

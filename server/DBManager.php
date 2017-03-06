<?php
class DBManager {
  private static $mysqli;

  public static function connect()
  {
    $mysqli = new mysqli("localhost", "radiant", "radiant", "radiant");
  }

  public static function close()
  {
    if ($mysqli) {
      $mysqli->close();
    }
  }
}

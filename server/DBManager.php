<?php
class DBManager {
  private static $mysqli;

  public static function connect()
  {
    $db_connection_info = json_decode(file_get_contents('../local/db.json'));
    self::$mysqli = new mysqli(
      $db_connection_info->host,
      $db_connection_info->username,
      $db_connection_info->password,
      $db_connection_info->database
    );
    self::$mysqli->set_charset('utf8');
  }

  public static function query($sql, $bind_params = null)
  {
    if ($stmt = self::$mysqli->prepare($sql)) {
      if ($bind_params) {
        $bind_types = '';

        foreach ($bind_params as $param) {
          $param_type = gettype($param);

          if (strcmp($param_type, 'string') === 0) {
            $bind_types .= 's';
          } else if (strcmp($param_type, 'integer') === 0) {
            $bind_types .= 'i';
          } else if (strcmp($param_type, 'double') === 0) {
            $bind_types .= 'd';
          } else if (strcmp($param_type, 'resource') === 0) {
            $bind_types .= 'b';
          }
        }
        $stmt->bind_param($bind_types, ...$bind_params);
      }

      $stmt->execute();
      $result = $stmt->get_result();

      return $result->fetch_all(MYSQLI_ASSOC);
    }

    return null;
  }

  public static function close()
  {
    if (self::$mysqli) {
      self::$mysqli->close();
    }
  }
}

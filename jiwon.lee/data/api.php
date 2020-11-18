<?php

// Make Connection
function makeConn() {
   include_once "auth.php";
   try {
      $conn = new PDO(...Auth());
      $conn->setAttribute(
         PDO::ATTR_ERRMODE,
         PDO::ERRMODE_EXCEPTION
      );
   } catch(PDOException $e) {
      die('{"error":"'.$e->getMessage().'"}');
   }
   return $conn;
}

// $r = result, $a = array
function fetchAll($r) {
   $a = [];
   while($row = $r->fetch(PDO::FETCH_OBJ))
      $a[] = $row;
   return $a;
}


// connection, prepared statement, parameters
function makeQuery($c,$ps,$p,$makeResults=true) {
   try {
      if(count($p)) {
         $stmt = $c->prepare($ps);
         $stmt->execute($p);
      } else {
         $stmt = $c->query($ps);
      }

      $r = $makeResults ? fetchAll($stmt) : [];

      return [
         "result"=>$r
      ];

   } catch(PDOException $e) {
      return [
         "error"=>"Query Failed: ".$e->getMessage()
      ];
   }
}


// $t = type
function makeStatement($data) {
   $c = makeConn();
   $t = $data->type;
   $p = $data->params;

   switch($t) {

      // Select Statements

      // Get all users
      case "users_all":
         return makeQuery($c,"SELECT * FROM `track_users`","",$p);
      
      // Get all animals
      case "animals_all":
         return makeQuery($c,"SELECT * FROM `track_animals`","",$p);
      
      // Get all locations
      case "locations_all":
         return makeQuery($c,"SELECT * FROM `track_locations`","",$p);
      
      // Get all animals from an user
      case "animals_from_user":
         return makeQuery($c,"SELECT * FROM `track_animals` WHERE uid = ?","i",$p);
      
      // Get all locations from an animal
      case "locations_from_animal":
         return makeQuery($c,"SELECT * FROM `track_locations` WHERE aid = ?","i",$p);

      // return makeQuery($c,"SELECT track_animals.id FROM `track_animals` INNER JOIN `track_locations` ON track_animals.id = track_locations.aid,"i",$p);

      case "user_by_id":
         return makeQuery($c,"SELECT * FROM `track_users` WHERE id = ?","i",$p);

      case "animal_by_id":
         return makeQuery($c,"SELECT * FROM `track_animals` WHERE id = ?","i",$p);

      case "location_by_id":
         return makeQuery($c,"SELECT * FROM `track_locations` WHERE id = ?","i",$p);

      case "check_signin":
         return makeQuery($c,"SELECT * FROM `track_users` WHERE `username`=? AND `password`=md5(?)",$p);


      // Recent locations
      case "recent_animal_locations":
         return makeQuery($c,"SELECT
            a.*, l.* 
            FROM `track_animals` AS a
            LEFT JOIN (
               SELECT aid,lat,lng,icon
               FROM `track_locations`
               ORDER BY `date_create` DESC
            ) AS l
            ON a.id = l.aid
            WHERE a.uid = ?
            GROUP BY l.aid","i",$p);


      default: return ["error"=>"No Matched Type"];
   }
}

// Post and Get Dump

$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);
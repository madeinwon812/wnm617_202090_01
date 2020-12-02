<?php

function print_p($d) {
   echo "<pre>",print_r($d),"</pre>";
}

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


// Upload images
function makeUpload($file,$folder) {
   $filename = microtime(true) . "_" .
      $_FILES[$file]['name'];

   if(@move_uploaded_file(
      $_FILES[$file]['tmp_name'],
      $folder . $filename
   )) return ["result"=>$filename];

   else return [
      "error"=>"File Upload Failed",
      "_FILES"=>$_FILES,
      "filename"=>$filename
   ];
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

   // print_p([$c,$t,$p]);
   // die;


   switch($t) {

      // Select Statements

      // Get all users
      case "users_all":
         return makeQuery($c,"SELECT * FROM `track_users`",$p);
      
      // Get all animals
      case "animals_all":
         return makeQuery($c,"SELECT * FROM `track_animals`",$p);
      
      // Get all locations
      case "locations_all":
         return makeQuery($c,"SELECT * FROM `track_locations`",$p);
      
      // Get all animals from an user
      case "animals_from_user":
         return makeQuery($c,"SELECT * FROM `track_animals` WHERE uid = ?",$p);
      
      // Get all locations from an animal
      case "locations_from_animal":
         return makeQuery($c,"SELECT * FROM `track_locations` WHERE aid = ?",$p);

      // return makeQuery($c,"SELECT track_animals.id FROM `track_animals` INNER JOIN `track_locations` ON track_animals.id = track_locations.aid,"i",$p);

      case "user_by_id":
         return makeQuery($c,"SELECT * FROM `track_users` WHERE id = ?",$p);

      case "animal_by_id":
         return makeQuery($c,"SELECT * FROM `track_animals` WHERE id = ?",$p);

      case "location_by_id":
         return makeQuery($c,"SELECT * FROM `track_locations` WHERE id = ?",$p);

      case "check_signin":
         return makeQuery($c,"SELECT * FROM `track_users` WHERE `username`=? AND `password`=md5(?)",$p);


      // Recent locations
      case "recent_animal_locations":
         return makeQuery($c,"SELECT
            a.*, l.* 
            FROM `track_animals` AS a
            RIGHT JOIN (
               SELECT aid,lat,lng,icon
               FROM `track_locations`
               ORDER BY `date_create` DESC
            ) AS l
            ON a.id = l.aid
            WHERE a.uid = ?
            GROUP BY l.aid",$p);


      // Search
      case "search_animals":
         $search = "%$p[0]%";
         return makeQuery($c, "SELECT
            *
            FROM `track_animals`
            WHERE (
               `name` LIKE ? OR
               `breed` LIKE ? OR
               `description` LIKE ?
            ) AND uid = ?
            ","sssi",[$search,$search,$search,$p[1]]);


      // Filter
         
      case "filter_animals":

         return makeQuery($c,"SELECT
         *
         FROM `track_animals`
         WHERE `breed` = ?
         AND uid = ?
         ","si",$p);

      
      /* ----- CRUD ------ */

      // INSERTS
      case "insert_user":

         // Check for duplicate users
         $r = makeQuery($c,"SELECT * FROM `track_users` WHERE `username`=? OR `email`=?",[$p[0],$p[1]]);
         if(count($r['result'])) return ["error"=>"Username or Email already exists"];

         // Create new user
         $r = makeQuery($c,"INSERT INTO
            `track_users`
            (`name`,`username`,`email`,`location`,`password`,`img`,`date_create`)
            VALUES
            (?,?,?,?,md5(?),'https://via.placeholder.com/100/888/fff/?text=USER',NOW())
            ","sssss",$p);
         return ["id"=>$c->lastInsertId()];


         // Create new coyote

      case "insert_animal":
         $r = makeQuery($c,"INSERT INTO
            `track_animals`
            (`uid`,`name`,`breed`,`years`,`months`,`color`,`gender`,`img`,`description`,`date_create`)
            VALUES
            (?, ?, ?, ?, ?, ?, ?, 'https://via.placeholder.com/400/?text=PAWS',?,NOW())
            ","issiisss",$p);
         return ["id"=>$c->lastInsertId()];

         // Create new location

      case "insert_location":
         $r = makeQuery($c,"INSERT INTO
            `track_locations`
            (`aid`,`lat`,`lng`,`description`,`icon`,`date_create`)
            VALUES
            (?, ?, ?, ?, 'http://madeinwon.com/aau/wnm617/jiwon.lee/img/map-pin.svg',NOW())
            ","idds",$p);
         return [
            "r"=>$r,
            "p"=>$p,
            "id"=>$c->lastInsertId()];



      // Update Statements

      // Edit user

     case "edit_user":
         $r = makeQuery($c,"UPDATE
            `track_users`
            SET
            `name` = ?,
            `username` = ?,
            `email` = ?,
            `location` = ?
            WHERE id = ?
            ","ssssi",$p);
         return
         ["result" => "success"];

         case "edit_user_password":
         $r = makeQuery($c,"UPDATE
            `track_users`
            SET
            `password` = ?
            WHERE id = ?
            ","si",$p);
         return
         ["result" => "success"];

      case "update_animal":
         $r = makeQuery($c,"UPDATE
            `track_animals`
            SET
            `name`=?,
            `breed`=?,
            `color`=?,
            `years`=?,
            `months`=?,
            `gender`=?,
            `description`=?
            WHERE `id` = ?
            ",$p,false);
         return ["result"=>"success"];

         case "edit_user_password":
         $r = makeQuery($c,"UPDATE
            `track_users`
            SET
            `password` = ?
            WHERE id = ?
            ","si",$p);
         return
         ["result" => "success"];


      // DELETE STATEMETS

      case "delete_animal":
         return makeQuery($c,"DELETE FROM `track_animals` WHERE `id`=?",$p);

      case "delete_location":
         return makeQuery($c,"DELETE FROM `track_locations` WHERE `id`=?",$p);





      default: return ["error"=>"No Matched Type"];
   }
}


// Post and Get Dump

$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);
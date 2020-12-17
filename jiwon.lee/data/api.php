
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

      
      case "user_by_id":
         return makeQuery($c,"SELECT id,name,username,email,date_create,location,img FROM `track_users` WHERE `id`=?",$p);

      case "animal_by_id":
         return makeQuery($c,"SELECT * FROM `track_animals` WHERE id = ?",$p);

      case "location_by_id":
         return makeQuery($c,"SELECT * FROM `track_locations` WHERE id = ?",$p);
      
      // Get all animals from an user
      case "animals_by_user_id":
         return makeQuery($c,"SELECT * FROM `track_animals` WHERE uid = ?",$p);
      
      // Get all locations from an animal
      case "locations_by_animal_id":
         return makeQuery($c,"SELECT * FROM `track_locations` WHERE aid = ?",$p);

      // return makeQuery($c,"SELECT track_animals.id FROM `track_animals` INNER JOIN `track_locations` ON track_animals.id = track_locations.aid,"i",$p);


      case "check_signin":
         return makeQuery($c,"SELECT * FROM `track_users` WHERE `username`=? AND `password`=md5(?)",$p);


      // Recent locations
      case "recent_locations":
         return makeQuery($c,"SELECT *
            FROM `track_animals` a
            RIGHT JOIN (
               SELECT * FROM `track_locations`
               ORDER BY `date_create` DESC
            ) l
            ON a.id = l.aid
            WHERE a.uid=?
            GROUP BY l.aid
            ",$p);


      //Search 
      case "search_animals":
         $p = ["%$p[0]%",$p[1]];
        return makeQuery($c,"SELECT * FROM
            `track_animals`
            WHERE
               `breed` LIKE ? AND
               `uid` = ?
            ",$p);


      // Filter
         
      case "filter_animals":
         return makeQuery($c,"SELECT * FROM
            `track_animals`
            WHERE
               `$p[0]` = ? AND
               `uid` = ?
            ",[$p[1],$p[2]]);


      
      /* ----- CRUD ------ */

        // INSERTS


         // Check for duplicate username or email
         case "insert_user":

         $r = makeQuery($c,"SELECT 
         * FROM `track_users` 
           WHERE 
           `username`=? OR 
           `email`=?",
           [$p[0],$p[1]]);

         if(count($r['result'])) 
            return ["error"=>"Username or Email already exists"];


         // Create new user
          case "insert_user":

         $r = makeQuery($c,"INSERT INTO
            `track_users`
            (`name`,`username`,`email`,`location`,`password`,`img`,`date_create`)
            VALUES
            (?,?,?,?,md5(?),'https://via.placeholder.com/100/888/fff/?text=USER',NOW())
            ",$p);
         return ["id"=>$c->lastInsertId()];


         // Create new coyote
      
         case "insert_animal":
         $r = makeQuery($c,"INSERT INTO
            `track_animals`
            (`uid`,`name`,`breed`,`years`,`months`,`color`,`gender`,`img`,`description`,`date_create`)
            VALUES
            (?, ?, ?, ?, ?, ?, ?, 'https://via.placeholder.com/400/?text=COYOTE',?,NOW())
            ",$p);
         return ["id"=>$c->lastInsertId()];

         // Create new location

         case "insert_location":
         $r = makeQuery($c,"INSERT INTO
            `track_locations`
            (`aid`,`lat`,`lng`,`description`,`photo`,`icon`,`date_create`)
            VALUES
            (?, ?, ?, ?, 'https://via.placeholder.com/400?text=Photo', 'https://via.placeholder.com/100?text=Icon', NOW())
            ",$p);
         return [
            "r"=>$r,
            "p"=>$p,
            "id"=>$c->lastInsertId()];



      // Update Statements

      // Edit user

     case "update_user":
         $r = makeQuery($c,"UPDATE
            `track_users`
            SET
            `name` = ?,
            `username` = ?,
            `email` = ?,
            `location` = ?
            WHERE id = ?
            ",$p,false);
         return
         ["result" => "success"];

         case "update_user_password":
         $r = makeQuery($c,"UPDATE
            `track_users`
            SET
            `password` = ?
            WHERE id = ?
            ","si",$p);
         return
         ["result" => "success"];


      // Edit animal

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

         case "edit_coyote_image":
         $r = makeQuery($c,"UPDATE
            `track_animals` SET
            `img`=? WHERE
            id=?
            ","si",$p);
         return
         ["result"=>"success"];


         case "edit_user_image":
         $r = makeQuery($c,"UPDATE
            `track_users` SET
            `img`=? WHERE
            id=?
            ","si",$p);
         return
         ["result"=>"success"];

         case "update_user_image":
         $r = makeQuery($c,"UPDATE
            `track_users` SET
            `img`=? WHERE
            id=?
            ","si",$p);
         return
         ["result"=>"success"];





// Delete Statements

      case "delete_user":
         $r = makeQuery($c,"DELETE FROM
            `track_users`
            WHERE
            `id`=?",$p,false);
         

      case "delete_animal":
         $r = makeQuery($c,"DELETE FROM
            `track_animals`
            WHERE
            `id`=?",$p,false);


      case "delete_location":
         $r = makeQuery($c,"DELETE FROM
            `track_locations`
            WHERE
            `id`=?",$p,false);


      default: return ["error"=>"No Matched Type"];
   }
}


// Upload Images

if(!empty($_FILES)){
   $r = makeUpload("image","../uploads/");
   die(json_encode($r));
}


// Post and Get Dump

$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);
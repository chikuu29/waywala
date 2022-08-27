<?php
header('Content-Type: application/json');
header('Acess-Control-Allow-Origin: *');
// include database and object files
include_once 'dbconfig/database.php';
include_once 'user.php';
$data = json_decode(file_get_contents("php://input"), true);
// get database connection
$database = new Database();
$db = $database->getConected();
// prepare user object
$user = new User($db);
//data given for login
$user->email = $data['email'];
$user->password = md5($data['password']);      
// read the details of user to be edited
$stmt = $user->login();
//print_r($stmt);
if ($stmt->rowCount() > 0) {
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $user_arr = array(
        "status" => true,
        "message" => "Successfully Login!",
        "id" => $row['r_id'],
        "email" => $row['email']
    );
} else {
    $user_arr = array(
        "status" => false,
        "message" => "Invalid Username or Password!",
    );
}
// make it json format
print_r(json_encode($user_arr));

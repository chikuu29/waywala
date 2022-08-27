<?php
 header('Content-Type: application/json');
 header('Acess-Control-Allow-Method: POST');
 header('Acess-Control-Allow-Origin: *');
// get database connection
include_once 'dbconfig/database.php';
 
// instantiate user object
include_once 'user.php';
$data = json_decode(file_get_contents("php://input"), true);
$database = new Database();
$db =$database->getConected();
$user = new User($db);
// set user property values
//$user->userid = $data['userid'];
$user->name = $data['name'];
$user->email = $data['email'];
$user->mobile_no = $data['mobile_no'];
$user->mobile_otp = rand(100000 , 999999);
$user->email_otp = rand(100000 , 999999);
$user->password = md5($data['password']);
$tokenfromuser = md5($data['token']);
$token = md5("lipun");
 
// create the user
if( $tokenfromuser == $token){
    if($user->signup()){

        $user_arr=array(
            "status" => true,
            "message" => "Successfully Signup!",
            "id" => $user->id,
            "email" => $user->email
        );
    }
    else{
        if($user->responce == 'email'){
        $user_arr=array(
            "status" => false,
            "message" => "email already exists!"
        );
       }else if($user->responce == 'phone_no'){
        $user_arr=array(
            "status" => false,
            "message" => "phone already exists!"
        );  
       }
    }
    
}else{
    $user_arr=array(
        "status" => false,
        "message" => "u canot use api"
    );
}
print_r(json_encode($user_arr));

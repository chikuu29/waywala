<?php

/*
    Author:- Gyanaranjan pati
    Date:- 2019-08-26
    Purpose:- User Class to manage actions: Login and SignUp with user details.
*/

class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "user";
 
    // object properties
    public $id;
    public $userid;
    public $name;
    public $email;
    public $email_otp;
    public $mobile_otp;
    public $password;
    public $responce;
    public $token;
   // public $created;
 
    // constructor with $db as database connection
    public function __construct($db){
        //die($db);   
        $this->conn = $db;
        // die($this->conn);
    }

    //user signup method
    function signup(){
    
        if($this->isAlreadyExistEmail()){
            $this->responce = "email";
            return false;
        }
        if($this->isAlreadyExistPhoneNo()){
            $this->responce = "phone_no";
            return false;
        }
        // query to insert record of new user signup
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                 name=:name, email=:email, mobile_no=:mobile_no , email_otp=:email_otp, mobile_otp=:mobile_otp, password=:password ";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
       // $this->userid=htmlspecialchars(strip_tags($this->userid));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->mobile_no=htmlspecialchars(strip_tags($this->mobile_no));
        $this->email_otp=htmlspecialchars(strip_tags($this->email_otp));
        $this->mobile_otp=htmlspecialchars(strip_tags($this->mobile_otp));
        $this->password=htmlspecialchars(strip_tags($this->password));
    
        // bind values
       // $stmt->bindParam(":userid", $this->userid);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":mobile_no", $this->mobile_no);
        $stmt->bindParam(":email_otp", $this->email_otp);
        $stmt->bindParam(":mobile_otp", $this->mobile_otp);
        $stmt->bindParam(":password", $this->password);
      //  $stmt->bindParam(":created", $this->created);
    
        //execute query
        if($stmt->execute()){
            $this->id = $this->conn->lastInsertId();
            return true;
        }
    
        return false;
        
    }

    // login user method
    function login(){
        // select all query with user inputed username and password

        $query = "SELECT
                    `r_id`, `email`, `password`
                FROM
                    " . $this->table_name . " 
                WHERE
                    email='".$this->email."' AND password='".$this->password."'";
        // prepare query statement
       //die($query);
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
     //otp varification
    //  function otpVaryfication(){
    //     $query = "SELECT *
    //         FROM
    //             " . $this->table_name . " 
    //         WHERE
    //             username='".$this->username."'";
    //  }
    // Notify if User with given username Already exists during SignUp
    function isAlreadyExistEmail(){
        $query = "SELECT *
            FROM
                " . $this->table_name . " 
            WHERE
            email='".$this->email."'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }
        else{
            return false;
        }
    }
    //Notify if User with given username Already exists during SignUp
    function isAlreadyExistPhoneNo(){
        $query = "SELECT *
            FROM
                " . $this->table_name . " 
            WHERE
            mobile_no='".$this->mobile_no."'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        if($stmt->rowCount() > 0){

            return true;
        }
        else{
            return false;
        }
    }
 }
?>
<?php
      class Database{
        private $host ="localhost";
        private $db_name ="waywala";
        private $username ="root";
        private $password ="";
        public $conn;

        public function getConected(){
            $this->conn = null;
            try{
                 $this->conn = new PDO("mysql:host=" .$this->host .";dbname=" .$this->db_name ,$this->username , $this->password);
                //$this->conn->exec('set name utf8');
             }catch(PDOException $exception){
                echo "Connevtion error: " . $exception ->getMessage();
             }
             return $this->conn;
        }

      }
?>
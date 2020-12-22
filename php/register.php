<?php
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encrypt the password.
$fullname = $_POST['fullname'];
$phone = $_POST['phone'];
$birthday = $_POST['birthday'];
$age = intval($_POST['age']);
$success = false;

include('database.php');

if ( getDB() ) {
    $query = 'CREATE TABLE IF NOT EXISTS account (username VARCHAR(50) PRIMARY KEY,
                                                  password TEXT NOT NULL,
                                                  fullname VARCHAR(50) NOT NULL,
                                                  phone VARCHAR(11),
                                                  birthday DATE,
                                                  age INTEGER)';
    pg_query($query);

    if ( !isset($phone) ) {
        $phone = "";
    }

    if ( !isset($birthday) ) {
        $birthday = "";
    }

    if ( !isset($age) ) {
        $age = "";
    }
    
    if ( isset($username) && isset($password) && isset($fullname) ) {
        $query = "INSERT INTO account VALUES ('$username', '$password', '$fullname',
                                              '$phone', '$birthday', $age)";
        $success = pg_query($query);
    }
}

echo json_encode(array('success' => $success));
?>
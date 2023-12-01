<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$dbServer = getenv('DB_SERVER_LEITNERBOX');
$dbUsername = getenv('DB_USERNAME_LEITNERBOX');
$dbPassword = getenv('DB_PASSWORD_LEITNERBOX');
$dbName = getenv('DB_NAME_LEITNERBOX');

define('DB_SERVER', $dbServer);
define('DB_USERNAME', $dbUsername);
define('DB_PASSWORD', $dbPassword);
define('DB_NAME', $dbName);
 
/* Attempt to connect to MySQL database */
try{
    $pdo = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
    die("ERROR: Could not connect. " . $e->getMessage());
}
?>
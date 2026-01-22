<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$pass = $_POST['pass'] ?? '';
$repeatPass = $_POST['repeatPass'] ?? '';

if (empty($name) || empty($email) || empty($pass) || empty($repeatPass)) {
    echo json_encode(["status" => "error", "message" => "Wszystkie pola są wymagane!"]);
    exit();
}

if ($pass !== $repeatPass) {
    echo json_encode(["status" => "error", "message" => "Hasła nie są identyczne!"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Nieprawidłowy format email!"]);
    exit();
}

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db === null) {
        throw new Exception("Nie udało się połączyć z bazą danych");
    }
    

    $check_query = "SELECT id FROM users WHERE email = :email";
    $stmt = $db->prepare($check_query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "error", "message" => "Email jest już zarejestrowany!"]);
        exit();
    }
    
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);
    
    $insert_query = "INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)";
    $stmt = $db->prepare($insert_query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password_hash', $hashed_password);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "ok", "message" => "Rejestracja zakończona sukcesem! Możesz się teraz zalogować."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Błąd podczas zapisywania do bazy danych"]);
    }
    
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Wystąpił błąd serwera"]);
}
?>
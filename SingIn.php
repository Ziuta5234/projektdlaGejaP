<?php
// 1. Dołącz plik z konfiguracją bazy danych
require_once 'db.php';

// 2. Ustaw nagłówki CORS (ważne dla React)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 3. Obsłuż żądanie OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 4. Pobierz dane z żądania POST
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 5. Sprawdź czy email i hasło są wypełnione
if (empty($data['email']) || empty($data['pass'])) {
    echo json_encode(["status" => "error", "message" => "Email i hasło są wymagane!"]);
    exit();
}

$email = $data['email'];
$pass = $data['pass'];

// 6. Połącz się z bazą danych
try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db === null) {
        throw new Exception("Błąd połączenia z bazą danych");
    }

    // 7. Znajdź użytkownika po email w bazie (SELECT)
    $request = "SELECT id, name, email, password_hash FROM users WHERE email = :email";
    $stmt = $db->prepare($request);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    // 8. Sprawdź czy użytkownik istnieje
    if ($stmt->rowCount() === 0) {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowy email lub hasło!"]);
        exit();
    }

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 9. Zweryfikuj hasło (password_verify)
    if (!password_verify($pass, $user['password_hash'])) {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowy email lub hasło!"]);
        exit();
    }

    // 10. Zwróć odpowiedź do React
    echo json_encode([
        "status" => "ok",
        "message" => "Zalogowano pomyślnie!",
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email']
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Wystąpił błąd serwera"]);
}
?>
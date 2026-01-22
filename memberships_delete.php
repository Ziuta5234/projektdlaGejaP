<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Content-Type: application/json; charset=utf-8");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    require_once 'db.php';

    $db = new Database();
    $conn = $db->getConnection();

    if(!$conn) {
        http_response_code(500);
        echo json_encode([
            "error" => true,
            "message" => "Brak połączenia z bazą danych"
        ]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode([
            "error" => true,
            "message" => "Dozwolone tylko POST"
        ]);
        exit;
    }

    $body = json_decode(file_get_contents("php://input"), true);
    $id = $body['id'] ?? null;

    if (!$id || !is_numeric($id)) {
        http_response_code(400);
        echo json_encode([
            "error" => true,
            "message" => "Brak lub niepoprawne id"
        ]);
        exit;
    }

    try {
        $sql = "DELETE FROM rodzaj_karnetu WHERE ID = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':id', (int)$id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode([
                "error" => true,
                "message" => "Nie znaleziono rekordu do usunięcia"
            ]);
            exit;
        }

        echo json_encode([
            "error" => false,
            "message" => "Usunięto",
            "deleteId" => (int)$id
        ]);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "error" => true,
            "message" => "Błąd podczas usuwania",
            "details" => $e->getMessage()
        ]);
        exit;
    }
?>
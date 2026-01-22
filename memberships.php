<?php 
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Content-Type: application/json; charset=utf-8");

    require_once 'db.php';

    $db = new Database();
    $conn = $db->getConnection();

    if(!$conn) {
        http_response_code(500);
        echo json_encode([
            "error" => true,
            "message" => "Brak połączenia z bazą"
        ]);
        exit;
    }

    $sql = "SELECT * FROM rodzaj_karnetu";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($data);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "error" => true,
            "message" => "Wystąpił błąd podczas fetch",
            "details" => $e->getMessage()
        ]);
        exit;
    }
?>
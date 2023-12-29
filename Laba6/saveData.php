<?php
if($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    file_put_contents('data.json', json_encode($data));
    echo 'Дані збережено успішно!';
}
else {
    $saveData = file_get_contents('data.json');
    echo $saveData;
}
?>

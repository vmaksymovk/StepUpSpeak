<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Здесь можно добавить код для отправки данных на почту или сохранения в базе данных.
    echo "Dziękujemy za wiadomość, $name. Skontaktujemy się z Tobą wkrótce.";
}
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Odbieranie danych z formularza
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $course = isset($_POST['course']) ? $_POST['course'] : '';

    // Adres e-mail, na który chcesz otrzymywać zgłoszenia
    $to = "stepupspeakofficial@gmail.com";

    // Temat wiadomości
    $subject = "Nowe zgłoszenie na kurs";

    // Treść wiadomości
    $message = "Imię i nazwisko: $name\nE-mail: $email\nTelefon: $phone\nKurs: $course";

    // Nagłówki (zawierają m.in. adres nadawcy)
    $headers = "From: no-reply@twojastrona.pl";

    // Wysyłanie wiadomości
    if(mail($to, $subject, $message, $headers)) {
        echo "Dziękujemy za zgłoszenie! Nasz manager skontaktuje się z Tobą w ciągu 24 godzin.";
    } else {
        echo "Wystąpił błąd przy wysyłaniu formularza. Proszę spróbować ponownie.";
    }
}
?>

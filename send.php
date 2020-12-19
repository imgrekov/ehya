<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// $name     = (isset($_POST['name']))     ? trim($_POST['name']) : '';
// $phone    = (isset($_POST['phone']))    ? trim($_POST['phone']) : '';
$email = ($_POST['email']) ? trim($_POST['email']) : '';

$title = "Ehya — подписка на новости";
$body = "
  <h2>Новый email</h2>
  <b>Email:</b> $email
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  // $mail->SMTPDebug = 2;
  $mail->Debugoutput = function ($str, $level) {
    $GLOBALS['status'][] = $str;
  };

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'tourplan59@gmail.com'; // Логин на почте
  $mail->Password   = 'T2TiPA4siyi2'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  // Адрес самой почты и имя отправителя
  $mail->setFrom('tourplan59@gmail.com', 'Интернет-магазин Ehya');

  // Получатель письма
  $mail->addAddress('d9fgrek@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  // Проверяем отравленность сообщения
  $result = ($mail->send()) ? 'success' : 'error';
  $status = '';
} catch (Exception $e) {
  $result = "error";
  $status = $mail->ErrorInfo;
}

// $type = $sub_mail ? 'sub' : 'msg';

// Отображение результата
// header('Location: thanks.php?t=' . $type);
echo json_encode(["result" => $result, "status" => $status]);

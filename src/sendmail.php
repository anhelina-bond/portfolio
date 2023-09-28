<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //from
    $mail->setFrom('angelibond19@gmail.com', 'From MYself');

    //to
    $mail->addAddress('angelibond16@gmail.com');

    //topic
    $mail->Subject = 'New letter';


    //body
    $body = '<h1>hi! it`s meeeee</h1>';

    if(!trim(empty($_POST['name']))) {
        $body.='<p><strong>Name:</strong> ' .$_POST['name'].'</p>';
    }

    if(!trim(empty($_POST['email']))) {
        $body.='<p><strong>Email:</strong> ' .$_POST['email'].'</p>';
    }

    if(!trim(empty($_POST['text']))) {
        $body.='<p><strong>Message:</strong> ' .$_POST['text'].'</p>';
    }

    //sending
    if (!$mail->send()) {
        $message = 'Error';
    } else {
        $message = 'Success';
    }

    $response = ['message' => $message];

    header('Content-type: aplication/json');
    echo json_encode($response);

?>
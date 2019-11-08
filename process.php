<?php
if (count($_POST) && (strpos($_POST['image_content'], 'data:image') === 0)) {
    $return = 0;
    $img = $_POST['image_content'];

    if (strpos($img, 'data:image/jpeg;base64,') === 0) {
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $ext = '.jpg';
    }
    if (strpos($img, 'data:image/png;base64,') === 0) {
        $img = str_replace('data:image/png;base64,', '', $img);
        $ext = '.png';
    }

    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $file = 'uploads/img' . date('YmdHis') . $ext;

    if (file_put_contents($file, $data)) {
        $return = 1;
        $message = 'The image was saved as ' . $file . '.';
    } else {
        $message = 'The image could not be saved';
    }

    header('Location: index.php?return=' . $return . '&message=' . $message);

}

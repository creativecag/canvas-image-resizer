<?php
// echo '<pre>'; print_r($_POST); echo '</pre>'; exit(__FILE__ . ':' . __LINE__);
$message = '';

foreach ($_POST as $key => $img) {
    if (strpos($key, '_canvas_image') !== false) {
        // echo $key . ' is canvas field';

        if (strpos($img, 'data:image') !== false) {
            // echo ' & data is image<br>';
            // echo '<pre>';
            // print_r($img);
            // echo '</pre>';

            $return = 0;
            if (strpos($img, 'data:image/jpeg;base64,') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $img);
                $ext = '.jpg';
            }
            if (strpos($img, 'data:image/png;base64,') !== false) {
                $img = str_replace('data:image/png;base64,', '', $img);
                $ext = '.png';
            }

            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $file = 'uploads/img-' . uniqid() . '-' . date('YmdHis') . $ext;

            if (file_put_contents($file, $data)) {
                $return = 1;
                $message .= $file . ' saved. ';
            } else {
                $message .= $file . ' not saved. ';
            }
        } else {
            // echo '<br>';
        }
    } else {
        // echo $key . ' is NOT canvas field<br>';
    }
}

// exit('<br>done');
header('Location: index.php?return=' . $return . '&message=' . $message);

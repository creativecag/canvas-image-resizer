<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>canvas</title>
    <link href="//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="styles/main.css">
</head>

<body>
    <?php if ( ! empty($_GET['message'])): ?>
        <div class="alert <?php echo ($_GET['return'] == 1) ? 'success' : 'error'?> ">
            <?php echo $_GET['message']; ?>
        </div>
    <?php endif ?>

    <div class="container">
        <div class="row">
            <div class="col-4 offset-4">
                <h5>
                    Canvas Image Resizer Demo<br>
                </h5>
                <p>
                    Place file on canvas at certain dimentions and upload canvas data to reduce file upload size. Place image preview on page so user can see what will be uploaded.
                </p>

                <form method="post" action="process.php" class="form">

                    <input name="image_file_1" id="image_file_1" type="file" class="form-control file">
                    <input name="image_file_2" id="image_file_2" type="file" class="form-control file">
                    <input name="image_file_3" id="image_file_3" type="file" class="form-control file">

                    <input id="bt_save" type="submit" value="Upload" class="btn btn-primary btn-sm">

                </form>

            </div>
        </div>
    </div>

    <script src="js/canvasresize.js?time=<?php echo time() ?>"></script>

</body>
</html>

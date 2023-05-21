<?php

    // check for post request
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        // get upload folder
        $fold = "files/";
        // create folder if not exists
        if(file_exists($fold) === false) { mkdir($fold); }
        // get file path to upload
        $path = $fold . $_FILES["file"]["name"];
        // check file exists
        if(file_exists($path)) {
            // get file name
            $name = pathinfo($_FILES["file"]["name"])['filename'];
            // file index to loop
            $indx = 2;
            // get file extension
            $extn = pathinfo($_FILES["file"]["name"])['extension'];
            // while file exists
            while(file_exists($fold . $name . " (" . $indx . ")." . $extn)) {
                // increase file index
                $indx = $indx + 1;
            }
            // get possible file path
            $path = $fold . $name . " (" . $indx . ")." . $extn;
        }
        // upload file and get state
        $done = move_uploaded_file($_FILES["file"]["tmp_name"], $path);
        // echo upload state
        echo($done);
        // exit after post
        exit();
    }

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./index.css">
    <script src="./index.js" defer></script>
    <title>File Uploader</title>
</head>
<body>
    <button>Select File</button>
    <input type="file">
    <span></span>
</body>
</html>
<?php

header('Content-Type: application/json');
   
session_start();   
    
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
    
require("../vendor/autoload.php");

$client_id = "89d920c58567e0f22abc2beee763f1b204af8e81";
$client_secret = "SEvsb2zRcUN1FMrQxFdakWwGE3bCicwQ72zThWuKktyE9wsTYtDd4mjaW5xcwGlXB4Zvca9vgAvlfssdsEnR+G17I9rZkbMhKWKKPa9qXSFhtDR5oHUNfcxVBxa2/1xT";

$scope = array("public", "private");

$vimeo = new \Vimeo\Vimeo($client_id, $client_secret);

$access_token = $vimeo->clientCredentials();

//print_r($access_token['body']['access_token']);

$token = $access_token['body']['access_token'];

$vimeo->setToken($token);

//print_r($access_token);

//https://vimeo.com/140890266
$videos = $vimeo->request("/users/13240085/videos");

echo(json_encode($videos));

//print_r($videos);

//echo($_SESSION['token']);
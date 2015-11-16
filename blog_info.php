<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require('vendor/autoload.php');
	
use GuzzleHttp\Client;

$client = new Client();

$response = $client->get('https://api.tumblr.com/v2/blog/mendipsnow.tumblr.com/info?api_key=QZZoo1PTjzR6zJpJQibwFshmEYjkdBw780HlKNr3lQWIWwxbUU');

echo $response->getBody();


?>
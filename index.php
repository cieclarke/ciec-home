<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require('vendor/autoload.php');

    use GuzzleHttp\Client;
        
    class Tumblr
    {
        const API_KEY = 'QZZoo1PTjzR6zJpJQibwFshmEYjkdBw780HlKNr3lQWIWwxbUU';
        const BLOG_NAME = 'mendipsnow.tumblr.com';
        
        public function info()
        {
            $partName = 'info';
            
            $client = new Client();
            
            $response = $client->get('https://api.tumblr.com/v2/blog/'.self::BLOG_NAME.'/'.$partName.'?api_key=' . self::API_KEY);
            
            $body = $response->getBody();
            
            return $body;
        
        }
       
    }
 
    
    $tumblr = new Tumblr();
    
    echo $tumblr->info();

?>
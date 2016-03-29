<?php

    header('Content-Type: application/json');
    
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    
    require('../vendor/autoload.php');

    use GuzzleHttp\Client;
        
    class Flickr
    {
        public function album($id)
        {
            $url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&user_id=67828456@N07&extras=url_m&' .
            'api_key=61777036f4ecf11adb192f7156c6e92e&photoset_id='.$id.'&nojsoncallback=1&format=json';
            
            $client = new Client();
            
            $response = $client->get($url);
            
            $json = $response->getBody();
            
            $jsonArray = json_decode($json, true);
            
            return $jsonArray;
            
        }
        
        
        public function albums()
        {
            $url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&primary_photo_extras=url_s' .
                '&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&per_page=10&nojsoncallback=1&format=json';
            
            $client = new Client();
            
            $response = $client->get($url);
            
            $json = $response->getBody();
            
            $jsonArray = json_decode($json, true);
            
            //echo $jsonArray['photosets']['photoset'][0]['id'];
            $counter = 0;
            
            foreach($jsonArray['photosets']['photoset'] as $item) { 
             
                $id = $item['id'];
                
                $albumArray = $this->album($id); 
                
                $jsonArray['photosets']['photoset'][(string)$counter]['album'] = $albumArray['photoset'];
                
                $counter++;
            
            }

            return json_encode($jsonArray);
        
        }
       
    }
    
    $flickr = new Flickr();
    
    echo $flickr->albums();

?>
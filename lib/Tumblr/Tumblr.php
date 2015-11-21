<?php
    
    
    
    namespace cieclarke;
    
    use GuzzleHttp\Client;
    
    class Tumblr
    {
        $ACCOUNT = "mendipsnow.tumblr.com";
        
        $api_key;
        $client;
        
        
        public function __construct($api_key)
        {
            $this->$api_key = $api_key;
            $client = new Client();
        }
        
        public string API_Key()
        {
            return $this->$api_key;
        }
        
        public string Info()
        {
            $url ='https://api.tumblr.com/v2/blog/'.$ACCOUNT.'/info?api_key=' . $api_key;
            $response = $client->get($url);
            
            $body = $response->getBody();
            
            return $body;
        }
        
        
    }




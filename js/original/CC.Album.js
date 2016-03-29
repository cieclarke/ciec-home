CC.Album = (function () {
    
    var ITEMS_PER_ROW = 3;   
       
    var getListURL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&per_page=10&nojsoncallback=1&format=json";

    var Init = function () {

        if($j(".jumbotron").find(".container.album").length <= 0 || location.hash.length <= 0)
        {
            return;
        }

       
    
    };

    //return data
    return {
        Init: function () { Init(); }
    };

})();
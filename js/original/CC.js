

var $j = jQuery.noConflict();

//Site namespce
var CC = CC || {};


CC.Models = {
    
    Album : function(id, title, photos) {
        this.id = id;
        this.photos = photos;
        this.title = title;
    },
    Photo : function(id, url) {
        this.id = id;

        this.url_thumbnail = url.replace('.jpg', '_z.jpg');
        this.url_medium = url.replace('.jpg', '_m.jpg');
    }
    
};

CC.Loader = 
   (function () { 
    
    var getListURL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&per_page=10&nojsoncallback=1&format=json";
    
    var Albums = function () {

        var albums = new Array();
        
        $j.ajax({
            url: getListURL,
            dataType: 'json',
            error: function (xhr, textStatus, errorThrown) {
                
            },
            success: function (data) {
                
            },
            complete: function (data) {
                var D = $j.parseJSON(data.responseText);

                $j(D.photosets.photoset).each(function() {
               
                    var photosetID = this.id;
                    var title = this.title._content;
                    var photos = new Array();
                    

                    $j.ajax({
                        url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&photoset_id='+photosetID+'&nojsoncallback=1&format=json',
                        dataType: 'json',
                        error: function (xhr, textStatus, errorThrown) {
                            
                        },
                        success: function (data) {
                            
                        },
                        complete: function (data) {
                            var D = $j.parseJSON(data.responseText);
                            $j(D.photoset.photo).each(function() {
                                var url = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'.jpg';
                                var photo = new CC.Models.Photo(this.id, url);
                                photos.push(photo);
                            });
                        }
            
                    });
                    
                    var album = new CC.Models.Album(photosetID, title, photos);
                    albums.push(album);
                    
                });
                
                
            }
        });
        
        return albums;
    }
    
    return {
        Albums: Albums()
    };
    
})();

$j(document).ready(function () {

    var albums = CC.Loader.Albums;

    CC.Photos.Init(albums);
    
});
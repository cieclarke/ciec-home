CC.Photos = (function () {
    
    var ITEMS_PER_ROW = 3;   
       
    var getListURL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&per_page=10&nojsoncallback=1&format=json";

    var fancyOptions = {
                                'openEffect': 'elastic',
                                'closeEffect': 'elastic',
                                'nextEffect': 'fade',
                                'openSpeed': 600, 
                                'closeSpeed': 200,
                                'maxWidth': '500',
                                'autoResize': true
                                }  ;

    var Init = function (albums) {

        if($j(".jumbotron").find(".container.photos").length <= 0) {
            return;
        }
        
        if(albums.length <= 0) {
            return;
        }

        $j(".jumbotron").find(".container.photos").empty();
        $j("body").append("<div id='fancy-box-hidden' class='hidden' />");

        var i = 0;
        var rowid = 0;
                
        $j(albums).each(function() {
        
            var albumId = this.id;
            var albumTitle = this.title;
            var primaryPhoto = this.photos[0];
        
            if(i==0 || i%ITEMS_PER_ROW == 0)    
            {
                rowid++;
                $j(".jumbotron").find(".container.photos").append("<div class='row' id='"+rowid+"' />");
            }
        
            $j(".jumbotron").find(".container").find('#' + rowid).append(
                '<div id='+albumId+' class="col-md-4 col-xs-12 col-sm-4">' +
                    '<figure>' +
                        '<img src="'+primaryPhoto.url_thumbnail+'" />' +
                        '<figcaption>' +
                            '<div>' + albumTitle + '</div>' +
                            '<div>' + 
                            '<a  class="fancybox" rel="'+albumId+'s" href="https://www.flickr.com/photos/cieclarke/albums/' + albumId + '">' +
                                'Slideshow' +
                            '</a>' +
                            ' <a  id="album' + albumId + 'a" rel="'+albumId+'a" href="#album' + albumId + '">' +
                                'Album' +
                            '</a>' +
                            '</div>' +
                        '</figcaption>' +
                    '</figure>' +
                '</div>'
            );
                    

            $j("body").append('<div id="album'+albumId+'" style="display: none;"></div>');
            var photos = new Array();
            $j(albums.photos).each(function() {
                
                photos.push({
                    href: this.url,
                    title: this.title
                });
                
                $j("body").find("#album"+albumId).append(
                    '<img src="'+this.url_medium+'" />'
                );
                
            });
            
            $j('#album'+albumId+'a').fancybox();

            $j('#' + albumId).find('a[rel="'+albumId+'s"]').click(function(e){
                e.preventDefault();
                $j.fancybox.open(photos, fancyOptions); 
            });
                    
        });
    }
    //return data
    return {
        Init: function (albums) { Init(albums); }
    };

})();
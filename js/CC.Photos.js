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

    var Init = function () {

        if($j(".jumbotron").find(".container.photos").length <= 0)
        {
            return;
        }

        $j(".jumbotron").find(".container.photos").empty();
        $j("body").append("<div id='fancy-box-hidden' class='hidden' />");

        $j.ajax({
            url: getListURL,
            dataType: 'json',
            error: function (xhr, textStatus, errorThrown) {
                
            },
            success: function (data) {
                
            },
            complete: function (data) {
                var D = $j.parseJSON(data.responseText);
             
                var i = 0;
                var rowid = 0;
                
                $j(D.photosets.photoset ).each(function() {
               
                    var photosetID = this.id;
                    var title = this.title._content;
               
                    if(i==0 || i%ITEMS_PER_ROW == 0)    
                    {
                        rowid++;
                        $j(".jumbotron").find(".container.photos").append("<div class='row' id='"+rowid+"' />");
                    }
               
                    $j(".jumbotron").find(".container").find('#' + rowid).append(
                        '<div id='+photosetID+' class="col-md-4 col-xs-12 col-sm-4">' +
                            '<figure>' +
                                '<img src="https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.primary+'_'+this.secret+'_m.jpg" />' +
                                '<figcaption>' +
                                    '<div>' + title + '</div>' +
                                    '<div>' + 
                                    '<a  class="fancybox" rel="'+photosetID+'s" href="https://www.flickr.com/photos/cieclarke/albums/' + photosetID + '">' +
                                        'Slideshow' +
                                    '</a>' +
                                    ' <a  id="album' + photosetID + 'a" rel="'+photosetID+'a" href="#album' + photosetID + '">' +
                                        'Album' +
                                    '</a>' +
                                    '</div>' +
                                '</figcaption>' +
                            '</figure>' +
                        '</div>'
                    );
                    
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
                            $j("body").append('<div id="album'+photosetID+'" style="display: none;"></div>');
                            $j(D.photoset.photo).each(function() {
                                
                                photos.push({
                                    href: 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_z.jpg',
                                    title: this.title
                                });
                                
                                $j("body").find("#album"+photosetID).append(
                                    '<img src="https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_z.jpg" />'
                                );
                                
                            });
                            
                            $j('#album'+photosetID+'a').fancybox();
                            
                        }
            
                    });
                    
                    $j('#' + photosetID).find('a[rel="'+photosetID+'s"]').click(function(e){
                        e.preventDefault();
                        $j.fancybox.open(photos, fancyOptions); 
                    });
                    
                    
                    
                    i++;  
                    
                });
                
            }
        });
        
       
       
    
    };

    //return data
    return {
        Init: function () { Init(); }
    };

})();
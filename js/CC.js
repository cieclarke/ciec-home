var $j = jQuery.noConflict();

var CC = CC || {};

CC.Constants = {
    ALBUM_URL: 
         'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&primary_photo_extras=url_s' +
                '&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&per_page=10&nojsoncallback=1&format=json',
    PHOTOS_URL: function(albumId){
        return 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&' + 
                'photoset_id='+albumId+'&nojsoncallback=1&format=json';
    }
    
}

CC.Models = {

    Album: Backbone.Model.extend({
        
        initialize: function() {
            
            _.bindAll(this, 'Id', 'Count', 'Title', 'Description', 'Thumbnail');
            
        },
        Id: function() {
            return this.attributes.id;
        },
        Count: function() {
            return this.attributes.photos;
        },
        Thumbnail: function() {
            return this.attributes.primary_photo_extras.url_s;
        },
        Title: function() {
            return this.attributes.title._content;
        },
        Description: function() {
            return this.attributes.description._content;
        }
        
    })

}

CC.Collections = {

    AlbumList: Backbone.Collection.extend({
    
        model: CC.Models.Album,
    
    })

}

CC.Views = {

    AlbumView: Backbone.View.extend({
        
        initialize: function(){
            this.model.on("change", this.render);
        },
        tagName: 'li',
        className: 'list-group-item',
        events:  {
            'click  a.nav' : function(e) {
                e.preventDefault();
                console.log('click');  
                //router.navigate(e.target.hash, true); 
            }
        },
        render: function(){
            
            var tmpl = _.template($j('#albums').html());
            
            this.$el.html(tmpl(this.model));
            
            return this; 
        }
        
    }),

    AlbumsView: Backbone.View.extend({
        initialize: function(){
            
            
        },
        
        tagName: 'ul',
        className: 'list-group',
        render: function(){
            
            var el = this.$el;
            
            _.each(this.collection.models, function(item){
                
                var albumView = new CC.Views.AlbumView({model: item});

                $j(el).append(albumView.render().el);
            });

            return this;
        }    
    }),

    PhotosView: Backbone.View.extend({
        initialize: function(){
            console.log(this.collection);
        },

        tagName: 'ul',
        className: 'list-group',
        render: function(){
            
            var el = this.$el;
            
            _.each(this.collection.models, function(item){
                
                var photoView = new CC.Views.PhotoView({model: item});

                $j(el).append(photoView.render().el);
            });

            return this;
        }    
    }),

    PhotoView: Backbone.View.extend({
        initialize: function(){
            console.log(this.collection);
        },

        tagName: 'li',
        className: 'list-group-item',
        render: function(){
            
           var tmpl = _.template($j('#album').html());
            
            this.$el.html(tmpl(this.model));
            
            return this; 
        }    
    })

}



var AlbumRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        'album/:id': 'album'
    },

    album: function(id){
        loadAlbum(id);
    },
    
    index: function() {
        loadIndex();
    },
    
    showAlbum : function(id){ 
        loadAlbum(id);
    },
    
    showAlbums: function(){
        loadIndex();
    }

});


$j(document).ready(function () {   

    $j.getJSON(CC.Constants.ALBUM_URL,
    {}, 
    function(data){
        var albumList = new CC.Collections.AlbumList(data.photosets.photoset);
        var albumsView = new CC.Views.AlbumsView({collection: albumList});
        $j(".jumbotron").find(".container.photos").html(albumsView.render().el);
    });

});
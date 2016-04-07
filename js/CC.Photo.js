var $j = jQuery.noConflict();
var CC = CC || {};
CC.Photo = CC.Photo || {};

CC.Photo.Global = {
    ALBUM_URL: 
         'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&primary_photo_extras=url_s' +
                '&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&per_page=10&nojsoncallback=1&format=json',
    PHOTOS_URL: function(albumId){
            return 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&user_id=67828456@N07&api_key=61777036f4ecf11adb192f7156c6e92e&' + 
                'photoset_id='+albumId+'&nojsoncallback=1&format=json&extras=url_m,url_s';
            },
    Router: function(){}
    
}

CC.Photo.Models = {

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
        
    }),
    
    Photo: Backbone.Model.extend({
        
        initialize: function() {
            
            _.bindAll(this, 'Id', 'Url');
            
        },
        Id: function() {
            return this.attributes.id;
        },
        Url: function() {
            return this.attributes.url_m;
        },
        Title: function() {
            return this.attributes.title;
        }
        
    })

}

CC.Photo.Collections = {

    AlbumList: Backbone.Collection.extend({
    
        model: CC.Photo.Models.Album,
    
    }),
    
    PhotoList: Backbone.Collection.extend({
    
        model: CC.Photo.Models.Photo,
    
    })

}

CC.Photo.Views = {

    BackView: Backbone.View.extend({
        tagName: 'ol',
        className: 'breadcrumb',
        render: function(){
            
            var count = this.collection.length;
            var el = this.$el;
            
            var listItems = _.map(this.collection, function(item, index) {
                
                var active = '';
                
                if(index + 1 == count) {
                    return '<li class="active">'+item+'</li>';
                }
                else {
                    return '<li class="active"><a href="#home">'+item+'</a></li>';
                }
             
            });
            
            _.each(listItems, function(item) {
                $j(el).append($j(item));
            })
            
            return this;
        }
    }),

    AlbumView: Backbone.View.extend({
        
        initialize: function(){
            this.model.on("change", this.render);
        },
        tagName: 'li',
        className: 'list-group-item',
        events:  {
            'click  a.nav' : function(e) {
                e.preventDefault();
                console.log(e.target.hash);
                CC.Photo.Global.Router.navigate(e.target.hash, true); 
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
                
                var albumView = new CC.Photo.Views.AlbumView({model: item});

                $j(el).append(albumView.render().el);
            });

            return this;
        }    
    }),

    PhotosView: Backbone.View.extend({
        initialize: function(){
            
        },

        tagName: 'ul',
        className: 'list-group',
        render: function(){
            
            var el = this.$el;
            
            _.each(this.collection.models, function(item){
                
                var photoView = new CC.Photo.Views.PhotoView({model: item});

                $j(el).append(photoView.render().el);
            });

            return this;
        }    
    }),

    PhotoView: Backbone.View.extend({
        initialize: function(){
            
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

CC.Photo.Router = {

    AlbumRouter: Backbone.Router.extend({
        
        albumList: null,
        albumView: null,
        albumsView: null,
        photoList: null,
        photoView: null,
        
        initialize: function() {
            console.log('router');
            //_.bindAll(this, 'albumList', 'albumView');
            
            $j.getJSON(CC.Photo.Global.ALBUM_URL,
            {}, 
            function(data){
                this.albumList = new CC.Photo.Collections.AlbumList(data.photosets.photoset);
                this.albumsView = new CC.Photo.Views.AlbumsView({collection: this.albumList});
                this.backView = new CC.Photo.Views.BackView({collection: ['Albums']});
                $j(".jumbotron").find(".container.photos").empty();
                $j(".breadcrumb").remove();
                $j(".jumbotron").find(".container.photos").append(this.backView.render().el);
                $j(".jumbotron").find(".container.photos").append(this.albumsView.render().el);
            });
        
        },
        
        routes: {
            'home': 'index',
            'album/:id': 'album'
        },

        album: function(id){
            //$j(".jumbotron").find(".container.photos").html('<p>album route: '+id+'</p>');
            $j.getJSON(CC.Photo.Global.PHOTOS_URL(id),
            {}, 
            function(data){
                this.photoList = new CC.Photo.Collections.PhotoList(data.photoset.photo);
                this.photosView = new CC.Photo.Views.PhotosView({collection: this.photoList});
                this.backView = new CC.Photo.Views.BackView({collection: ['Albums', data.photoset.id]});
                $j(".jumbotron").find(".container.photos").empty();
                $j(".breadcrumb").remove();
                $j(".jumbotron").find(".container.photos").append(this.backView.render().el);
                $j(".jumbotron").find(".container.photos").append(this.photosView.render().el);
            });
        },
        
        index: function() {
            
            this.initialize();
           
        }
    })
};

$j(document).ready(function () {   

    CC.Photo.Global.Router = new CC.Photo.Router.AlbumRouter();
    Backbone.history.start({ pushState: false });
    
});
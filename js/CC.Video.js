var $j = jQuery.noConflict();
var CC = CC || {};
CC.Video = CC.Video || {};

CC.Video.Global = {
    VIDEO_URL: 
         '/data/vimeo.php'
    
}

CC.Video.Models = {

    Video: Backbone.Model.extend({
        
        initialize: function() {
            
            _.bindAll(this, 'Id', 'Title', 'Description', 'Thumbnail');
            
        },
        Id: function() {
            return this.attributes.link;
        },
        Thumbnail: function() {
            return this.attributes.pictures.sizes[2].link;
        },
        Title: function() {
            return this.attributes.name;
        },
        Description: function() {
            return this.attributes.description;
        },
        Link: function() {
            return this.attributes.link;
        },
        EmbedHTML: function() {
            return this.attributes.embed.html;
        }
        
    }),
    
   

}

CC.Video.Collections = {

    VideoList: Backbone.Collection.extend({
    
        model: CC.Video.Models.Video,
    
    })

}

CC.Video.Views = {

    
    VideoView: Backbone.View.extend({
        
        initialize: function(){
            this.model.on("change", this.render);
        },
        tagName: 'li',
        className: 'list-group-item',
        events:  {
            'click  a' : function(e) {
                e.preventDefault();
                $j.fancybox({
                    href : this.model.Link(),
                    title : 'Lorem lipsum',
                    type : 'html',
                    content : this.model.EmbedHTML()
                });
            }
        },
        render: function(){
            
            var tmpl = _.template($j('#videos').html());
            
            this.$el.html(tmpl(this.model));
            
            return this; 
        }
        
    }),

    VideosView: Backbone.View.extend({
        initialize: function(){

        },
        
        tagName: 'ul',
        className: 'list-group',
        render: function(){
            
            var el = this.$el;
            
            _.each(this.collection.models, function(item){
                
                var videoView = new CC.Video.Views.VideoView({model: item});

                $j(el).append(videoView.render().el);
            });

            return this;
        }    
    })

}



$j(document).ready(function () {   

    $j.getJSON(CC.Video.Global.VIDEO_URL,
            {}, 
            function(data){
                this.videoList = new CC.Video.Collections.VideoList(data.body.data);
                this.videosView = new CC.Video.Views.VideosView({collection: this.videoList});
                $j(".jumbotron").find(".container.videos").empty();
                $j(".jumbotron").find(".container.videos").append(this.videosView.render().el);
            });
    
});
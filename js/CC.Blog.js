var $j = jQuery.noConflict();
var CC = CC || {};
CC.Blog = CC.Blog || {};

CC.Blog.Global = {
    TUMBLR_URL: 
         'https://api.tumblr.com/v2/blog/mendipsnow.tumblr.com/posts?api_key=QZZoo1PTjzR6zJpJQibwFshmEYjkdBw780HlKNr3lQWIWwxbUU',
    Router: function(){}
    
}

CC.Blog.Models = {

    Blog: Backbone.Model.extend({
        
        initialize: function() {
            //_.bindAll(this, 'Title');
            console.log(this.attributes.title);
        },
        Title : function(){
            if(this.attributes.title == undefined) {
                return '';
            } else {
                return this.attributes.title;
            }
        }
        
    })

}

CC.Blog.Collections = {

    BlogList: Backbone.Collection.extend({
    
        model: CC.Blog.Models.Blog
    
    })

}

CC.Blog.Views = {

    BlogsView: Backbone.View.extend({
        initialize: function(){

        },
        
        tagName: 'ul',
        className: 'list-group',
        render: function(){
            
            var tmpl = _.template($j('#blogs').html());
            var $dd = this.$el;
            _.each(this.collection.models, function(item){
                
                $dd.append(tmpl(item));    
                

                //$j(el).append(photoView.render().el);
            });
            
            //this.$el.html(tmpl(this.model));
        
            return this;
        }    
    })
    
}

$j(document).ready(function () {   

    /*
    $j.getJSON(CC.Blog.Global.TUMBLR_URL,
            {}, 
            function(data){
                var blogList = new CC.Blog.Collections.BlogList(data.response.posts);
                var blogsView = new CC.Blog.Views.BlogsView({collection: blogList});
                $j(".jumbotron").find(".container.home").empty();    
                $j(".jumbotron").find(".container.home").append(this.blogsView.render().el);
            });
    */        
            
            $j.ajax({
    url: CC.Blog.Global.TUMBLR_URL,
    dataType: 'jsonp',
    success: function(data){
                var blogList = new CC.Blog.Collections.BlogList(data.response.posts);
                var blogsView = new CC.Blog.Views.BlogsView({collection: blogList});
                $j(".jumbotron").find(".container.home").empty();    
                $j(".jumbotron").find(".container.home").append(blogsView.render().el);
    }
    });
});
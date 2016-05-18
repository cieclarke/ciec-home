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
            _.bindAll(this, 'Title', 'Type', 'Thumbnail', 'Summary');
            //console.log(this.attributes.title);
            //console.log(this.attributes.type);
        },
        Title : function(){
            if(this.attributes.title == undefined) {
                return '';
            } else {
                return this.attributes.title;
            }
        },
        Type : function(){
            return this.attributes.type;
        },
        Summary : function(){
            return this.attributes.summary;
        },
        Thumbnail: function(){
            if(this.attributes.photos == undefined) {
                return '';
            } else {
                if(this.attributes.photos[0].alt_sizes == undefined)
                {
                    return '';
                }
                else {
                    return this.attributes.photos[0].alt_sizes[4].url;    
                }
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
            
            //var tmpl = _.template($j('#blogs').html());
            var $element = this.$el;
            _.each(this.collection.models, function(item){
                
                switch(item.Type())
                {
                    case 'link':
                        var tmpl = _.template($j('#blog-list-link').html());
                        $element.append(tmpl(item));
                        break;
                    case 'photo':
                        var tmpl = _.template($j('#blog-list-photo').html());
                        $element.append(tmpl(item));
                        break;
                    case 'text':
                        var tmpl = _.template($j('#blog-list-text').html());
                        $element.append(tmpl(item));                        
                        break;
                }
                
                
                //$element.append(tmpl(item));
            });
        
            return this;
        }    
    })
    
}

$j(document).ready(function () {   
         
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
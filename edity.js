(function($){
    $.fn.edity = function(opts) {
        
        this.reinitialize = function() {
            $('.edity-the-editor_wrapper').remove();
            this.run();
        }
        this.run = function() {
            $(this).each(function(i,v){
                //get css values of original textarea
                var textarea = $(this);
                var original_val = $(this).val();
                var width = $(this).width();
                var height = $(this).height();
                var id = "edity-the-editor_"+i;
                var buttons = ['bold','italic'];
                var image_path = 'images/';
                if(opts) {
                    if(opts.buttons) {
                        buttons = opts.buttons;
                    }
                    if(opts.image_path) {
                        image_path = opts.image_path;
                    }
                }
            
                btn_html = '';
                for(i=0;i<buttons.length;i++) {
                    btn_html+='<li class="edity-the-editor_'+buttons[i]+'"><img src="'+image_path+buttons[i]+'.png" /></li>';
                }
            
                var action_bar = "<ul class='edity-the-editor_action_bar'>"+btn_html+"</ul>";
                var iframe = "<iframe frameborder='0' scrolling='yes' id='"+id+"'></iframe>";
            
                $(this).hide();
                $(this).before("<div class='edity-the-editor_wrapper' style='width:"+width+"px;height:"+height+"px;'>"+action_bar+iframe+"</div>");
                var win = document.getElementById(id).contentWindow;
                var doc = document.getElementById(id).contentDocument;
            
                win.document.write(original_val);
                doc.designMode = "on";
            
                var iframeBody=$('#'+id).contents().find('body');
                $(iframeBody).on('keyup',function() {
                    var txt = $(this).html();
                    textarea.val(txt);
                    if(opts) {
                        if(opts.onchange) {
                            opts.onchange(textarea,txt);
                        }
                    }
                });
            
                $('.edity-the-editor_action_bar').on('click','li',function(){
                    var cmd = $(this).attr('class').replace('edity-the-editor_','');
                    win.focus();
                    win.document.execCommand(cmd,false,'');
                    //get current text:
                    console.log('command '+cmd);
                    if(opts) {
                        if(opts.onchange) {
                            opts.onchange(textarea,iframeBody.html());
                        }
                    }
                });
            });
        }
        this.run();
        
        return this;
    }
})(jQuery);
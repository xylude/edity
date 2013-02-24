(function($){
    $.fn.edity = function(opts) {
        
        this.reinitialize = function() {
            this.remove_editors();
            this.run();
        }
        
        this.remove_editors = function() {
            $('.edity-the-editor_wrapper').remove();
            $(this).each(function(){
                $('body').off('click','#edity-the-editor_action_bar_'+$(this).data('edity-id')+' li');
                console.log('removed click event for #edity-the-editor_action_bar_'+$(this).data('edity-id')+' li')
                $(this).data('edity-id',null);
                $(this).data('listener-attached',null);
            });
        }
        
        this.run = function() {
            $(this).each(function(i,v){
                //get css values of original textarea
                console.log($(this).data());
                var textarea = $(this);
                var original_val = $(this).val();
                var width = $(this).width();
                var height = $(this).height();
                if(height==0) {
                    height = 100;
                }
                if(width==0) {
                    width=100;
                }
                
                var id = "edity-the-editor_"+i;
                var bar_id = 'edity-the-editor_action_bar_'+i
                var buttons = ['bold','italic'];
                var image_path = 'images/';
                var dropdown_buttons = '';
                
                textarea.data('edity-id',i);
                
                if(opts) {
                    if(opts.buttons) {
                        buttons = opts.buttons;
                    }
                    if(opts.image_path) {
                        image_path = opts.image_path;
                    }
                }
            
                var btn_html = '';
                var btn_prompt = '';
                for(i=0;i<buttons.length;i++) {
                    btn_prompt = '';
                    if(buttons[i]=='fontSize') {  
                        dropdown_buttons = '<ul>';
                        for(var ii=1;ii<8;ii++) {
                            dropdown_buttons+='<li class="edity-the-editor_fontSize" data-val="'+ii+'">'+ii+'</li>';
                        }
                        dropdown_buttons+='</ul>';
                    } else if(buttons[i]=='createLink') {
                        btn_prompt = ' data-prompt="Enter URL"';
                    }
                    btn_html+='<li'+btn_prompt+' class="edity-the-editor_'+buttons[i]+'" style="background-image:url('+image_path+buttons[i]+'.png);">'+dropdown_buttons+'</li>';
                    dropdown_buttons = '';
                }
            
                var action_bar = "<ul class='edity-the-editor_action_bar' id='"+bar_id+"'>"+btn_html+"</ul>";
                var iframe = "<iframe frameborder='0' scrolling='yes' id='"+id+"'></iframe>";
            
                $(this).hide();
                $(this).before("<div class='edity-the-editor_wrapper' style='width:"+width+"px;height:"+height+"px;'>"+action_bar+iframe+"</div>");
                var win = document.getElementById(id).contentWindow;
                var doc = document.getElementById(id).contentDocument;
            
                if(original_val) {
                    win.document.write(original_val);
                }
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
                
                
                if(!textarea.data('listener-attached')) {
                    textarea.data('listener-attached', true);
                    console.log('attaching listeners');
                    $('body').on('click','#'+bar_id+' li',function(){
                        if($(this).children('ul').length==0) {
                            var c_id = $(this).parents('.edity-the-editor_action_bar').attr('id').replace('edity-the-editor_action_bar_','');
                            var iframe = document.getElementById('edity-the-editor_'+c_id).contentWindow;
                            var cmd = $(this).attr('class').replace('edity-the-editor_','');
                            var value = ($(this).attr('data-val'))?$(this).attr('data-val'):'';
                            if($(this).attr('data-prompt')) {
                                value = prompt($(this).attr('data-prompt'));
                            }
                            iframe.focus();
                            iframe.document.execCommand(cmd,false,value);
                            console.log('issued command '+cmd);
                            //get current text:
                            textarea.val(iframeBody.html());
                            if(opts) {
                                if(opts.onchange) {
                                    opts.onchange(textarea,iframeBody.html());
                                }
                            }
                        } else {
                            //display dropdown:
                            if($(this).children('ul').is(':visible')) {
                                $(this).children('ul').hide()   
                            } else {
                                $(this).children('ul').show();
                            }
                        }
                    });
                }
            });
        }
        this.run();
        
        return this;
    }
})(jQuery);
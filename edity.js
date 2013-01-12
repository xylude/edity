(function($){
    $.fn.edity = function(opts) {
        this.each(function(i,v){
            //get css values of original textarea
            var textarea = $(this);
            var original_val = $(this).val();
            var width = $(this).width();
            var height = $(this).height();
            var id = "edity-the-editor_"+i;
            var buttons = ['bold','italic'];
            if(opts) {
                if(opts.buttons) {
                    buttons = opts.buttons;
                }                
            }
            
            btn_html = '';
            for(i=0;i<buttons.length;i++) {
                btn_html+='<li class="edity-the-editor_'+buttons[i]+'">'+buttons[i]+'</li>';
            }
            
            var action_bar = "<ul class='edity-the-editor_action_bar'>"+btn_html+"</ul>";
            var iframe = "<iframe id='"+id+"' style='width:"+width+"px;height:"+height+"px;'></iframe>";
            
            $(this).hide();
            $(this).before(action_bar+iframe);
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
})(jQuery);
(function($){
    $.fn.edity = function(opts) {
        this.each(function(i,v){
            //get css values of original textarea
            var textarea = $(this);
            var original_val = $(this).val();
            var width = $(this).width();
            var height = $(this).height();
            var id = "editor_"+i;
            var buttons = ['bold','italic'];
            if(opts) {
                if(opts.buttons) {
                    buttons = opts.buttons;
                }                
            }
            
            btn_html = '';
            for(i=0;i<buttons.length;i++) {
                btn_html+='<li class="'+buttons[i]+'">'+buttons[i]+'</li>';
            }
            
            var action_bar = "<ul class='action_bar'>"+btn_html+"</ul>";
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
                console.log(textarea.val());
            });
            
            $('.action_bar').on('click','li',function(){
                var cmd = $(this).attr('class');
                win.focus();
                win.document.execCommand(cmd,false,'');
            });
        });
    }
})(jQuery);
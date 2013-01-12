(function($){
    $.fn.edity = function(opts) {
        this.each(function(i,v){
            //get css values of original textarea
            var original_val = $(this).val();
            var width = $(this).width();
            var height = $(this).height();
            var id = "editor_"+i;
            
            $(this).hide();
            $(this).before("<iframe id='"+id+"' style='width:"+width+"px;height:"+height+"px;'></iframe>");
            document.getElementById(id).contentWindow.document.write(original_val);
            document.getElementById(id).contentDocument.designMode = "on";
        });
    }
})(jQuery);
edity
=====

A lightweight jQuery plugin for Rich Text Editing. Currently, the edity plugin uses
the Tango Icon Set (http://tango.freedesktop.org/Tango_Icon_Library).

To replace/change the images:
Replace the images with the actual command name being used (case sensitive). The images must
be .png or you will need to alter the source to use the format you wish.

Usage:
$(element).edity(options);

Properties:

image_path: Default is 'images/'. You can specify any image path you want for the 
icons to load from.

buttons: Array of buttons you wish to use. The default value is ['bold','italic']. The items in this list MUST match actual
commands (see http://help.dottoro.com/larpvnhw.php for available commands). A valid 
example:

$(element).edity({
    buttons: ['bold','italic','underline']
});

Events:

onchange(original_textarea, updated_text) - This event will fire any time there is a change in the 
text. It will return the original textarea object in a jQuery wrapper as well as the newly updated 
text.
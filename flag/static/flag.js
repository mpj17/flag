"use strict";

function Flag(inId, origId, bwId, greyId, smallId) {
    var image = null;

    function monochrome () {
        var thumbHeight = 110, newHeight=null, newWidth=null,
            imageData=null, grey=null,
            canvas = document.getElementById('ugly-bw'),
            context = canvas.getContext('2d');
        image.style.display = 'none';
        grey = document.getElementById('ugly-grey');
        context.drawImage(image, 0, 0, grey.width, grey.height);
        // Now monochrome
        imageData = context.getImageData(0, 0, grey.width, grey.height);
        for (var i=0; i<imageData.data.length; i+=4) {
            var r = imageData.data[i];
            var g = imageData.data[i+1];
            var b = imageData.data[i+2];
            var v = (0.2126*r + 0.7152*g + 0.0722*b >= 127) ? 255 : 0;
            imageData.data[i] = imageData.data[i+1] = imageData.data[i+2] = v
        }
        context.putImageData(imageData, 0, 0);
    } // monochrome

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader=new FileReader(),
                i=null, d=null, e=null;

            reader.onload = function (e) {
                jQuery('#ugly-orig').attr('src', e.target.result);
                jQuery('#ugly-grey').attr('src', e.target.result);
                jQuery('#ugly-small').attr('src', e.target.result);
                image.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    } // readURL

    function init() {
        image = new Image();
        image.onload = function() {
            monochrome();
        }

        jQuery("#ugly-in").change(function(){
            readURL(this);
            jQuery('#demo')
                .removeClass('collapsed')
                .addClass('full');
        });
    } // init
    init(); // Automatic execution
}

jQuery(window).load(function () {
    var f=null;
    f = Flag('ugly-in', 'ugly-orig', 'ugly-bw', 'ugly-grey', 'ugly-small');
});

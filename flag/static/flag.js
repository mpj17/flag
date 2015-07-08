"use strict";

function Flag(fileInput, origImg, bwCanvas, greyImg, smallImg) {
    var image = null;

    function monochrome () {
        var thumbHeight = 110, newHeight=null, newWidth=null,
            imageData=null, grey=null, canvas=null, context=null;
        canvas = jQuery(bwCanvas)[0];
        context = canvas.getContext('2d');
        image.style.display = 'none';
        grey = jQuery(greyImg)[0];
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
                jQuery(origImg).attr('src', e.target.result);
                jQuery(greyImg).attr('src', e.target.result);
                jQuery(smallImg).attr('src', e.target.result);
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

        jQuery(fileInput).change(function(){
            readURL(this);
            jQuery('#demo')
                .removeClass('collapsed')
                .addClass('full');
        });
    } // init
    init(); // Automatic execution
}

jQuery(window).load(function () {
    var flagScript=null, f=null;
    flagScript = jQuery('#ugly-script');
    f = Flag('#ugly-in', '#ugly-orig', '#ugly-bw', '#ugly-grey', '#ugly-small');
});

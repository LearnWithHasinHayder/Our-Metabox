var frame, gframe;
;(function ($) {
    $(document).ready(function () {

        var image_url = $("#omb_image_url").val();
        if (image_url) {
            $("#image-container").html(`<img src='${image_url}' />`);
        }

        var images_url = $("#omb_images_url").val();
        images_url = images_url ? images_url.split(";") : [];
        for(i in images_url){
            var _image_url = images_url[i];
            $("#images-container").append(`<img style="margin-left: 10px" src='${_image_url}' />`);
        }

        $(".omb_dp").datepicker(
            {
                changeMonth: true,
                changeYear: true
            }
        );

        $("#upload_image").on("click", function () {

            if (frame) {
                frame.open();
                return false;
            }

            frame = wp.media({
                title: "Select Image",
                button: {
                    text: "Insert Image"
                },
                multiple: false
            });

            frame.on('select', function () {
                var attachment = frame.state().get('selection').first().toJSON();
                console.log(attachment);
                $("#omb_image_id").val(attachment.id);
                $("#omb_image_url").val(attachment.sizes.thumbnail.url);
                $("#image-container").html(`<img src='${attachment.sizes.thumbnail.url}' />`);
            });


            frame.open();
            return false;
        });

        $("#upload_images").on("click", function () {

            if (gframe) {
                gframe.open();
                return false;
            }

            gframe = wp.media({
                title: "Select Image",
                button: {
                    text: "Insert Image"
                },
                multiple: true
            });

            gframe.on('select', function () {
                var image_ids = [];
                var image_urls = [];
                var attachments = gframe.state().get('selection').toJSON();
                //console.log(attachments);
                $("#images-container").html('');
                for (i in attachments) {
                    var attachment = attachments[i];
                    image_ids.push(attachment.id);
                    image_urls.push(attachment.sizes.thumbnail.url);
                    $("#images-container").append(`<img style="margin-right: 10px;" src='${attachment.sizes.thumbnail.url}' />`);

                }
                $("#omb_images_id").val(image_ids.join(";"));
                $("#omb_images_url").val(image_urls.join(";"));

            });


            gframe.open();
            return false;
        });
    });
})(jQuery);
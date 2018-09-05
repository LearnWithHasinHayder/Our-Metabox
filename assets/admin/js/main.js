var frame;
;(function ($) {
    $(document).ready(function () {

        var image_url = $("#omb_image_url").val();
        if (image_url) {
            $("#image-container").html(`<img src='${image_url}' />`);
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
    });
})(jQuery);
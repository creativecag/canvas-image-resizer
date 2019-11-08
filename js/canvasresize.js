var CanvasImages;

CanvasImages = {
    init: function(selector) {
        var imageFile = document.querySelector(selector);

        var imageForm = document.querySelector('form');
        imageForm.querySelector('input[type="submit"]').disabled = true;

        imageFile.addEventListener('change', function(e) {
            CanvasImages.placeOnCanvas(e);
        });
    },

    placeOnCanvas: function(e) {
        CanvasImages.clearData();

        var imageContent = document.getElementById('image_content');
        var file = e.target.files[0];

        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            var image = new Image();
            var imgurl = window.URL.createObjectURL(file);
            image.src = imgurl;

            image.onload = function() {
                var max_size = 1000;
                var w = image.width;
                var h = image.height;

                if (w > h) {
                    if (w > max_size) {
                        h *= max_size / w;
                        w = max_size;
                    }
                } else {
                    if (h > max_size) {
                        w *= max_size / h;
                        h = max_size;
                    }
                }

                var dataURL = '';
                var canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(image, 0, 0, w, h);

                if (file.type === 'image/jpeg') {
                    dataURL = canvas.toDataURL('image/jpeg', 1.0);
                } else {
                    dataURL = canvas.toDataURL('image/png');
                }

                imageContent.value = dataURL;

                // Create the image element
                var htmlImage = document.createElement('img');
                htmlImage.src = imageContent.value;

                var imagePreview = document.createElement('div');
                imagePreview.setAttribute('class', 'canvas-image');
                imagePreview.appendChild(htmlImage);

                // Add files size and predicted file size under image
                var actualSize = this.formatFileSize(file.size);
                var predictedSize = this.formatFileSize(Math.round((dataURL.length) * (3 / 4)));
                var sizesBox = document.createElement('div');
                sizesBox.setAttribute('class', 'message');
                sizesBox.innerHTML = 'Original: ' + actualSize + 'kb, Predicted: ' + predictedSize + 'kb';
                imagePreview.appendChild(sizesBox);

                // Select the form and append the image to the
                // bottom of the form
                var imageForm = document.querySelector('form');
                imageForm.appendChild(imagePreview);
                imageForm.querySelector('input[type="submit"]').disabled = false;

            };
        } else {
            alert('Please choose only jpg and png files.');
        }
    },

    clearData: function() {
        var imagePreview = document.querySelector('.canvas-image');

        if (typeof(imagePreview) != 'undefined' && imagePreview !== null) {
            return imagePreview.parentNode.removeChild(imagePreview);
        }
    },

    formatFileSize: function(bytes, decimalPoint) {
        if (bytes === 0) {
            return '0 Bytes';
        }

        var k = 1000,
            dm = decimalPoint || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
};

CanvasImages.init('#image_file');
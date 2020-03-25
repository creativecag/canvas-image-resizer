var CanvasImages;

// querySelector in jQuery style
var $ = function(selector) {
    return document.querySelector(selector);
};

CanvasImages = {
    init: function(selector) {
        var imageFiles = document.querySelectorAll(selector);

        // Run setUp() on each field
        imageFiles.forEach(CanvasImages.setUp);

    },

    setUp: function(field) {
        field.addEventListener('change', function(e) {
            CanvasImages.placeOnCanvas(field, e);
        });

        // Get input field name
        var fieldName = field.getAttribute('id');

        // Create the wrapper element that will hold the input
        var wrapper = document.createElement('div');
        wrapper.classList.add('cr-image');

        // Create textarea to hold image data
        var contentField = document.createElement('textarea');
        contentField.setAttribute('name', fieldName + '_canvas_image');
        wrapper.appendChild(contentField);

        // Create preview div
        // var canvasPreview = document.createElement('div');
        // canvasPreview.setAttribute('class', 'cr-preview');
        // wrapper.appendChild(canvasPreview);

        // Wrap the input that holds the textarea and file input
        field.parentNode.insertBefore(wrapper, field);
        wrapper.appendChild(field);
    },

    placeOnCanvas: function(field, e) {
        CanvasImages.clearData(field);

        // Get field name
        var fieldName = field.getAttribute('name');

        // Target the textarea where the image data will be placed
        var imageContent = $('textarea[name="' + fieldName + '_canvas_image"]');
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
                imagePreview.setAttribute('class', 'cr-preview');
                imagePreview.appendChild(htmlImage);

                // Add files size and predicted file size under image
                var actualSize = CanvasImages.formatFileSize(file.size);
                var predictedSize = CanvasImages.formatFileSize(Math.round((dataURL.length) * (3 / 4)));
                var sizesBox = document.createElement('div');
                sizesBox.setAttribute('class', 'message');
                sizesBox.innerHTML = 'Original: ' + actualSize + 'kb, Predicted: ' + predictedSize + 'kb';
                imagePreview.appendChild(sizesBox);

                // Select the form and append the image to the
                // bottom of the form
                // var imageForm = document.querySelector('form');
                field.parentNode.appendChild(imagePreview);

            };
        } else {
            alert('Please choose only jpg and png files.');
        }
    },

    clearData: function(field) {
        var imagePreview = field.parentNode.querySelector('.cr-preview');

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
    },

    ajax: function(url, callback) {
        var Http;

        Http = new XMLHttpRequest();
        Http.onreadystatechange = function() {
            if (Http.readyState == 4 && Http.status == 200) {
                callback(Http.responseText);
            }
        };

        Http.open('GET', url, true);
        Http.send();
    }
};

CanvasImages.init('.file');
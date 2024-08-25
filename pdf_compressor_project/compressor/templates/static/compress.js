document.getElementById('compress-form').onsubmit = function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('pdf-file-input');
    const file = fileInput.files[0];

    if (file) {
        // Display original file size
        const originalSize = (file.size / 1024).toFixed(2);
        document.getElementById('original-size').innerText = originalSize;

        const formData = new FormData();
        formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
        formData.append('pdf_file', file);

        fetch('{% url "compress_JAVA" %}', {
            method: 'POST',
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            // Calculate and display compressed file size
            const compressedSize = (blob.size / 1024).toFixed(2);
            document.getElementById('compressed-size').innerText = compressedSize;

            // Show file info
            document.getElementById('file-info').style.display = 'block';

            // Create a download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed_' + file.name;
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error compressing the PDF:', error);
        });
    }
};


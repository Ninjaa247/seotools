document.getElementById('convertButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length === 0) {
        alert('Please select an image file');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const imgData = canvas.toDataURL('image/jpeg');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('landscape', 'pt', [canvas.width, canvas.height]);
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            
            pdf.save('converted.pdf');
        };
    };

    reader.readAsDataURL(file);
});

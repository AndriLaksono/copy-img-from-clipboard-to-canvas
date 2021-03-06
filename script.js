var imageFile;
var imageObj = new Image();
var canvas = document.getElementById('canvasTarget');
var context = canvas.getContext('2d');

window.onload = function() {
    // document.getElementsByTagName('body')[0].addEventListener("paste", handlePaste);
    document.getElementById("pasteTarget").addEventListener("paste", handlePaste);

    imageObj.onload = function() {
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        // clear dulu
        context.clearRect(0, 0, imageObj.width, imageObj.height);
        // baru gambar
        context.drawImage(imageObj, 0, 0);
        document.getElementById('base64image').value = canvas.toDataURL('image/png');
        document.getElementById('imageTarget').src = canvas.toDataURL('image/png');
    };
};
function handlePaste(e) {
    for (let i = 0 ; i < e.clipboardData.items.length ; i++) {
        let item = e.clipboardData.items[i];
        console.log("Item type: " + item);
        if (item.type.indexOf("image") != -1) {
            imageFile = item.getAsFile();
            imageObj.src = URL.createObjectURL(item.getAsFile());
        } else {
            console.log("Discarding non-image paste data");
            alert('Discarding non-image paste data');
        }
    }
}


// ============= FOR MODAL
let prevModal = document.getElementById("prevModal");
let btnPrevModal = document.getElementById("btnPrevModal");
let spanModal = document.getElementById("closePrevModal");
// When the user clicks on the button, open the modal
btnPrevModal.onclick = function() {
    prevModal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
spanModal.onclick = function() {
    prevModal.style.display = "none";
}

// =========== FOR ROTATE
let degree = 0;
let isLandscape = true;
document.getElementById('btnRotate').addEventListener('click', function () {
    isLandscape = !isLandscape;
    let transX = imageObj.width/2;
    let transY = imageObj.height/2;
    if (isLandscape) {
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        transX = imageObj.width/2;
        transY = imageObj.height/2;
    } else {
        canvas.width = imageObj.height;
        canvas.height = imageObj.width;
        transX = imageObj.height/2;
        transY = imageObj.width/2;
    }
    degree += 90;

    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    context.translate(transX,transY);
    context.rotate(degree*Math.PI/180);
    context.drawImage(imageObj,-imageObj.width/2,-imageObj.height/2);
    context.restore();
    document.getElementById('base64image').value = canvas.toDataURL('image/png');
    document.getElementById('imageTarget').src = canvas.toDataURL('image/png');
});
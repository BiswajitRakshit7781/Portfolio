const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.offscreen-menu');
hamMenu.addEventListener('click',()=>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})

function downloadCV() {
    const pdfPath = '/file/CV_21.05.pdf';
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'Biswajit-Rakshit-CV.pdf'; // Specify the filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
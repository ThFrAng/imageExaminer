/*
        ThFrAng
        2025

https://github.com/ThFrAng/imageExaminer/

*/

export default class ImageExaminer {
    constructor(images, CENTERIMAGE = 1, DISPLAYHELPER = 1) {
        
        let canWork = 0;

        const MOVEMARGIN = window.innerWidth * 0.05;
        const MOVESPEED = 10;
        const ZOOMSPEED = 15;
        const MIDDLEPAGE = 0.6;

        let currentIndex, image;

        let mouseX, mouseY = 0;
        let zoomWidth, zoomHeight = 0;

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function displayHelper() {
            const MOVEMARGINWIDTH = window.innerWidth * 0.08;
            const MOVEMARGINHEIGHT= window.innerHeight * 0.08;
            const MIDDLEPAGE = 0.6;
            const BORDERCOLOR = "#000000";

            const containerDiv = document.createElement('div');
            document.body.appendChild(containerDiv);

            const moveDiv = document.createElement('div');
            containerDiv.appendChild(moveDiv);

            const buttonDiv = document.createElement('div');
            containerDiv.appendChild(buttonDiv);

            const previousButtonDiv = document.createElement('div');
            previousButtonDiv.innerHTML = "Page précédante<br>Previous page";
            buttonDiv.appendChild(previousButtonDiv);

            const nextButtonDiv = document.createElement('div');
            nextButtonDiv.innerHTML = "Page suivante<br>Next Page";
            buttonDiv.appendChild(nextButtonDiv);

            const instructionDiv = document.createElement('div');
            instructionDiv.innerHTML = "Play<br>Approcher le pointeur des cotés pour se déplacer<br>Utiliser la mollette pour zoomer<br>Cliquer pour changer de page<br><br>Get to pointer close to the sides to move<br>Use the wheel to zoom<br>Click to change page";
            containerDiv.appendChild(instructionDiv);

            containerDiv.style.width = "100%";
            containerDiv.style.height = "100%";

            moveDiv.style.width = (window.innerWidth - (MOVEMARGINWIDTH * 2)) + "px";
            moveDiv.style.height = (window.innerHeight - (MOVEMARGINHEIGHT * 2)) + "px";
            moveDiv.style.left = "0px";
            moveDiv.style.position = "fixed";
            moveDiv.style.marginLeft = MOVEMARGINWIDTH + "px";
            moveDiv.style.marginRight = MOVEMARGINWIDTH + "px";
            moveDiv.style.marginTop = MOVEMARGINHEIGHT + "px";
            moveDiv.style.marginBottom = MOVEMARGINHEIGHT + "px";
            moveDiv.style.border = "thin solid" + BORDERCOLOR;
            moveDiv.style.borderRadius = "25px";

            buttonDiv.style.width = "100%";
            buttonDiv.style.height = "100%";
            buttonDiv.style.display = "flex";
            buttonDiv.style.flexDirection = "row";
            buttonDiv.style.position = "fixed";
            buttonDiv.style.fontFamily = "'Lato', sans-serif";
            buttonDiv.style.fontSize = "13px";
            buttonDiv.style.lineHeight = "24px";
            buttonDiv.style.textTransform = "uppercase";
            buttonDiv.style.color = "#ffffff";

            previousButtonDiv.style.width = (window.innerWidth * (1 - MIDDLEPAGE)) + "px";
            previousButtonDiv.style.height = "94%";
            previousButtonDiv.style.margin = "2%";
            previousButtonDiv.style.marginRight = "0.5%";
            previousButtonDiv.style.border = "medium solid" + BORDERCOLOR;
            previousButtonDiv.style.borderRadius = "25px";
            previousButtonDiv.style.alignContent = "center";
            previousButtonDiv.style.textAlign = "center";
            previousButtonDiv.style.fontWeight = "bold";
            previousButtonDiv.style.backgroundColor = "#000000"
            previousButtonDiv.style.opacity = "0.25";

            nextButtonDiv.style.width = (window.innerWidth * MIDDLEPAGE) + "px";
            nextButtonDiv.style.height = "94%";
            nextButtonDiv.style.margin = "2%";
            nextButtonDiv.style.marginLeft = "0.5%";
            nextButtonDiv.style.border = "medium solid" + BORDERCOLOR;
            nextButtonDiv.style.borderRadius = "25px";
            nextButtonDiv.style.alignContent = "center";
            nextButtonDiv.style.textAlign = "center";
            nextButtonDiv.style.fontWeight = "bold";
            nextButtonDiv.style.backgroundColor = "#000000"
            nextButtonDiv.style.opacity = "0.25";

            instructionDiv.style.position = "fixed";
            instructionDiv.style.width = "100%";
            instructionDiv.style.height = "100%";
            instructionDiv.style.left = "0px";
            instructionDiv.style.textAlign = "center";
            instructionDiv.style.fontFamily = "'Lato', sans-serif";
            instructionDiv.style.fontSize = "13px";
            instructionDiv.style.lineHeight = "24px";
            instructionDiv.style.textTransform = "uppercase";
            instructionDiv.style.alignContent = "center";

            await sleep(5000);
            containerDiv.style.display = 'none';
            canWork = 1;
        }

        function centerImage() {
                image.style.left = (-(image.width - window.innerWidth) / 2) + "px";
                image.style.top = (-(image.height - window.innerHeight) / 2) + "px";
        }

        function initDisplay() {
            image = images[0];
            currentIndex = 0;
            images[0].style.display = 'block';

            for(let i = 1; i < images.length; i++) {
                images[i].style.display = 'none';
            }

            if(CENTERIMAGE == 1) {centerImage()};
            if(DISPLAYHELPER == 1) {displayHelper();}
        }

        function nextImage() {
            if(currentIndex + 1 < images.length && canWork) {
                images[currentIndex].style.display = 'none';
                currentIndex++;

                images[currentIndex].style.display = 'block';
                image = images[currentIndex];
                centerImage();
            }
        }

        function previousImage() {
            if(currentIndex - 1 > 0 && canWork) {
                images[currentIndex].style.display = 'none';
                currentIndex--;

                images[currentIndex].style.display = 'block';
                image = images[currentIndex];
                centerImage();
            }
        }

        document.addEventListener("click", function (event) {
            if(event.pageX >= window.innerWidth * MIDDLEPAGE) {nextImage();}
            else if(event.pageX <= window.innerWidth * MIDDLEPAGE) {previousImage();}
        });

        document.addEventListener("wheel", function (event) {
            if(canWork) {
                if(event.deltaY < 0 && parseInt(image.style.width) < 1000) {
                    const mouseX = event.pageX;
                    const mouseY = event.pageY;
                    const oldWidth = image.width;
                    const oldHeight = image.height;
                    
                    zoomWidth = parseInt(image.style.width);
                    zoomHeight = parseInt(image.style.height);

                    zoomWidth += ZOOMSPEED;
                    zoomHeight += ZOOMSPEED;

                    image.style.width = zoomWidth + "%";
                    image.style.height = zoomHeight + "%"; 
                    
                    const widthCompensation = - ((Math.abs(parseInt(image.style.left))) + ((image.width - oldWidth) / 2));
                    const heightCompensation = - ((Math.abs(parseInt(image.style.top))) + ((image.height - oldHeight) / 2));
                    image.style.left = widthCompensation + "px";
                    image.style.top = heightCompensation + "px";
                }
                else if(event.deltaY > 0 && parseInt(image.style.width) > 100) {
                    let maxWidthCompensation, maxHeightCompensation;
                    const oldWidth = image.width;
                    const oldHeight = image.height;
                    
                    zoomWidth = parseInt(image.style.width);
                    zoomHeight = parseInt(image.style.height);

                    zoomWidth -= ZOOMSPEED;
                    zoomHeight -= ZOOMSPEED;

                    image.style.width = zoomWidth + "%";
                    image.style.height = zoomHeight + "%";

                    if(parseInt(image.style.left) + ((oldWidth - image.width) / 2) > 0) { // max left side
                        maxWidthCompensation = 0;
                    }
                    else if(parseInt(image.style.left) + image.width < window.innerWidth) { // max right side
                        maxWidthCompensation =  window.innerWidth - image.width;
                    }
                    else { // normal case
                        maxWidthCompensation = parseInt(image.style.left) + ((oldWidth - image.width) / 2);
                    }

                    if(parseInt(image.style.top) + ((oldHeight - image.height) / 2) > 0) { // max top side
                        maxHeightCompensation = 0;
                    }
                    else if(parseInt(image.style.top) + image.height < window.innerHeight) { // max bottom side
                        maxHeightCompensation = window.innerHeight - image.height;
                    }
                    else { // normal case
                        maxHeightCompensation = parseInt(image.style.top) + ((oldHeight - image.height) / 2);
                    }

                    image.style.left = maxWidthCompensation + "px";
                    image.style.top = maxHeightCompensation + "px";
                }
            }
        })

        document.addEventListener("mousemove", function (event) {
            mouseX = event.pageX;
            mouseY = event.pageY;

        });

        function animate() {
            requestAnimationFrame(animate);
            if(canWork) {
                if(mouseX <= MOVEMARGIN && parseInt(image.style.left) < 0) {
                    let left = parseInt(image.style.left);
                    left += MOVESPEED;
                    image.style.left = left + "px";
                }
                else if(mouseX >= window.innerWidth - MOVEMARGIN && parseInt(image.style.left) > - (image.width - window.innerWidth)) {
                    let left = parseInt(image.style.left);
                    left -= MOVESPEED;
                    image.style.left = left + "px";
                }
                if(mouseY <= MOVEMARGIN && parseInt(image.style.top) < 0) {
                    let top = parseInt(image.style.top);
                    top += MOVESPEED;
                    image.style.top = top + "px";
                }
                else if(mouseY >= window.innerHeight - MOVEMARGIN && parseInt(image.style.top) > - (image.height - window.innerHeight)) {
                    let top = parseInt(image.style.top);
                    top -= MOVESPEED;
                    image.style.top = top + "px";
                }
            }
        }

        initDisplay();;
        animate();
    }
}
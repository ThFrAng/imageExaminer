# imageExaminer
Let you zoom, move in an image that you want to see up close with a simple implementation
<br>
````js
import {ImageExaminer} from './imageExaminer.js';

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");

const imageExaminer = new ImageExaminer([img1, img2, img3, img4], 1, 1);
````
<br><br>
Constructor :
<br>
**ImageExaminer(images : array, CENTERIMAGE : bool, DISPLAYHELPER : bool)**
<br>
images - array of the images to display<br>
    those images should have top, left, width, height styles initialized in the HMTL or CSS file<br>
CENTERIMAGE - if the image is bigger than the viewport, whether or not to center it on first load<br>
DISPLAYHELPER - whether to display or not an helper screen to help user to use the examiner<br>
<br><br>
more settings can be tweaked in the js file.

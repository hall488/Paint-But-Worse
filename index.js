let sketch = document.querySelector('.sketch');

let toolbar = document.querySelector('.toolbar');

let paletteColors = document.querySelectorAll('.palette div');

let palette = document.querySelector('.palette');

let resize = document.querySelector('.resize');

let shake = document.querySelector('.shake');

let save = document.querySelector('.save');

let color = 'black';

window.addEventListener('resize', adjustToolbar);


let grid = ()=> {
    let val;
    for(;;) {
        val = prompt("Enter n for a n by n grid!");
        if(val > 0 && val < 101) break;
        console.log("Must be between 0 and 100!");
    }
    sketch.innerHTML = '';
    createGrid(val);
};

resize.addEventListener('click', grid);

shake.addEventListener('click', () => {
    sketch.childNodes.forEach(r => r.childNodes.forEach(c => c.style.backgroundColor = "white"));
});

save.addEventListener('click', saveImage);

paletteColors.forEach(c => {
    
    c.style.backgroundColor = c.getAttribute('data');
    c.addEventListener('click', () => {
        paletteColors.forEach(p => p.classList.remove('selected'));
        c.classList += 'selected';
        color = c.style.backgroundColor;
    });
});

function createGrid(n) {
    for(i = 0; i < n; i ++) {
        let row = document.createElement('div');
        row.classList = 'row';
        for(j = 0; j < n; j++) {
            let cell = document.createElement('div');
            cell.classList = 'cell';
            cell.style.flex = "1 1 auto";
            row.appendChild(cell);
            cell.style.backgroundColor = 'white';

            cell.addEventListener('mouseover', () => {
                cell.style.backgroundColor = color;
            });
        }
        
        sketch.appendChild(row);
    }
}

function adjustToolbar() {
    console.log(toolbar.offsetTop);
    if(toolbar.offsetTop > 600) {
        toolbar.style.flex = '0 1 840px';
        palette.style.flexDirection = 'row';
    } else {
        toolbar.style.flex = '0 1 100px';
        palette.style.flexDirection = 'column';
    }
}

function saveImage() {
    const colorsToRGB = {
        "black": [0,0,0,255],
        "red": [255, 0, 0, 255],
        "orange": [255, 165, 0, 255],
        "yellow": [255, 255, 0, 255],
        "green": [0, 128, 0, 255],
        "blue": [0, 0, 255, 255],
        "purple": [128, 0, 128, 255],
        "white": [255, 255, 255, 255]
    };
    let length = sketch.childNodes.length;
    let array = new Uint8ClampedArray(length*length*4);
    for(let i = 0; i < length; i++) {
        let row = sketch.childNodes[i];
        for(let j = 0; j < length; j++) {
            let cell = row.childNodes[j];
            array[(i*length + j)*4] = colorsToRGB[cell.style.backgroundColor][0];
            array[(i*length + j)*4 + 1] = colorsToRGB[cell.style.backgroundColor][1];
            array[(i*length + j)*4 + 2] = colorsToRGB[cell.style.backgroundColor][2];
            array[(i*length + j)*4 + 3] = colorsToRGB[cell.style.backgroundColor][3];
        }
    }

    console.log(array);
    let image = new ImageData(array, length, length);
    let ctx = document.createElement('canvas');
    ctx.width = length;
    ctx.height = length;
    let context = ctx.getContext('2d');
    context.putImageData(image, 0, 0);

    let dataURL = ctx.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');

    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.png';
    link.click();
}

adjustToolbar();
createGrid(16);
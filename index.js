let sketch = document.querySelector('.sketch');

let toolbar = document.querySelector('.toolbar');

let paletteColors = document.querySelectorAll('.palette div');

let palette = document.querySelector('.palette');

let resize = document.querySelector('.resize');

let shake = document.querySelector('.shake');

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
    sketch.childNodes.forEach(n => n.style.backgroundColor = "white");
});

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
    
}

adjustToolbar();
createGrid(16);
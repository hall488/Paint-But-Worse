let sketch = document.querySelector('.sketch');

let palette = document.querySelectorAll('.palette div');

let resize = document.querySelector('.resize');

let shake = document.querySelector('.shake');

let color = 'black';

resize.addEventListener('click', () => {
    let val;
    for(;;) {
        val = prompt("Enter n for a n by n grid!");
        if(val > 0 && val < 101) break;
        console.log("Must be between 0 and 100!");
    }
    sketch.innerHTML = '';
    createGrid(val);
});

shake.addEventListener('click', () => {
    sketch.childNodes.forEach(n => n.style.backgroundColor = "white");
});

palette.forEach(c => {
    
    c.style.backgroundColor = c.getAttribute('data');
    c.addEventListener('click', () => {
        palette.forEach(p => p.classList.remove('selected'));
        c.classList += 'selected';
        color = c.style.backgroundColor;
    });
});

function createGrid(n) {
    for(i = 0; i < n*n; i ++) {
        let cell = document.createElement('div');
        cell.classList = 'cell';
        cell.style.width = (960 / n) + 'px';
        cell.style.height = (960 / n) + 'px';
        sketch.appendChild(cell);
        
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = color;
        });
    }
}

createGrid(16);
let sketch = document.querySelector('.sketch');

let palette = document.querySelectorAll('.palette div');

palette.forEach(c => {
    c.style.width = 100 + 'px';
    c.style.height = 100 + 'px';
    c.style.backgroundColor = c.getAttribute('data');
});

function createGrid(n) {
    for(i = 0; i < n*n; i ++) {
        let cell = document.createElement('div');
        cell.classList = 'cell';
        cell.style.width = (960 / n) + 'px';
        cell.style.height = (960 / n) + 'px';
        sketch.appendChild(cell);
    }
}

createGrid(16);
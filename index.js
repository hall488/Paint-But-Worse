let sketch = document.querySelector('.sketch');


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
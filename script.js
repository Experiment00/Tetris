// Функция для поворота фигуры на 90 градусов
function rotateShape(shape) {
    const rotatedShape = [];

    // Инициализация пустой матрицы для новой фигуры
    for (let rowsCount = 0; rowsCount < shape[0].length; rowsCount++) {
        const row = [];
        rotatedShape.push(row);
    }

    // Поворот фигуры
    for (let i = shape.length - 1, k = 0; i >= 0; i--, k++) {
        for (let j = 0; j < shape[0].length; j++) {
            rotatedShape[j][k] = shape[i][j];
        }
    }

    return rotatedShape;
}

// Функция для рисования игровой области и фигуры
function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0) throw new Error('x and y cannot be negative');
    if (target.children.length) throw new Error('Aborted: target element should be empty');

    for (let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount;
        row.style.transform = `translateY(${-rowsCount}px)`;

        for (let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount;
            cell.style.transform = `translateX(${-cellsCount}px)`;
            row.append(cell);
        }

        target.append(row);
    }
}

// Рисуем игровое поле
const tetrisPlaygroundTarget = document.querySelector('.tetris-playground');
drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);

// Задаем тетромино
const shapes = {
    I: { shape: [[1], 
                 [1], 
                 [1], 
                 [1]], 
         color: 'cyan' },
         
    J: { shape: [[0, 1], 
                 [0, 1], 
                 [1, 1]], 
         color: 'blue' },

    L: { shape: [[1, 0],
                 [1, 0], 
                 [1, 1]], 
         color: 'orange' },

    O: { shape: [[1, 1], 
                 [1, 1]], 
         color: 'yellow' },

    S: { shape: [[0, 1, 1],
                 [1, 1, 0]], 
         color: 'green' },

    T: { shape: [[1, 1, 1], 
                 [0, 1, 0]], 
         color: 'purple' },

    Z: { shape: [[1, 1, 0], 
                 [0, 1, 1]], 
         color: 'red' }
};

// Сгенерируем случайную фигуру
const shapeKeys = Object.keys(shapes);
const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
let shapeKey = shapeKeys[shapeKeyIndex];
let currentShape = shapes[shapeKey];

// Случайный угол поворота (0, 90, 180, 270)
const randomRotation = Math.floor(Math.random() * 4);
for (let i = 0; i < randomRotation; i++) {
    currentShape.shape = rotateShape(currentShape.shape);
}

// Рисуем фигуру
function drawShape(shape) {
    const rowsToColor = shape.shape.length;
    const cellsToColor = shape.shape[0].length;

    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        const row = tetrisPlaygroundTarget.children[rowIndex];

        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            const cell = row.children[cellIndex];
            if (shape.shape[rowIndex] && shape.shape[rowIndex][cellIndex]) {
                cell.style.backgroundColor = shape.color;
            }
        }
    }
}

// Рисуем текущую фигуру
drawShape(currentShape);

// Функция для поворота фигуры при нажатии на пробел
function handleSpacebarPress(event) {
    if (event.code === 'Space') {
        currentShape.shape = rotateShape(currentShape.shape);
        // Очищаем поле и перерисовываем фигуру
        const cells = tetrisPlaygroundTarget.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = ''; // Очищаем цвет клеток
        });
        drawShape(currentShape); // Рисуем повёрнутую фигуру
    }
}

// Добавляем обработчик событий на пробел
document.addEventListener('keydown', handleSpacebarPress);






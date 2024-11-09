// Функция для поворота фигуры на 90 градусов
function rotateShape(shape) {
    var rotatedShape = [];
    // Инициализация пустой матрицы для новой фигуры
    for (var rowsCount = 0; rowsCount < shape[0].length; rowsCount++) {
        var row = [];
        rotatedShape.push(row);
    }
    // Поворот фигуры
    for (var i = shape.length - 1, k = 0; i >= 0; i--, k++) {
        for (var j = 0; j < shape[0].length; j++) {
            rotatedShape[j][k] = shape[i][j];
        }
    }
    return rotatedShape;
}
// Функция для рисования игровой области и фигуры
function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0)
        throw new Error('x and y cannot be negative');
    if (target.children.length)
        throw new Error('Aborted: target element should be empty');
    for (var rowsCount = 0; rowsCount < y; rowsCount++) {
        var row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount.toString();
        row.style.transform = "translateY(".concat(-rowsCount, "px)");
        for (var cellsCount = 0; cellsCount < x; cellsCount++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = 'cellsCount';
            cell.style.transform = "translateX(".concat(-cellsCount, "px)");
            row.append(cell);
        }
        target.append(row);
    }
}
// Рисуем игровое поле
var tetrisPlaygroundTarget = document.querySelector('.tetris-playground');
drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
// Задаем тетромино
var shapes = {
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
var shapeKeys = Object.keys(shapes);
var shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
var shapeKey = shapeKeys[shapeKeyIndex];
var currentShape = shapes[shapeKey];
// Случайный угол поворота (0, 90, 180, 270)
var randomRotation = Math.floor(Math.random() * 4);
for (var i = 0; i < randomRotation; i++) {
    currentShape.shape = rotateShape(currentShape.shape);
}
// Рисуем фигуру
function drawShape(shape) {
    var rowsToColor = shape.shape.length;
    var cellsToColor = shape.shape[0].length;
    for (var rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        var row = tetrisPlaygroundTarget.children[rowIndex];
        for (var cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            var cell = row.children[cellIndex];
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
        var cells = tetrisPlaygroundTarget.querySelectorAll('.cell');
        cells.forEach(function (cell) {
            cell.style.backgroundColor = ''; // Очищаем цвет клеток
        });
        drawShape(currentShape); // Рисуем повёрнутую фигуру
    }
}
// Добавляем обработчик событий на пробел
document.addEventListener('keydown', handleSpacebarPress);
var playground = new Array(20);
console.log(playground);

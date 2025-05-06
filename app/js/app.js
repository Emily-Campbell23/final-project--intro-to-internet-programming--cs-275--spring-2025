const shapeBox = document.querySelector(`div`);
const boxStyles = window.getComputedStyle(shapeBox);

let shapeDimension = 1;
let shapeFullWidth = 0;
let positionX = 0;
let isAnimating = false;
let shiftAmount = 5;

window.onload = () => {
    let inputConfirmed = false;
    shapeDimension = prompt(`Please input an integer above zero for the size of your diamond:`);

    while (!inputConfirmed) {
        if (!isNaN(shapeDimension)) {
            if (shapeDimension >= 1) {
                inputConfirmed = true;
                const size = parseInt(shapeDimension);
                if (size % 2 === 0) {
                    buildEvenShape(size);
                } else {
                    buildOddShape(size);
                }
            } else {
                shapeDimension = prompt(`Try again. Enter a positive number:`);
            }
        } else {
            shapeDimension = prompt(`Invalid input. Enter a whole number:`);
        }
    }
};

const buildOddShape = (sizeInput) => {
    shapeDimension = sizeInput;
    let renderedShape = ``;

    for (let i = 0; i < Math.floor(shapeDimension / 2) + 1; i++) {
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp`;
        }
        for (let k = 0; k < 1 + 2 * i; k++) {
            renderedShape += `*`;
        }
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp`;
        }
    }

    for (let i = Math.floor(shapeDimension / 2) - 1; i >= 0; i--) {
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp`;
        }
        for (let k = 0; k < 1 + 2 * i; k++) {
            renderedShape += `*`;
        }
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp`;
        }
    }

    shapeBox.innerHTML = renderedShape;
    shapeBox.style.width = `${shapeDimension * 8.8}px`;
    shapeBox.style.lineHeight = `8.8px`;
};

const buildEvenShape = (sizeInput) => {
    shapeDimension = sizeInput;
    let renderedShape = ``;

    for (let i = 0; i < shapeDimension - 1; i++) {
        renderedShape += `&nbsp`;
    }
    renderedShape += `&nbsp*`;
    for (let i = 0; i < shapeDimension - 1; i++) {
        renderedShape += `&nbsp`;
    }
    renderedShape += `&nbsp`;

    for (let i = 1; i < Math.floor(shapeDimension / 2) + 1; i++) {
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp&nbsp`;
        }
        for (let k = 0; k < 2 * i; k++) {
            renderedShape += `&nbsp*`;
        }
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp&nbsp`;
        }
        renderedShape += `&nbsp`;
    }

    for (let i = Math.floor(shapeDimension / 2) - 1; i > 0; i--) {
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp&nbsp`;
        }
        for (let k = 0; k < 2 * i; k++) {
            renderedShape += `&nbsp*`;
        }
        for (let j = 0; j < Math.floor(shapeDimension / 2) - i; j++) {
            renderedShape += `&nbsp&nbsp`;
        }
        renderedShape += `&nbsp`;
    }

    for (let i = 0; i < shapeDimension - 1; i++) {
        renderedShape += `&nbsp`;
    }
    renderedShape += `&nbsp*`;
    for (let i = 0; i < shapeDimension - 1; i++) {
        renderedShape += `&nbsp`;
    }
    renderedShape += `&nbsp`;

    shapeBox.innerHTML = renderedShape;
    shapeBox.style.width = `${shapeDimension * 8.8 * 2 + 8.8}px`;
    shapeBox.style.lineHeight = `17.9px`;
};

const moveShape = () => {
    const currentLeft = parseInt(shapeBox.style.left);

    if (currentLeft <= 0 || currentLeft >= window.innerWidth - shapeFullWidth) {
        shiftAmount *= -1;
    }

    positionX += shiftAmount;
    shapeBox.style.left = `${positionX}px`;

    requestAnimationFrame(moveShape);
};

shapeBox.addEventListener(`click`, () => {
    if (!isAnimating) {
        shapeFullWidth =
            parseInt(shapeBox.style.width) +
            2 * parseInt(boxStyles.padding) +
            2 * parseInt(boxStyles.borderWidth);

        requestAnimationFrame(moveShape);
        isAnimating = true;
    }
});

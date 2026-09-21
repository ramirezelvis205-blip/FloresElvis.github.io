const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

// Ajustar dimensiones del canvas
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.9, 500);
    canvas.height = Math.min(window.innerHeight * 0.7, 600);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Dibuja una flor completa con tallo y hojas
function drawYellowFlower(x, y, radius, petalCount) {
    // 1. Tallo elegante
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 30, y + 150, x - 10, y + 300);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#2d5a27';
    ctx.lineCap = 'round';
    ctx.stroke();

    // 2. Hojas del tallo
    drawLeaf(x + 15, y + 100, 40, Math.PI / 4);
    drawLeaf(x + 8, y + 180, 45, -Math.PI / 3);

    // 3. Capa de pétalos traseros (sombra/volumen)
    drawPetals(x, y, radius * 1.05, petalCount, '#fbc02d', '#f57f17');

    // 4. Capa de pétalos principales (amarillo vibrante)
    drawPetals(x, y, radius, petalCount, '#ffeb3b', '#fbc02d');

    // 5. Centro de la flor (margarita / girasol)
    drawFlowerCenter(x, y, radius * 0.35);
}

// Dibujar hoja con curva natural
function drawLeaf(x, y, size, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, size, size / 3, 0, 0, Math.PI * 2);
    
    const leafGrad = ctx.createLinearGradient(-size, 0, size, 0);
    leafGrad.addColorStop(0, '#388e3c');
    leafGrad.addColorStop(1, '#1b5e20');
    ctx.fillStyle = leafGrad;
    ctx.fill();
    ctx.restore();
}

// Dibujar pétalos con distribución circular
function drawPetals(x, y, radius, count, colorStart, colorEnd) {
    const angleStep = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
        const angle = i * angleStep;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(radius * 0.4, -radius * 0.3, 0, -radius);
        ctx.quadraticCurveTo(-radius * 0.4, -radius * 0.3, 0, 0);

        const petalGradient = ctx.createRadialGradient(0, 0, 5, 0, -radius, radius);
        petalGradient.addColorStop(0, colorStart);
        petalGradient.addColorStop(0.8, colorEnd);
        petalGradient.addColorStop(1, '#fff59d');

        ctx.fillStyle = petalGradient;
        ctx.shadowColor = 'rgba(255, 193, 7, 0.4)';
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.restore();
    }
}

// Centro detallado con textura de polen
function drawFlowerCenter(x, y, centerRadius) {
    ctx.beginPath();
    ctx.arc(x, y, centerRadius, 0, Math.PI * 2);

    const centerGrad = ctx.createRadialGradient(x, y, 2, x, y, centerRadius);
    centerGrad.addColorStop(0, '#8d6e63');
    centerGrad.addColorStop(0.6, '#5d4037');
    centerGrad.addColorStop(1, '#3e2723');

    ctx.fillStyle = centerGrad;
    ctx.fill();

    // Detalle de puntos de polen
    for (let i = 0; i < 40; i++) {
        const r = Math.random() * (centerRadius - 3);
        const theta = Math.random() * Math.PI * 2;
        const px = x + r * Math.cos(theta);
        const py = y + r * Math.sin(theta);

        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffb74d';
        ctx.fill();
    }
}

// Renderizar ramo central
function renderScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 20;

    // Flor principal y secundarias
    drawYellowFlower(centerX - 70, centerY + 40, 55, 12);
    drawYellowFlower(centerX + 70, centerY + 50, 50, 10);
    drawYellowFlower(centerX, centerY - 30, 75, 14);
}

renderScene();

// Re-renderizar al hacer clic
canvas.addEventListener('click', renderScene);

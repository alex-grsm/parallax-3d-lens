const initRainWind = () => {
    const canvas = document.querySelector('.rain');
    const c = canvas.getContext('2d');
    let animationId;
    let running = false;
    let wind = 0; // Добавляем переменную ветра
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const randomNum = (min, max) => Math.random() * (max - min) + min;
    
    class RainDrop {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.reset();
        }
    
        reset() {
            this.x = randomNum(0, this.width);
            this.y = randomNum(-500, 0);
            this.length = randomNum(2, 10);
            this.velocity = randomNum(0.2, 20);
            this.opacity = randomNum(0.1, 0.55);
            this.windEffect = randomNum(-0.5, 0.5); // Добавляем индивидуальный эффект ветра
        }
    
        draw() {
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.x + this.windEffect * 10 + wind, this.y + this.length);
            c.lineWidth = 1;
            c.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            c.stroke();
        }
    
        update() {
            this.y += this.velocity;
            this.x += this.windEffect + wind * 0.1; // Учитываем общий ветер и индивидуальный эффект
            if (this.y > this.height || this.x > this.width || this.x < 0) this.reset();
            this.draw();
        }
    }
    
    const rainArray = Array.from({ length: 140 }, () => new RainDrop(canvas.width, canvas.height));
    
    const animateRain = () => {
        if (!running) return;
        animationId = requestAnimationFrame(animateRain);
        c.clearRect(0, 0, canvas.width, canvas.height);
        rainArray.forEach(drop => drop.update());
    };
    
    running = true;
    animateRain();
    
    // Добавляем возможность изменять ветер динамически
    const setWind = (value) => {
        wind = value;
    };
    
    return { 
        stop: () => {
            running = false;
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        },
        setWind 
    };
};

export default initRainWind;
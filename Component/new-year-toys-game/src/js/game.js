class Game {
    constructor() {
        this.toys = [
            {
                name: 'candy-cane',
                points: 10,
                svg: `<svg width="60" height="60" viewBox="0 0 40 40">
                    <path d="M10,0 Q40,20 10,40" stroke="red" stroke-width="5" fill="none"/>
                    <path d="M10,0 Q40,20 10,40" stroke="white" stroke-width="5" fill="none" stroke-dasharray="5,5"/>
                </svg>`
            },
            {
                name: 'ornament',
                points: 15,
                svg: `<svg width="60" height="60" viewBox="0 0 40 40">
                    <circle cx="20" cy="22" r="15" fill="gold"/>
                    <rect x="18" y="2" width="4" height="8" fill="silver"/>
                </svg>`
            },
            {
                name: 'star',
                points: 20,
                svg: `<svg width="60" height="60" viewBox="0 0 40 40">
                    <polygon points="20,0 25,15 40,15 28,24 33,40 20,30 7,40 12,24 0,15 15,15" fill="yellow"/>
                </svg>`
            },
            {
                name: 'bell',
                points: 25,
                svg: `<svg width="60" height="60" viewBox="0 0 40 40">
                    <path d="M20,5 Q30,5 30,20 L30,30 L10,30 L10,20 Q10,5 20,5" fill="#FFD700"/>
                    <circle cx="20" cy="33" r="3" fill="#FFD700"/>
                </svg>`
            },
            {
                name: 'gift',
                points: 30,
                svg: `<svg width="60" height="60" viewBox="0 0 40 40">
                    <rect x="5" y="15" width="30" height="25" fill="red"/>
                    <rect x="15" y="15" width="10" height="25" fill="gold"/>
                    <rect x="5" y="10" width="30" height="5" fill="green"/>
                </svg>`
            }
        ];

        this.wishes = [
            "Нехай новий рік принесе багато щастя та успіхів! 🌟",
            "Бажаємо здійснення всіх мрій у новому році! 🎄",
            "Нехай кожен день буде сповнений радості та любові! ❤️",
            "Бажаємо міцного здоров'я та благополуччя! 🎅",
            "Нехай у новому році на вас чекають неймовірні пригоди! 🎁"
        ];

        this.sounds = {
            collect: new Audio('./assets/audio/knopka-klik-odinochnyii-myagkii-priglushennyii-korotkii.mp3'),
            start: new Audio('../assets/audio/game-boy-start.mp3'),
            end: new Audio('../assets/audio/game-over-end-pixel-b-side.mp3')
        };

        this.gameArea = document.getElementById('game-area');
        this.scoreElement = document.getElementById('score');
        this.timeElement = document.getElementById('time');
        this.score = 0;
        this.timeLeft = 25;
        this.isPlaying = false;
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        this.createStartButton();
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        if (this.isMobile) {
            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
        }
    }

    createStartButton() {
        const startScreen = document.createElement('div');
        startScreen.id = 'start-screen';
        
        this.startButton = document.createElement('button');
        this.startButton.id = 'start-button';
        this.startButton.textContent = 'Почати гру';
        this.startButton.addEventListener('click', () => this.start());
        
        startScreen.appendChild(this.startButton);
        this.gameArea.appendChild(startScreen);
    }

    start() {
        this.sounds.start.currentTime = 0;
        this.sounds.start.play().catch(e => console.log('Audio error:', e));
        this.gameArea.innerHTML = '';
        this.isPlaying = true;
        this.score = 0;
        this.timeLeft = 25;
        this.updateScore();
        this.updateTimer();
        this.spawnToy();
    }

    spawnToy() {
        if (!this.isPlaying) return;

        const toy = this.toys[Math.floor(Math.random() * this.toys.length)];
        const element = document.createElement('div');
        element.className = 'toy';
        element.innerHTML = toy.svg;
        element.dataset.points = toy.points;

        const maxX = this.gameArea.offsetWidth - (this.isMobile ? 50 : 40);
        const maxY = this.gameArea.offsetHeight - (this.isMobile ? 50 : 40);
        element.style.left = Math.random() * maxX + 'px';
        element.style.top = Math.random() * maxY + 'px';

        element.addEventListener('click', () => this.collectToy(element));
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.collectToy(element);
        }, { passive: false });

        this.gameArea.appendChild(element);

        setTimeout(() => {
            if (element.parentNode === this.gameArea) {
                element.remove();
            }
        }, this.isMobile ? 2500 : 2000);

        setTimeout(() => this.spawnToy(), this.isMobile ? 800 : 500);
    }

    collectToy(element) {
        if (!this.isPlaying) return;
        
        this.sounds.collect.play().catch(e => console.log('Audio error:', e));
        this.score += parseInt(element.dataset.points);
        this.updateScore();
        
        element.style.transform = 'scale(1.5)';
        element.style.opacity = '0';
        setTimeout(() => element.remove(), 200);
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    updateTimer() {
        if (this.timer) clearInterval(this.timer);
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timeElement.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        this.sounds.end.play().catch(e => console.log('Audio error:', e));
        this.isPlaying = false;
        clearInterval(this.timer);
        this.sounds.end.currentTime = 0;
        this.sounds.end.play()
            .catch(e => console.log('Audio play failed:', e));
        const randomWish = this.wishes[Math.floor(Math.random() * this.wishes.length)];
        
        const finalScore = document.createElement('div');
        finalScore.className = 'final-score';
        finalScore.innerHTML = `
            <h2>Гра закінчена!</h2>
            <p>Ваш рахунок: ${this.score}</p>
            <div class="wish">${randomWish}</div>
        `;
        
        const restartButton = document.createElement('button');
        restartButton.className = 'start-button';
        restartButton.textContent = 'Грати знову';
        restartButton.addEventListener('click', () => this.start());
        
        finalScore.appendChild(restartButton);
        this.gameArea.innerHTML = '';
        this.gameArea.appendChild(finalScore);
    }
}


window.onload = () => {
    new Game();
};

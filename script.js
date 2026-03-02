// script.js

// === ДАННЫЕ ===
const startDate = new Date(2021, 2, 3); // 3 марта 2021

// Разнообразные вопросы с разными механиками
const questions = [
    {   // Вопрос 1: Уклоняющаяся кнопка
        id: 0,
        type: 'evil',
        text: "Кто с влюбился первым и предложил начать отношения?",
        options: ["Владлен", "Ксюша"],
        correct: "Владлен",
        hint: "Думаю ты знаешь правильный ответ"
    },
    {   // Вопрос 2: Найди пару (с фотографиями)
        id: 1,
        type: 'memory',
        text: "Найди пару для каждой фотографии!",
        description: "Кликай на карточки, чтобы открыть их. Найди две одинаковые!",
        pairs: [
            { img1: '1.jpg', img2: '11.jpg' },
            { img1: '2.jpg', img2: '22.jpg' },
            { img1: '3.jpg', img2: '33.jpg' },
            { img1: '4.jpg', img2: '44.jpg' }
        ]
    },
    {   // Вопрос 3: Кликай на сердечко
        id: 2,
        type: 'clicker',
        text: "Кликай на сердечко как можно чаще!",
        description: "У тебя 15 секунд. Если наберешь меньше 100 - ты меня не любишь...",
        timeLimit: 15
    },
    {   // Вопрос 4: Колесо свиданий
        id: 3,
        type: 'wheel',
        text: "Крути колесо желаний!",
        description: "Нажми на кнопку, чтобы узнать, чем мы займемся",
        options: ["🍿 Кино", "🍣 Суши", "Обнимашки", "🚶 Прогулка", "18+...", "Пицца", "☕ Кафе", "🏞️ Парк"]
    },
    {   // Вопрос 5: Слайдер (СКРЫТЫЙ ответ)
        id: 4,
        type: 'slider',
        text: "Сколько дней мы уже вместе?",
        description: "Передвинь ползунок на правильное число",
        min: 1500,
        max: 2000,
        correct: Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24)) // Точное число дней
    }
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;

// DOM элементы
const timerDisplay = document.getElementById('timerDisplay');
const quizContainer = document.getElementById('quizContainer');
const progressBar = document.getElementById('progressBar');
const questionCounter = document.getElementById('questionCounter');

// Таймер отношений (обновляется постоянно)
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Проверяем, не 5-й ли сейчас вопрос
    const currentQ = questions[currentQuestionIndex];
    if (currentQ && currentQ.type === 'slider') {
        // Если 5-й вопрос - показываем заглушку
        timerDisplay.textContent = `❓❓❓ НЕ ВСЕ ТАК ПРОСТО ❓❓❓`;
    } else {
        // Иначе показываем реальное время
        timerDisplay.textContent = `${days} д. ${hours} ч. ${minutes} мин. ${seconds} сек.`;
    }
}
updateTimer();
setInterval(updateTimer, 1000);

// Конфетти
function createConfetti() {
    const colors = ['#b23b5e', '#4a3f72', '#f9d71c', '#ff8c42', '#6b5f8a'];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Отрисовка вопросов
function renderQuestion(index) {
    if (index >= totalQuestions) {
        createConfetti();
        
        // В ФИНАЛЕ ПОКАЗЫВАЕМ НАСТОЯЩЕЕ КОЛИЧЕСТВО ДНЕЙ
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerDisplay.textContent = `${days} дней ${hours} часов ${minutes} минут ${seconds} секунд`;
        
        quizContainer.innerHTML = `
            <div class="question-text" style="text-align:center; min-height: 300px; display: flex; flex-direction: column; justify-content: center; animation: fadeIn 1s;">
                🎉 С 5-летием, любимая! 🎉
                <span style="font-size: 1.2rem; margin-top: 20px; font-weight: 300;">
                    Ты прошла все испытания! Каждая наша годовщина - это новое приключение.
                    <br>❤️ Спасибо за эти 5 невероятных лет! ❤️
                </span>
                <div style="font-size: 3rem; margin-top: 30px;">💝</div>
            </div>
        `;
        progressBar.style.width = '100%';
        questionCounter.textContent = `5 из 5 завершено! 🎉`;
        return;
    }

    const q = questions[index];
    currentQuestionIndex = index; // Обновляем текущий индекс для таймера
    progressBar.style.width = `${(index / totalQuestions) * 100}%`;
    questionCounter.textContent = `Вопрос ${index + 1} из ${totalQuestions}`;

    // Таймер обновится автоматически через setInterval
    // Но сразу показываем правильное состояние
    if (q.type === 'slider') {
        timerDisplay.textContent = `❓❓❓ НЕ ВСЕ ТАК ПРОСТО ❓❓❓`;
    }

    switch(q.type) {
        case 'evil':
            renderEvilQuestion(q);
            break;
        case 'memory':
            renderMemoryGame(q);
            break;
        case 'clicker':
            renderClickerGame(q);
            break;
        case 'wheel':
            renderWheelGame(q);
            break;
        case 'slider':
            renderSliderQuestion(q);
            break;
    }
}

// 1. Уклоняющаяся кнопка (ОБНОВЛЕННАЯ ВЕРСИЯ)
function renderEvilQuestion(q) {
    let escapeAttempts = 0;
    let mouseMoveHandler = null;
    let timeoutId = null;
    
    quizContainer.innerHTML = `
        <div class="question-text">${q.text}</div>
        <p style="text-align: center; margin-bottom: 20px; color: #9b6b9b;">${q.hint || ' думаю ты точно знаешь правильный ответ'}</p>
        <div class="options-grid" id="optionsGrid" style="position: relative; min-height: 150px; display: flex; justify-content: center; gap: 20px;">
            ${q.options.map(opt => {
                // ВАЖНО: ИЗНАЧАЛЬНО ВСЕ КНОПКИ АБСОЛЮТНО ОДИНАКОВЫЕ
                return `<button class="option-btn" 
                        data-option="${opt}" 
                        data-correct="${opt === q.correct}"
                        ${opt === q.correct ? 'id="evilButton"' : ''}>
                        ${opt}
                    </button>`;
            }).join('')}
        </div>
        <div class="result-message" id="resultMessage"></div>
    `;

    const evilBtn = document.getElementById('evilButton');
    const normalBtn = document.querySelector('.option-btn:not(#evilButton)');
    const resultDiv = document.getElementById('resultMessage');

    if (!evilBtn || !normalBtn) return;

    // Запоминаем начальные позиции и размеры
    const rect = evilBtn.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    const startX = rect.left + scrollX;
    const startY = rect.top + scrollY;
    const btnWidth = evilBtn.offsetWidth;
    const btnHeight = evilBtn.offsetHeight;

    // Удаляем кнопку из потока и добавляем в body для свободного перемещения
    evilBtn.remove();
    document.body.appendChild(evilBtn);
    
    // Устанавливаем начальные стили - теперь они ИДЕНТИЧНЫ обычной кнопке
    evilBtn.style.position = 'absolute';
    evilBtn.style.left = startX + 'px';
    evilBtn.style.top = startY + 'px';
    evilBtn.style.zIndex = '9999';
    evilBtn.style.cursor = 'pointer'; // Изначально обычный курсор
    evilBtn.style.transition = 'none';
    evilBtn.style.margin = '0';
    evilBtn.style.width = btnWidth + 'px';
    evilBtn.style.height = btnHeight + 'px';
    
    // Убираем все специальные стили, которые были в #evilButton
    evilBtn.style.background = ''; // Сброс фона
    evilBtn.style.border = ''; // Сброс границы
    evilBtn.style.boxShadow = ''; // Сброс тени

    function updateButtonPosition(e) {
        const btnRect = evilBtn.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) + 
            Math.pow(mouseY - btnCenterY, 2)
        );

        // Как только мышь приближается - применяем специальные стили
        if (distance < 200) {
            // ТОЛЬКО ТЕПЕРЬ кнопка становится "особенной"
            evilBtn.style.cursor = 'none';
            evilBtn.style.background = 'linear-gradient(135deg, #b23b5e, #ff8a9c)';
            evilBtn.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            evilBtn.style.boxShadow = '0 0 30px rgba(178, 59, 94, 0.5)';
            
            escapeAttempts++;
            
            evilBtn.classList.add('scared');
            setTimeout(() => evilBtn.classList.remove('scared'), 200);
            
            let deltaX = btnCenterX - mouseX;
            let deltaY = btnCenterY - mouseY;
            
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (length > 0) {
                const escapeForce = Math.min(200, 300 / distance * 100);
                deltaX = (deltaX / length) * escapeForce;
                deltaY = (deltaY / length) * escapeForce;
            } else {
                deltaX = (Math.random() - 0.5) * 300;
                deltaY = (Math.random() - 0.5) * 300;
            }
            
            const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            let newX = btnRect.left + scrollX + deltaX;
            let newY = btnRect.top + scrollY + deltaY;
            
            const maxX = document.documentElement.scrollWidth - btnRect.width - 10;
            const maxY = document.documentElement.scrollHeight - btnRect.height - 10;
            
            newX = Math.max(10, Math.min(maxX, newX));
            newY = Math.max(10, Math.min(maxY, newY));
            
            evilBtn.style.left = newX + 'px';
            evilBtn.style.top = newY + 'px';
            
            if (escapeAttempts === 10) {
                resultDiv.textContent = '🤭 Упорная! Может, нажмешь на другой вариант?';
                resultDiv.style.color = '#9b6b9b';
                resultDiv.classList.add('show');
            }
        } else {
            // Если мышь далеко - возвращаем обычный вид
            evilBtn.style.cursor = 'pointer';
            evilBtn.style.background = ''; // Возврат к стандартному фону
            evilBtn.style.border = ''; // Возврат к стандартной границе
            evilBtn.style.boxShadow = ''; // Возврат к стандартной тени
        }

        clearTimeout(timeoutId);
    }

    mouseMoveHandler = updateButtonPosition;
    document.addEventListener('mousemove', mouseMoveHandler);

    normalBtn.addEventListener('click', function() {
        resultDiv.textContent = '❍ Ну вот, ты все знаешь... 😉';
        resultDiv.style.color = '#b23b5e';
        resultDiv.classList.add('show');
        
        if (mouseMoveHandler) {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
        clearTimeout(timeoutId);
        evilBtn.remove();
        
        document.querySelectorAll('button').forEach(b => b.disabled = true);
        
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }, 1500);
    });

    evilBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        resultDiv.textContent = 'Вау! Не думал, что ты сможешь ошибиться...';
        resultDiv.style.color = '#2a7a2a';
        resultDiv.classList.add('show');
        
        if (mouseMoveHandler) {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
        clearTimeout(timeoutId);
        evilBtn.remove();
        
        document.querySelectorAll('button').forEach(b => b.disabled = true);
        
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }, 1500);
    });
}

// 2. Игра Мемори с фотографиями
function renderMemoryGame(q) {
    // Создаем массив карточек из пар фотографий
    let cards = [];
    q.pairs.forEach((pair, pairIndex) => {
        cards.push({ id: pairIndex, img: pair.img1, pairId: pairIndex });
        cards.push({ id: pairIndex, img: pair.img2, pairId: pairIndex });
    });
    
    // Перемешиваем
    cards = cards.sort(() => Math.random() - 0.5);
    
    let openedCards = [];
    let matchedPairs = 0;
    let canOpen = true;
    
    quizContainer.innerHTML = `
        <div class="question-text">${q.text}</div>
        <p style="text-align: center; margin-bottom: 20px;">${q.description}</p>
        <div class="memory-grid">
            ${cards.map((card, index) => `
                <div class="memory-card" data-index="${index}" data-pair="${card.pairId}" data-img="${card.img}" style="background-image: none;">
                    ❓
                </div>
            `).join('')}
        </div>
        <div class="result-message" id="resultMessage"></div>
    `;

    const cardElements = document.querySelectorAll('.memory-card');
    const resultDiv = document.getElementById('resultMessage');

    cardElements.forEach(card => {
        card.addEventListener('click', function() {
            if (!canOpen || this.classList.contains('matched') || this.classList.contains('opened')) return;
            
            const img = this.dataset.img;
            const pairId = this.dataset.pair;
            
            // Открываем карточку (показываем фото)
            this.style.backgroundImage = `url('${img}')`;
            this.textContent = '';
            this.classList.add('opened');
            
            openedCards.push({ element: this, pairId: pairId });
            
            if (openedCards.length === 2) {
                canOpen = false;
                
                if (openedCards[0].pairId === openedCards[1].pairId) {
                    // Нашли пару
                    setTimeout(() => {
                        openedCards.forEach(c => {
                            c.element.classList.add('matched');
                            c.element.style.opacity = '0.6';
                            c.element.style.cursor = 'default';
                        });
                        openedCards = [];
                        canOpen = true;
                        matchedPairs++;
                        
                        if (matchedPairs === q.pairs.length) {
                            resultDiv.textContent = '🎉 Отлично! Все пары найдены! 🎉';
                            resultDiv.style.color = '#2a7a2a';
                            resultDiv.classList.add('show');
                            
                            document.querySelectorAll('.memory-card').forEach(c => c.style.pointerEvents = 'none');
                            
                            setTimeout(() => {
                                currentQuestionIndex++;
                                renderQuestion(currentQuestionIndex);
                            }, 1500);
                        }
                    }, 500);
                } else {
                    // Не пара - закрываем
                    setTimeout(() => {
                        openedCards.forEach(c => {
                            c.element.style.backgroundImage = 'none';
                            c.element.textContent = '❓';
                            c.element.classList.remove('opened');
                        });
                        openedCards = [];
                        canOpen = true;
                    }, 800);
                }
            }
        });
    });
}

// 3. Кликер на сердечко
function renderClickerGame(q) {
    let clicks = 0;
    let timeLeft = q.timeLimit;
    let timerInterval = null;
    let gameActive = true;
    
    quizContainer.innerHTML = `
        <div class="question-text">${q.text}</div>
        <p style="text-align: center; margin-bottom: 20px;">${q.description}</p>
        <div style="text-align: center; font-size: 2rem; margin-bottom: 20px; color: #4a3f72;" id="clickerTimer">⏱️ ${timeLeft}с</div>
        <div style="text-align: center; margin: 30px 0;">
            <button class="clicker-heart" id="clickerButton" style="font-size: 5rem; background: none; border: none; cursor: pointer; transition: transform 0.1s; filter: drop-shadow(0 10px 20px rgba(178,59,94,0.3));">
                ❤️
            </button>
        </div>
        <div style="text-align: center; font-size: 2rem; margin: 20px 0;" id="clickerCount">${clicks}</div>
        <div class="result-message" id="resultMessage"></div>
    `;

    const heart = document.getElementById('clickerButton');
    const timerEl = document.getElementById('clickerTimer');
    const countEl = document.getElementById('clickerCount');
    const resultDiv = document.getElementById('resultMessage');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `⏱️ ${timeLeft}с`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            heart.disabled = true;
            heart.style.opacity = '0.5';
            heart.style.cursor = 'default';
            
            resultDiv.textContent = `⏰ Время вышло! Ты нажала ${clicks} раз! ❤️`;
            resultDiv.style.color = '#b23b5e';
            resultDiv.classList.add('show');
            
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion(currentQuestionIndex);
            }, 2000);
        }
    }, 1000);

    heart.addEventListener('click', function() {
        if (!gameActive) return;
        
        clicks++;
        countEl.textContent = clicks;
        
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        const moveX = (Math.random() - 0.5) * 20;
        const moveY = (Math.random() - 0.5) * 20;
        this.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
}

// 4. Колесо свиданий (ФИНАЛЬНАЯ ВЕРСИЯ)
function renderWheelGame(q) {
    let spinning = false;
    const colors = ['#b23b5e', '#4a3f72', '#9b6b9b', '#6b5f8a', '#d4cbe8', '#c1a5c1', '#8e6b8e', '#5b4e7c'];
    const sectorAngle = 360 / q.options.length;
    
    // ===== ЖЕСТКО ЗАФИКСИРОВАННОЕ СМЕЩЕНИЕ =====
    // На основе данных: Обнимашки (2) -> Кафе (6) = +4
    const OFFSET = 3; // НЕ МЕНЯТЬ, Я САМ ПОТОМ ПОДСТРОЮ
    // ===========================================
    
    console.log('renderWheelGame запущена, OFFSET =', OFFSET); // Для проверки
    
    quizContainer.innerHTML = `
        <div class="question-text">${q.text}</div>
        <p style="text-align: center; margin-bottom: 20px;">${q.description}</p>
        <div class="wheel-container">
            <div class="wheel-pointer">▼</div>
            <div class="wheel" id="wheel">
                ${q.options.map((opt, i) => {
                    const rotateAngle = i * sectorAngle;
                    return `
                        <div class="wheel-sector" style="transform: rotate(${rotateAngle}deg); background-color: ${colors[i % colors.length]};">
                            <span class="wheel-sector-text" style="transform: rotate(${sectorAngle/2}deg);">${opt}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        <div style="text-align: center; margin: 20px 0;">
            <button class="option-btn" id="spinWheel">Крутить колесо! 🎡</button>
        </div>
        <div id="wheelResult" style="text-align: center; font-size: 1.5rem; margin: 20px 0; min-height: 60px;"></div>
        <div class="result-message" id="resultMessage"></div>
    `;

    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinWheel');
    const resultDiv = document.getElementById('resultMessage');
    const wheelResult = document.getElementById('wheelResult');

    spinBtn.addEventListener('click', function() {
        if (spinning) return;
        
        spinning = true;
        this.disabled = true;
        
        wheelResult.innerHTML = '🎡 Колесо крутится...';
        
        const spinDeg = 1800 + Math.random() * 720;
        wheel.style.transform = `rotate(${spinDeg}deg)`;
        
        setTimeout(() => {
            const finalRotation = spinDeg % 360;
            
            // Расчет угла под стрелкой (270° - сверху)
            let angleAtPointer = (270 - finalRotation + 360) % 360;
            
            // Базовый индекс без смещения
            let rawIndex = Math.floor(angleAtPointer / sectorAngle);
            
            // ПРИМЕНЯЕМ СМЕЩЕНИЕ
            let index = (rawIndex + OFFSET) % q.options.length;
            
            // Если индекс отрицательный, добавляем длину массива
            if (index < 0) index += q.options.length;
            
            const result = q.options[index];
            
            // Отладка - посмотрите в консоль браузера (F12)
            console.log('Угол:', finalRotation);
            console.log('rawIndex:', rawIndex);
            console.log('index после смещения:', index);
            console.log('Результат:', result);
            
            // Показываем результат
            wheelResult.innerHTML = `🎉 Выпало: <span style="font-size: 2rem; color: #b23b5e; font-weight: bold;">${result}</span> 🎉`;
            
            resultDiv.textContent = 'Круто! Запоминаем наше свидание! 💕';
            resultDiv.style.color = '#2a7a2a';
            resultDiv.classList.add('show');
            
            spinning = false;
            
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion(currentQuestionIndex);
            }, 2000);
        }, 3000);
    });
}

// 5. Слайдер с СКРЫТЫМ ответом
function renderSliderQuestion(q) {
    // Скрываем ответ от пользователя
    const hiddenCorrect = q.correct;
    
    quizContainer.innerHTML = `
        <div class="question-text">${q.text}</div>
        <p style="text-align: center; margin-bottom: 20px; color: #b23b5e; font-weight: bold;">🔒 Ответ скрыт - проверим твою внимательность!</p>
        <p style="text-align: center; margin-bottom: 20px;">${q.description}</p>
        <div class="slider-container">
            <input type="range" min="${q.min}" max="${q.max}" value="${Math.floor((q.min + q.max) / 2)}" class="slider" id="dateSlider">
            <div class="slider-value" id="sliderValue">${Math.floor((q.min + q.max) / 2)}</div>
        </div>
        <button class="option-btn" id="submitSlider" style="margin-top: 20px;">Проверить</button>
        <div class="result-message" id="resultMessage"></div>
    `;

    const slider = document.getElementById('dateSlider');
    const value = document.getElementById('sliderValue');
    const resultDiv = document.getElementById('resultMessage');

    slider.addEventListener('input', () => {
        value.textContent = slider.value;
    });

    document.getElementById('submitSlider').addEventListener('click', () => {
        const selectedValue = parseInt(slider.value);
        const diff = Math.abs(selectedValue - hiddenCorrect);
        
        if (diff < 10) {
            resultDiv.textContent = `✅ Точно! Мы вместе ${hiddenCorrect} дней! (Ты угадала!)`;
            resultDiv.style.color = '#2a7a2a';
        } else if (diff < 50) {
            resultDiv.textContent = `❍ Близко! Правильный ответ: ${hiddenCorrect} дней`;
            resultDiv.style.color = '#b23b5e';
        } else {
            resultDiv.textContent = `❍ Нет, правильный ответ: ${hiddenCorrect} дней`;
            resultDiv.style.color = '#b23b5e';
        }
        resultDiv.classList.add('show');
        
        document.querySelectorAll('button').forEach(b => b.disabled = true);
        slider.disabled = true;
        
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }, 2000);
    });
}

// Запускаем первый вопрос
renderQuestion(0);



// ========== ПАЗЛ ==========
const puzzleConfig = {
    imagePath: 'puzzle.jpg',
    gridSize: 4,
    pieces: [],
    emptyIndex: 15,
    isSolved: false
};

// Инициализация пазла
function initPuzzle() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    if (!puzzleGrid) return;
    
    // Создаем правильный массив [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    puzzleConfig.pieces = [];
    for (let i = 0; i < 16; i++) {
        puzzleConfig.pieces.push(i);
    }
    puzzleConfig.emptyIndex = 15;
    puzzleConfig.isSolved = true;
    
    // Сразу перемешаем при загрузке
    setTimeout(() => {
        shufflePuzzle();
    }, 500);
}

// Отрисовка пазла
function renderPuzzle() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    if (!puzzleGrid) return;
    
    puzzleGrid.innerHTML = '';
    
    puzzleConfig.pieces.forEach((pieceIndex, position) => {
        const piece = document.createElement('div');
        piece.className = `puzzle-piece ${pieceIndex === puzzleConfig.emptyIndex ? 'empty' : ''}`;
        
        if (pieceIndex !== puzzleConfig.emptyIndex) {
            // Вычисляем позицию фона
            const row = Math.floor(pieceIndex / puzzleConfig.gridSize);
            const col = pieceIndex % puzzleConfig.gridSize;
            
            piece.style.backgroundImage = `url('${puzzleConfig.imagePath}')`;
            piece.style.backgroundSize = `${puzzleConfig.gridSize * 100}% ${puzzleConfig.gridSize * 100}%`;
            piece.style.backgroundPosition = `${col * 25}% ${row * 25}%`;
            piece.style.backgroundRepeat = 'no-repeat';
        }
        
        piece.dataset.position = position;
        piece.addEventListener('click', () => movePiece(parseInt(position)));
        puzzleGrid.appendChild(piece);
    });
}

// Перемещение кусочка
function movePiece(position) {
    if (puzzleConfig.isSolved) return;
    
    // Проверяем, можно ли переместить (сосед ли с пустым)
    if (!isAdjacent(position, puzzleConfig.emptyIndex)) return;
    
    // Меняем местами
    [puzzleConfig.pieces[position], puzzleConfig.pieces[puzzleConfig.emptyIndex]] = 
    [puzzleConfig.pieces[puzzleConfig.emptyIndex], puzzleConfig.pieces[position]];
    
    puzzleConfig.emptyIndex = position;
    
    renderPuzzle();
    checkWin();
}

// Проверка, соседние ли ячейки
function isAdjacent(pos1, pos2) {
    const row1 = Math.floor(pos1 / puzzleConfig.gridSize);
    const col1 = pos1 % puzzleConfig.gridSize;
    const row2 = Math.floor(pos2 / puzzleConfig.gridSize);
    const col2 = pos2 % puzzleConfig.gridSize;
    
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

// Перемешивание пазла
function shufflePuzzle() {
    // Делаем 200 случайных перемещений
    for (let i = 0; i < 200; i++) {
        const possibleMoves = [];
        
        // Ищем все соседние с пустой ячейкой
        for (let pos = 0; pos < puzzleConfig.pieces.length; pos++) {
            if (isAdjacent(pos, puzzleConfig.emptyIndex)) {
                possibleMoves.push(pos);
            }
        }
        
        // Выбираем случайный ход
        if (possibleMoves.length > 0) {
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            
            // Меняем местами
            [puzzleConfig.pieces[randomMove], puzzleConfig.pieces[puzzleConfig.emptyIndex]] = 
            [puzzleConfig.pieces[puzzleConfig.emptyIndex], puzzleConfig.pieces[randomMove]];
            
            puzzleConfig.emptyIndex = randomMove;
        }
    }
    
    puzzleConfig.isSolved = false;
    renderPuzzle();
    
    // Скрываем результат
    const resultDiv = document.getElementById('puzzleResult');
    if (resultDiv) {
        resultDiv.classList.remove('show');
        resultDiv.textContent = '';
    }
}

// Проверка победы
function checkWin() {
    const isWin = puzzleConfig.pieces.every((piece, index) => piece === index);
    
    if (isWin) {
        puzzleConfig.isSolved = true;
        
        // Показываем поздравление
        const resultDiv = document.getElementById('puzzleResult');
        if (resultDiv) {
            resultDiv.textContent = '🎉 Ура! Ты собрала пазл! Как и нас 5 лет назад! 💕';
            resultDiv.style.color = '#2a7a2a';
            resultDiv.classList.add('show');
            
            // Создаем конфетти
            createConfetti();
        }
    }
}

// Показать оригинал фото
function showOriginal() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <img src="${puzzleConfig.imagePath}" alt="Оригинал фото" onerror="this.src='https://via.placeholder.com/500?text=Фото+не+найдено'">
        <div class="close-modal">✕</div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие по клику на крестик или вне изображения
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.remove();
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Даем время на загрузку страницы
    setTimeout(() => {
        initPuzzle();
    }, 100);
    
    // Кнопка перемешивания
    const shuffleBtn = document.getElementById('shufflePuzzle');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', shufflePuzzle);
    }
    
    // Кнопка показа оригинала
    const solveBtn = document.getElementById('solvePuzzle');
    if (solveBtn) {
        solveBtn.addEventListener('click', showOriginal);
    }
});
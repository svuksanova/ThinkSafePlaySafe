import React, { useState } from 'react';
import './App.css';

interface ImageItem {
    url: string;
    isSafe: boolean;
    alt: string;
}

// Локални слики: поставете ги вашите слики во папка "public/images"
// Пример патеки: /images/safe1.png, /images/unsafe1.png, /images/safe2.png
const images: ImageItem[] = [
    {
        url: '/images/safe1.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe1.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe2.png',
        isSafe: true,
        alt: 'Безбедна слика 2'
    },
    {
        url: '/images/safe2.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe3.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe4.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/safe3.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe5.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe6.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/safe4.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe7.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/safe8.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe8.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/safe5.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/safe6.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/safe9.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe9.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe10.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/safe10.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/safe11.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe11.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe12.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/safe12.png',
        isSafe: true,
        alt: 'Безбедна слика'
    },
    {
        url: '/images/unsafe13.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe14.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe15.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
    {
        url: '/images/unsafe16.png',
        isSafe: false,
        alt: 'Штетна слика'
    },
];

// Функција за мешање на низа со слики (Fisher-Yates алгоритам)
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const App: React.FC = () => {
    const [step, setStep] = useState<'start' | 'game' | 'result'>('start');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState('');
    // Состојба за чување на мешаниот редослед на слики
    const [shuffledImages, setShuffledImages] = useState<ImageItem[]>([]);

    const handleStart = () => {
        // Мешање на сликите секој пат кога ќе се започне играта
        setShuffledImages(shuffleArray(images));
        setStep('game');
        setCurrentIndex(0);
        setFeedback('');
    };

    const handleAnswer = (answerSafe: boolean) => {
        const currentImage = shuffledImages[currentIndex];
        // Ако одговорот е точен, преминува кон следната слика
        if (answerSafe === currentImage.isSafe) {
            setFeedback('Точен одговор!');
            setTimeout(() => {
                if (currentIndex < shuffledImages.length - 1) {
                    setCurrentIndex(prevIndex => prevIndex + 1);
                    setFeedback('');
                } else {
                    setStep('result');
                }
            }, 1500);
        } else {
            // Ако одговорот е погрешен, прикажува порака и останува на истата слика
            setFeedback('Погрешно, обидете се повторно.');
        }
    };

    const handleRestart = () => {
        setStep('start');
        setCurrentIndex(0);
        setFeedback('');
    };

    return (
        <div className="container">
            <h1>Херојот на Безбедноста</h1>
            {step === 'start' && (
                <div className="start-screen">
                    {/* Слика на херојот која ја објаснува играта */}
                    <img src="/images/hero.png" alt="Херојот на Безбедноста" className="hero-intro" />
                    <p>
                        Здраво! Јас сум Херојот на Безбедноста и тука сум да ве водам низ игра во која ќе учите да разликувате
                        безбедни и небезбедни ситуации од секојдневието. За да продолжите и да ме спасите, мора да одговорите точно на секоја ситуација.
                    </p>
                    <button onClick={handleStart}>Започни ја играта</button>
                </div>
            )}
            {step === 'game' && shuffledImages.length > 0 && (
                <div className="game-screen">
                    <p>Дали оваа слика прикажува безбедна или небезбедна ситуација?</p>
                    <img src={shuffledImages[currentIndex].url} alt={shuffledImages[currentIndex].alt} />
                    <div className="button-group">
                        <button onClick={() => handleAnswer(true)}>Безбедна</button>
                        <button onClick={() => handleAnswer(false)}>Небезбедна</button>
                    </div>
                    {feedback && <p className="feedback">{feedback}</p>}
                    <p>Рунда: {currentIndex + 1} од {shuffledImages.length}</p>
                </div>
            )}
            {step === 'result' && (
                <div className="result-screen">
                    <h2>Честитки! Го спасивте херојот!</h2>
                    <img src="/images/hero_saved.png" alt="Спасен херој" />
                    <button onClick={handleRestart}>Започни одново</button>
                </div>
            )}
        </div>
    );
};

export default App;
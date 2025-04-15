import React, { useState } from 'react';
import styles from './MemoryGame.module.css';

const animals = ['Лев', 'Тигр', 'Лев', 'Слон', 'Тигр', 'Слон', 'Жираф', 'Жираф'];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [targetAnimal, setTargetAnimal] = useState('');
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const shuffledAnimals = shuffle([...animals]);
    setCards(shuffledAnimals.map((animal, index) => ({ animal, index, isFlipped: false })));
    setTargetAnimal(shuffledAnimals[Math.floor(Math.random() * shuffledAnimals.length)]);
    setSelectedCards([]);
    setResult('');
    setGameStarted(false);
  };

  const startGame = () => {
    setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: true })));
    setGameStarted(true);
  };

  const handleCardClick = (index) => {
    if (!gameStarted) return;
    setSelectedCards(prevSelected =>
      prevSelected.includes(index)
        ? prevSelected.filter(i => i !== index)
        : [...prevSelected, index]
    );
  };

  const checkSelection = () => {
    const selectedAnimals = selectedCards.map(index => cards[index].animal);
    const isCorrect = selectedAnimals.every(animal => animal === targetAnimal);

    if (isCorrect && selectedAnimals.length === animals.filter(animal => animal === targetAnimal).length) {
      setResult('Все верно!');
    } else {
      setResult('В вашем выборе были допущены ошибки.');
    }
  };

  return (
    <div className={styles.memoryGame}>
      <h1>Игра с карточками</h1>
      <button onClick={initializeGame}>Инициализировать</button>
      <button onClick={startGame} disabled={!cards.length}>Начать</button>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${styles.card} ${selectedCards.includes(index) ? styles.selected : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped ? '?' : card.animal}
          </div>
        ))}
      </div>
      <button onClick={checkSelection} disabled={!gameStarted}>Проверить</button>
      <div className={styles.result}>{result}</div>
      {targetAnimal && <div>Найдите все карточки с животным: {targetAnimal}</div>}
    </div>
  );
};

export default MemoryGame;

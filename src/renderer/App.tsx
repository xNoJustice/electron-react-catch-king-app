import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Cards {
  [key: string]: string;
}

interface RemainingCards {
  [key: string]: number;
}

interface Options {
  [key: string]: number;
}

interface ValidPlaces {
  [key: string]: Array<number>;
}

const options: Options = {
  1: 6,
  2: 5,
  3: 4,
  4: 1,
  5: 1,
  6: 4,
  7: 5,
  8: 6,
};
const invalidNumbers = [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 25];
const validPlaces: ValidPlaces = {
  1: [2, 6, 7],
  2: [1, 3, 6, 7, 8],
  3: [2, 4, 7, 8, 9],
  4: [3, 5, 8, 9, 10],
  5: [4, 9, 10],
  6: [1, 2, 7, 11, 12],
  10: [4, 5, 9, 14, 15],
  11: [6, 7, 12, 16, 17],
  15: [9, 10, 14, 19, 20],
  16: [11, 12, 17, 21, 22],
  20: [14, 15, 19, 24, 25],
  21: [16, 17, 22],
  25: [19, 20, 24],
};
const totalCards = {
  1: 7,
  2: 4,
  3: 5,
  4: 5,
  5: 3,
  K: 1,
};

function CatchKing() {
  const [cards, setCards] = useState<Cards>({});
  const [selectedCard, setSelectedCard] = useState('');
  const [remainingCards, setRemainingCards] =
    useState<RemainingCards>(totalCards);

  useEffect(() => {
    const list: Cards = {};
    for (let i = 1; i < 26; i += 1) {
      list[i] = '0';
    }
    setCards(list);
  }, []);

  const selectCard = (card: string) => {
    setSelectedCard(card);
  };

  const updateCards = (event: string, number: string) => {
    if (!selectedCard) return;
    const newCards = { ...cards };
    const remCards = { ...remainingCards };
    if (event === 'add') {
      if (remCards[number] === 0) return;
      if (parseInt(newCards[selectedCard], 10) > 0) return;
      if (number === '5') {
        for (let i = 1; i < 9; i += 1) {
          let nextCard;
          if (i < 5) {
            nextCard = parseInt(selectedCard, 10) - options[i];
          } else {
            nextCard = parseInt(selectedCard, 10) + options[i];
          }
          if (invalidNumbers.includes(parseInt(selectedCard, 10))) {
            if (validPlaces[selectedCard].includes(nextCard)) {
              if (parseInt(newCards[nextCard], 10) < 1) {
                newCards[nextCard] = '-3';
              }
            }
          } else if (parseInt(newCards[nextCard], 10) < 1) {
            newCards[nextCard] = '-3';
          }
        }
      }
      newCards[selectedCard] = number;
      remCards[number] -= 1;
    }
    if (event === 'five') {
      if (parseInt(newCards[selectedCard], 10) < 1) return;
      for (let i = 1; i < 9; i += 1) {
        let nextCard;
        if (i < 5) {
          nextCard = parseInt(selectedCard, 10) - options[i];
        } else {
          nextCard = parseInt(selectedCard, 10) + options[i];
        }
        if (invalidNumbers.includes(parseInt(selectedCard, 10))) {
          if (validPlaces[selectedCard].includes(nextCard)) {
            if (
              parseInt(newCards[nextCard], 10) < 1 &&
              parseInt(newCards[nextCard], 10) > -2 &&
              nextCard > 0 &&
              nextCard < 26
            ) {
              newCards[nextCard] = '-1';
            }
          }
        } else if (
          parseInt(newCards[nextCard], 10) < 1 &&
          parseInt(newCards[nextCard], 10) > -2 &&
          nextCard > 0 &&
          nextCard < 26
        ) {
          newCards[nextCard] = '-1';
        }
      }
    }
    if (event === 'noFive') {
      if (parseInt(newCards[selectedCard], 10) < 1) return;
      for (let i = 1; i < 9; i += 1) {
        let nextCard;
        if (i < 5) {
          nextCard = parseInt(selectedCard, 10) - options[i];
        } else {
          nextCard = parseInt(selectedCard, 10) + options[i];
        }
        if (invalidNumbers.includes(parseInt(selectedCard, 10))) {
          if (validPlaces[selectedCard].includes(nextCard)) {
            if (
              parseInt(newCards[nextCard], 10) < 1 &&
              parseInt(newCards[nextCard], 10) > -3 &&
              nextCard > 0 &&
              nextCard < 26
            ) {
              newCards[nextCard] = '-2';
            }
          }
        } else if (
          parseInt(newCards[nextCard], 10) < 1 &&
          parseInt(newCards[nextCard], 10) > -3 &&
          nextCard > 0 &&
          nextCard < 26
        ) {
          newCards[nextCard] = '-2';
        }
      }
    }
    if (event === 'del') {
      if (
        (typeof newCards[selectedCard] === 'string' ||
          typeof newCards[selectedCard] === 'boolean') &&
        parseInt(selectedCard, 10) >= 0 &&
        parseInt(selectedCard, 10) < 26
      ) {
        const remCardOptions = ['K', '1', '2', '3', '4', '5'];
        if (remCardOptions.includes(newCards[selectedCard])) {
          remCards[newCards[selectedCard]] += 1;
        }
        newCards[selectedCard] = '0';
      }
    }
    setCards(newCards);
    setRemainingCards(remCards);
  };

  const reset = () => {
    const list: Cards = {};
    for (let i = 1; i < 26; i += 1) {
      list[i] = '0';
    }
    setCards(list);
    setSelectedCard('');
    setRemainingCards(totalCards);
  };

  const returnMainColor = (card: string) => {
    if (card === '21') return '#1369e2';
    if (card === '16') return '#aa00aa';
    if (card === '11') return '#b6a100';
    if (card === '6') return '#c06500';
    return '#509f0f';
  };

  const returnNumber = (card: string) => {
    if (card === '21') return '5';
    if (card === '16') return '4';
    if (card === '11') return '3';
    if (card === '6') return '2';
    return '1';
  };

  const returnColor = (card: string) => {
    if (cards[card] && cards[card] === 'K') return '#a40000';
    if (cards[card] && cards[card] === '5') return '#1369e2';
    if (cards[card] && cards[card] === '4') return '#aa00aa';
    if (cards[card] && cards[card] === '3') return '#b6a100';
    if (cards[card] && cards[card] === '2') return '#c06500';
    if (cards[card] && cards[card] === '1') return '#509f0f';
    if (cards[card] && cards[card] === '0') return '#1a3e33';
    if (cards[card] && cards[card] === '-1') return '#1369e2';
    if (cards[card] && cards[card] === '-2') return '#099a6f';
    if (cards[card] && cards[card] === '-3') return '#cc0000';
    return '#000';
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto mb-4">
        <h1 className="text-indigo-200 mx-auto text-2xl w-48">
          Catch the King
        </h1>
      </div>
      <div className="grid grid-cols-6 gap-1">
        <button
          type="button"
          onClick={() => updateCards('add', 'K')}
          className="px-2 pb-2 text-white bg-red-700 text-center rounded-lg h-16 w-16 hover:text-gray-400"
        >
          <div className="flex justify-end text-sm">x{remainingCards.K}</div>
          <div className="flex justify-center items-center text-lg font-bold">
            K
          </div>
        </button>
        <button
          type="button"
          onClick={() => updateCards('del', '')}
          className="p-2 text-white bg-red-700 text-center text-lg font-medium rounded-lg hover:text-gray-400"
        >
          DEL
        </button>
        <button
          type="button"
          onClick={() => updateCards('five', '')}
          className="p-2 text-white bg-blue-700 text-center text-lg font-medium rounded-lg hover:text-gray-400"
        >
          5s around
        </button>
        <button
          type="button"
          onClick={() => updateCards('noFive', '')}
          className="p-2 text-white bg-cyan-700 text-center text-lg font-medium rounded-lg hover:text-gray-400"
        >
          no 5s around
        </button>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        {Object.keys(cards).length > 0 &&
          Object.keys(cards).map((card: string) => (
            <React.Fragment key={card}>
              {(card === '1' ||
                card === '6' ||
                card === '11' ||
                card === '16' ||
                card === '21') && (
                <button
                  type="button"
                  onClick={() => updateCards('add', returnNumber(card))}
                  className="px-2 pb-2 text-white text-center rounded-lg h-16 w-16 hover:text-gray-400"
                  style={{
                    background: returnMainColor(card),
                  }}
                >
                  <div className="flex justify-end text-sm">
                    x{remainingCards[returnNumber(card)]}
                  </div>
                  <div className="flex justify-center items-center text-lg font-bold">
                    {returnNumber(card)}
                  </div>
                </button>
              )}
              <button
                type="button"
                className="p-4 text-white rounded-lg text-lg font-bold"
                onClick={() => selectCard(card)}
                style={{
                  backgroundColor: returnColor(card),
                  border: selectedCard === card ? '3px inset blue' : '',
                }}
              >
                {parseInt(cards[card], 10) > 0 || cards[card] === 'K'
                  ? cards[card]
                  : ''}
                &nbsp;
              </button>
            </React.Fragment>
          ))}
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="py-2 px-4 mt-4 w-32 mx-auto bg-red-600 hover:bg-red-700 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
      >
        Reset
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatchKing />} />
      </Routes>
    </Router>
  );
}

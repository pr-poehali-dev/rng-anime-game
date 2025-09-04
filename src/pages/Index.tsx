import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'legendary';
  power: number;
  speed: number;
  psychic: number;
}

const characters: Character[] = [
  // Легендарные персонажи
  {
    id: '1',
    name: 'Сайки Кусуо',
    image: '/img/b116478e-6031-4476-ae44-f9e4f691f7f1.jpg',
    rarity: 'legendary',
    power: 100,
    speed: 95,
    psychic: 100
  },
  {
    id: '8',
    name: 'Айура Микото',
    image: '/img/37a80b56-ae66-45f0-aac0-f949c2d76103.jpg',
    rarity: 'legendary',
    power: 60,
    speed: 75,
    psychic: 95
  },
  
  // Редкие персонажи
  {
    id: '2', 
    name: 'Терухаши Кокоми',
    image: '/img/9f0e9a4b-f3d8-4c3f-9813-959e9a2b6c95.jpg',
    rarity: 'rare',
    power: 70,
    speed: 80,
    psychic: 30
  },
  {
    id: '5',
    name: 'Кайдо Шун',
    image: '/img/8d6d35e8-1cbc-44ad-a5d6-dc1ce42828da.jpg',
    rarity: 'rare',
    power: 65,
    speed: 70,
    psychic: 85
  },
  {
    id: '6',
    name: 'Кубоясу Арен',
    image: '/img/1afb1a8a-4e91-4f52-b386-d57ada1d25cb.jpg',
    rarity: 'rare',
    power: 90,
    speed: 85,
    psychic: 20
  },
  {
    id: '7',
    name: 'Сайко Метори',
    image: '/img/680114fc-9bae-4d08-baf4-57a76ca84e36.jpg',
    rarity: 'rare',
    power: 50,
    speed: 60,
    psychic: 40
  },
  
  // Обычные персонажи
  {
    id: '3',
    name: 'Хайро Кинеши',
    image: '/img/3c610945-c1a6-4284-843e-ce290ab2a6a2.jpg',
    rarity: 'common',
    power: 85,
    speed: 90,
    psychic: 10
  },
  {
    id: '4',
    name: 'Нендо Рики',
    image: '/img/3ced94f4-cfb3-4906-8ab3-a2ed6d117d86.jpg',
    rarity: 'common',
    power: 80,
    speed: 50,
    psychic: 5
  },
  {
    id: '9',
    name: 'Юмехара Чиё',
    image: '/img/ee0a07e3-53a8-4cf7-8753-cc934f56f4b3.jpg',
    rarity: 'common',
    power: 45,
    speed: 65,
    psychic: 25
  },
  {
    id: '10',
    name: 'Мера Чисато',
    image: '/img/06220b29-5b97-43a3-8898-11c9c5a029e9.jpg',
    rarity: 'common',
    power: 40,
    speed: 95,
    psychic: 15
  },
  {
    id: '11',
    name: 'Судзумия Хии',
    image: '/img/b6c8d9ee-7dc8-4014-b829-96eb13c46b31.jpg',
    rarity: 'common',
    power: 35,
    speed: 80,
    psychic: 30
  }
];

const rarityColors = {
  common: 'bg-gray-400',
  rare: 'bg-blue-500', 
  legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500'
};

const rarityLabels = {
  common: 'Обычный',
  rare: 'Редкий',
  legendary: 'Легендарный'
};

const rarityChances = {
  common: 70,
  rare: 25,
  legendary: 5
};

const Index = () => {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [collection, setCollection] = useState<Character[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'game' | 'collection'>('game');

  const rollCharacter = () => {
    setIsRolling(true);
    setShowResult(false);
    
    setTimeout(() => {
      const random = Math.random() * 100;
      let selectedRarity: 'common' | 'rare' | 'legendary';
      
      if (random <= rarityChances.legendary) {
        selectedRarity = 'legendary';
      } else if (random <= rarityChances.legendary + rarityChances.rare) {
        selectedRarity = 'rare';  
      } else {
        selectedRarity = 'common';
      }
      
      const availableCharacters = characters.filter(c => c.rarity === selectedRarity);
      const randomChar = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      
      setCurrentCharacter(randomChar);
      setIsRolling(false);
      setShowResult(true);
      
      // Добавляем в коллекцию
      if (!collection.find(c => c.id === randomChar.id)) {
        setCollection(prev => [...prev, randomChar]);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            SAIKI KUSUO RNG GAME
          </h1>
          <p className="text-white/80 text-lg">
            Собирай персонажей из аниме "Ох уж этот экстрасенс Сайки Кусуо"!
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1">
            <Button
              variant={activeTab === 'game' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('game')}
              className={activeTab === 'game' ? 'bg-white text-purple-600' : 'text-white hover:bg-white/20'}
            >
              <Icon name="Gamepad2" size={20} className="mr-2" />
              Игра
            </Button>
            <Button
              variant={activeTab === 'collection' ? 'default' : 'ghost'}  
              onClick={() => setActiveTab('collection')}
              className={activeTab === 'collection' ? 'bg-white text-purple-600' : 'text-white hover:bg-white/20'}
            >
              <Icon name="Star" size={20} className="mr-2" />
              Коллекция ({collection.length})
            </Button>
          </div>
        </div>

        {activeTab === 'game' && (
          <div className="text-center space-y-8">
            {/* Game Area */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto">
              {isRolling && (
                <div className="animate-spin mx-auto w-32 h-32 mb-6">
                  <div className="w-full h-full rounded-full border-4 border-white/30 border-t-white"></div>
                </div>
              )}
              
              {showResult && currentCharacter && (
                <div className="animate-fade-in">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                    <CardContent className="p-6">
                      <div className={`w-32 h-32 mx-auto mb-4 rounded-full ${rarityColors[currentCharacter.rarity]} p-1`}>
                        <div className="w-full h-full rounded-full bg-white p-2">
                          <img 
                            src={currentCharacter.image} 
                            alt={currentCharacter.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{currentCharacter.name}</h3>
                      <Badge 
                        className={`${rarityColors[currentCharacter.rarity]} text-white mb-4`}
                      >
                        {rarityLabels[currentCharacter.rarity]}
                      </Badge>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Сила</div>
                          <div className="font-bold text-lg">{currentCharacter.power}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Скорость</div>
                          <div className="font-bold text-lg">{currentCharacter.speed}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Экстрасенс</div>
                          <div className="font-bold text-lg">{currentCharacter.psychic}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <Button
                onClick={rollCharacter}
                disabled={isRolling}
                className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white text-xl px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
              >
                {isRolling ? (
                  <Icon name="Loader2" size={24} className="animate-spin mr-2" />
                ) : (
                  <Icon name="Gift" size={24} className="mr-2" />
                )}
                {isRolling ? 'Получаем персонажа...' : 'Получить персонажа'}
              </Button>
            </div>

            {/* Rarity Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto">
              <h3 className="text-white font-bold mb-4 text-center">Шансы выпадения:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center text-white">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    Обычный
                  </span>
                  <span>{rarityChances.common}%</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Редкий
                  </span>
                  <span>{rarityChances.rare}%</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2"></div>
                    Легендарный
                  </span>
                  <span>{rarityChances.legendary}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collection' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Ваша коллекция</h2>
            {collection.length === 0 ? (
              <div className="text-center text-white/70 py-12">
                <Icon name="Star" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Ваша коллекция пуста</p>
                <p className="text-sm">Получите первого персонажа!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.map((char) => (
                  <Card key={char.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-4">
                      <div className={`w-24 h-24 mx-auto mb-3 rounded-full ${rarityColors[char.rarity]} p-1`}>
                        <div className="w-full h-full rounded-full bg-white p-2">
                          <img 
                            src={char.image} 
                            alt={char.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{char.name}</h3>
                      <Badge 
                        className={`${rarityColors[char.rarity]} text-white mb-3 mx-auto block w-fit`}
                      >
                        {rarityLabels[char.rarity]}
                      </Badge>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <div className="text-gray-600">Сила</div>
                          <div className="font-bold">{char.power}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Скорость</div>
                          <div className="font-bold">{char.speed}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Экстрасенс</div>
                          <div className="font-bold">{char.psychic}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
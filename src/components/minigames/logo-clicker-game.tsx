
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Turtle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const GAME_AREA_WIDTH = 380;
const GAME_AREA_HEIGHT = 250;
const LOGO_SIZE = 40;

interface DifficultySettings {
  duration: number;
  moveInterval: number;
  label: string;
}

const DIFFICULTIES: Record<string, DifficultySettings> = {
  easy: { duration: 20, moveInterval: 800, label: 'Fácil' },
  medium: { duration: 15, moveInterval: 600, label: 'Medio' },
  hard: { duration: 10, moveInterval: 400, label: 'Difícil' },
};
type DifficultyLevel = keyof typeof DIFFICULTIES;

export default function LogoClickerGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTIES.medium.duration);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'over'>('idle');
  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('medium');
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const logoMoveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const moveLogo = useCallback(() => {
    if (!gameAreaRef.current) return;
    const maxX = GAME_AREA_WIDTH - LOGO_SIZE;
    const maxY = GAME_AREA_HEIGHT - LOGO_SIZE;
    setLogoPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }, []);

  useEffect(() => {
    // Initialize logo position
    moveLogo();
  }, [moveLogo]);

  useEffect(() => {
    if (gameStatus === 'playing') {
      const difficultySettings = DIFFICULTIES[currentDifficulty];
      
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerIntervalRef.current!);
            if (logoMoveIntervalRef.current) clearInterval(logoMoveIntervalRef.current);
            setGameStatus('over');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      logoMoveIntervalRef.current = setInterval(() => {
        moveLogo();
      }, difficultySettings.moveInterval);

    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (logoMoveIntervalRef.current) clearInterval(logoMoveIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (logoMoveIntervalRef.current) clearInterval(logoMoveIntervalRef.current);
    };
  }, [gameStatus, currentDifficulty, moveLogo]);

  const startGame = (difficulty: DifficultyLevel) => {
    setCurrentDifficulty(difficulty);
    setScore(0);
    setTimeLeft(DIFFICULTIES[difficulty].duration);
    setGameStatus('playing');
    moveLogo(); 
  };

  const handleLogoClick = () => {
    if (gameStatus === 'playing') {
      setScore((prevScore) => prevScore + 1);
      moveLogo();
    }
  };

  const difficultySettings = DIFFICULTIES[currentDifficulty];
  const progressPercentage = (timeLeft / difficultySettings.duration) * 100;

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {gameStatus === 'playing' && (
        <>
          <div className="w-full flex justify-between items-center text-lg font-medium">
            <span>Puntuación: <span className="text-primary">{score}</span></span>
            <span>Tiempo: <span className="text-primary">{timeLeft}s</span></span>
          </div>
          <div className="w-full mb-2">
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </>
      )}

      <div
        ref={gameAreaRef}
        className="relative bg-muted/50 rounded-md shadow-inner overflow-hidden"
        style={{ 
          width: `${GAME_AREA_WIDTH}px`, 
          height: `${GAME_AREA_HEIGHT}px`,
          cursor: gameStatus === 'playing' ? 'pointer' : 'default'
        }}
      >
        {gameStatus === 'playing' && (
          <Turtle
            className="absolute text-primary transition-all duration-150 ease-linear"
            style={{
              left: `${logoPosition.x}px`,
              top: `${logoPosition.y}px`,
              width: `${LOGO_SIZE}px`,
              height: `${LOGO_SIZE}px`,
            }}
            onClick={handleLogoClick}
            aria-label="Haz clic en la tortuga"
          />
        )}
        {(gameStatus === 'idle' || gameStatus === 'over') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 space-y-4">
            {gameStatus === 'over' && (
              <>
                <h3 className="text-2xl font-semibold">¡Juego Terminado!</h3>
                <p className="text-xl">Tu puntuación: <span className="text-primary">{score}</span></p>
              </>
            )}
            <h4 className="text-lg font-medium">
              {gameStatus === 'idle' ? 'Selecciona Dificultad:' : 'Jugar de Nuevo en:'}
            </h4>
            <div className="flex gap-2">
              {(Object.keys(DIFFICULTIES) as DifficultyLevel[]).map((level) => (
                <Button 
                  key={level} 
                  onClick={() => startGame(level)}
                  variant={currentDifficulty === level && gameStatus !== 'over' ? "default" : "outline"}
                >
                  {DIFFICULTIES[level].label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      {gameStatus === 'playing' && (
         <p className="text-sm text-muted-foreground mt-2">
            Dificultad actual: {DIFFICULTIES[currentDifficulty].label}
        </p>
      )}
    </div>
  );
}

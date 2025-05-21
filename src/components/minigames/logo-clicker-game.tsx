
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Turtle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const GAME_DURATION_SECONDS = 15;
const LOGO_MOVE_INTERVAL_MS = 600; // Changed from 1000 to 600
const GAME_AREA_WIDTH = 380; // Adjusted for dialog padding
const GAME_AREA_HEIGHT = 250;
const LOGO_SIZE = 40; // Approximate size of the icon for collision detection

export default function LogoClickerGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'over'>('idle'); // idle, playing, over
  
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
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerIntervalRef.current!);
            setGameStatus('over');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      logoMoveIntervalRef.current = setInterval(() => {
        moveLogo();
      }, LOGO_MOVE_INTERVAL_MS);

    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (logoMoveIntervalRef.current) clearInterval(logoMoveIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (logoMoveIntervalRef.current) clearInterval(logoMoveIntervalRef.current);
    };
  }, [gameStatus, moveLogo]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setGameStatus('playing');
    moveLogo(); // Move logo once at start
  };

  const handleLogoClick = () => {
    if (gameStatus === 'playing') {
      setScore((prevScore) => prevScore + 1);
      moveLogo(); // Move logo immediately after click
    }
  };

  const progressPercentage = (timeLeft / GAME_DURATION_SECONDS) * 100;

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="w-full flex justify-between items-center text-lg font-medium">
        <span>Puntuación: <span className="text-primary">{score}</span></span>
        <span>Tiempo: <span className="text-primary">{timeLeft}s</span></span>
      </div>
      
      <div className="w-full mb-2">
        <Progress value={progressPercentage} className="h-3" />
      </div>

      <div
        ref={gameAreaRef}
        className="relative bg-muted/50 rounded-md shadow-inner overflow-hidden cursor-pointer"
        style={{ width: `${GAME_AREA_WIDTH}px`, height: `${GAME_AREA_HEIGHT}px` }}
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
        {gameStatus === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={startGame} size="lg">Iniciar Juego</Button>
          </div>
        )}
        {gameStatus === 'over' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
            <h3 className="text-2xl font-semibold mb-2">¡Juego Terminado!</h3>
            <p className="text-xl mb-4">Tu puntuación: {score}</p>
            <Button onClick={startGame} size="lg">Jugar de Nuevo</Button>
          </div>
        )}
      </div>
      {gameStatus !== 'playing' && gameStatus !== 'idle' && (
         <p className="text-sm text-muted-foreground mt-2">
            {gameStatus === 'over' ? "¡Inténtalo de nuevo para superar tu récord!" : ""}
        </p>
      )}
    </div>
  );
}

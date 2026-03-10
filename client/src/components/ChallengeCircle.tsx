/**
 * ChallengeCircle Component
 * Design: Minimalismo Geométrico - Círculos com 4 quadrantes interativos
 * Cada quadrante pode ser clicado para marcar como concluído
 * Cores personalizadas pelo usuário
 */

import React, { useState } from 'react';

interface Quadrant {
  id: 'A' | 'B' | 'C' | 'D';
  color: string;
  completed: boolean;
}

interface ChallengeCircleProps {
  day: number;
  quadrants: Quadrant[];
  onQuadrantClick: (day: number, quadrantId: 'A' | 'B' | 'C' | 'D') => void;
  date: string;
}

export default function ChallengeCircle({
  day,
  quadrants,
  onQuadrantClick,
  date,
}: ChallengeCircleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleQuadrantClick = (quadrantId: 'A' | 'B' | 'C' | 'D') => {
    setIsAnimating(true);
    onQuadrantClick(day, quadrantId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getQuadrantPath = (quadrant: 'A' | 'B' | 'C' | 'D') => {
    // SVG paths para cada quadrante do círculo
    const paths = {
      A: 'M 50 50 L 50 0 A 50 50 0 0 0 0 50 Z', // Top-left
      B: 'M 50 50 L 100 50 A 50 50 0 0 0 50 0 Z', // Top-right
      C: 'M 50 50 L 0 50 A 50 50 0 0 0 50 100 Z', // Bottom-left
      D: 'M 50 50 L 50 100 A 50 50 0 0 0 100 50 Z', // Bottom-right
    };
    return paths[quadrant];
  };

  const quadrantData = {
    A: quadrants.find(q => q.id === 'A'),
    B: quadrants.find(q => q.id === 'B'),
    C: quadrants.find(q => q.id === 'C'),
    D: quadrants.find(q => q.id === 'D'),
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className={`cursor-pointer transition-transform w-24 h-24 sm:w-28 sm:h-28 ${isAnimating ? 'scale-110' : 'scale-100'}`}
      >
        {/* Circle border */}
        <circle cx="50" cy="50" r="49" fill="white" stroke="#374151" strokeWidth="2" />

        {/* Quadrants */}
        {(['A', 'B', 'C', 'D'] as const).map((quadrant) => {
          const quad = quadrantData[quadrant];
          const displayColor = quad?.completed ? quad.color : 'transparent';
          
          return (
            <g
              key={quadrant}
              onClick={() => handleQuadrantClick(quadrant)}
              className="circle-quadrant"
              style={{ cursor: 'pointer' }}
            >
              <path
                d={getQuadrantPath(quadrant)}
                fill={displayColor}
                className="transition-all duration-300 hover:opacity-80"
              />
            </g>
          );
        })}

        {/* Cross lines dividing quadrants */}
        <line x1="50" y1="0" x2="50" y2="100" stroke="#374151" strokeWidth="1.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#374151" strokeWidth="1.5" />

        {/* Day number in center */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#374151"
          fontFamily="'Roboto Mono', monospace"
        >
          {day}
        </text>
      </svg>

      {/* Day label and date */}
      <div className="text-center">
        <div className="text-xs font-semibold text-gray-600 -mt-1">Dia {day}</div>
        <div className="text-xs text-gray-500">{formatDate(date)}</div>
      </div>
    </div>
  );
}

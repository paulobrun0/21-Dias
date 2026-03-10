/**
 * useChallengeState Hook
 * Gerencia o estado do desafio com metas, cores personalizadas e persistência em localStorage
 * Design: Minimalismo Geométrico - Dados estruturados para 21 dias com 4 quadrantes cada
 */

import { useState, useEffect } from 'react';

interface Quadrant {
  id: 'A' | 'B' | 'C' | 'D';
  color: string;
  completed: boolean;
}

interface Goal {
  id: 'A' | 'B' | 'C' | 'D';
  title: string;
  color: string; // Cor escolhida pelo usuário para este quadrante
}

interface DayData {
  day: number;
  quadrants: Quadrant[];
}

interface ChallengeState {
  days: DayData[];
  startDate: string;
  endDate: string;
  goals: Goal[];
  completedDays: number;
  isConfigured: boolean;
}

const DEFAULT_COLORS = {
  A: '#FFD700', // Amarelo
  B: '#10B981', // Verde
  C: '#3B82F6', // Azul
  D: '#EF4444', // Vermelho
};

const INITIAL_STATE: ChallengeState = {
  days: Array.from({ length: 21 }, (_, i) => ({
    day: i + 1,
    quadrants: [
      { id: 'A', color: DEFAULT_COLORS.A, completed: false },
      { id: 'B', color: DEFAULT_COLORS.B, completed: false },
      { id: 'C', color: DEFAULT_COLORS.C, completed: false },
      { id: 'D', color: DEFAULT_COLORS.D, completed: false },
    ],
  })),
  startDate: new Date().toISOString().split('T')[0],
  endDate: calculateEndDate(new Date().toISOString().split('T')[0]),
  goals: [
    { id: 'A', title: '', color: DEFAULT_COLORS.A },
    { id: 'B', title: '', color: DEFAULT_COLORS.B },
    { id: 'C', title: '', color: DEFAULT_COLORS.C },
    { id: 'D', title: '', color: DEFAULT_COLORS.D },
  ],
  completedDays: 0,
  isConfigured: false,
};

function calculateEndDate(startDate: string): string {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + 20); // 21 dias = 20 dias após o início
  return end.toISOString().split('T')[0];
}

const STORAGE_KEY = 'desafio-21-dias-state';

export function useChallengeState() {
  const [state, setState] = useState<ChallengeState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        // Validar se o estado salvo é válido
        if (parsedState.goals && parsedState.isConfigured) {
          setState(parsedState);
        } else {
          setState(INITIAL_STATE);
        }
      } catch (error) {
        console.error('Failed to parse saved state:', error);
        setState(INITIAL_STATE);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const setGoals = (newGoals: Goal[]) => {
    setState((prevState) => {
      const updatedDays = prevState.days.map((dayData) => ({
        ...dayData,
        quadrants: dayData.quadrants.map((q) => {
          const newGoal = newGoals.find((g) => g.id === q.id);
          return newGoal ? { ...q, color: newGoal.color } : q;
        }),
      }));

      return {
        ...prevState,
        goals: newGoals,
        days: updatedDays,
        isConfigured: true,
      };
    });
  };

  const toggleQuadrant = (day: number, quadrantId: 'A' | 'B' | 'C' | 'D') => {
    setState((prevState) => {
      const newDays = prevState.days.map((dayData) => {
        if (dayData.day === day) {
          const newQuadrants = dayData.quadrants.map((q) => {
            if (q.id === quadrantId) {
              return { ...q, completed: !q.completed };
            }
            return q;
          });
          return { ...dayData, quadrants: newQuadrants };
        }
        return dayData;
      });

      // Calculate completed days (all 4 quadrants marcados)
      const completedDays = newDays.filter((dayData) =>
        dayData.quadrants.every((q) => q.completed)
      ).length;

      return {
        ...prevState,
        days: newDays,
        completedDays,
      };
    });
  };

  const resetChallenge = () => {
    const newStartDate = new Date().toISOString().split('T')[0];
    setState({
      ...INITIAL_STATE,
      startDate: newStartDate,
      endDate: calculateEndDate(newStartDate),
      goals: state.goals, // Manter as metas configuradas
      isConfigured: state.isConfigured,
    });
  };

  const resetDay = (day: number) => {
    setState((prevState) => ({
      ...prevState,
      days: prevState.days.map((dayData) => {
        if (dayData.day === day) {
          return {
            ...dayData,
            quadrants: dayData.quadrants.map((q) => ({
              ...q,
              completed: false,
            })),
          };
        }
        return dayData;
      }),
    }));
  };

  const getProgress = () => {
    const totalQuadrants = 21 * 4;
    const filledQuadrants = state.days.reduce(
      (acc, dayData) =>
        acc + dayData.quadrants.filter((q) => q.completed).length,
      0
    );
    return Math.round((filledQuadrants / totalQuadrants) * 100);
  };

  const getQuadrantColor = (quadrantId: 'A' | 'B' | 'C' | 'D'): string => {
    const goal = state.goals.find((g) => g.id === quadrantId);
    return goal?.color || DEFAULT_COLORS[quadrantId];
  };

  return {
    state,
    setGoals,
    toggleQuadrant,
    resetChallenge,
    resetDay,
    getProgress,
    getQuadrantColor,
    isLoaded,
  };
}

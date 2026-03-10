/**
 * Home Page - Desafio 21 Dias
 * Design: Minimalismo Geométrico com Foco Motivacional
 * Layout: Grid de 21 círculos (5x5 + 1), header com branding, sidebar com estatísticas
 * Novo: Metas personalizáveis, cores customizáveis, datas de término
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChallengeCircle from '@/components/ChallengeCircle';
import GoalsConfigModal from '@/components/GoalsConfigModal';
import { useChallengeState } from '@/hooks/useChallengeState';
import { RotateCcw, Download, Settings } from 'lucide-react';

export default function Home() {
  const { state, setGoals, toggleQuadrant, resetChallenge, resetDay, getProgress, isLoaded } =
    useChallengeState();
  const [isModalOpen, setIsModalOpen] = useState(!state.isConfigured);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-50">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-yellow-300 border-t-yellow-500 rounded-full"></div>
          </div>
          <p className="text-gray-600 font-semibold">Carregando seu desafio...</p>
        </div>
      </div>
    );
  }

  const progress = getProgress();
  const completedDays = state.completedDays;

  const exportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `desafio-21-dias-${state.startDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Calcular datas para cada dia
  const getDayDate = (dayNumber: number): string => {
    const startDate = new Date(state.startDate);
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + (dayNumber - 1));
    return dayDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      {/* Modal de Configuração de Metas */}
      <GoalsConfigModal
        isOpen={isModalOpen}
        initialGoals={state.goals}
        onSave={setGoals}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold text-gray-900">21</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Desafio 21 Dias</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {formatDate(state.startDate)} até {formatDate(state.endDate)}
                </p>
              </div>
            </div>

            <div className="order-3 w-full sm:w-auto flex justify-between sm:order-2 sm:gap-8">
              {/* Quick Stats */}
              <div className="flex gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{completedDays}</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Completos</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{progress}%</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">Progresso</div>
                </div>
              </div>

              {/* Config Button */}
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                size="sm"
                className="gap-1.5 sm:gap-2"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Editar Metas</span>
              </Button>
            </div>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Circles Grid - Main Content */}
          <div className="lg:col-span-3">
            {/* Metas Display */}
            {state.isConfigured && state.goals.some((g) => g.title) && (
              <div className="mb-8 p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Suas Metas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {state.goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="p-3 sm:p-4 rounded-lg border-2"
                      style={{ borderColor: goal.color, backgroundColor: `${goal.color}15` }}
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-wide mb-1"
                        style={{ color: goal.color }}
                      >
                        Meta {goal.id}
                      </div>
                      <p className="text-sm font-medium text-gray-900">{goal.title || '(vazio)'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-8 p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Como Usar</h2>
              <p className="text-gray-600 text-sm mb-4">
                Clique nos quadrantes de cada círculo para marcar suas metas como concluídas.
                Quando todos os 4 quadrantes de um dia estão preenchidos, o dia fica completo!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {state.goals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-400"
                      style={{ backgroundColor: goal.color }}
                    ></div>
                    <span className="text-xs text-gray-600">Meta {goal.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Circles Grid */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-items-center">
                {state.days.map((dayData) => (
                  <div key={dayData.day} className="flex flex-col items-center gap-2">
                    <ChallengeCircle
                      day={dayData.day}
                      quadrants={dayData.quadrants}
                      onQuadrantClick={toggleQuadrant}
                      date={getDayDate(dayData.day)}
                    />
                    <button
                      onClick={() => resetDay(dayData.day)}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors -mt-2"
                      title="Resetar dia"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Statistics & Controls */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Progresso
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-2xl font-bold text-gray-900">{progress}%</span>
                    <span className="text-xs text-gray-500">
                      {state.days.reduce(
                        (acc, d) =>
                          acc + d.quadrants.filter((q) => q.completed).length,
                        0
                      )}{' '}
                      / 84
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dias Completos:</span>
                    <span className="font-semibold text-green-600">{completedDays} / 21</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dias Restantes:</span>
                    <span className="font-semibold text-blue-600">{21 - completedDays}</span>
                  </div>
                </div>
              </div>

              {/* Motivation Card */}
              <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-yellow-900 mb-2 uppercase tracking-wider">
                  Motivação
                </h3>
                <p className="text-sm text-yellow-800 italic">
                  "Continue. Cada passo aproxima você do seu objetivo."
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={exportData}
                  variant="outline"
                  className="w-full justify-center gap-2"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>

                <Button
                  onClick={resetChallenge}
                  variant="destructive"
                  className="w-full justify-center gap-2"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Resetar
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          <p>
            Desafio 21 Dias &copy; {new Date().getFullYear()} &bull; Feito com ❤️ para seus hábitos.
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * GoalsConfigModal Component
 * Modal para configurar as 4 metas e cores personalizadas
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Goal {
  id: 'A' | 'B' | 'C' | 'D';
  title: string;
  color: string;
}

interface GoalsConfigModalProps {
  isOpen: boolean;
  initialGoals: Goal[];
  onSave: (goals: Goal[]) => void;
  onClose: () => void;
}

const QUADRANT_LABELS = {
  A: 'Meta A',
  B: 'Meta B',
  C: 'Meta C',
  D: 'Meta D',
};

const DEFAULT_COLORS = {
  A: '#FFD700', // Amarelo
  B: '#10B981', // Verde
  C: '#3B82F6', // Azul
  D: '#EF4444', // Vermelho
};

export default function GoalsConfigModal({
  isOpen,
  initialGoals,
  onSave,
  onClose,
}: GoalsConfigModalProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleGoalChange = (id: 'A' | 'B' | 'C' | 'D', title: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, title } : g))
    );
  };

  const handleColorChange = (id: 'A' | 'B' | 'C' | 'D', color: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, color } : g))
    );
  };

  const handleSave = () => {
    onSave(goals);
    onClose();
  };

  const handleReset = () => {
    setGoals([
      { id: 'A', title: '', color: DEFAULT_COLORS.A },
      { id: 'B', title: '', color: DEFAULT_COLORS.B },
      { id: 'C', title: '', color: DEFAULT_COLORS.C },
      { id: 'D', title: '', color: DEFAULT_COLORS.D },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Configure suas Metas</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {(['A', 'B', 'C', 'D'] as const).map((id) => {
            const goal = goals.find((g) => g.id === id);
            return (
              <div key={id} className="space-y-3">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">
                    {QUADRANT_LABELS[id]}
                  </span>
                  <input
                    type="text"
                    placeholder={`Digite sua meta ${id}...`}
                    value={goal?.title || ''}
                    onChange={(e) => handleGoalChange(id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  />
                </label>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Cor:</span>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={goal?.color || DEFAULT_COLORS[id]}
                      onChange={(e) => handleColorChange(id, e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border border-gray-300"
                    />
                    <div
                      className="w-12 h-10 rounded border-2 border-gray-300"
                      style={{ backgroundColor: goal?.color || DEFAULT_COLORS[id] }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            Resetar Cores
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
            size="sm"
          >
            Salvar Metas
          </Button>
        </div>
      </div>
    </div>
  );
}

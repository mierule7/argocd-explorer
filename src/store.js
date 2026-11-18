import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      completedModules: [], // Array of module IDs the user has finished
      examScores: {},       // Object mapping moduleId -> best score

      // Call this when a user finishes an exam
            saveExamResult: (moduleId, score, totalQuestions) =>
        set((state) => {
          const prev = state.examScores[moduleId];
          const prevScore = prev ? prev.score : 0;
          return {
            completedModules: [...new Set([...state.completedModules, moduleId])],
            examScores: {
              ...state.examScores,
              // store both numbers, keep the best attempt
              [moduleId]: score >= prevScore ? { score, total: totalQuestions } : prev,
            },
          };
        }),

      // Utility to clear progress (for testing)
      resetProgress: () => set({ completedModules: [], examScores: {} }),
    }),
    {
      name: 'infrablueprint-progress', // The key in localStorage
    }
  )
);
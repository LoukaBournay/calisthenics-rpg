import { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEY } from '../data/constants';
import { getXPProgress, getTitleForLevel } from '../engine/levelSystem';
import { getStreakMultiplier, updateStreak } from '../engine/streakEngine';
import { calculateWorkoutXP, calculateStatsGained } from '../engine/xpCalculator';

const GameContext = createContext(null);

const initialState = {
  player: {
    level: 1,
    totalXP: 0,
    title: 'Novice',
    createdAt: new Date().toISOString().split('T')[0],
  },
  stats: { force: 0, equilibre: 0, endurance: 0 },
  streak: { current: 0, longest: 0, lastWorkoutDate: null },
  workouts: {},
  skills: { unlocked: ['basic_pull', 'basic_dip', 'wall_handstand', 'hollow_hold_30s', 'l_sit_floor', 'planche_lean'], points: 0 },
  bossFights: { current: null, defeated: [], cycle: 0 },
  achievements: [],
  inventory: [],
  settings: { soundEnabled: true },
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return initialState;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_WORKOUT': {
      const { dayKey, exercises, date } = action.payload;
      const multiplier = getStreakMultiplier(state.streak.current);
      const totalXP = calculateWorkoutXP(exercises, multiplier);
      const statsGained = calculateStatsGained(exercises);
      const newTotalXP = state.player.totalXP + totalXP;
      const progress = getXPProgress(newTotalXP);
      const streakUpdate = updateStreak(state.streak.current, state.streak.lastWorkoutDate, date);

      return {
        ...state,
        player: {
          ...state.player,
          totalXP: newTotalXP,
          level: progress.level,
          title: getTitleForLevel(progress.level),
        },
        stats: {
          force: state.stats.force + statsGained.force,
          equilibre: state.stats.equilibre + statsGained.equilibre,
          endurance: state.stats.endurance + statsGained.endurance,
        },
        streak: {
          current: streakUpdate.current,
          longest: Math.max(state.streak.longest, streakUpdate.current),
          lastWorkoutDate: streakUpdate.lastWorkoutDate,
        },
        workouts: {
          ...state.workouts,
          [date]: {
            dayKey,
            exercises,
            totalXP,
            statsGained,
            completedAt: new Date().toISOString(),
          },
        },
      };
    }

    case 'UNLOCK_SKILL': {
      if (state.skills.unlocked.includes(action.payload)) return state;
      return {
        ...state,
        skills: {
          ...state.skills,
          unlocked: [...state.skills.unlocked, action.payload],
        },
      };
    }

    case 'ADD_ACHIEVEMENT': {
      if (state.achievements.includes(action.payload)) return state;
      return { ...state, achievements: [...state.achievements, action.payload] };
    }

    case 'ADD_INVENTORY': {
      return { ...state, inventory: [...state.inventory, action.payload] };
    }

    case 'USE_INVENTORY_ITEM': {
      const idx = state.inventory.findIndex(i => i.id === action.payload);
      if (idx === -1) return state;
      const newInv = [...state.inventory];
      newInv.splice(idx, 1);
      return { ...state, inventory: newInv };
    }

    case 'SET_BOSS': {
      return { ...state, bossFights: { ...state.bossFights, current: action.payload } };
    }

    case 'DEFEAT_BOSS': {
      const boss = state.bossFights.current;
      if (!boss) return state;
      const xpReward = boss.reward?.xp || 0;
      const newTotalXP = state.player.totalXP + xpReward;
      const progress = getXPProgress(newTotalXP);
      return {
        ...state,
        player: { ...state.player, totalXP: newTotalXP, level: progress.level, title: getTitleForLevel(progress.level) },
        bossFights: {
          ...state.bossFights,
          current: null,
          defeated: [...state.bossFights.defeated, boss.id],
        },
        skills: {
          ...state.skills,
          points: state.skills.points + (boss.reward?.skillPoint || 0),
        },
      };
    }

    case 'ADD_XP': {
      const newTotalXP = state.player.totalXP + action.payload;
      const progress = getXPProgress(newTotalXP);
      return {
        ...state,
        player: { ...state.player, totalXP: newTotalXP, level: progress.level, title: getTitleForLevel(progress.level) },
      };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

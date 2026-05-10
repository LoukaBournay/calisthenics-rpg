import { DIFFICULTY, STAT_MAP } from '../data/constants';

export function calculateSetXP(exerciseId, repsCompleted, targetReps) {
  const difficulty = DIFFICULTY[exerciseId] || 10;
  return Math.floor(difficulty * (repsCompleted / targetReps));
}

export function calculateExerciseXP(exerciseId, setsCompleted, targetSets, targetReps) {
  const difficulty = DIFFICULTY[exerciseId] || 10;
  const baseXP = difficulty * setsCompleted * targetReps;
  const perfectBonus = setsCompleted === targetSets ? 1.25 : 1.0;
  return Math.floor(baseXP * perfectBonus);
}

export function calculateWorkoutXP(exercises, streakMultiplier = 1.0) {
  let totalXP = 0;
  let allPerfect = true;

  for (const ex of exercises) {
    const completed = ex.setsCompleted.filter(Boolean).length;
    if (completed < ex.sets) allPerfect = false;
    totalXP += calculateExerciseXP(ex.id, completed, ex.sets, ex.reps);
  }

  if (allPerfect) totalXP = Math.floor(totalXP * 1.1);
  return Math.floor(totalXP * streakMultiplier);
}

export function calculateStatsGained(exercises) {
  const stats = { force: 0, equilibre: 0, endurance: 0 };

  for (const ex of exercises) {
    const completed = ex.setsCompleted.filter(Boolean).length;
    if (completed === 0) continue;
    const xp = calculateExerciseXP(ex.id, completed, ex.sets, ex.reps);
    const mapping = STAT_MAP[ex.id] || {};

    for (const [stat, weight] of Object.entries(mapping)) {
      stats[stat] += Math.floor((xp / 10) * weight);
    }
  }

  return stats;
}

export function dailyLoginBonus(consecutiveDays) {
  return Math.min(25 + (consecutiveDays - 1) * 5, 100);
}

import { STREAK_TIERS } from '../data/constants';

export function getStreakMultiplier(streakDays) {
  let lower = STREAK_TIERS[0];
  let upper = STREAK_TIERS[0];

  for (let i = 0; i < STREAK_TIERS.length; i++) {
    if (streakDays >= STREAK_TIERS[i].days) {
      lower = STREAK_TIERS[i];
      upper = STREAK_TIERS[i + 1] || STREAK_TIERS[i];
    }
  }

  if (lower === upper) return lower.multiplier;

  const range = upper.days - lower.days;
  const progress = (streakDays - lower.days) / range;
  return lower.multiplier + (upper.multiplier - lower.multiplier) * progress;
}

export function getNextStreakTier(streakDays) {
  for (const tier of STREAK_TIERS) {
    if (tier.days > streakDays) return tier;
  }
  return null;
}

export function isRestDay(dayKey) {
  return dayKey === 'mercredi' || dayKey === 'dimanche';
}

export function updateStreak(currentStreak, lastWorkoutDate, todayStr) {
  if (!lastWorkoutDate) return { current: 1, lastWorkoutDate: todayStr };

  const last = new Date(lastWorkoutDate);
  const today = new Date(todayStr);
  const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { current: currentStreak, lastWorkoutDate: todayStr };
  if (diffDays === 1) return { current: currentStreak + 1, lastWorkoutDate: todayStr };
  if (diffDays === 2) {
    const between = new Date(last);
    between.setDate(between.getDate() + 1);
    const dayOfWeek = between.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 3) {
      return { current: currentStreak + 1, lastWorkoutDate: todayStr };
    }
  }

  return { current: 1, lastWorkoutDate: todayStr };
}

import { RANDOM_DROPS } from '../data/constants';

export function rollRandomDrop() {
  const roll = Math.random();
  let cumulative = 0;

  for (const drop of RANDOM_DROPS) {
    cumulative += drop.rarity;
    if (roll < cumulative) return drop;
  }

  return null;
}

export function isNearLevelUp(percent) {
  return percent >= 85;
}

export function isNearStreakTier(currentStreak, nextTier) {
  if (!nextTier) return false;
  const remaining = nextTier.days - currentStreak;
  return remaining <= 2 && remaining > 0;
}

export function getBossUrgency(daysRemaining) {
  if (daysRemaining <= 1) return 'critical';
  if (daysRemaining <= 3) return 'warning';
  return 'normal';
}

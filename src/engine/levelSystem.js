import { TITLES } from '../data/constants';

export function xpForLevel(level) {
  return Math.floor(100 * Math.pow(1.15, level - 1));
}

export function totalXPForLevel(level) {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += xpForLevel(i);
  }
  return total;
}

export function getLevelFromTotalXP(totalXP) {
  let level = 1;
  let xpNeeded = 0;
  while (true) {
    xpNeeded += xpForLevel(level);
    if (totalXP < xpNeeded) break;
    level++;
  }
  return level;
}

export function getXPProgress(totalXP) {
  const level = getLevelFromTotalXP(totalXP);
  const currentLevelStart = totalXPForLevel(level);
  const needed = xpForLevel(level);
  const current = totalXP - currentLevelStart;
  return { level, current, needed, percent: Math.min((current / needed) * 100, 100) };
}

export function getTitleForLevel(level) {
  let title = 'Novice';
  for (const t of TITLES) {
    if (level >= t.minLevel) title = t.title;
  }
  return title;
}

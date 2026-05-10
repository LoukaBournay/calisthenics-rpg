export const DIFFICULTY = {
  tractions_pronation: 4,
  tractions_supination: 4,
  dips: 3,
  negatifs_muscle_up: 5,
  handstand_mur: 3,
  pike_pushup: 3,
  shoulder_taps: 2,
  hollow_body: 2,
  pompes_declinees: 3,
  pompes_diamant: 3,
  dips_profondes: 4,
  jump_muscle_up: 5,
  handstand_decoller: 4,
  pike_pushup_tempo: 3,
  l_sit: 4,
  marche: 2,
  etirements: 2,
};

export const STAT_MAP = {
  tractions_pronation: { force: 0.8, endurance: 0.2 },
  tractions_supination: { force: 0.8, endurance: 0.2 },
  dips: { force: 0.7, endurance: 0.3 },
  negatifs_muscle_up: { force: 0.6, equilibre: 0.4 },
  handstand_mur: { equilibre: 0.9, endurance: 0.1 },
  pike_pushup: { force: 0.5, equilibre: 0.5 },
  shoulder_taps: { equilibre: 0.7, endurance: 0.3 },
  hollow_body: { endurance: 0.7, equilibre: 0.3 },
  pompes_declinees: { force: 0.8, endurance: 0.2 },
  pompes_diamant: { force: 0.9, endurance: 0.1 },
  dips_profondes: { force: 0.7, endurance: 0.3 },
  jump_muscle_up: { force: 0.5, equilibre: 0.5 },
  handstand_decoller: { equilibre: 1.0 },
  pike_pushup_tempo: { force: 0.4, endurance: 0.6 },
  l_sit: { endurance: 0.5, equilibre: 0.5 },
  marche: { endurance: 1.0 },
  etirements: { equilibre: 0.5, endurance: 0.5 },
};

export const STREAK_TIERS = [
  { days: 0, multiplier: 1.0 },
  { days: 2, multiplier: 1.1 },
  { days: 3, multiplier: 1.15 },
  { days: 5, multiplier: 1.25 },
  { days: 7, multiplier: 1.4 },
  { days: 14, multiplier: 1.6 },
  { days: 21, multiplier: 1.8 },
  { days: 30, multiplier: 2.0 },
  { days: 60, multiplier: 2.5 },
  { days: 90, multiplier: 3.0 },
];

export const TITLES = [
  { minLevel: 1, title: 'Novice' },
  { minLevel: 6, title: 'Apprenti' },
  { minLevel: 11, title: 'Guerrier' },
  { minLevel: 16, title: 'Champion' },
  { minLevel: 21, title: 'Maître' },
  { minLevel: 26, title: 'Légende' },
  { minLevel: 31, title: 'Titan' },
];

export const RANDOM_DROPS = [
  { id: 'xp_crystal', name: 'Cristal d\'XP', effect: '+50 XP bonus', rarity: 0.15, icon: '💎' },
  { id: 'stat_shard', name: 'Fragment de stat', effect: '+5 stat aléatoire', rarity: 0.10, icon: '🔮' },
  { id: 'streak_shield', name: 'Bouclier de streak', effect: 'Protège 1 jour manqué', rarity: 0.03, icon: '🛡️' },
  { id: 'xp_potion', name: 'Potion d\'XP', effect: '×2 XP prochain exercice', rarity: 0.05, icon: '⚗️' },
  { id: 'boss_damage', name: 'Coup critique', effect: '+2 dégâts boss', rarity: 0.08, icon: '⚔️' },
];

export const STORAGE_KEY = 'calisthenics-rpg-state';

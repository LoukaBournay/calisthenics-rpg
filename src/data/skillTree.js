export const SKILL_TREE = {
  force: {
    label: 'Force',
    color: '#ff4444',
    nodes: [
      { id: 'basic_pull', level: 1, name: 'Traction de base', requires: [] },
      { id: 'weighted_pull', level: 5, name: 'Traction lestée', requires: ['basic_pull'] },
      { id: 'one_arm_pull_neg', level: 10, name: 'Négatif un bras', requires: ['weighted_pull'] },
      { id: 'one_arm_pull', level: 18, name: 'Traction un bras', requires: ['one_arm_pull_neg'] },
      { id: 'basic_dip', level: 1, name: 'Dip basique', requires: [] },
      { id: 'ring_dip', level: 8, name: 'Dip aux anneaux', requires: ['basic_dip'] },
      { id: 'muscle_up', level: 15, name: 'Muscle-up', requires: ['ring_dip', 'weighted_pull'] },
    ],
  },
  equilibre: {
    label: 'Équilibre',
    color: '#44aaff',
    nodes: [
      { id: 'wall_handstand', level: 1, name: 'Handstand mur', requires: [] },
      { id: 'free_handstand_5s', level: 6, name: 'Handstand libre 5s', requires: ['wall_handstand'] },
      { id: 'free_handstand_15s', level: 12, name: 'Handstand libre 15s', requires: ['free_handstand_5s'] },
      { id: 'handstand_pushup', level: 20, name: 'Handstand push-up', requires: ['free_handstand_15s'] },
      { id: 'l_sit_floor', level: 4, name: 'L-sit au sol', requires: [] },
      { id: 'v_sit', level: 14, name: 'V-sit', requires: ['l_sit_floor'] },
    ],
  },
  endurance: {
    label: 'Endurance',
    color: '#44ff88',
    nodes: [
      { id: 'hollow_hold_30s', level: 3, name: 'Hollow body 30s', requires: [] },
      { id: 'hollow_hold_60s', level: 8, name: 'Hollow body 60s', requires: ['hollow_hold_30s'] },
      { id: 'front_lever_tuck', level: 13, name: 'Front lever tuck', requires: ['hollow_hold_60s'] },
      { id: 'front_lever', level: 22, name: 'Front lever', requires: ['front_lever_tuck'] },
      { id: 'planche_lean', level: 7, name: 'Planche lean', requires: [] },
      { id: 'tuck_planche', level: 16, name: 'Tuck planche', requires: ['planche_lean'] },
    ],
  },
};

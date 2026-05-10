export const PROGRAM = {
  lundi: {
    name: 'Tirage + Muscle-up',
    icon: '💪',
    warmup: {
      description: 'Rotations d\'épaules + mobilité poignets (2 min) + Tractions australiennes 2×8',
      duration: '5 min',
    },
    exercises: [
      {
        id: 'tractions_pronation',
        name: 'Tractions pronation',
        note: 'Focus explosivité en haut',
        sets: 4,
        reps: 5,
        type: 'reps',
      },
      {
        id: 'tractions_supination',
        name: 'Tractions supination',
        note: 'Tirage complet, menton au-dessus barre',
        sets: 3,
        reps: 4,
        type: 'reps',
      },
      {
        id: 'dips',
        name: 'Dips lestés ou corps',
        note: 'Descente lente 3s',
        sets: 4,
        reps: 6,
        type: 'reps',
      },
      {
        id: 'negatifs_muscle_up',
        name: 'Négatifs de muscle-up',
        note: 'Descente 5s depuis position haute',
        sets: 3,
        reps: 3,
        type: 'reps',
      },
    ],
  },
  mardi: {
    name: 'Handstand',
    icon: '🤸',
    warmup: {
      description: 'Planche face au mur (gainage) 3×30s',
      duration: '5 min',
    },
    exercises: [
      {
        id: 'handstand_mur',
        name: 'Handstand au mur',
        note: 'Ventre face mur, alignement parfait',
        sets: 5,
        reps: 20,
        type: 'seconds',
      },
      {
        id: 'pike_pushup',
        name: 'Pike push-up',
        note: 'Fesses en l\'air, tête vers sol',
        sets: 4,
        reps: 8,
        type: 'reps',
      },
      {
        id: 'shoulder_taps',
        name: 'Shoulder taps en planche haute',
        note: 'Stabilité et gainage',
        sets: 3,
        reps: 10,
        type: 'reps',
      },
      {
        id: 'hollow_body',
        name: 'Gainage creux (hollow body)',
        note: 'Essentiel pour handstand libre',
        sets: 3,
        reps: 25,
        type: 'seconds',
      },
    ],
  },
  mercredi: {
    name: 'Repos actif',
    icon: '🧘',
    warmup: null,
    exercises: [
      {
        id: 'marche',
        name: 'Marche légère',
        note: '20-30 min, détente',
        sets: 1,
        reps: 1,
        type: 'check',
      },
      {
        id: 'etirements',
        name: 'Étirements doux',
        note: 'Épaules, poignets, hanches',
        sets: 1,
        reps: 1,
        type: 'check',
      },
    ],
  },
  jeudi: {
    name: 'Poussée + Muscle-up',
    icon: '🔥',
    warmup: {
      description: 'Mobilité épaules + pompes légères',
      duration: '5 min',
    },
    exercises: [
      {
        id: 'pompes_declinees',
        name: 'Pompes déclinées',
        note: 'Pieds surélevés, simule appui muscle-up',
        sets: 4,
        reps: 10,
        type: 'reps',
      },
      {
        id: 'pompes_diamant',
        name: 'Pompes diamant',
        note: 'Mains serrées, triceps',
        sets: 3,
        reps: 8,
        type: 'reps',
      },
      {
        id: 'dips_profondes',
        name: 'Dips profondes',
        note: 'Amplitude max, coudes arrière',
        sets: 4,
        reps: 8,
        type: 'reps',
      },
      {
        id: 'jump_muscle_up',
        name: 'Jump muscle-up',
        note: 'Avec bande élastique ou saut + transition',
        sets: 4,
        reps: 3,
        type: 'reps',
      },
    ],
  },
  vendredi: {
    name: 'Handstand avancé',
    icon: '⚡',
    warmup: {
      description: 'Mobilité poignets + planche 2×30s',
      duration: '5 min',
    },
    exercises: [
      {
        id: 'handstand_decoller',
        name: 'Handstand — décoller les pieds',
        note: 'Tenir 1-2s sans mur',
        sets: 5,
        reps: 30,
        type: 'seconds',
      },
      {
        id: 'pike_pushup_tempo',
        name: 'Pike push-up tempo',
        note: 'Descente 3s',
        sets: 4,
        reps: 6,
        type: 'reps',
      },
      {
        id: 'l_sit',
        name: 'L-sit entre chaises',
        note: 'Renforce épaules et gainage',
        sets: 3,
        reps: 10,
        type: 'seconds',
      },
    ],
  },
  samedi: {
    name: 'Full body + Skills',
    icon: '🏆',
    warmup: {
      description: 'Mobilité générale',
      duration: '5 min',
    },
    exercises: [
      {
        id: 'tractions_pronation',
        name: 'Tractions',
        note: 'Explosif — Circuit',
        sets: 3,
        reps: 4,
        type: 'reps',
      },
      {
        id: 'pompes_declinees',
        name: 'Pompes déclinées',
        note: 'Lent — Circuit',
        sets: 3,
        reps: 8,
        type: 'reps',
      },
      {
        id: 'handstand_mur',
        name: 'Handstand au mur',
        note: 'Équilibre — Circuit',
        sets: 3,
        reps: 20,
        type: 'seconds',
      },
      {
        id: 'dips',
        name: 'Dips',
        note: 'Amplitude — Circuit',
        sets: 3,
        reps: 6,
        type: 'reps',
      },
      {
        id: 'hollow_body',
        name: 'Hollow body',
        note: 'Gainage — Circuit',
        sets: 3,
        reps: 20,
        type: 'seconds',
      },
    ],
  },
  dimanche: {
    name: 'Repos complet',
    icon: '😴',
    warmup: null,
    exercises: [],
  },
};

export const DAY_ORDER = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export function getTodayKey() {
  const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  return days[new Date().getDay()];
}

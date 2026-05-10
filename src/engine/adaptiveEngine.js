// RPE Scale: 1-5
// 1 = Trop facile, 2 = Facile, 3 = Correct, 4 = Dur, 5 = Impossible

const PROGRESSION_RULES = {
  reps: {
    1: { repsChange: 2, setsChange: 0 },
    2: { repsChange: 1, setsChange: 0 },
    3: { repsChange: 0, setsChange: 0 },
    4: { repsChange: -1, setsChange: 0 },
    5: { repsChange: -2, setsChange: 0 },
  },
  seconds: {
    1: { repsChange: 5, setsChange: 0 },
    2: { repsChange: 3, setsChange: 0 },
    3: { repsChange: 0, setsChange: 0 },
    4: { repsChange: -3, setsChange: 0 },
    5: { repsChange: -5, setsChange: 0 },
  },
};

const EXERCISE_PROGRESSIONS = {
  tractions_pronation: {
    easier: null,
    harder: 'tractions_pronation_lestees',
    minReps: 3,
    maxReps: 12,
    setRange: [3, 6],
  },
  tractions_supination: {
    easier: null,
    harder: 'tractions_supination_lestees',
    minReps: 2,
    maxReps: 10,
    setRange: [2, 5],
  },
  dips: {
    easier: null,
    harder: 'dips_lestees',
    minReps: 4,
    maxReps: 12,
    setRange: [3, 6],
  },
  negatifs_muscle_up: {
    easier: null,
    harder: 'muscle_up_assiste',
    minReps: 2,
    maxReps: 5,
    setRange: [2, 5],
  },
  handstand_mur: {
    easier: null,
    harder: 'handstand_decoller',
    minReps: 10,
    maxReps: 45,
    setRange: [3, 6],
  },
  pike_pushup: {
    easier: null,
    harder: 'pike_pushup_sureleve',
    minReps: 5,
    maxReps: 15,
    setRange: [3, 5],
  },
  shoulder_taps: {
    easier: null,
    harder: null,
    minReps: 6,
    maxReps: 20,
    setRange: [2, 4],
  },
  hollow_body: {
    easier: null,
    harder: null,
    minReps: 15,
    maxReps: 60,
    setRange: [2, 5],
  },
  pompes_declinees: {
    easier: 'pompes_standard',
    harder: 'pompes_declinees_lestees',
    minReps: 6,
    maxReps: 20,
    setRange: [3, 5],
  },
  pompes_diamant: {
    easier: 'pompes_standard',
    harder: null,
    minReps: 5,
    maxReps: 15,
    setRange: [2, 5],
  },
  dips_profondes: {
    easier: 'dips',
    harder: 'dips_profondes_lestees',
    minReps: 5,
    maxReps: 12,
    setRange: [3, 6],
  },
  jump_muscle_up: {
    easier: null,
    harder: 'muscle_up_bande',
    minReps: 2,
    maxReps: 6,
    setRange: [3, 5],
  },
  handstand_decoller: {
    easier: 'handstand_mur',
    harder: 'handstand_libre',
    minReps: 15,
    maxReps: 45,
    setRange: [3, 6],
  },
  pike_pushup_tempo: {
    easier: 'pike_pushup',
    harder: 'pike_pushup_sureleve',
    minReps: 4,
    maxReps: 10,
    setRange: [3, 5],
  },
  l_sit: {
    easier: null,
    harder: null,
    minReps: 5,
    maxReps: 30,
    setRange: [2, 4],
  },
};

export function calculateAdaptedExercise(exercise, rpe, completionRate) {
  const rules = PROGRESSION_RULES[exercise.type] || PROGRESSION_RULES.reps;
  const progression = EXERCISE_PROGRESSIONS[exercise.id];

  if (!progression || exercise.type === 'check') {
    return { ...exercise, adapted: false };
  }

  const rpeRule = rules[rpe] || rules[3];
  let newReps = exercise.reps + rpeRule.repsChange;
  let newSets = exercise.sets + rpeRule.setsChange;

  // Si completion rate < 70%, réduire un peu plus
  if (completionRate < 0.7) {
    newReps = Math.max(newReps - 1, progression.minReps);
  }

  // Si on a tout complété ET RPE <= 2, ajouter un set
  if (completionRate >= 1.0 && rpe <= 2) {
    newSets = Math.min(newSets + 1, progression.setRange[1]);
  }

  // Si RPE >= 5 et completion < 50%, retirer un set
  if (rpe >= 5 && completionRate < 0.5) {
    newSets = Math.max(newSets - 1, progression.setRange[0]);
  }

  newReps = Math.max(progression.minReps, Math.min(newReps, progression.maxReps));
  newSets = Math.max(progression.setRange[0], Math.min(newSets, progression.setRange[1]));

  let shouldUpgrade = false;
  let shouldDowngrade = false;

  // Upgrade si on est au max de reps ET RPE <= 2 pendant 2+ sessions
  if (newReps >= progression.maxReps && rpe <= 2 && progression.harder) {
    shouldUpgrade = true;
  }

  // Downgrade si on est au min de reps ET RPE >= 5 ET completion < 50%
  if (newReps <= progression.minReps && rpe >= 5 && completionRate < 0.5 && progression.easier) {
    shouldDowngrade = true;
  }

  return {
    ...exercise,
    reps: newReps,
    sets: newSets,
    adapted: true,
    shouldUpgrade,
    shouldDowngrade,
    upgradeTarget: progression.harder,
    downgradeTarget: progression.easier,
  };
}

export function adaptProgram(dayExercises, feedbackData) {
  return dayExercises.map(exercise => {
    const feedback = feedbackData[exercise.id];
    if (!feedback) return exercise;

    const completionRate = feedback.setsCompleted
      ? feedback.setsCompleted.filter(Boolean).length / feedback.setsCompleted.length
      : 1;

    return calculateAdaptedExercise(exercise, feedback.rpe, completionRate);
  });
}

export function getAdaptiveRecommendation(rpe) {
  switch (rpe) {
    case 1: return { text: 'Trop facile — on augmente!', color: '#22c55e', emoji: '🚀' };
    case 2: return { text: 'Tu progresses bien — léger ajustement', color: '#06b6d4', emoji: '📈' };
    case 3: return { text: 'Parfait — on garde ce rythme', color: '#a855f7', emoji: '✨' };
    case 4: return { text: 'Dur mais faisable — on maintient', color: '#f97316', emoji: '💪' };
    case 5: return { text: 'Trop dur — on adapte pour toi', color: '#ef4444', emoji: '🛡️' };
    default: return { text: '', color: '#888', emoji: '' };
  }
}

export const RPE_LABELS = [
  { value: 1, label: 'Trop facile', emoji: '😴', color: '#22c55e' },
  { value: 2, label: 'Facile', emoji: '😊', color: '#06b6d4' },
  { value: 3, label: 'Correct', emoji: '😤', color: '#a855f7' },
  { value: 4, label: 'Dur', emoji: '😰', color: '#f97316' },
  { value: 5, label: 'Impossible', emoji: '💀', color: '#ef4444' },
];

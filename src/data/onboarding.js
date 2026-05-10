export const ONBOARDING_QUESTIONS = [
  // === PROFIL DE BASE ===
  {
    id: 'experience',
    category: 'Profil',
    question: 'Depuis combien de temps tu fais du calisthenics ?',
    type: 'single',
    options: [
      { value: 'debutant', label: 'Je débute', score: { base: 1 } },
      { value: '6mois', label: 'Moins de 6 mois', score: { base: 2 } },
      { value: '1an', label: '6 mois — 1 an', score: { base: 3 } },
      { value: '2ans', label: '1 — 2 ans', score: { base: 4 } },
      { value: 'expert', label: 'Plus de 2 ans', score: { base: 5 } },
    ],
  },
  {
    id: 'frequency',
    category: 'Profil',
    question: 'Combien de fois par semaine tu t\'entraînes ?',
    type: 'single',
    options: [
      { value: '1-2', label: '1-2 fois', score: { volume: 1 } },
      { value: '3-4', label: '3-4 fois', score: { volume: 2 } },
      { value: '5-6', label: '5-6 fois', score: { volume: 3 } },
      { value: '7', label: 'Tous les jours', score: { volume: 4 } },
    ],
  },
  {
    id: 'weight',
    category: 'Profil',
    question: 'Ton poids approximatif ?',
    type: 'single',
    options: [
      { value: 'light', label: 'Moins de 65 kg', score: { leverage: 3 } },
      { value: 'medium', label: '65 — 80 kg', score: { leverage: 2 } },
      { value: 'heavy', label: '80 — 95 kg', score: { leverage: 1 } },
      { value: 'vheavy', label: 'Plus de 95 kg', score: { leverage: 0 } },
    ],
  },
  {
    id: 'injuries',
    category: 'Profil',
    question: 'Tu as des blessures ou limitations actuelles ?',
    type: 'multi',
    options: [
      { value: 'none', label: 'Aucune', score: {} },
      { value: 'wrist', label: 'Poignets', score: { avoid_handstand: true } },
      { value: 'shoulder', label: 'Épaules', score: { avoid_overhead: true } },
      { value: 'elbow', label: 'Coudes', score: { avoid_dips: true } },
      { value: 'ankle', label: 'Cheville', score: { avoid_impact: true } },
      { value: 'back', label: 'Dos', score: { avoid_lever: true } },
    ],
  },

  // === FORCE - TIRAGE ===
  {
    id: 'pullups_max',
    category: 'Force — Tirage',
    question: 'Combien de tractions strictes max en une série ?',
    type: 'single',
    options: [
      { value: '0', label: '0', score: { pull: 0 } },
      { value: '1-3', label: '1 — 3', score: { pull: 1 } },
      { value: '4-7', label: '4 — 7', score: { pull: 2 } },
      { value: '8-12', label: '8 — 12', score: { pull: 3 } },
      { value: '12+', label: '12+', score: { pull: 4 } },
    ],
  },
  {
    id: 'pullup_type',
    category: 'Force — Tirage',
    question: 'Quel type de traction tu maîtrises le mieux ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Aucune encore', score: { pull_type: 0 } },
      { value: 'australian', label: 'Tractions australiennes', score: { pull_type: 1 } },
      { value: 'chin', label: 'Chin-up (supination)', score: { pull_type: 2 } },
      { value: 'pull', label: 'Pull-up (pronation)', score: { pull_type: 3 } },
      { value: 'weighted', label: 'Tractions lestées', score: { pull_type: 4 } },
    ],
  },
  {
    id: 'muscle_up',
    category: 'Force — Tirage',
    question: 'Où tu en es sur le muscle-up ?',
    type: 'single',
    options: [
      { value: 'never', label: 'Jamais essayé', score: { mu: 0 } },
      { value: 'neg', label: 'Je fais les négatifs', score: { mu: 1 } },
      { value: 'band', label: 'Avec bande élastique', score: { mu: 2 } },
      { value: 'ugly', label: '1-2 muscle-ups pas propres', score: { mu: 3 } },
      { value: 'clean', label: 'Muscle-up propre', score: { mu: 4 } },
    ],
  },

  // === FORCE - POUSSÉE ===
  {
    id: 'pushups_max',
    category: 'Force — Poussée',
    question: 'Combien de pompes max en une série ?',
    type: 'single',
    options: [
      { value: '0-10', label: '0 — 10', score: { push: 1 } },
      { value: '10-20', label: '10 — 20', score: { push: 2 } },
      { value: '20-30', label: '20 — 30', score: { push: 3 } },
      { value: '30+', label: '30+', score: { push: 4 } },
    ],
  },
  {
    id: 'dips_max',
    category: 'Force — Poussée',
    question: 'Combien de dips strictes max ?',
    type: 'single',
    options: [
      { value: '0', label: '0', score: { dip: 0 } },
      { value: '1-5', label: '1 — 5', score: { dip: 1 } },
      { value: '5-10', label: '5 — 10', score: { dip: 2 } },
      { value: '10-15', label: '10 — 15', score: { dip: 3 } },
      { value: '15+', label: '15+', score: { dip: 4 } },
    ],
  },
  {
    id: 'hspu',
    category: 'Force — Poussée',
    question: 'Handstand push-up — ton niveau ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Je ne sais pas ce que c\'est', score: { hspu: 0 } },
      { value: 'pike', label: 'Pike push-ups seulement', score: { hspu: 1 } },
      { value: 'wall', label: 'HSPU au mur (partiels)', score: { hspu: 2 } },
      { value: 'full_wall', label: 'HSPU au mur (complets)', score: { hspu: 3 } },
      { value: 'free', label: 'HSPU libre', score: { hspu: 4 } },
    ],
  },

  // === ÉQUILIBRE ===
  {
    id: 'handstand',
    category: 'Équilibre',
    question: 'Handstand — ton niveau actuel ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Je tiens pas du tout', score: { hs: 0 } },
      { value: 'wall_chest', label: 'Au mur ventre face (30s+)', score: { hs: 1 } },
      { value: 'wall_back', label: 'Au mur dos face (30s+)', score: { hs: 2 } },
      { value: 'free_5s', label: 'Libre 3 — 10s', score: { hs: 3 } },
      { value: 'free_30s', label: 'Libre 30s+', score: { hs: 4 } },
    ],
  },
  {
    id: 'lsit',
    category: 'Équilibre',
    question: 'L-sit — tu tiens combien de temps ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Pas du tout', score: { lsit: 0 } },
      { value: 'tuck', label: 'Tuck L-sit (genoux pliés)', score: { lsit: 1 } },
      { value: '5s', label: 'L-sit 3 — 5s', score: { lsit: 2 } },
      { value: '10s', label: 'L-sit 10s+', score: { lsit: 3 } },
      { value: 'vsit', label: 'V-sit', score: { lsit: 4 } },
    ],
  },

  // === ENDURANCE / GAINAGE ===
  {
    id: 'hollow_body',
    category: 'Gainage',
    question: 'Hollow body hold — ton max ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Connais pas', score: { hollow: 0 } },
      { value: '10s', label: 'Moins de 15s', score: { hollow: 1 } },
      { value: '30s', label: '15 — 30s', score: { hollow: 2 } },
      { value: '45s', label: '30 — 60s', score: { hollow: 3 } },
      { value: '60s+', label: '60s+', score: { hollow: 4 } },
    ],
  },
  {
    id: 'front_lever',
    category: 'Gainage',
    question: 'Front lever — où tu en es ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Jamais essayé', score: { fl: 0 } },
      { value: 'tuck', label: 'Tuck front lever', score: { fl: 1 } },
      { value: 'adv_tuck', label: 'Advanced tuck', score: { fl: 2 } },
      { value: 'straddle', label: 'Straddle front lever', score: { fl: 3 } },
      { value: 'full', label: 'Full front lever', score: { fl: 4 } },
    ],
  },
  {
    id: 'planche',
    category: 'Gainage',
    question: 'Planche — ton niveau ?',
    type: 'single',
    options: [
      { value: 'none', label: 'Pas commencé', score: { planche: 0 } },
      { value: 'lean', label: 'Planche lean', score: { planche: 1 } },
      { value: 'tuck', label: 'Tuck planche', score: { planche: 2 } },
      { value: 'adv_tuck', label: 'Advanced tuck planche', score: { planche: 3 } },
      { value: 'straddle', label: 'Straddle ou full planche', score: { planche: 4 } },
    ],
  },

  // === OBJECTIFS ===
  {
    id: 'goal_primary',
    category: 'Objectifs',
    question: 'Ton objectif principal en ce moment ?',
    type: 'single',
    options: [
      { value: 'muscle_up', label: 'Débloquer le muscle-up', score: { focus_mu: true } },
      { value: 'handstand', label: 'Maîtriser le handstand', score: { focus_hs: true } },
      { value: 'strength', label: 'Force brute (lestés, one arm)', score: { focus_strength: true } },
      { value: 'skills', label: 'Figures (planche, front lever)', score: { focus_skills: true } },
      { value: 'general', label: 'Progression globale', score: { focus_general: true } },
    ],
  },
  {
    id: 'goal_secondary',
    category: 'Objectifs',
    question: 'Un deuxième objectif ?',
    type: 'single',
    options: [
      { value: 'muscle_up', label: 'Muscle-up', score: { focus2_mu: true } },
      { value: 'handstand', label: 'Handstand', score: { focus2_hs: true } },
      { value: 'aesthetics', label: 'Esthétique / sèche', score: { focus2_aesthetics: true } },
      { value: 'endurance', label: 'Endurance musculaire', score: { focus2_endurance: true } },
      { value: 'none', label: 'Pas d\'autre objectif', score: {} },
    ],
  },
  {
    id: 'session_duration',
    category: 'Objectifs',
    question: 'Combien de temps tu peux consacrer par séance ?',
    type: 'single',
    options: [
      { value: '30', label: '30 min max', score: { duration: 30 } },
      { value: '45', label: '45 min', score: { duration: 45 } },
      { value: '60', label: '1 heure', score: { duration: 60 } },
      { value: '90', label: '1h30+', score: { duration: 90 } },
    ],
  },
  {
    id: 'equipment',
    category: 'Objectifs',
    question: 'Quel équipement tu as accès ?',
    type: 'multi',
    options: [
      { value: 'pullup_bar', label: 'Barre de traction', score: { has_bar: true } },
      { value: 'dip_bars', label: 'Barres parallèles / dips', score: { has_dips: true } },
      { value: 'rings', label: 'Anneaux', score: { has_rings: true } },
      { value: 'bands', label: 'Bandes élastiques', score: { has_bands: true } },
      { value: 'weights', label: 'Lest (gilet, ceinture)', score: { has_weights: true } },
      { value: 'nothing', label: 'Rien du tout (sol)', score: {} },
    ],
  },
  {
    id: 'motivation',
    category: 'Objectifs',
    question: 'Qu\'est-ce qui te motive le plus ?',
    type: 'single',
    options: [
      { value: 'unlock', label: 'Débloquer une nouvelle figure', score: { motiv: 'unlock' } },
      { value: 'progress', label: 'Voir mes stats monter', score: { motiv: 'progress' } },
      { value: 'streak', label: 'Ne jamais casser le streak', score: { motiv: 'streak' } },
      { value: 'challenge', label: 'Les défis (boss fights)', score: { motiv: 'challenge' } },
    ],
  },
];

export function evaluateProfile(answers) {
  const profile = {
    level: 'debutant',
    pullLevel: 0,
    pushLevel: 0,
    hsLevel: 0,
    coreLevel: 0,
    injuries: [],
    goals: [],
    equipment: [],
    duration: 45,
    motivation: 'progress',
  };

  const scores = {};
  for (const [questionId, answer] of Object.entries(answers)) {
    const question = ONBOARDING_QUESTIONS.find(q => q.id === questionId);
    if (!question) continue;

    if (Array.isArray(answer)) {
      answer.forEach(val => {
        const opt = question.options.find(o => o.value === val);
        if (opt?.score) Object.assign(scores, opt.score);
      });
    } else {
      const opt = question.options.find(o => o.value === answer);
      if (opt?.score) Object.assign(scores, opt.score);
    }
  }

  profile.pullLevel = Math.max(scores.pull || 0, scores.pull_type || 0);
  profile.pushLevel = Math.max(scores.push || 0, scores.dip || 0);
  profile.hsLevel = Math.max(scores.hs || 0, scores.hspu || 0);
  profile.coreLevel = Math.max(scores.hollow || 0, scores.fl || 0, scores.planche || 0, scores.lsit || 0);
  profile.muLevel = scores.mu || 0;
  profile.duration = scores.duration || 45;
  profile.motivation = scores.motiv || 'progress';

  if (scores.avoid_handstand) profile.injuries.push('wrist');
  if (scores.avoid_overhead) profile.injuries.push('shoulder');
  if (scores.avoid_dips) profile.injuries.push('elbow');
  if (scores.avoid_impact) profile.injuries.push('ankle');
  if (scores.avoid_lever) profile.injuries.push('back');

  if (scores.has_bar) profile.equipment.push('pullup_bar');
  if (scores.has_dips) profile.equipment.push('dip_bars');
  if (scores.has_rings) profile.equipment.push('rings');
  if (scores.has_bands) profile.equipment.push('bands');
  if (scores.has_weights) profile.equipment.push('weights');

  if (scores.focus_mu) profile.goals.push('muscle_up');
  if (scores.focus_hs) profile.goals.push('handstand');
  if (scores.focus_strength) profile.goals.push('strength');
  if (scores.focus_skills) profile.goals.push('skills');
  if (scores.focus_general) profile.goals.push('general');
  if (scores.focus2_mu) profile.goals.push('muscle_up');
  if (scores.focus2_hs) profile.goals.push('handstand');
  if (scores.focus2_aesthetics) profile.goals.push('aesthetics');
  if (scores.focus2_endurance) profile.goals.push('endurance');

  const avg = (profile.pullLevel + profile.pushLevel + profile.hsLevel + profile.coreLevel) / 4;
  if (avg >= 3.5) profile.level = 'avance';
  else if (avg >= 2) profile.level = 'intermediaire';
  else profile.level = 'debutant';

  return profile;
}

export function generateProgramFromProfile(profile) {
  const repScale = profile.level === 'avance' ? 1.3 : profile.level === 'intermediaire' ? 1.0 : 0.7;
  const setScale = profile.level === 'avance' ? 1.2 : profile.level === 'intermediaire' ? 1.0 : 0.8;

  function r(base) { return Math.max(1, Math.round(base * repScale)); }
  function s(base) { return Math.max(2, Math.round(base * setScale)); }

  const hasBar = profile.equipment.includes('pullup_bar');
  const hasDips = profile.equipment.includes('dip_bars');
  const hasBands = profile.equipment.includes('bands');
  const hasWeights = profile.equipment.includes('weights');
  const avoidWrist = profile.injuries.includes('wrist');
  const avoidShoulder = profile.injuries.includes('shoulder');
  const avoidDips = profile.injuries.includes('elbow');

  const adaptations = {};

  // LUNDI - Tirage + Muscle-up
  if (hasBar) {
    adaptations['lundi_tractions_pronation'] = {
      reps: r(profile.pullLevel >= 3 ? 6 : profile.pullLevel >= 2 ? 5 : 3),
      sets: s(profile.pullLevel >= 3 ? 5 : 4),
    };
    adaptations['lundi_tractions_supination'] = {
      reps: r(profile.pullLevel >= 3 ? 5 : profile.pullLevel >= 2 ? 4 : 3),
      sets: s(3),
    };
  }

  if (hasDips && !avoidDips) {
    adaptations['lundi_dips'] = {
      reps: r(profile.pushLevel >= 3 ? 8 : profile.pushLevel >= 2 ? 6 : 4),
      sets: s(profile.pushLevel >= 3 ? 5 : 4),
    };
  }

  adaptations['lundi_negatifs_muscle_up'] = {
    reps: r(profile.muLevel >= 2 ? 4 : profile.muLevel >= 1 ? 3 : 2),
    sets: s(profile.muLevel >= 2 ? 4 : 3),
  };

  // MARDI - Handstand
  if (!avoidWrist && !avoidShoulder) {
    adaptations['mardi_handstand_mur'] = {
      reps: profile.hsLevel >= 3 ? 30 : profile.hsLevel >= 2 ? 25 : 15,
      sets: s(5),
    };
    adaptations['mardi_pike_pushup'] = {
      reps: r(profile.hsLevel >= 2 ? 8 : 5),
      sets: s(4),
    };
  }

  adaptations['mardi_shoulder_taps'] = {
    reps: r(profile.coreLevel >= 2 ? 12 : 8),
    sets: s(3),
  };

  adaptations['mardi_hollow_body'] = {
    reps: profile.coreLevel >= 3 ? 35 : profile.coreLevel >= 2 ? 25 : 15,
    sets: s(3),
  };

  // JEUDI - Poussée + Muscle-up
  adaptations['jeudi_pompes_declinees'] = {
    reps: r(profile.pushLevel >= 3 ? 12 : profile.pushLevel >= 2 ? 10 : 6),
    sets: s(4),
  };

  adaptations['jeudi_pompes_diamant'] = {
    reps: r(profile.pushLevel >= 3 ? 10 : profile.pushLevel >= 2 ? 8 : 5),
    sets: s(3),
  };

  if (!avoidDips) {
    adaptations['jeudi_dips_profondes'] = {
      reps: r(profile.pushLevel >= 3 ? 10 : profile.pushLevel >= 2 ? 8 : 5),
      sets: s(4),
    };
  }

  adaptations['jeudi_jump_muscle_up'] = {
    reps: r(profile.muLevel >= 2 ? 4 : 3),
    sets: s(4),
  };

  // VENDREDI - Handstand avancé
  if (!avoidWrist && !avoidShoulder) {
    adaptations['vendredi_handstand_decoller'] = {
      reps: profile.hsLevel >= 3 ? 30 : profile.hsLevel >= 2 ? 20 : 10,
      sets: s(5),
    };
    adaptations['vendredi_pike_pushup_tempo'] = {
      reps: r(profile.hsLevel >= 2 ? 6 : 4),
      sets: s(4),
    };
  }

  adaptations['vendredi_l_sit'] = {
    reps: profile.coreLevel >= 3 ? 15 : profile.coreLevel >= 2 ? 10 : 5,
    sets: s(3),
  };

  // SAMEDI - Full body circuit
  adaptations['samedi_tractions_pronation'] = {
    reps: r(profile.pullLevel >= 3 ? 5 : 4),
    sets: 3,
  };
  adaptations['samedi_pompes_declinees'] = {
    reps: r(profile.pushLevel >= 3 ? 10 : 8),
    sets: 3,
  };
  adaptations['samedi_handstand_mur'] = {
    reps: profile.hsLevel >= 2 ? 25 : 15,
    sets: 3,
  };
  adaptations['samedi_dips'] = {
    reps: r(profile.pushLevel >= 3 ? 8 : 6),
    sets: 3,
  };
  adaptations['samedi_hollow_body'] = {
    reps: profile.coreLevel >= 2 ? 25 : 15,
    sets: 3,
  };

  return adaptations;
}

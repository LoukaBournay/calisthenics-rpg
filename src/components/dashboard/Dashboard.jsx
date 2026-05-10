import { useGame } from '../../context/GameContext';
import { getXPProgress } from '../../engine/levelSystem';
import { getStreakMultiplier, getNextStreakTier } from '../../engine/streakEngine';
import { isNearLevelUp, isNearStreakTier } from '../../engine/rewardEscalation';
import { PROGRAM, getTodayKey } from '../../data/program';
import XPBar from './XPBar';
import StatRadar from './StatRadar';

export default function Dashboard({ onStartWorkout }) {
  const { state } = useGame();
  const progress = getXPProgress(state.player.totalXP);
  const multiplier = getStreakMultiplier(state.streak.current);
  const nextTier = getNextStreakTier(state.streak.current);
  const todayKey = getTodayKey();
  const todayProgram = PROGRAM[todayKey];
  const todayDate = new Date().toISOString().split('T')[0];
  const alreadyDone = !!state.workouts[todayDate];

  return (
    <div>
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 4 }}>
          {state.player.title} — Niveau {progress.level}
        </div>
        <XPBar current={progress.current} needed={progress.needed} percent={progress.percent} />
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
          {progress.current} / {progress.needed} XP
          {isNearLevelUp(progress.percent) && (
            <span style={{ color: 'var(--accent-gold)', marginLeft: 8 }}>Presque!</span>
          )}
        </div>
      </div>

      <div className="card">
        <div className="section-title">Stats</div>
        <StatRadar stats={state.stats} />
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-label" style={{ color: 'var(--accent-red)' }}>Force</div>
            <div className="stat-value">{state.stats.force}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-label" style={{ color: 'var(--accent-cyan)' }}>Équilibre</div>
            <div className="stat-value">{state.stats.equilibre}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-label" style={{ color: 'var(--accent-green)' }}>Endurance</div>
            <div className="stat-value">{state.stats.endurance}</div>
          </div>
        </div>
      </div>

      {state.streak.current > 0 && (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Streak</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--accent-orange)' }}>
              <span className="streak-flame">🔥</span> {state.streak.current} jours
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Multiplicateur</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-gold)' }}>
              ×{multiplier.toFixed(2)}
            </div>
            {nextTier && isNearStreakTier(state.streak.current, nextTier) && (
              <div style={{ fontSize: 11, color: 'var(--accent-gold)', marginTop: 2 }}>
                ×{nextTier.multiplier} dans {nextTier.days - state.streak.current}j!
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>{todayProgram.icon}</span>
          <div>
            <div style={{ fontWeight: 600 }}>{todayProgram.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {todayProgram.exercises.length} exercices
              {multiplier > 1 && <span style={{ color: 'var(--accent-gold)' }}> · ×{multiplier.toFixed(1)} XP</span>}
            </div>
          </div>
        </div>
        {alreadyDone ? (
          <div style={{ textAlign: 'center', padding: 12, color: 'var(--accent-green)', fontWeight: 600 }}>
            ✓ Complété aujourd'hui
          </div>
        ) : todayProgram.exercises.length > 0 ? (
          <button className="btn-primary" onClick={onStartWorkout}>
            Commencer la quête
          </button>
        ) : (
          <div style={{ textAlign: 'center', padding: 12, color: 'var(--text-secondary)' }}>
            Jour de repos — récupère bien
          </div>
        )}
      </div>
    </div>
  );
}

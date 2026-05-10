import { useGame } from '../../context/GameContext';
import { SKILL_TREE } from '../../data/skillTree';
import { getXPProgress } from '../../engine/levelSystem';

export default function SkillTree({ branch }) {
  const { state, dispatch } = useGame();
  const tree = SKILL_TREE[branch];
  const progress = getXPProgress(state.player.totalXP);

  const canUnlock = (node) => {
    if (state.skills.unlocked.includes(node.id)) return false;
    if (progress.level < node.level) return false;
    return node.requires.every(req => state.skills.unlocked.includes(req));
  };

  const handleUnlock = (node) => {
    if (canUnlock(node)) {
      dispatch({ type: 'UNLOCK_SKILL', payload: node.id });
    }
  };

  return (
    <div>
      {tree.nodes.map(node => {
        const unlocked = state.skills.unlocked.includes(node.id);
        const available = canUnlock(node);
        const status = unlocked ? 'unlocked' : available ? 'available' : 'locked';

        return (
          <div
            key={node.id}
            className={`skill-node ${status}`}
            onClick={() => handleUnlock(node)}
            style={{ cursor: available ? 'pointer' : 'default' }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: unlocked ? tree.color : available ? `${tree.color}40` : 'var(--bg-input)',
              border: `2px solid ${unlocked || available ? tree.color : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              flexShrink: 0,
            }}>
              {unlocked ? '✓' : available ? '!' : '🔒'}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{node.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
                {unlocked ? 'Débloqué' : `Niveau ${node.level} requis`}
                {node.requires.length > 0 && !unlocked && (
                  <span> · Prérequis: {node.requires.length}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

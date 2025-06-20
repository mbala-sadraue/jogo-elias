import { Player, PlayerStats } from "../types";
import { useLanguage } from "../hooks/useLanguage";

interface PlayerScoreCardProps {
  player: Player;
  stats: PlayerStats;
  totalPoints: number;
  showDetails?: boolean;
}

export default function PlayerScoreCard({ player, stats, totalPoints, showDetails = false }: PlayerScoreCardProps) {
  const { t } = useLanguage();
  
  // Calcular a porcentagem de contribuição para pontuação total
  const contributionPercentage = totalPoints > 0 
    ? Math.round((stats.points / totalPoints) * 100) 
    : 0;
  
  // Calcular o ranking entre jogadores com base na pontuação
  // No momento, não podemos fazer ranking real porque não conhecemos os outros jogadores
  // Então só mostramos a pontuação e conquistas
  
  const getPlayerAvatar = () => {
    if (player.avatar) {
      return (
        <div 
          className="w-8 h-8 rounded-full text-center flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: player.avatar }}
        >
          {player.name.substring(0, 1).toUpperCase()}
        </div>
      );
    }
    
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-center flex items-center justify-center text-white text-sm font-semibold">
        {player.name.substring(0, 1).toUpperCase()}
      </div>
    );
  };
  
  // Renderizar os ícones das conquistas
  const renderAchievements = () => {
    if (!stats.achievements || stats.achievements.length === 0) {
      return (
        <div className="flex items-center justify-center py-2 glass-card bg-opacity-30 rounded-lg">
          <div className="text-xs text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {t('player.noAchievements')}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {stats.achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`p-2 rounded-lg flex flex-col items-center justify-center ${
              achievement.isUnlocked 
                ? 'bg-gradient-to-br from-amber-400/30 to-amber-600/30 border border-amber-500/50' 
                : 'bg-gray-800/50 border border-gray-700'
            } transition-all hover:scale-105 cursor-help`}
            title={achievement.isUnlocked ? achievement.title : t('player.lockedAchievement')}
          >
            <span className="text-lg mb-1">{achievement.icon}</span>
            <span className="text-xs text-center truncate w-full">
              {achievement.isUnlocked 
                ? <span className="text-amber-300">{achievement.title}</span> 
                : <span className="text-gray-500">???</span>
              }
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="glass-card p-3 rounded-lg mb-2">
      <div className="flex items-center gap-3">
        {getPlayerAvatar()}
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h4 className="text-white font-medium truncate">{player.name}</h4>
            <div className="text-xs font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              {stats.points} {t('player.points')}
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full h-1.5 bg-gray-700 rounded-full mt-1.5 mb-2 overflow-hidden relative">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 relative" 
              style={{ width: `${contributionPercentage}%` }}
            >
              <div className="absolute inset-0 sheen-effect" />
            </div>
          </div>
          
          {/* Stats básicos */}
          <div className="flex text-xs text-gray-400 justify-between">
            <div>{stats.questionsAnswered} {t('player.questions')}</div>
            <div>{stats.challengesCompleted} {t('player.challenges')}</div>
            {stats.connectionLevel && (
              <div>{t('player.connection')}: {stats.connectionLevel}/10</div>
            )}
          </div>
          
          {/* Conquistas, apenas quando showDetails é true */}
          {showDetails && (
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1">{t('player.achievements')}:</div>
              {renderAchievements()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
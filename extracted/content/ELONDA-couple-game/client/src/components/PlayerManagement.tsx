import { useState } from "react";
import { Player, PlayerPreference } from "../types";
import { useLanguage } from "../hooks/useLanguage";

interface PlayerManagementProps {
  players: Player[];
  playerCount: number;
  onAddPlayer: () => void;
  onRemovePlayer: () => void;
  onUpdatePlayer: (id: number, name: string) => void;
  onUpdatePlayerPreferences?: (id: number, preferences: PlayerPreference) => void;
  onUpdatePlayerAvatar?: (id: number, avatar: string) => void;
}

// Cores vibrantes para os jogadores
const PLAYER_COLORS = [
  '#FF5252', // Vermelho
  '#2196F3', // Azul
  '#4CAF50', // Verde
  '#FFC107', // Amarelo
  '#9C27B0', // Roxo
  '#FF9800', // Laranja
  '#00BCD4', // Ciano
  '#E91E63', // Rosa
  '#3F51B5', // Indigo
  '#8BC34A', // Verde claro
  '#795548', // Marrom
  '#607D8B'  // Azul acinzentado
];

export default function PlayerManagement({
  players,
  playerCount,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayer,
  onUpdatePlayerPreferences,
  onUpdatePlayerAvatar
}: PlayerManagementProps) {
  const { t } = useLanguage();
  const [openPreferencesId, setOpenPreferencesId] = useState<number | null>(null);
  


  const togglePreferences = (playerId: number) => {
    setOpenPreferencesId(openPreferencesId === playerId ? null : playerId);
  };

  const updatePreference = (playerId: number, field: keyof PlayerPreference, value: boolean | string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const currentPreferences = player.preferences || {
      noFood: false,
      noAlcohol: false,
      noOutdoor: false,
      noClothing: false,
      customLimits: ""
    };

    const newPreferences = {
      ...currentPreferences,
      [field]: value
    };

    onUpdatePlayerPreferences?.(playerId, newPreferences);
  };

  return (
    <section className="mb-6 md:mb-8" data-section="players">
      <h2 className="mobile-heading font-semibold mb-3 md:mb-4 border-b border-gray-700 pb-2 flex items-center justify-between">
        <div>
          <i className="fas fa-users mr-2 text-secondary"></i>
          {t('players.title')}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className={`w-7 h-7 md:w-8 md:h-8 ${playerCount <= 2 ? 'bg-gray-800 cursor-not-allowed' : 'bg-dark-900 hover:bg-red-600'} text-white rounded-full flex items-center justify-center`}
            onClick={onRemovePlayer}
            disabled={playerCount <= 2}
          >
            <i className="fas fa-minus text-sm md:text-base"></i>
          </button>
          <span className="text-base md:text-lg font-bold">{playerCount}</span>
          <button 
            className={`w-7 h-7 md:w-8 md:h-8 ${playerCount >= 10 ? 'bg-gray-800 cursor-not-allowed' : 'bg-dark-900 hover:bg-green-600'} text-white rounded-full flex items-center justify-center`}
            onClick={onAddPlayer}
            disabled={playerCount >= 10}
          >
            <i className="fas fa-plus text-sm md:text-base"></i>
          </button>
        </div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {players.map((player) => (
          <div 
            key={player.id}
            className="bg-dark-900 rounded-lg p-3 md:p-4"
          >
            <div className="flex items-center space-x-2 md:space-x-4 mb-2">
              <div 
                className={`avatar-placeholder w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer hover:opacity-90 active:scale-95`}
                style={{ 
                  backgroundColor: player.avatar || PLAYER_COLORS[(player.id - 1) % PLAYER_COLORS.length],
                  boxShadow: `0 0 10px ${player.avatar || PLAYER_COLORS[(player.id - 1) % PLAYER_COLORS.length]}`
                }}
                onClick={() => {
                  if (onUpdatePlayerAvatar) {
                    const currentIndex = player.avatar ? PLAYER_COLORS.indexOf(player.avatar) : (player.id - 1) % PLAYER_COLORS.length;
                    const nextIndex = (currentIndex + 1) % PLAYER_COLORS.length;
                    onUpdatePlayerAvatar(player.id, PLAYER_COLORS[nextIndex]);
                  }
                }}
              >
                <i className="fas fa-user text-white text-sm md:text-base drop-shadow-md"></i>
              </div>
              <div className="flex-1">
                <input 
                  type="text"
                  value={player.name}
                  onChange={(e) => onUpdatePlayer(player.id, e.target.value)}
                  placeholder={t('players.nameInputPlaceholder', { number: player.id })}
                  className="w-full bg-dark-100 border border-gray-700 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-sm md:text-base text-white focus:border-primary focus:outline-none"
                />
              </div>
              <button 
                onClick={() => togglePreferences(player.id)}
                className="px-2 py-1 md:px-3 md:py-1 bg-dark-100 hover:bg-dark-100/80 rounded-lg text-xs md:text-sm flex items-center"
              >
                <i className={`fas fa-cog mr-1 ${openPreferencesId === player.id ? 'text-primary' : 'text-gray-400'}`}></i>
                <span>{t('players.limitsButton')}</span>
              </button>
            </div>

            {openPreferencesId === player.id && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <h3 className="text-xs md:text-sm font-medium mb-2 text-gray-300">{t('players.limitsTitle')}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`no-food-${player.id}`}
                      checked={player.preferences?.noFood || false}
                      onChange={(e) => updatePreference(player.id, 'noFood', e.target.checked)}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={`no-food-${player.id}`} className="text-xs md:text-sm">{t('players.noFood')}</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`no-alcohol-${player.id}`}
                      checked={player.preferences?.noAlcohol || false}
                      onChange={(e) => updatePreference(player.id, 'noAlcohol', e.target.checked)}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={`no-alcohol-${player.id}`} className="text-xs md:text-sm">{t('players.noAlcohol')}</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`no-outdoor-${player.id}`}
                      checked={player.preferences?.noOutdoor || false}
                      onChange={(e) => updatePreference(player.id, 'noOutdoor', e.target.checked)}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={`no-outdoor-${player.id}`} className="text-xs md:text-sm">{t('players.noOutdoor')}</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`no-clothing-${player.id}`}
                      checked={player.preferences?.noClothing || false}
                      onChange={(e) => updatePreference(player.id, 'noClothing', e.target.checked)}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={`no-clothing-${player.id}`} className="text-xs md:text-sm">{t('players.noClothing')}</label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor={`custom-limits-${player.id}`} className="text-xs md:text-sm block mb-1">{t('players.otherLimits')}</label>
                  <textarea
                    id={`custom-limits-${player.id}`}
                    value={player.preferences?.customLimits || ''}
                    onChange={(e) => updatePreference(player.id, 'customLimits', e.target.value)}
                    placeholder={t('players.limitsPlaceholder')}
                    className="w-full bg-dark-100 border border-gray-700 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-white h-16 md:h-20 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

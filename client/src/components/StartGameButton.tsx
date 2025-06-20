import { IntensityLevel, RelationshipType } from "../types";

interface StartGameButtonProps {
  isReadyToStart: boolean;
  onStartGame: () => void;
  intensity: IntensityLevel;
  relationshipType: RelationshipType;
}

export default function StartGameButton({
  isReadyToStart,
  onStartGame,
  intensity,
  relationshipType
}: StartGameButtonProps) {
  // Variável removida pois o conteúdo está diretamente no JSX

  return (
    <div className="text-center mt-6 md:mt-10">
      <button 
        className={`start-game-btn ${
          isReadyToStart
            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 cursor-pointer shiny-button shadow-lg"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
        } py-3 md:py-4 px-6 md:px-10 rounded-full text-base md:text-lg font-bold uppercase transition-all transform hover:scale-105 active:scale-95`}
        onClick={onStartGame}
        disabled={!isReadyToStart}
      >
        Iniciar Jogo
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </button>
      <p className={`text-xs md:text-sm mt-2 md:mt-3 ${isReadyToStart ? "text-green-400" : "text-gray-400"} max-w-xs md:max-w-lg mx-auto`}>
        {isReadyToStart 
          ? "✓ Tudo pronto! Clique para começar a diversão" 
          : "⚠️ Selecione um nível de intensidade e tipo de relacionamento para continuar"}
      </p>
    </div>
  );
}

import { GameOptions as GameOptionsType } from "../types";

interface GameOptionsProps {
  options: GameOptionsType;
  onToggleOption: (option: keyof GameOptionsType, value: boolean) => void;
}

const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} className="sr-only peer" />
      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );
};


export default function GameOptions({ options, onToggleOption }: GameOptionsProps) {
  return (
    <section className="mb-6 md:mb-8" data-section="game-options">
      <h2 className="mobile-heading font-semibold mb-3 md:mb-4 border-b border-gray-700 pb-2 flex items-center">
        <i className="fas fa-cog mr-2 text-secondary"></i>
        Opções de Jogo
      </h2>

      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Modo no Escuro</h3>
            <p className="text-xs md:text-sm text-gray-400">Desafios aleatórios sem aviso prévio</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.darkMode}
              onChange={(e) => onToggleOption('darkMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Modo Competitivo</h3>
            <p className="text-xs md:text-sm text-gray-400">Prendas sensuais para quem desistir</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.competitiveMode}
              onChange={(e) => onToggleOption('competitiveMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Temporizador</h3>
            <p className="text-xs md:text-sm text-gray-400">30 segundos para responder</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.timer}
              onChange={(e) => onToggleOption('timer', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        {/* Novas opções */}
        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Modo Dinâmico 🌶️</h3>
            <p className="text-xs md:text-sm text-gray-400">Intensidade aumenta com o tempo</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.dynamicIntensity}
              onChange={(e) => onToggleOption('dynamicIntensity', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Desafio em Dupla 👥</h3>
            <p className="text-xs md:text-sm text-gray-400">Dois jogadores selecionados aleatoriamente</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.challengeInPairs}
              onChange={(e) => onToggleOption('challengeInPairs', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Pergunta Proibida 🔞</h3>
            <p className="text-xs md:text-sm text-gray-400">Versões extremas de algumas perguntas</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.forbiddenQuestion}
              onChange={(e) => onToggleOption('forbiddenQuestion', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Escolher Tipo 🎮</h3>
            <p className="text-xs md:text-sm text-gray-400">Escolher entre pergunta ou desafio</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.allowChooseType}
              onChange={(e) => onToggleOption('allowChooseType', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="pr-4">
            <h3 className="text-sm md:text-base font-medium">Música de Fundo 🎵</h3>
            <p className="text-xs md:text-sm text-gray-400">Trilha sonora sensual</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              checked={options.musicEnabled}
              onChange={(e) => onToggleOption('musicEnabled', e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-14 h-8 bg-dark-900 peer-focus:outline-none rounded-full peer 
                            peer-checked:after:translate-x-7 peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-6 after:w-6 after:transition-all peer-checked:bg-primary
                            active:scale-95 transition-transform touch-manipulation"></div>
          </label>
        </div>

      </div>
    </section>
  );
}
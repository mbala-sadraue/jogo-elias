import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Plus, Trash2, Users, Sparkles, Flame, Heart, MessageCircle, Settings, Thermometer, Timer, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

// Importamos os tipos do jogador definidos em types/player.ts
import { Player, PlayerPreference, AvatarColor, SexualOrientation } from "@/types/player";

// Cores disponíveis para avatares
const AVATAR_COLORS: AvatarColor[] = ["red", "blue", "green", "purple", "orange", "pink", "teal", "amber"];

// Mapeamento das cores para classes do Tailwind
const COLOR_CLASSES = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500"
};

export default function PlayerSetupPage() {
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [intensityLevel, setIntensityLevel] = useState<number>(1);
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);
  const [currentPlayerPreferences, setCurrentPlayerPreferences] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Jogador 1", avatar: "red" },
    { id: 2, name: "Jogador 2", avatar: "blue" }
  ]);
  const [gameOptions, setGameOptions] = useState({
    timerEnabled: false,
    allowChooseType: true,
    musicEnabled: false,
    competitiveMode: false
  });

  // Converte o nível de intensidade em texto
  const getIntensityName = (level: number): string => {
    switch (level) {
      case 1: return "Suave";
      case 2: return "Picante";
      case 3: return "Selvagem";
      case 4: return "Extremo";
      default: return "Suave";
    }
  };

  // Função para atualizar o nome do jogador
  const handlePlayerNameChange = (id: number, value: string) => {
    setPlayers(players.map(player => 
      player.id === id ? {...player, name: value} : player
    ));
  };

  // Função para adicionar um jogador
  const addPlayer = () => {
    if (players.length < 8) {
      const newPlayerId = Math.max(...players.map(p => p.id)) + 1;
      const unusedColors = AVATAR_COLORS.filter(color => 
        !players.map(p => p.avatar).includes(color)
      );
      const randomColor = unusedColors[Math.floor(Math.random() * unusedColors.length)] || "red";
      
      setPlayers([...players, { 
        id: newPlayerId, 
        name: `Jogador ${newPlayerId}`, 
        avatar: randomColor
      }]);
    }
  };

  // Função para remover um jogador
  const removePlayer = (id: number) => {
    if (players.length > 2) {
      setPlayers(players.filter(player => player.id !== id));
    }
  };

  // Função para alternar a cor do avatar do jogador
  const cyclePlayerAvatar = (id: number) => {
    setPlayers(players.map(player => {
      if (player.id === id) {
        const currentIndex = AVATAR_COLORS.indexOf(player.avatar);
        const nextIndex = (currentIndex + 1) % AVATAR_COLORS.length;
        return {...player, avatar: AVATAR_COLORS[nextIndex]};
      }
      return player;
    }));
  };

  // Abre o modal de preferências para um jogador específico
  const openPreferences = (id: number) => {
    setCurrentPlayerPreferences(id);
    setShowPreferencesModal(true);
  };

  // Salva as preferências do jogador e orientação sexual
  const savePlayerPreferences = (preferences: PlayerPreference, orientation?: SexualOrientation) => {
    if (currentPlayerPreferences) {
      setPlayers(players.map(player => 
        player.id === currentPlayerPreferences 
          ? {...player, preferences, orientation} 
          : player
      ));
      setShowPreferencesModal(false);
      setCurrentPlayerPreferences(null);
      
      toast({
        title: "Preferências salvas",
        description: "As preferências do jogador foram atualizadas com sucesso.",
      });
    }
  };

  // Inicia o jogo
  const handleStartGame = () => {
    if (players.length < 2 || players.some(p => !p.name.trim())) {
      toast({
        title: "Não é possível iniciar",
        description: "É necessário pelo menos 2 jogadores com nomes válidos.",
        variant: "destructive"
      });
      return;
    }

    // Converte a intensidade numérica para o formato do jogo
    const intensityMap = ["suave", "picante", "selvagem", "extremo"];
    const intensity = intensityMap[intensityLevel-1] || "suave";
    
    // Armazena os dados do jogo
    // Verifica se todos os jogadores têm orientação sexual definida
    // Se não tiver, define como "hetero" por padrão
    const playersWithOrientation = players.map(p => ({
      ...p,
      orientation: p.orientation || "hetero"
    }));
    
    sessionStorage.setItem("players", JSON.stringify(playersWithOrientation.map(p => p.name)));
    sessionStorage.setItem("fullPlayers", JSON.stringify(playersWithOrientation));
    sessionStorage.setItem("gameOptions", JSON.stringify({
      ...gameOptions,
      intensity
    }));
    
    navigate("/home");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-primary to-primary-dark pb-12"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      {/* Cabeçalho */}
      <motion.div 
        className="p-6 text-center"
        variants={slideUp}
      >
        <h1 className="text-white text-3xl font-bold mb-2">
          ELONDA
        </h1>
        <p className="text-white/80">
          Jogo para amigos e casais
        </p>
      </motion.div>

      <div className="px-6 max-w-md mx-auto">
        {/* Seção de jogadores */}
        <motion.div 
          className="bg-white/10 rounded-xl p-5 backdrop-blur-sm mb-6"
          variants={slideUp}
        >
          <h2 className="text-white font-bold text-lg mb-4 flex items-center justify-between">
            <span className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Jogadores
            </span>
            <span className="text-sm font-normal">
              {players.length} / 8
            </span>
          </h2>
          
          <motion.div 
            className="space-y-3"
            variants={staggerContainer}
          >
            {players.map((player) => (
              <motion.div 
                key={player.id} 
                className="flex items-center space-x-2"
                variants={slideUp}
              >
                <button
                  onClick={() => cyclePlayerAvatar(player.id)}
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${COLOR_CLASSES[player.avatar]}`}
                >
                  {player.name[0]?.toUpperCase() || "?"}
                </button>
                
                <Input
                  placeholder="Nome do jogador"
                  value={player.name}
                  onChange={(e) => handlePlayerNameChange(player.id, e.target.value)}
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                />
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openPreferences(player.id)}
                    className="bg-white/20 hover:bg-white/30 text-white h-9 w-9"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  
                  {players.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePlayer(player.id)}
                      className="bg-white/20 hover:bg-rose-500/50 text-white h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {players.length < 8 && (
            <Button
              variant="outline"
              className="mt-4 w-full text-white border-white/20 hover:bg-white/20"
              onClick={addPlayer}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Jogador
            </Button>
          )}
        </motion.div>
        
        {/* Configurações de jogo */}
        <motion.div
          className="bg-white/10 rounded-xl p-5 backdrop-blur-sm mb-6"
          variants={slideUp}
        >
          <h2 className="text-white font-bold text-lg mb-4 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Configurações
          </h2>
          
          <div className="space-y-5">
            {/* Nível de intensidade */}
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-white flex items-center">
                  <Flame className="mr-2 h-4 w-4" />
                  Intensidade
                </Label>
                <span className={`px-2 py-0.5 rounded text-xs 
                  ${intensityLevel === 1 ? 'bg-blue-500/20 text-blue-200' : 
                    intensityLevel === 2 ? 'bg-orange-500/20 text-orange-200' : 
                    intensityLevel === 3 ? 'bg-red-500/20 text-red-200' : 
                    'bg-purple-500/20 text-purple-200'}`}>
                  {getIntensityName(intensityLevel)}
                </span>
              </div>
              
              <Slider
                defaultValue={[1]}
                min={1}
                max={4}
                step={1}
                onValueChange={(value) => setIntensityLevel(value[0])}
                className="w-full"
              />
              
              <div className="flex justify-between mt-1 text-xs text-white/60">
                <span>Suave</span>
                <span>Picante</span>
                <span>Selvagem</span>
                <span>Extremo</span>
              </div>
            </div>
            
            {/* Outras opções */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white flex items-center">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Escolher tipo (pergunta/desafio)
                </Label>
                <Switch
                  checked={gameOptions.allowChooseType}
                  onCheckedChange={(checked) => setGameOptions({...gameOptions, allowChooseType: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-white flex items-center">
                  <Timer className="mr-2 h-4 w-4" />
                  Timer para desafios
                </Label>
                <Switch
                  checked={gameOptions.timerEnabled}
                  onCheckedChange={(checked) => setGameOptions({...gameOptions, timerEnabled: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-white flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Modo competitivo
                </Label>
                <Switch
                  checked={gameOptions.competitiveMode}
                  onCheckedChange={(checked) => setGameOptions({...gameOptions, competitiveMode: checked})}
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Botão de iniciar */}
        <motion.div variants={slideUp}>
          <Button
            className="w-full py-6 mb-4 bg-white text-primary hover:bg-white/90 font-semibold text-lg flex items-center justify-center"
            onClick={handleStartGame}
          >
            <Flame className="mr-2 h-5 w-5" />
            Começar o Jogo
          </Button>
          
          <p className="text-white/70 text-center text-sm mb-12">
            O jogo é destinado a pessoas maiores de 18 anos
          </p>
        </motion.div>
      </div>
      
      {/* Modal de preferências */}
      {showPreferencesModal && currentPlayerPreferences && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              Preferências do Jogador
            </h2>
            
            <div className="space-y-4">
              {/* Formulário de preferências */}
              <PreferencesForm 
                player={players.find(p => p.id === currentPlayerPreferences)!}
                onSave={savePlayerPreferences}
                onCancel={() => setShowPreferencesModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Componente para edição de preferências
function PreferencesForm({ 
  player, 
  onSave, 
  onCancel 
}: { 
  player: Player, 
  onSave: (prefs: PlayerPreference, orientation?: SexualOrientation) => void, 
  onCancel: () => void 
}) {
  const [preferences, setPreferences] = useState<PlayerPreference>(
    player.preferences || {
      noAlcohol: false,
      noFood: false,
      noClothing: false,
      noOutdoor: false,
      customLimits: ""
    }
  );
  
  const [orientation, setOrientation] = useState<SexualOrientation>(
    player.orientation || "hetero"
  );
  
  const updatePreference = (key: keyof PlayerPreference, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  return (
    <div>
      <p className="text-white/80 mb-4">
        Configure as preferências e limites para {player.name}
      </p>
      
      {/* Orientação Sexual */}
      <div className="mb-6">
        <Label className="text-white mb-2 block flex items-center">
          <span className="mr-2">❤️</span>
          Orientação Sexual
        </Label>
        <Select
          defaultValue={orientation}
          onValueChange={(value) => setOrientation(value as SexualOrientation)}
        >
          <SelectTrigger className="bg-white/20 border-white/20 text-white">
            <SelectValue placeholder="Selecione uma orientação" />
          </SelectTrigger>
          <SelectContent className="bg-primary border-white/20">
            <SelectItem value="hetero" className="text-white">Heterossexual</SelectItem>
            <SelectItem value="homo" className="text-white">Homossexual</SelectItem>
            <SelectItem value="bi" className="text-white">Bissexual</SelectItem>
            <SelectItem value="outro" className="text-white">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <Label className="text-white flex items-center">
            <span className="mr-2">🍸</span>
            Sem álcool
          </Label>
          <Switch
            checked={preferences.noAlcohol}
            onCheckedChange={(checked) => updatePreference('noAlcohol', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-white flex items-center">
            <span className="mr-2">🍕</span>
            Sem comida
          </Label>
          <Switch
            checked={preferences.noFood}
            onCheckedChange={(checked) => updatePreference('noFood', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-white flex items-center">
            <span className="mr-2">👕</span>
            Sem remoção de roupa
          </Label>
          <Switch
            checked={preferences.noClothing}
            onCheckedChange={(checked) => updatePreference('noClothing', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-white flex items-center">
            <span className="mr-2">🌳</span>
            Sem atividades externas
          </Label>
          <Switch
            checked={preferences.noOutdoor}
            onCheckedChange={(checked) => updatePreference('noOutdoor', checked)}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <Label className="text-white mb-2 block">
          Outros limites ou restrições
        </Label>
        <textarea
          value={preferences.customLimits}
          onChange={(e) => updatePreference('customLimits', e.target.value)}
          className="w-full h-20 bg-white/20 border-white/20 rounded-lg p-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Descreva qualquer outra restrição ou limite que gostaria de estabelecer..."
        />
      </div>
      
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 text-white border-white/20 hover:bg-white/20"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSave(preferences, orientation)}
          className="flex-1 bg-white text-primary hover:bg-white/90"
        >
          Salvar Preferências
        </Button>
      </div>
    </div>
  );
}
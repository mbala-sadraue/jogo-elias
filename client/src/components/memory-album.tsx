import { useState } from 'react';
import { Camera, Image, X, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

export interface Memory {
  id: string;
  title: string;
  description?: string;
  image?: string;
  date: Date;
  players?: string[];
}

export interface Player {
  id: number;
  name: string;
  avatar?: string;
}

interface MemoryAlbumProps {
  memories: Memory[];
  players?: Player[];
  onAddMemory?: (memoryData: Omit<Memory, 'id' | 'date'>) => void;
  onDeleteMemory?: (id: string) => void;
}

export default function MemoryAlbum({
  memories = [],
  players = [],
  onAddMemory,
  onDeleteMemory
}: MemoryAlbumProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [currentMemory, setCurrentMemory] = useState<number | null>(null);
  const [newMemory, setNewMemory] = useState<{
    title: string;
    description?: string;
    image?: string;
    players?: number[];
  }>({
    title: '',
    description: '',
    players: []
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMemory(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddMemory = () => {
    if (newMemory.title && onAddMemory) {
      const participatingPlayers = players
        .filter(p => newMemory.players?.includes(p.id))
        .map(p => p.name);
      
      onAddMemory({
        title: newMemory.title,
        description: newMemory.description,
        image: newMemory.image,
        players: participatingPlayers
      });
      
      setNewMemory({
        title: '',
        description: '',
        players: []
      });
      
      setIsAdding(false);
    }
  };
  
  const handleTogglePlayer = (playerId: number) => {
    setNewMemory(prev => {
      const players = prev.players || [];
      if (players.includes(playerId)) {
        return {
          ...prev,
          players: players.filter(id => id !== playerId)
        };
      } else {
        return {
          ...prev,
          players: [...players, playerId]
        };
      }
    });
  };
  
  const handleViewMemory = (index: number) => {
    setCurrentMemory(index);
  };
  
  const handleCloseMemoryView = () => {
    setCurrentMemory(null);
  };
  
  const handleDeleteMemory = (id: string) => {
    if (onDeleteMemory) {
      onDeleteMemory(id);
    }
    setCurrentMemory(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Álbum de Memórias</h2>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Form to add new memory */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-800 rounded-xl overflow-hidden mb-6"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Nova Memória</h3>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-400"
                  onClick={() => setIsAdding(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Título
                  </label>
                  <Input
                    id="title"
                    value={newMemory.title}
                    onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Dê um título para esta memória"
                    className="bg-dark-900 border-dark-700"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    value={newMemory.description || ''}
                    onChange={(e) => setNewMemory(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva este momento especial"
                    className="bg-dark-900 border-dark-700 h-24"
                  />
                </div>
                
                {players.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Participantes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {players.map(player => (
                        <button
                          key={player.id}
                          type="button"
                          onClick={() => handleTogglePlayer(player.id)}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            newMemory.players?.includes(player.id)
                              ? 'bg-purple-600 text-white'
                              : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                          }`}
                        >
                          {player.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Imagem
                  </label>
                  
                  {newMemory.image ? (
                    <div className="relative rounded-lg overflow-hidden h-48">
                      <img
                        src={newMemory.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewMemory(prev => ({ ...prev, image: undefined }))}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="bg-dark-900 border border-dashed border-dark-700 rounded-lg p-4 text-center">
                      <label htmlFor="memory-image" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Camera className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-400">Clique para adicionar uma imagem</span>
                        </div>
                        <input
                          id="memory-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => setIsAdding(false)}
                    className="mr-2"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddMemory}
                    disabled={!newMemory.title}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Salvar Memória
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Memory grid */}
      {memories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className="bg-dark-800 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleViewMemory(index)}
            >
              {memory.image ? (
                <div className="h-32 md:h-40 overflow-hidden">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-32 md:h-40 bg-dark-700 flex items-center justify-center">
                  <Image className="h-10 w-10 text-gray-500" />
                </div>
              )}
              <div className="p-3">
                <h3 className="font-medium text-white truncate">{memory.title}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(memory.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-dark-800/50 rounded-xl">
          <Image className="h-12 w-12 mx-auto text-gray-500 mb-3" />
          <h3 className="text-lg font-medium text-white mb-1">Nenhuma memória ainda</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Adicione memórias de momentos especiais que você viveu durante o jogo.
          </p>
          <Button
            onClick={() => setIsAdding(true)}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Adicionar Primeira Memória
          </Button>
        </div>
      )}
      
      {/* Memory viewer */}
      <AnimatePresence>
        {currentMemory !== null && memories[currentMemory] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseMemoryView}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 rounded-xl overflow-hidden max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {memories[currentMemory].image && (
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={memories[currentMemory].image}
                    alt={memories[currentMemory].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {memories[currentMemory].title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date(memories[currentMemory].date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300"
                    onClick={handleCloseMemoryView}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {memories[currentMemory].description && (
                  <p className="mt-4 text-gray-300 leading-relaxed">
                    {memories[currentMemory].description}
                  </p>
                )}
                
                {memories[currentMemory].players && memories[currentMemory].players.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Participantes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {memories[currentMemory].players.map((player, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-0.5 bg-purple-600/20 text-purple-400 rounded-full text-xs"
                        >
                          {player}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {onDeleteMemory && (
                  <div className="mt-5 pt-4 border-t border-dark-700 flex justify-end">
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteMemory(memories[currentMemory].id)}
                      className="text-xs flex items-center"
                      size="sm"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      Excluir memória
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
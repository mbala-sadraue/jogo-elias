import React, { useState } from 'react';
import { Memory, Player } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

interface MemoryAlbumProps {
  memories: Memory[];
  players: Player[];
  onAddMemory?: (memory: Omit<Memory, 'id' | 'date'>) => void;
  onDeleteMemory?: (memoryId: string) => void;
}

export default function MemoryAlbum({ memories, players, onAddMemory }: MemoryAlbumProps) {
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newMemoryData, setNewMemoryData] = useState<{
    title: string;
    description: string;
    playerIds: number[];
    mood: 'romantic' | 'funny' | 'exciting' | 'emotional';
    imageUrl?: string;
  }>({
    title: '',
    description: '',
    playerIds: [],
    mood: 'romantic'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMemoryData(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = () => {
    if (onAddMemory && newMemoryData.title && newMemoryData.description) {
      onAddMemory(newMemoryData);
      setNewMemoryData({
        title: '',
        description: '',
        playerIds: [],
        mood: 'romantic'
      });
      setShowAddMemory(false);
    }
  };

  const getMoodEmoji = (mood: Memory['mood']) => {
    switch (mood) {
      case 'romantic': return '❤️';
      case 'funny': return '😄';
      case 'exciting': return '🔥';
      case 'emotional': return '✨';
      default: return '❤️';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {!showAddMemory && (
        <Button 
          onClick={() => setShowAddMemory(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
        >
          Criar Nova Memória
        </Button>
      )}

      {showAddMemory && (
        <Card className="p-4 space-y-4 bg-gray-800">
          <Input
            placeholder="Título da Memória"
            value={newMemoryData.title}
            onChange={e => setNewMemoryData(prev => ({ ...prev, title: e.target.value }))}
          />

          <Textarea
            placeholder="Descreva este momento especial..."
            value={newMemoryData.description}
            onChange={e => setNewMemoryData(prev => ({ ...prev, description: e.target.value }))}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adicionar Foto
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Participantes
            </label>
            {players.map(player => (
              <div key={player.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newMemoryData.playerIds.includes(player.id)}
                  onChange={e => {
                    if (e.target.checked) {
                      setNewMemoryData(prev => ({
                        ...prev,
                        playerIds: [...prev.playerIds, player.id]
                      }));
                    } else {
                      setNewMemoryData(prev => ({
                        ...prev,
                        playerIds: prev.playerIds.filter(id => id !== player.id)
                      }));
                    }
                  }}
                />
                <span>{player.name}</span>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Clima
            </label>
            <select
              value={newMemoryData.mood}
              onChange={e => setNewMemoryData(prev => ({ 
                ...prev, 
                mood: e.target.value as Memory['mood']
              }))}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="romantic">Romântico ❤️</option>
              <option value="funny">Divertido 😄</option>
              <option value="exciting">Excitante 🔥</option>
              <option value="emotional">Emocional ✨</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddMemory(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddMemory}
              disabled={!newMemoryData.title || !newMemoryData.description}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              Salvar Memória
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {memories.map((memory) => (
          <Card 
            key={memory.id}
            className="p-4 bg-gray-800 hover:shadow-lg transition-all duration-300"
          >
            {memory.imageUrl && (
              <img 
                src={memory.imageUrl} 
                alt={memory.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getMoodEmoji(memory.mood)}</span>
              <h3 className="font-semibold text-white">{memory.title}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-2">{memory.description}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="text-gray-400 text-xs">
                {new Date(memory.date).toLocaleDateString()}
              </div>
              <button
                onClick={() => onDeleteMemory?.(memory.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Excluir memória"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
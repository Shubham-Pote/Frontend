import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AIInput } from '@/components/ui/ai-input';
import { ToastContainer } from '@/components/ui/toast-notification';
import VRMViewer from '@/components/VRMViewer';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { characterSocketService } from '@/services/characterSocket.service';
import type { Character, Message } from '@/types/character';

interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export default function CharacterChat() {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [character, setCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toast function
  const toast = ({ title, description, variant = 'default' }: { title: string; description?: string; variant?: 'default' | 'destructive' }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, description, variant }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Character data
  const characterData = {
    maria: {
      _id: 'maria',
      name: 'María González',
      age: 28,
      language: 'spanish' as const,
      occupation: 'Spanish Teacher',
      location: 'Mexico City, Mexico',
      nationality: 'Mexican',
      personality: ['warm', 'enthusiastic', 'cultural'],
      conversationStyle: 'friendly' as const,
      backstory: '¡Hola! I\'m María González, your Spanish teacher from Mexico City!',
      interests: ['culture', 'food', 'music'],
      specialties: ['mexican-spanish', 'slang', 'culture'],
      difficultyLevel: 'beginner' as const,
      teachingStyle: 'Interactive and cultural immersion',
      vocabularyFocus: ['daily-life', 'culture', 'expressions'],
      avatar: '/images/Maria.png',
      modelPath: '/models/maria/maria.vrm',
      voiceSettings: {
        openaiVoice: 'nova' as const,
        defaultSpeed: 1.0,
        emotionMapping: { happy: 1.2, sad: 0.8, excited: 1.4, neutral: 1.0 }
      },
      isLocked: false,
      unlockRequirement: { type: 'level' as const, value: 0 },
      isActive: true,
      flag: '🇪🇸'
    },
    akira: {
      _id: 'akira',
      name: 'Akira Tanaka',
      age: 32,
      language: 'japanese' as const,
      occupation: 'Japanese Teacher',
      location: 'Tokyo, Japan',
      nationality: 'Japanese',
      personality: ['patient', 'respectful', 'formal'],
      conversationStyle: 'formal' as const,
      backstory: 'Konnichiwa! I\'m Akira Tanaka, your Japanese tutor from Tokyo.',
      interests: ['literature', 'history', 'language'],
      specialties: ['formal-japanese', 'keigo', 'culture'],
      difficultyLevel: 'intermediate' as const,
      teachingStyle: 'Structured and respectful approach',
      vocabularyFocus: ['formal-language', 'business', 'culture'],
      avatar: '/images/Akira.png',
      modelPath: '/models/akira/akira.vrm',
      voiceSettings: {
        openaiVoice: 'echo' as const,
        defaultSpeed: 0.9,
        emotionMapping: { happy: 1.1, sad: 0.9, excited: 1.2, neutral: 1.0 }
      },
      isLocked: false,
      unlockRequirement: { type: 'level' as const, value: 5 },
      isActive: true,
      flag: '🇯🇵'
    }
  };

  // Initialize character
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !user) {
      navigate('/auth/signin');
      return;
    }

    if (characterId && characterData[characterId as keyof typeof characterData]) {
      const selectedCharacter = characterData[characterId as keyof typeof characterData];
      setCharacter(selectedCharacter);
      
      // Initialize WebSocket connection
      characterSocketService.switchCharacter(characterId as 'maria' | 'akira');
      const language = characterId === 'akira' ? 'ja' : 'es';
      characterSocketService.setLanguage(language);
      setConnectionStatus(characterSocketService.getConnectionStatus() ? 'connected' : 'connecting');
    }
  }, [characterId, user, navigate]);

  // WebSocket event handlers
  useEffect(() => {
    const handleConnectionStatus = (data: { connected: boolean }) => {
      setConnectionStatus(data.connected ? 'connected' : 'disconnected');
    };

    const handleCharacterThinking = (thinking: boolean) => {
      setIsThinking(thinking);
      if (thinking) {
        setStreamingText('');
        setIsStreaming(false);
      }
    };

    const handleCharacterStream = (data: { text: string; isComplete: boolean }) => {
      if (!data.isComplete) {
        setIsStreaming(true);
        setStreamingText(prev => prev + data.text);
      } else {
        setIsStreaming(false);
      }
    };

    const handleCharacterResponse = (data: { 
      text: string; 
      emotion?: string; 
      isError?: boolean; 
      fallback?: boolean 
    }) => {
      setIsThinking(false);
      setIsStreaming(false);
      setStreamingText('');
      setCurrentEmotion(data.emotion || 'neutral');

      const characterMessage: Message = {
        _id: 'char-' + Date.now(),
        conversationId: 'temp-session',
        sender: 'character',
        content: data.text,
        createdAt: new Date().toISOString(),
        characterEmotion: data.emotion
      };

      setMessages(prev => [...prev, characterMessage]);

      if (data.fallback) {
        toast({
          title: 'Demo Mode',
          description: 'Running in demo mode. Start backend for full features.',
        });
      }
    };

    const handleVoiceAudio = (data: { audioUrl: string; text: string; emotion: string }) => {
      if (audioRef.current && data.audioUrl) {
        const fullUrl = data.audioUrl.startsWith('http') ? data.audioUrl : `http://localhost:5000${data.audioUrl}`;
        audioRef.current.src = fullUrl;
        audioRef.current.volume = 0.8;
        audioRef.current.play().catch(error => console.error('Audio playback error:', error));
      }
    };

    const handleError = (data: { message: string }) => {
      toast({
        title: 'Error',
        description: data.message,
        variant: 'destructive',
      });
    };

    // Subscribe to events
    characterSocketService.on('connection_status', handleConnectionStatus);
    characterSocketService.on('character_thinking', handleCharacterThinking);
    characterSocketService.on('character_stream', handleCharacterStream);
    characterSocketService.on('character_response', handleCharacterResponse);
    characterSocketService.on('voice_audio', handleVoiceAudio);
    characterSocketService.on('error', handleError);

    return () => {
      characterSocketService.off('connection_status', handleConnectionStatus);
      characterSocketService.off('character_thinking', handleCharacterThinking);
      characterSocketService.off('character_stream', handleCharacterStream);
      characterSocketService.off('character_response', handleCharacterResponse);
      characterSocketService.off('voice_audio', handleVoiceAudio);
      characterSocketService.off('error', handleError);
    };
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const handleMicClick = () => {
    toast({
      title: 'Voice Input',
      description: 'Voice input feature coming soon!',
    });
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !characterSocketService.getConnectionStatus()) return;

    const userMessage: Message = {
      _id: 'user-' + Date.now(),
      conversationId: 'temp-session',
      sender: 'user',
      content: text,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    characterSocketService.sendMessage(text);
  };

  const handleBackToCharacters = () => {
    navigate('/character');
  };

  if (!character) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Top Bar - Conversation Log only, positioned left */}
      <div className="absolute top-0 left-0 z-20 p-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Conversation Log</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-screen">
        {/* Character Display */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full h-full max-w-4xl mx-auto">
            <VRMViewer
              characterId={characterId as 'maria' | 'akira'}
              emotion={currentEmotion}
              isThinking={isThinking}
              className="w-full h-full"
            />
          </div>

          {/* Character Response Overlay */}
          {(isStreaming || streamingText || isThinking) && (
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 max-w-2xl w-full mx-4">
              <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
                <div className="flex items-start gap-3">
                  <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    CHARACTER
                  </div>
                </div>
                <div className="mt-2 text-white">
                  {isThinking && !streamingText ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-gray-400 text-sm">Thinking...</span>
                    </div>
                  ) : (
                    <p>{streamingText}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Section - Clean and simple */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <AIInput
              placeholder="Message"
              onSubmit={handleSendMessage}
              onMicClick={handleMicClick}
              disabled={isThinking}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Overlay with smooth animations */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with fade animation */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
            onClick={() => setIsSidebarOpen(false)}
          />
          
          {/* Sidebar with slide animation */}
          <div className="relative w-80 bg-gray-800 h-full overflow-hidden flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-left">
            {/* Sidebar Header with Back Button */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <button
                onClick={handleBackToCharacters}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Characters</span>
              </button>
            </div>

            {/* Connection Status */}
            <div className="px-4 py-2 text-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                connectionStatus === 'connected' 
                  ? 'bg-green-900 text-green-300'
                  : connectionStatus === 'connecting'
                  ? 'bg-yellow-900 text-yellow-300'
                  : 'bg-red-900 text-red-300'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' 
                    ? 'bg-green-400'
                    : connectionStatus === 'connecting'
                    ? 'bg-yellow-400 animate-pulse'
                    : 'bg-red-400'
                }`} />
                {connectionStatus === 'connected' ? 'Connected' : 
                 connectionStatus === 'connecting' ? 'Connecting...' : 'Demo Mode'}
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Conversation History</h3>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 ml-4'
                        : 'bg-gray-700 mr-4'
                    }`}
                  >
                    <div className="text-xs text-gray-300 mb-1">
                      {message.sender === 'user' ? 'You' : character?.name}
                    </div>
                    <div className="text-sm text-white">
                      {message.content}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                
                {/* Streaming message */}
                {streamingText && (
                  <div className="p-3 rounded-lg bg-gray-700 mr-4">
                    <div className="text-xs text-gray-300 mb-1">
                      {character?.name}
                    </div>
                    <div className="text-sm text-white">
                      {streamingText}
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element */}
      <audio ref={audioRef} className="hidden" />
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
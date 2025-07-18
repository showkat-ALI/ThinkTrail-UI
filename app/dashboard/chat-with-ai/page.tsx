import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';

// Types and Interfaces
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
}

interface FormData {
  message: string;
}

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

// ChatMessage Component
const ChatMessage = ({ message, isUser, timestamp, isAnimating = false }: ChatMessageProps) => {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const words = message.split(' ');

  useEffect(() => {
    if (isAnimating && !isUser) {
      setDisplayedWords([]);
      let wordIndex = 0;
      
      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          setDisplayedWords(prev => [...prev, words[wordIndex]]);
          wordIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust speed here

      return () => clearInterval(interval);
    } else {
      setDisplayedWords(words);
    }
  }, [message, isAnimating, isUser, words]);

  return (
    <div className={`flex gap-3 mb-6 animate-fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={isUser ? 'bg-primary' : 'bg-muted'}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-gradient-message border border-border'
          }`}
        >
          <p className="text-sm leading-relaxed">
            {isAnimating && !isUser ? (
              <>
                {displayedWords.map((word, index) => (
                  <span
                    key={index}
                    className="animate-word-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {word}{index < displayedWords.length - 1 ? ' ' : ''}
                  </span>
                ))}
                {displayedWords.length < words.length && (
                  <span className="inline-block w-2 h-4 bg-primary animate-typing ml-1"></span>
                )}
              </>
            ) : (
              message
            )}
          </p>
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

// ChatInput Component
const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const message = watch('message');

  const onSubmit = (data: FormData) => {
    if (data.message.trim() && !isLoading) {
      onSendMessage(data.message.trim());
      reset();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-end">
        <div className="flex-1">
          <Textarea
            {...register('message', { required: true })}
            placeholder="Type your message..."
            className="min-h-[60px] max-h-[120px] resize-none border-border bg-background focus:ring-primary"
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          size="lg"
          disabled={!message?.trim() || isLoading}
          className="h-[60px] w-[60px] rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

// Main ChatInterface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simple response simulation
    const responses = [
      "That's an interesting question! Let me think about that for a moment.",
      "I understand what you're asking. Here's my perspective on that topic.",
      "Great point! I can help you explore this idea further.",
      "Thank you for sharing that. I'd be happy to assist you with this.",
      "That's a fascinating topic to discuss. Let me provide some insights.",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return `${randomResponse} You mentioned: "${userMessage}". This is a simulated response to demonstrate the typing animation effect.`;
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await simulateAIResponse(content);
      
      // Add AI message with animation
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        isAnimating: true,
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-chat">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              isAnimating={message.isAnimating}
            />
          ))}
          
          {isLoading && (
            <div className="flex gap-3 mb-6 animate-fade-in-up">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              <div className="bg-gradient-message border border-border rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
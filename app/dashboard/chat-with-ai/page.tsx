"use client"
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { Avatar, Button, Textarea } from 'flowbite-react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import AccessTemplate from '../../../templates/AccessTemplate';
import PrivateTemplate from '../../../templates/PrivateTemplate';
import { useCreateChatWithAIMutation } from '../../../feature/api/dashboardApi';
import { useAppSelector } from '../../../redux-hook/hooks';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
}

const ChatMessage = ({ message, isUser, timestamp, isAnimating = false }: {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
}) => {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const words = useRef(message.split(' '));
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update words ref when message changes
    words.current = message.split(' ');
    if (!isAnimating || isUser) {
      setDisplayedWords(words.current);
      return;
    }

    setDisplayedWords([]);
    let wordIndex = 0;
    
    const interval = setInterval(() => {
      if (wordIndex < words.current.length) {
        setDisplayedWords(prev => [...prev, words.current[wordIndex]]);
        wordIndex++;
        messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [message, isAnimating, isUser]);

  return (
    <div ref={messageRef} className={`flex gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          {/* <Avatar rounded className="h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600"> */}
            <Bot className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600" />
          {/* </Avatar> */}
        </div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'
        }`}>
          <p className="text-sm leading-relaxed">
            {isAnimating && !isUser ? (
              <>
                {displayedWords.map((word, index) => (
                  <span key={index}>{word}{index < displayedWords.length - 1 ? ' ' : ''}</span>
                ))}
                {displayedWords.length < words.current.length && (
                  <span className="inline-block w-2 h-4 bg-blue-500 rounded-full animate-pulse ml-1"></span>
                )}
              </>
            ) : (
              message
            )}
          </p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          {/* <Avatar rounded className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600"> */}
            <User  className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600"/>
          {/* </Avatar> */}
        </div>
      )}
    </div>
  );
};

const ChatInterface = ({ assignmentId }: { assignmentId?: string }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
      isAnimating: true
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id: studentId } = useAppSelector((state) => state.auth.user);
  const [createChatWithAI, { isLoading }] = useCreateChatWithAIMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await createChatWithAI({
        message: content,
        userId: studentId,
        ...(assignmentId && { assignmentId })
      }).unwrap();

      if (response.success && response.reply) {
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: response.reply,
          isUser: false,
          timestamp: new Date(),
          isAnimating: true,
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (err) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <PrivateTemplate>
      <AccessTemplate accessRoles={["student","admitted"]}>
        <DashboardLayout>
          <div className="flex flex-col h-[calc(100vh-64px)]">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">AI Assistant</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {assignmentId ? 'Assignment Helper' : 'Always here to help'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="max-w-3xl mx-auto w-full">
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
                  <div className="flex gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-blue-500 animate-pulse" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const message = e.currentTarget.message.value.trim();
                if (message && !isLoading) {
                  handleSendMessage(message);
                  e.currentTarget.reset();
                }
              }} className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea
                    name="message"
                    placeholder="Type your message..."
                    className="min-h-[60px]"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-[60px] w-[60px]"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                </Button>
              </form>
            </div>
          </div>
        </DashboardLayout>
      </AccessTemplate>
    </PrivateTemplate>
  );
};

export default ChatInterface;
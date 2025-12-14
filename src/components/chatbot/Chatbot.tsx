'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Loader2, Bot, User } from 'lucide-react';
import { chat, ChatInput } from '@/ai/flows/chatbot';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'model',
          content: "Hello! I'm the Sprezzaura assistant. How can I help you today? You can ask me about our services, pricing, or anything else.",
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatInput: ChatInput = {
        history: messages,
        message: input,
      };
      const response = await chat(chatInput);
      const modelMessage: Message = { role: 'model', content: response.response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: "I'm sorry, but I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[calc(100vw-2rem)] sm:w-96"
            >
              <Card className="flex flex-col h-[70vh] max-h-[40rem] shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <div className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-base font-semibold">Sprezzaura Assistant</CardTitle>
                      <CardDescription className="text-xs">Always here to help</CardDescription>
                    </div>
                  </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0 flex-grow overflow-hidden">
                  <ScrollArea className="h-full" viewportRef={viewportRef}>
                    <div className="p-4 space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 ${
                            message.role === 'user' ? 'justify-end' : ''
                          }`}
                        >
                          {message.role === 'model' && (
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-primary" />
                             </div>
                          )}
                           <div
                            className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary'
                            }`}
                          >
                            {message.content}
                          </div>
                           {message.role === 'user' && (
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                <User className="h-5 w-5 text-muted-foreground" />
                             </div>
                          )}
                        </div>
                      ))}
                       {isLoading && (
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-primary" />
                          </div>
                          <div className="bg-secondary px-4 py-3 rounded-xl">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="p-2 border-t">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex w-full items-center gap-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-grow"
                      disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}

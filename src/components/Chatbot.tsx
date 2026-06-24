import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I can help you find the right loan, check rates generally, or book a consultation with Cami. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // In a real application, this would call a backend endpoint securely using the SDK
      // Using a mockup approach to simulate API request without exposing keys on the frontend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback for preview environment when backend isn't full connected
      setTimeout(() => {
         setMessages(prev => [...prev, {
             role: 'assistant',
             content: "I'm experiencing a bit of a delay right now. In the meantime, you can easily pre-qualify or book a consultation directly from our menu above!"
         }]);
         setIsLoading(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="chat-launcher"
            initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.6, y: 20 }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 bg-card border border-border rounded-full py-2 px-4 flex items-center gap-3 shadow-2xl cursor-pointer hover:bg-muted transition-colors z-50 group"
          >
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider hidden sm:block group-hover:text-primary transition-colors">Hi, I'm Cami's AI. How can I help?</span>
            <div className="relative w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center pointer-events-none group-hover:bg-primary/20 transition-colors">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary/30 animate-ping" />
              <MessageCircle className="relative h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={reduce ? false : { opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.85, y: 24 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="flex w-[350px] flex-col shadow-2xl h-[500px] border-border">
              <CardHeader className="flex flex-row items-center justify-between border-b bg-card px-4 py-3">
                <CardTitle className="text-base font-semibold">Heartland Assistant</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2 h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2 max-w-[85%] text-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-muted px-4 py-2 text-sm text-foreground rounded-tl-sm flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-muted-foreground">Typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="p-3 border-t bg-background">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-card"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

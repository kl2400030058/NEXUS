"use client";

import { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generalGDGQuery } from '@/ai/flows/general-gdg-query';
import type { ChatMessage } from '@/lib/types';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async (query?: string) => {
    const currentQuery = query || input;
    if (currentQuery.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: currentQuery };
    setMessages(prev => [...prev, userMessage]);
    if (!query) {
      setInput('');
    }
    setIsLoading(true);

    try {
      const response = await generalGDGQuery({ query: currentQuery });
      const assistantMessage: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: response.answer,
        suggestions: response.suggestions,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI query failed:', error);
      const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chat"
      >
        <Sparkles className="h-8 w-8" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col p-0">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary"/>
                Nexus AI Assistant
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-6 py-4">
              {messages.map((message) => (
                <div key={message.id}>
                    <div
                    className={cn(
                        'flex items-end gap-2',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                    >
                    {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        'max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap',
                        message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                    >
                        {message.content}
                    </div>
                    </div>
                     {message.role === 'assistant' && message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2 justify-start pl-10">
                            {message.suggestions.map((suggestion, i) => (
                                <Button key={i} size="sm" variant="outline" className="text-xs h-auto py-1 px-2" onClick={() => handleSend(suggestion)}>
                                    {suggestion}
                                    <ChevronRight className="h-3 w-3 ml-1"/>
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><Sparkles className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted px-3 py-2 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
               )}
            </div>
          </ScrollArea>
          <SheetFooter className="p-4 border-t bg-background">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ask about sessions, GDG..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button type="submit" onClick={() => handleSend()} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

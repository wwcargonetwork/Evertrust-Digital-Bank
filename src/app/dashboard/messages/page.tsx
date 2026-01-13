
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUserConversation, type Message } from '@/hooks/use-user-conversation-data';
import { useAuth, useUser } from '@/firebase';
import { Send, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function MessagesPage() {
    const { user } = useUser();
    const { conversation, messages, isLoading, sendMessage } = useUserConversation();
    const [newMessage, setNewMessage] = React.useState('');
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

     React.useEffect(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !user) return;
        
        await sendMessage({
            text: newMessage,
            senderId: user.uid,
            senderType: 'user'
        });
        setNewMessage("");
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        return names.length > 1 ? `${names[0][0]}${names[1][0]}` : name.substring(0, 2);
    }

    return (
        <Card className="h-[calc(100vh-140px)] flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare />
                    Support Chat
                </CardTitle>
                <CardDescription>
                    Have a question? Send us a message and an admin will get back to you.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                 <ScrollArea className="h-[calc(100vh-340px)]" ref={scrollAreaRef}>
                    <div className="space-y-4 p-4">
                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-12 w-3/4 ml-auto" />
                                <Skeleton className="h-12 w-3/4" />
                            </div>
                        ) : messages.length === 0 ? (
                             <div className="text-center text-muted-foreground pt-16">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : messages.map((msg) => (
                            <div key={msg.id} className={cn(
                                "flex items-end gap-2",
                                msg.senderType === 'user' ? "justify-end" : "justify-start"
                            )}>
                                {msg.senderType === 'admin' && <Avatar className="h-8 w-8"><AvatarFallback>A</AvatarFallback></Avatar>}
                                <div className={cn(
                                    "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2",
                                    msg.senderType === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className="text-xs text-right mt-1 opacity-70">
                                        {msg.createdAt ? format(msg.createdAt.toDate(), 'p') : ''}
                                    </p>
                                </div>
                                {msg.senderType === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.photoURL || undefined} />
                                        <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <div className="flex w-full items-center space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} disabled={isLoading || !newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

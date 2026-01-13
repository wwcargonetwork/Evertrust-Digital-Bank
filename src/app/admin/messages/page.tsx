
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAdminConversations, useConversationMessages, type ConversationWithUserData, type Message } from '@/hooks/use-admin-conversations-data';
import { useUser } from '@/firebase';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function MessagesPage() {
    const { conversations, isLoading: isLoadingConversations } = useAdminConversations();
    const [selectedConversation, setSelectedConversation] = React.useState<ConversationWithUserData | null>(null);

    const getInitials = (name: string) => {
        if (!name) return '??';
        const names = name.split(' ');
        return names.length > 1 ? `${names[0][0]}${names[1][0]}` : name.substring(0, 2);
    };

    return (
        <div className="grid h-[calc(100vh-100px)] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="md:col-span-1 lg:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Conversations</CardTitle>
                    <CardDescription>Select a conversation to view messages.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-0">
                    <ScrollArea className="h-full">
                    {isLoadingConversations ? (
                        <div className="space-y-2 p-4">
                            {Array.from({length: 5}).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                        </div>
                    ) : (
                        <div className="space-y-1 p-2">
                        {conversations?.map((convo) => (
                            <Button
                                key={convo.id}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-auto p-3 text-left",
                                    selectedConversation?.id === convo.id && "bg-muted"
                                )}
                                onClick={() => setSelectedConversation(convo)}
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>{getInitials(convo.userName)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{convo.userName}</p>
                                        <p className="text-xs text-muted-foreground truncate max-w-40">{convo.lastMessage}</p>
                                    </div>
                                    {!convo.isReadByAdmin && <div className="h-2 w-2 rounded-full bg-primary" />}
                                </div>
                            </Button>
                        ))}
                        </div>
                    )}
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3 flex flex-col">
                {selectedConversation ? (
                    <ChatPanel conversation={selectedConversation} />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <p>Select a conversation to start messaging.</p>
                    </div>
                )}
            </Card>
        </div>
    );
}

function ChatPanel({ conversation }: { conversation: ConversationWithUserData }) {
    const { user: adminUser } = useUser();
    const { messages, isLoading, sendMessage } = useConversationMessages(conversation.id);
    const [newMessage, setNewMessage] = React.useState("");
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !adminUser) return;
        
        await sendMessage({
            text: newMessage,
            senderId: adminUser.uid,
            senderType: 'admin'
        }, conversation.userId);
        setNewMessage("");
    };

    return (
        <>
            <CardHeader>
                <CardTitle>{conversation.userName}</CardTitle>
                <CardDescription>User ID: {conversation.userId}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <ScrollArea className="h-[calc(100vh-320px)]" ref={scrollAreaRef}>
                    <div className="space-y-4 p-4">
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-12 w-3/4 ml-auto" />
                            <Skeleton className="h-12 w-3/4" />
                        </div>
                    ) : messages?.map((msg) => (
                        <div key={msg.id} className={cn(
                            "flex items-end gap-2",
                            msg.senderType === 'admin' ? "justify-end" : "justify-start"
                        )}>
                            {msg.senderType === 'user' && <Avatar className="h-8 w-8"><AvatarFallback>{conversation.userName ? conversation.userName[0] : 'U'}</AvatarFallback></Avatar>}
                            <div className={cn(
                                "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2",
                                msg.senderType === 'admin' ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs text-right mt-1 opacity-70">
                                    {msg.createdAt ? format(msg.createdAt.toDate(), 'p') : ''}
                                </p>
                            </div>
                             {msg.senderType === 'admin' && <Avatar className="h-8 w-8"><AvatarFallback>A</AvatarFallback></Avatar>}
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
                    <Button onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
                </div>
            </CardFooter>
        </>
    );
}

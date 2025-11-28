'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PROPERTIES } from '@/lib/mockData';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: '1',
            text: 'Hi! I am Vian AI. Ask me to find properties, show tenants, or navigate the app.',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const router = useRouter();
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        // Simulate AI processing
        setTimeout(() => {
            processCommand(userMessage.text);
        }, 600);
    };

    const processCommand = (text: string) => {
        const lowerText = text.toLowerCase();
        let responseText = "I'm not sure how to help with that. Try 'show properties' or 'search for [name]'.";

        if (lowerText.includes('dashboard') || lowerText.includes('home')) {
            responseText = "Navigating to Dashboard...";
            router.push('/');
        } else if (lowerText.includes('properties') || lowerText.includes('list')) {
            responseText = "Showing all properties...";
            router.push('/properties'); // Assuming we have a list page, or just stay on dashboard
        } else if (lowerText.includes('tenants')) {
            responseText = "Navigating to Tenants list...";
            router.push('/tenants');
        } else if (lowerText.includes('search') || lowerText.includes('find') || lowerText.includes('go to')) {
            // Simple search logic
            const property = PROPERTIES.find(p => lowerText.includes(p.name.toLowerCase()));
            if (property) {
                responseText = `Found ${property.name}. Opening property details...`;
                router.push(`/properties/${property.id}`);
            } else {
                responseText = "I couldn't find a property with that name.";
            }
        }

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            sender: 'bot',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        style={{ marginBottom: 16, transformOrigin: 'bottom right' }}
                    >
                        <Paper
                            elevation={12}
                            sx={{
                                width: 360,
                                height: 500,
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                bgcolor: 'background.paper',
                            }}
                        >
                            {/* Header */}
                            <Box sx={{
                                p: 2,
                                background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <SmartToyIcon />
                                    <Typography variant="subtitle1" fontWeight="600">Vian Assistant</Typography>
                                </Box>
                                <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            {/* Messages */}
                            <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', bgcolor: '#F9FAFB' }}>
                                {messages.map((msg) => (
                                    <Box
                                        key={msg.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                            mb: 2,
                                        }}
                                    >
                                        <Paper
                                            sx={{
                                                p: 1.5,
                                                maxWidth: '80%',
                                                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                background: msg.sender === 'user' ? 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)' : 'white',
                                                color: msg.sender === 'user' ? 'white' : 'text.primary',
                                                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                                            }}
                                        >
                                            <Typography variant="body2">{msg.text}</Typography>
                                        </Paper>
                                    </Box>
                                ))}
                                <div ref={messagesEndRef} />
                            </Box>

                            {/* Input */}
                            <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Type a command..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '20px' }
                                    }}
                                />
                                <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}>
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>

            <Fab
                color="primary"
                aria-label="chat"
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    width: 64,
                    height: 64,
                    boxShadow: '0px 4px 20px rgba(56, 189, 248, 0.4)',
                    background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                }}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </Fab>
        </Box>
    );
}

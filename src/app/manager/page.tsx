'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import Avatar3D from '@/components/Manager/Avatar3D';
import PropertyTable from '@/components/Dashboard/PropertyTable';
import StatsCard from '@/components/Dashboard/StatsCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    component?: React.ReactNode;
}

export default function ManagerPage() {
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello Patrick. I'm Vian, your AI Property Manager. How can I help you today?",
        },
    ]);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        // Simulate AI processing
        setTimeout(() => {
            let responseContent = "I'm on it.";
            let responseComponent = undefined;

            const lowerInput = userMessage.content.toLowerCase();

            if (lowerInput.includes('show properties') || lowerInput.includes('list properties')) {
                responseContent = "Here are your current properties.";
                responseComponent = (
                    <Box sx={{ mt: 2, width: '100%', maxWidth: '800px' }}>
                        <PropertyTable />
                    </Box>
                );
            } else if (lowerInput.includes('stats') || lowerInput.includes('revenue')) {
                responseContent = "Here is your latest performance overview.";
                responseComponent = (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <StatsCard
                            title="Total Revenue"
                            value="$245,000"
                            icon={<AttachMoneyIcon />}
                            trend="+12% vs last month"
                            trendColor="success"
                        />
                        <StatsCard
                            title="Occupancy Rate"
                            value="94%"
                            icon={<PersonIcon />}
                            trend="+2% vs last month"
                            trendColor="success"
                        />
                    </Box>
                );
            } else {
                responseContent = "I can help you manage properties, view stats, or handle tenant requests. Try asking 'Show properties' or 'Show stats'.";
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseContent,
                component: responseComponent,
            };

            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    return (
        <Box sx={{
            height: 'calc(100vh - 40px)',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Header */}
            <Box sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 10
            }}>
                <Box sx={{ transform: 'scale(0.8)' }}>
                    <Avatar3D />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="bold">Vian AI Manager</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#38BDF8' }} />
                        <Typography variant="caption" color="text.secondary">Online • Generative UI Active</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Chat Area */}
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                scrollBehavior: 'smooth'
            }}>
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: msg.component ? '100%' : '70%',
                                width: msg.component ? '100%' : 'auto',
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                            }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: '20px',
                                        bgcolor: msg.role === 'user' ? 'primary.main' : 'background.paper',
                                        color: msg.role === 'user' ? 'white' : 'text.primary',
                                        boxShadow: msg.role === 'assistant' ? '0px 4px 20px rgba(0,0,0,0.05)' : 'none',
                                        borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '20px',
                                        borderTopRightRadius: msg.role === 'user' ? '4px' : '20px',
                                    }}
                                >
                                    <Typography variant="body1" lineHeight={1.6}>{msg.content}</Typography>
                                </Paper>

                                {msg.component && (
                                    <Box sx={{ mt: 2, width: '100%', animation: 'fadeIn 0.5s ease-out' }}>
                                        {msg.component}
                                    </Box>
                                )}
                            </Box>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    maxWidth: '800px',
                    mx: 'auto',
                    bgcolor: '#F3F4F6',
                    p: 1,
                    borderRadius: '20px',
                    alignItems: 'center'
                }}>
                    <Box sx={{ p: 1, color: 'primary.main' }}>
                        <AutoAwesomeIcon />
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="Ask Vian to show properties, stats, or manage tenants..."
                        variant="standard"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        InputProps={{ disableUnderline: true }}
                    />
                    <IconButton
                        onClick={handleSend}
                        disabled={!input.trim()}
                        sx={{
                            bgcolor: input.trim() ? 'primary.main' : 'action.disabledBackground',
                            color: 'white',
                            '&:hover': { bgcolor: 'primary.dark' },
                            width: 40,
                            height: 40
                        }}
                    >
                        <SendIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

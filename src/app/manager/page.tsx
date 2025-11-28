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
import PropertyForm from '@/components/Properties/PropertyForm';
import StatsCard from '@/components/Dashboard/StatsCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    component?: React.ReactNode;
    rawJson?: string;
}

import { chatService } from '@/services/chat';

export default function ManagerPage() {
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello Patrick. I'm Vian, your AI Property Manager. How can I help you today?",
            rawJson: JSON.stringify({ category: "general_response", content: "Hello Patrick. I'm Vian, your AI Property Manager. How can I help you today?", component: null })
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
        setIsTyping(true);

        try {
            // Convert messages to history format for API
            // Use rawJson for assistant messages to maintain JSON context for the LLM
            const history = messages.map(m => ({
                role: m.role,
                parts: m.rawJson || m.content
            }));

            const response = await chatService(history, userMessage.content);

            let componentNode = null;

            if (response.component === 'PropertyTable') {
                componentNode = (
                    <Box sx={{ mt: 2, width: '100%', maxWidth: '800px' }}>
                        <PropertyTable />
                    </Box>
                );
            } else if (response.component === 'StatsCard') {
                // If data is provided, use it. Otherwise default to the example.
                if (response.data) {
                    componentNode = (
                        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <StatsCard
                                title={response.data.title || "Metric"}
                                value={response.data.value || "0"}
                                icon={<AttachMoneyIcon />}
                                trend={response.data.trend || ""}
                                trendColor="success"
                            />
                        </Box>
                    );
                } else {
                    componentNode = (
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
                }
            } else if (response.component === 'PropertyForm') {
                componentNode = (
                    <Box sx={{ mt: 2, width: '100%', maxWidth: '800px', bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
                        <PropertyForm initialData={response.data || undefined} isEdit={!!response.data} />
                    </Box>
                );
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.content,
                component: componentNode,
                rawJson: JSON.stringify(response)
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (error) {
            console.error("Chat Error", error);
            setMessages((prev) => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Sorry, I encountered an error. Please try again."
            }]);
        } finally {
            setIsTyping(false);
        }
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
                    {isTyping && (
                        <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
                            <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                            <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                            <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
                        </Box>
                    )}
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

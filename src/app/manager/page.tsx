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
import CloseIcon from '@mui/icons-material/Close';
import Avatar3D from '@/components/Manager/Avatar3D';
import PropertyTable from '@/components/Dashboard/PropertyTable';
import PropertyForm from '@/components/Properties/PropertyForm';
import TenantTable from '@/components/Tenants/TenantTable';
import TenantDetail from '@/components/Tenants/TenantDetail';
import PropertyDetail from '@/components/Properties/PropertyDetail';
import StatsCard from '@/components/Dashboard/StatsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { chatService } from '@/services/chat';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    rawJson?: string;
}

export default function ManagerPage() {
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [isChatOpen, setIsChatOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState<React.ReactNode | null>(null);

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
    }, [messages, isChatOpen]);

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
            const history = messages.map(m => ({
                role: m.role,
                parts: m.rawJson || m.content
            }));

            const response = await chatService(history, userMessage.content);

            let componentNode = null;
            let aiContent = response.content;

            if (response.component === 'PropertyTable') {
                componentNode = (
                    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                        <PropertyTable />
                    </Box>
                );
                aiContent = "I've opened the property list for you in the main view.";
            } else if (response.component === 'StatsCard') {
                if (response.data) {
                    componentNode = (
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
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
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
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
                aiContent = "I've displayed the latest statistics in the main view.";
            } else if (response.component === 'PropertyForm') {
                componentNode = (
                    <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', bgcolor: 'background.paper', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h5" fontWeight="bold" mb={3}>
                            {response.data ? 'Edit Property' : 'Add New Property'}
                        </Typography>
                        <PropertyForm initialData={response.data || undefined} isEdit={!!response.data} />
                    </Box>
                );
                aiContent = response.data ? "I've opened the edit form for you." : "I've opened the new property form for you.";
            } else if (response.component === 'TenantTable') {
                componentNode = (
                    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                        <TenantTable />
                    </Box>
                );
                aiContent = "I've opened the tenant list for you.";
            } else if (response.component === 'TenantDetail') {
                if (response.data && response.data.tenantId) {
                    componentNode = (
                        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                            <TenantDetail tenantId={response.data.tenantId} />
                        </Box>
                    );
                    aiContent = "I've opened the tenant details for you.";
                } else {
                    aiContent = "I couldn't find the tenant details. Please try again.";
                }
            } else if (response.component === 'PropertyDetail') {
                if (response.data && response.data.propertyId) {
                    componentNode = (
                        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                            <PropertyDetail propertyId={response.data.propertyId} />
                        </Box>
                    );
                    aiContent = "I've opened the property details for you.";
                } else {
                    aiContent = "I couldn't find the property details. Please try again.";
                }
            }

            if (componentNode) {
                setActiveComponent(componentNode);
            }

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiContent,
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
            position: 'relative',
            height: 'calc(100vh - 40px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Main Content Area */}
            <Box sx={{
                flex: 1,
                p: 4,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: activeComponent ? 'flex-start' : 'center',
                transition: 'all 0.3s ease'
            }}>
                <AnimatePresence mode="wait">
                    {activeComponent ? (
                        <motion.div
                            key="component"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            style={{ width: '100%' }}
                        >
                            {activeComponent}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ textAlign: 'center' }}
                        >
                            <Box sx={{ mb: 4, transform: 'scale(1.5)', display: 'inline-block' }}>
                                <Avatar3D />
                            </Box>
                            <Typography variant="h3" fontWeight="800" gutterBottom sx={{
                                background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Vian AI Manager
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                                I can help you manage properties, analyze revenue, and handle tenant requests.
                                Just ask me to "Show properties" or "Add a new property".
                            </Typography>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            {/* Chat Widget Toggle (When Closed) */}
            <AnimatePresence>
                {!isChatOpen && (
                    <Box
                        component={motion.div}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsChatOpen(true)}
                        sx={{
                            position: 'fixed',
                            bottom: 32,
                            right: 32,
                            zIndex: 100,
                            cursor: 'pointer'
                        }}
                    >
                        <Avatar3D />
                    </Box>
                )}
            </AnimatePresence>

            {/* Chat Widget (When Open) */}
            <AnimatePresence>
                {isChatOpen && (
                    <Paper
                        component={motion.div}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        elevation={24}
                        sx={{
                            position: 'fixed',
                            bottom: 32,
                            right: 32,
                            width: 400,
                            height: 600,
                            maxHeight: '80vh',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 100,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        {/* Chat Header */}
                        <Box sx={{
                            p: 2,
                            bgcolor: 'background.paper',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ transform: 'scale(0.6)' }}>
                                    <Avatar3D />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">Vian AI</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#38BDF8' }} />
                                        <Typography variant="caption" color="text.secondary">Online</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <IconButton onClick={() => setIsChatOpen(false)} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        {/* Chat Messages */}
                        <Box sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            bgcolor: '#F9FAFB'
                        }}>
                            {messages.map((msg) => (
                                <Box
                                    key={msg.id}
                                    sx={{
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                    }}
                                >
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: '16px',
                                            bgcolor: msg.role === 'user' ? 'primary.main' : 'white',
                                            color: msg.role === 'user' ? 'white' : 'text.primary',
                                            boxShadow: msg.role === 'assistant' ? '0px 2px 4px rgba(0,0,0,0.05)' : 'none',
                                            borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                                            borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                                        }}
                                    >
                                        <Typography variant="body2" lineHeight={1.5}>{msg.content}</Typography>
                                    </Paper>
                                </Box>
                            ))}
                            {isTyping && (
                                <Box sx={{ display: 'flex', gap: 0.5, p: 1, ml: 1 }}>
                                    <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                                    <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                                    <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
                                </Box>
                            )}
                            <div ref={messagesEndRef} />
                        </Box>

                        {/* Chat Input */}
                        <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                bgcolor: '#F3F4F6',
                                p: 0.5,
                                borderRadius: '20px',
                                alignItems: 'center',
                                pl: 2
                            }}>
                                <TextField
                                    fullWidth
                                    placeholder="Type a message..."
                                    variant="standard"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    InputProps={{ disableUnderline: true, style: { fontSize: '0.9rem' } }}
                                />
                                <IconButton
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    size="small"
                                    sx={{
                                        bgcolor: input.trim() ? 'primary.main' : 'action.disabledBackground',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' },
                                        width: 32,
                                        height: 32,
                                        mr: 0.5
                                    }}
                                >
                                    <SendIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                )}
            </AnimatePresence>
        </Box>
    );
}

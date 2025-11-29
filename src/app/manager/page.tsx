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
import OverviewStats from '@/components/Dashboard/OverviewStats';
import StatsCard from '@/components/Dashboard/StatsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from 'ai/react';

export default function ManagerPage() {
    const [isChatOpen, setIsChatOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState<React.ReactNode | null>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        maxSteps: 5,
        onFinish: (message) => {
            // Optional: Handle side effects after stream finishes
        },
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages, isChatOpen]);

    // Effect to handle tool invocations and update the main view
    React.useEffect(() => {
        // Scan the last few messages to find the most recent tool invocation
        // This handles cases where the model generates text after the tool call
        const recentMessages = messages.slice(-3); // Look at last 3 messages
        let foundToolInvocation = null;

        for (let i = recentMessages.length - 1; i >= 0; i--) {
            const msg = recentMessages[i];
            if (msg.role === 'assistant' && msg.toolInvocations && msg.toolInvocations.length > 0) {
                foundToolInvocation = msg.toolInvocations[msg.toolInvocations.length - 1];
                break;
            }
        }

        if (!foundToolInvocation) return;

        const { toolName, args } = foundToolInvocation;

        if (toolName === 'get_properties') {
            setActiveComponent(
                <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                    <PropertyTable />
                </Box>
            );
        } else if (toolName === 'get_stats') {
            setActiveComponent(
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
        } else if (toolName === 'create_property') {
            setActiveComponent(
                <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', bgcolor: 'background.paper', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        Add New Property
                    </Typography>
                    <PropertyForm isEdit={false} />
                </Box>
            );
        } else if (toolName === 'edit_property') {
            setActiveComponent(
                <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto', bgcolor: 'background.paper', p: 4, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        Edit Property
                    </Typography>
                    <PropertyForm initialData={{ name: 'Sunset Apartments', address: '123 Main St', type: 'Residential', status: 'Good', units: 12, revenue: 15000, image: '/static/images/property/1.jpg' }} isEdit={true} />
                </Box>
            );
        } else if (toolName === 'get_tenants') {
            setActiveComponent(
                <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                    <TenantTable />
                </Box>
            );
        } else if (toolName === 'get_tenant_detail') {
            const tenantId = (args as any).tenantId;
            if (tenantId) {
                setActiveComponent(
                    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                        <TenantDetail tenantId={tenantId} />
                    </Box>
                );
            }
        } else if (toolName === 'get_property_detail') {
            const propertyId = (args as any).propertyId;
            if (propertyId) {
                setActiveComponent(
                    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                        <PropertyDetail propertyId={propertyId} />
                    </Box>
                );
            }
        } else if (toolName === 'get_overview') {
            setActiveComponent(
                <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
                    <OverviewStats />
                </Box>
            );
        }
    }, [messages]);

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
                                        <Typography variant="body2" lineHeight={1.5}>
                                            {msg.content}
                                            {/* Optional: Render tool invocation status or result here if needed */}
                                        </Typography>
                                    </Paper>
                                </Box>
                            ))}
                            {isLoading && (
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
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    bgcolor: '#F3F4F6',
                                    p: 0.5,
                                    borderRadius: '20px',
                                    alignItems: 'center',
                                    pl: 2
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="Type a message..."
                                    variant="standard"
                                    value={input}
                                    onChange={handleInputChange}
                                    InputProps={{ disableUnderline: true, style: { fontSize: '0.9rem' } }}
                                />
                                <IconButton
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
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

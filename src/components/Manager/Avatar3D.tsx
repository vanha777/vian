'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

export default function Avatar3D() {
    return (
        <Box
            sx={{
                width: 60,
                height: 60,
                position: 'relative',
                cursor: 'pointer',
                perspective: '1000px',
            }}
        >
            <Box
                component={motion.div}
                animate={{
                    y: [0, -5, 0],
                    rotateY: [0, 10, 0, -10, 0],
                    boxShadow: [
                        '0px 5px 15px rgba(56, 189, 248, 0.3)',
                        '0px 15px 25px rgba(56, 189, 248, 0.4)',
                        '0px 5px 15px rgba(56, 189, 248, 0.3)',
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 2,
                        borderRadius: '50%',
                        background: 'url(/static/images/avatar/ai-avatar.jpg)', // Placeholder, will use a gradient or icon if image fails
                        backgroundSize: 'cover',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(5px)',
                        border: '2px solid rgba(255,255,255,0.5)',
                    },
                }}
            >
                {/* Inner "Core" to give it depth */}
                <Box
                    sx={{
                        width: '60%',
                        height: '60%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.1))',
                        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)',
                        zIndex: 1,
                    }}
                />
            </Box>

            {/* Pulsing Ring */}
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                sx={{
                    position: 'absolute',
                    top: -5,
                    left: -5,
                    right: -5,
                    bottom: -5,
                    borderRadius: '50%',
                    border: '2px solid #38BDF8',
                    zIndex: -1,
                }}
            />
        </Box>
    );
}

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
                    background: 'linear-gradient(135deg, #38BDF8 0%, #A78BFA 100%)', // Fallback gradient
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden', // Ensure image stays within circle
                    border: '2px solid rgba(255,255,255,0.5)',
                }}
            >
                <img
                    src="/images/vian_avatar.png"
                    alt="Vian AI Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '@/theme/ThemeProvider';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerProps {
  initialTime: number; // in seconds
  mode: TimerMode;
  isRunning: boolean;
  onComplete: () => void;
  onTick?: (timeLeft: number) => void;
}

const Timer: React.FC<TimerProps> = ({
  initialTime,
  mode,
  isRunning,
  onComplete,
  onTick,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const { theme: customTheme } = useThemeContext();

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get mode display name
  const getModeDisplayName = (mode: TimerMode): string => {
    switch (mode) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return '';
    }
  };

  // Get mode color
  const getModeColor = (mode: TimerMode): string => {
    switch (mode) {
      case 'work':
        return customTheme.palette.primary.main;
      case 'shortBreak':
        return customTheme.palette.secondary.main;
      case 'longBreak':
        return customTheme.palette.success.main;
      default:
        return customTheme.palette.text.primary;
    }
  };

  // Timer effect
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime, mode]);

  // Countdown effect
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTick?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isRunning, onComplete, onTick]);

  // Calculate progress percentage
  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Session type */}
      <Typography
        variant="h6"
        sx={{
          color: getModeColor(mode),
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '1rem',
          fontWeight: 600,
        }}
      >
        {getModeDisplayName(mode)}
      </Typography>

      {/* Timer display */}
      <Typography
        variant="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 700,
          lineHeight: 1,
          margin: '1rem 0',
          background: `linear-gradient(45deg, ${customTheme.palette.primary.main}, ${customTheme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          '@media (max-width: 600px)': {
            fontSize: '4.5rem',
          },
        }}
      >
        {formatTime(timeLeft)}
      </Typography>

      {/* Progress bar */}
      <Box
        sx={{
          width: '100%',
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '3px',
          marginTop: '2rem',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: getModeColor(mode),
            transition: 'width 1s linear',
            borderRadius: '3px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Timer;

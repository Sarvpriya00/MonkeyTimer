'use client';

import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, Replay, Settings } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettingsOpen: () => void;
  disabled?: boolean;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSettingsOpen,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        marginTop: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Main control button (Play/Pause) */}
      <Button
        variant="contained"
        onClick={isRunning ? onPause : onStart}
        disabled={disabled}
        size="large"
        sx={{
          minWidth: '120px',
          height: '48px',
          borderRadius: '24px',
          padding: '0 24px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabled,
            color: theme.palette.text.disabled,
          },
          transition: 'all 0.2s ease',
        }}
        startIcon={isRunning ? <Pause /> : <PlayArrow />}
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>

      {/* Secondary controls */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Reset">
          <IconButton
            onClick={onReset}
            disabled={disabled}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'text.primary',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'text.disabled',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Replay />
          </IconButton>
        </Tooltip>

        <Tooltip title="Settings">
          <IconButton
            onClick={onSettingsOpen}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'text.primary',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Settings />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default TimerControls;

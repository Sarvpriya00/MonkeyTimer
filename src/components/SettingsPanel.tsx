'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
  IconButton,
  FormControlLabel,
  Switch,
  Slider,
  InputAdornment,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface TimerSettings {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  notifications: boolean;
  sound: string;
  volume: number;
}

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: TimerSettings) => void;
  initialSettings: TimerSettings;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  open,
  onClose,
  onSave,
  initialSettings,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState<TimerSettings>(initialSettings);

  // Update local state when initialSettings changes
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const handleChange = (field: keyof TimerSettings) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | number
  ) => {
    const value = typeof event === 'number' ? event : event.target.value;
    const parsedValue = typeof value === 'string' && !isNaN(Number(value)) 
      ? Math.max(1, Math.min(Number(value), 60))
      : value;

    setSettings((prev) => ({
      ...prev,
      [field]: parsedValue,
    }));
  };

  const handleSwitchChange = (field: keyof TimerSettings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    setSettings((prev) => ({
      ...prev,
      volume: value as number,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings: TimerSettings = {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        autoStartBreaks: true,
        autoStartPomodoros: true,
        notifications: true,
        sound: 'bell',
        volume: 70,
      };
      setSettings(defaultSettings);
      onSave(defaultSettings);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle 
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid',
            borderColor: 'divider',
            '& .MuiTypography-root': {
              fontSize: '1.25rem',
              fontWeight: 600,
              lineHeight: 1.6,
              letterSpacing: '0.0075em',
            }
          }}
        >
          Settings
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
          }}
        >
          <Tab label="Timer" />
          <Tab label="Notifications" />
          <Tab label="Appearance" />
        </Tabs>

        <DialogContent sx={{ padding: 3 }}>
          {activeTab === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Timer Settings
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <TextField
                  label="Work Duration (min)"
                  type="number"
                  value={settings.workDuration}
                  onChange={handleChange('workDuration')}
                  inputProps={{ min: 1, max: 60 }}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                  }}
                />
                
                <TextField
                  label="Short Break (min)"
                  type="number"
                  value={settings.shortBreak}
                  onChange={handleChange('shortBreak')}
                  inputProps={{ min: 1, max: 60 }}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                  }}
                />
                
                <TextField
                  label="Long Break (min)"
                  type="number"
                  value={settings.longBreak}
                  onChange={handleChange('longBreak')}
                  inputProps={{ min: 1, max: 60 }}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                  }}
                />
                
                <TextField
                  label="Long Break Interval"
                  type="number"
                  value={settings.longBreakInterval}
                  onChange={handleChange('longBreakInterval')}
                  inputProps={{ min: 1, max: 10 }}
                  fullWidth
                  variant="outlined"
                  helperText="Number of sessions before long break"
                />
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoStartBreaks}
                      onChange={handleSwitchChange('autoStartBreaks')}
                      color="primary"
                    />
                  }
                  label="Auto-start Breaks"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoStartPomodoros}
                      onChange={handleSwitchChange('autoStartPomodoros')}
                      color="primary"
                    />
                  }
                  label="Auto-start Pomodoros"
                />
              </Box>
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Notification Settings
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications}
                    onChange={handleSwitchChange('notifications')}
                    color="primary"
                  />
                }
                label="Enable Desktop Notifications"
              />
              
              <Box>
                <Typography gutterBottom>Notification Sound</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <select
                    value={settings.sound}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('sound')(e)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      backgroundColor: 'transparent',
                      color: 'inherit',
                      flex: 1,
                    }}
                  >
                    <option value="bell">Bell</option>
                    <option value="chime">Chime</option>
                    <option value="ding">Ding</option>
                    <option value="gong">Gong</option>
                  </select>
                </Box>
              </Box>
              
              <Box>
                <Typography gutterBottom>Volume: {settings.volume}%</Typography>
                <Slider
                  value={settings.volume}
                  onChange={handleVolumeChange}
                  aria-labelledby="volume-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Theme Settings
              </Typography>
              <Typography color="text.secondary">
                Use the theme switcher in the top-right corner to change themes.
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            padding: '16px 24px',
            borderTop: '1px solid',
            borderColor: 'divider',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={resetToDefaults}
            color="error"
            variant="outlined"
            size="large"
          >
            Reset to Defaults
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              size="large"
              sx={{
                minWidth: '100px',
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                minWidth: '100px',
              }}
            >
              Save
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SettingsPanel;

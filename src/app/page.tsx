'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import TimerControls from '@/components/TimerControls';
import SettingsPanel from '@/components/SettingsPanel';

// Timer settings interface (mirrors SettingsPanel)
interface TimerSettings {
  workDuration: number; // minutes
  shortBreak: number;   // minutes
  longBreak: number;    // minutes
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  notifications: boolean;
  sound: string; // simple string id for now
  volume: number; // 0–100
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 20,      // user requested default 20-minute focus
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  autoStartBreaks: true,
  autoStartPomodoros: true,
  notifications: true,
  sound: 'bell',
  volume: 70,
};

export default function HomePage() {
  // ----- State -----
  const [settings, setSettings] = useState<TimerSettings>(() => {
    try {
      const saved = localStorage.getItem('pomodoro:settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [mode, setMode] = useState<TimerMode>('work');
  const [isRunning, setIsRunning] = useState(false);
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // handy to force remount

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ----- Helpers -----
  const getInitialTime = (): number => {
    switch (mode) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreak * 60;
      case 'longBreak':
        return settings.longBreak * 60;
      default:
        return 0;
    }
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimerKey((k) => k + 1);
  };
  const handleTimerComplete = () => {
    // Always stop the timer when it completes
    setIsRunning(false);

    // Play notification sound if enabled
    if (audioRef.current) {
      try {
        // Force reload the audio element to ensure it picks up any source changes
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        audio.volume = settings.volume / 100;
        
        // Create a new audio context to handle autoplay restrictions
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('Audio playback failed:', error);
            // Fallback: Try playing again with user interaction
            document.addEventListener('click', function onClick() {
              audio.play().catch(e => console.warn('Fallback play failed:', e));
              document.removeEventListener('click', onClick);
            }, { once: true });
          });
        }
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }

    // Show desktop notification if enabled and permission granted
    if (settings.notifications && Notification.permission === 'granted') {
      const nextMode = mode === 'work' 
        ? (completedWorkSessions + 1) % settings.longBreakInterval === 0 ? 'longBreak' : 'shortBreak'
        : 'work';
      
      const modeNames = {
        work: 'Work',
        shortBreak: 'Short Break',
        longBreak: 'Long Break'
      };

      new Notification('Timer Complete', {
        body: `Time for ${modeNames[nextMode]}. Click to start.`,
        icon: '/favicon.ico',
        requireInteraction: true
      });
    } else if (settings.notifications && Notification.permission !== 'denied') {
      // Request notification permission if not already determined
      Notification.requestPermission();
    }

    // Update mode and session count without auto-starting
    if (mode === 'work') {
      const newCount = completedWorkSessions + 1;
      setCompletedWorkSessions(newCount);
      const isLongBreak = newCount % settings.longBreakInterval === 0;
      setMode(isLongBreak ? 'longBreak' : 'shortBreak');
    } else {
      setMode('work');
    }
  };

  // Persist settings when they change
  useEffect(() => {
    try {
      localStorage.setItem('pomodoro:settings', JSON.stringify(settings));
    } catch {/* ignore */}
  }, [settings]);

  // When mode or settings change, reset timerKey to restart timer with new initialTime
  useEffect(() => {
    setTimerKey((k) => k + 1);
  }, [mode, settings]);

  // ----- Settings panel -----
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  const saveSettings = (s: TimerSettings) => setSettings(s);

  return (
    <>
      <Header />

      <Container maxWidth="md" sx={{ mt: 6, px: 2, textAlign: 'center' }}>
        <Timer
          key={timerKey}
          initialTime={getInitialTime()}
          mode={mode}
          isRunning={isRunning}
          onComplete={handleTimerComplete}
        />

        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onSettingsOpen={openSettings}
        />
      </Container>

      {/* Settings dialog */}
      <SettingsPanel
        open={isSettingsOpen}
        onClose={closeSettings}
        onSave={saveSettings}
        initialSettings={settings}
      />

      {/* Hidden audio element for notification sounds */}
      <audio
        ref={audioRef}
        src={`/sounds/bell.mp3`}
        preload="auto"
        onError={(e) => console.error('Audio error:', e)}
        onCanPlayThrough={() => console.log('Audio ready to play')}
        onPlay={() => console.log('Audio started playing')}
        onPause={() => console.log('Audio paused')}
        onEnded={() => console.log('Audio finished playing')}
        onLoadStart={() => console.log('Audio loading started')}
        onLoadedData={() => console.log('Audio loaded')}
        onStalled={() => console.warn('Audio stalled')}
        onSuspend={() => console.log('Audio loading suspended')}
        onAbort={() => console.warn('Audio loading aborted')}
        onEmptied={() => console.warn('Audio emptied')}
      />
    </>
  );
}

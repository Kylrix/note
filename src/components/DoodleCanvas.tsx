'use client';

import React, { useRef, useState, useEffect } from 'react';
import { DoodleStroke } from '@/types/notes';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Stack, 
  Slider, 
  Paper,
  alpha,
  Tooltip
} from '@mui/material';
import { X, Maximize2, Minimize2, RotateCcw, Trash2, Save } from 'lucide-react';

interface DoodleCanvasProps {
  initialData?: string;
  onSave: (data: string) => void;
  onClose: () => void;
}

type ModalMode = 'modal' | 'pip' | 'fullscreen';

export default function DoodleCanvas({ initialData, onSave, onClose }: DoodleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<DoodleStroke[]>([]);
  const [color, setColor] = useState('#00F5FF');
  const [size, setSize] = useState(3);
  const [mode, setMode] = useState<ModalMode>('modal');
  const [pipPosition, setPipPosition] = useState({ x: 20, y: 20 });
  const [isDraggingPip, setIsDraggingPip] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Initialize canvas with existing data
  useEffect(() => {
    if (initialData) {
      try {
        const data = JSON.parse(initialData);
        setStrokes(data);
        redrawCanvas(data);
      } catch {
        console.error('Failed to parse doodle data');
      }
    }
  }, []);

  const getCanvas = () => canvasRef.current;

  const redrawCanvas = (strokesData: DoodleStroke[] = strokes) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokesData.forEach((stroke) => {
      if (stroke.points.length < 2) return;

      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = stroke.opacity ?? 1;

      ctx.beginPath();
      ctx.moveTo(stroke.points[0][0], stroke.points[0][1]);

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i][0], stroke.points[i][1]);
      }
      ctx.stroke();

      ctx.globalAlpha = 1;
    });
  };

  useEffect(() => {
    redrawCanvas();
  }, [strokes]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = getCanvas();
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStrokes((prev) => [
      ...prev,
      { points: [[x, y]], color, size, opacity: 1 },
    ]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = getCanvas();
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStrokes((prev) => {
      const updated = [...prev];
      const lastStroke = updated[updated.length - 1];
      if (lastStroke) {
        lastStroke.points.push([x, y]);
      }
      return updated;
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    onSave(JSON.stringify(strokes));
    onClose();
  };

  const handleClear = () => {
    setStrokes([]);
    const canvas = getCanvas();
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handlePipDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-pip-drag]')) {
      setIsDraggingPip(true);
      dragOffset.current = {
        x: e.clientX - pipPosition.x,
        y: e.clientY - pipPosition.y,
      };
    }
  };

  const handlePipDrag = (e: React.MouseEvent) => {
    if (!isDraggingPip) return;

    const newX = Math.max(0, e.clientX - dragOffset.current.x);
    const newY = Math.max(0, e.clientY - dragOffset.current.y);

    setPipPosition({ x: newX, y: newY });
  };

  const handlePipDragEnd = () => {
    setIsDraggingPip(false);
  };

  const Controls = ({ isPip = false }: { isPip?: boolean }) => (
    <Stack 
      direction={isPip ? "column" : "row"} 
      spacing={2} 
      alignItems="center" 
      sx={{ width: '100%', flexWrap: 'wrap' }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)' }}>COLOR</Typography>
        <Box 
          component="input"
          type="color"
          value={color}
          onChange={(e: any) => setColor(e.target.value)}
          sx={{ 
            width: 32, 
            height: 32, 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            bgcolor: 'transparent',
            '&::-webkit-color-swatch-wrapper': { p: 0 },
            '&::-webkit-color-swatch': { border: 'none', borderRadius: '8px' }
          }}
        />
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1, minWidth: 150 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.5)' }}>SIZE</Typography>
        <Slider
          value={size}
          min={1}
          max={20}
          onChange={(_: any, val: any) => setSize(val)}
          sx={{ 
            color: '#00F5FF',
            '& .MuiSlider-thumb': { width: 12, height: 12 },
            '& .MuiSlider-rail': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
          }}
        />
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', minWidth: 24 }}>{size}px</Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
        <Tooltip title="Undo">
          <IconButton onClick={handleUndo} size="small" sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
            <RotateCcw size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear">
          <IconButton onClick={handleClear} size="small" sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: '#FF4D4D', bgcolor: alpha('#FF4D4D', 0.1) } }}>
            <Trash2 size={18} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );

  if (mode === 'pip') {
    return (
      <Paper
        sx={{
          position: 'fixed',
          left: pipPosition.x,
          top: pipPosition.y,
          zIndex: 2000,
          width: 320,
          bgcolor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          backgroundImage: 'none'
        }}
        onMouseMove={handlePipDrag}
        onMouseUp={handlePipDragEnd}
        onMouseLeave={handlePipDragEnd}
      >
        <Box 
          data-pip-drag
          onMouseDown={handlePipDragStart}
          sx={{ 
            p: 1.5, 
            bgcolor: 'rgba(255, 255, 255, 0.03)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            cursor: 'move'
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>DOODLE</Typography>
          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" onClick={() => setMode('modal')} sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              <Maximize2 size={14} />
            </IconButton>
            <IconButton size="small" onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              <X size={14} />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ bgcolor: '#000', aspectRatio: '16/9' }}>
          <canvas
            ref={canvasRef}
            width={320}
            height={180}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Controls isPip />
          <Button 
            fullWidth 
            variant="contained" 
            size="small" 
            onClick={handleSave}
            sx={{ mt: 2, bgcolor: '#00F5FF', color: '#000', fontWeight: 800, borderRadius: '10px' }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth={mode === 'fullscreen' ? false : 'md'}
      fullScreen={mode === 'fullscreen'}
      PaperProps={{
        sx: {
          bgcolor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: mode === 'fullscreen' ? 0 : '28px',
          backgroundImage: 'none',
          color: 'white',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          Doodle {mode === 'fullscreen' && '- Fullscreen'}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title={mode === 'fullscreen' ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton 
              onClick={() => setMode(mode === 'fullscreen' ? 'modal' : 'fullscreen')}
              sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
            >
              {mode === 'fullscreen' ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Minimize to PIP">
            <IconButton 
              onClick={() => setMode('pip')}
              sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
            >
              <Minimize2 size={20} />
            </IconButton>
          </Tooltip>
          <IconButton 
            onClick={onClose}
            sx={{ color: 'rgba(255, 255, 255, 0.4)', '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
          >
            <X size={20} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 4, bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
        <Box sx={{ 
          width: '100%', 
          height: mode === 'fullscreen' ? 'calc(100vh - 200px)' : 500,
          bgcolor: '#000',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <canvas
            ref={canvasRef}
            width={mode === 'fullscreen' ? 1920 : 800}
            height={mode === 'fullscreen' ? 1080 : 600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{ 
              width: '100%', 
              height: '100%', 
              cursor: 'crosshair',
              display: 'block'
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        p: 3, 
        flexDirection: 'column', 
        gap: 3,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <Controls />
        <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontWeight: 700,
              '&:hover': { color: 'white', bgcolor: 'rgba(255, 255, 255, 0.05)' }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleSave}
            startIcon={<Save size={18} />}
            sx={{ 
              bgcolor: '#00F5FF', 
              color: '#000', 
              fontWeight: 800, 
              borderRadius: '14px',
              px: 4,
              '&:hover': { bgcolor: '#00D1DA' }
            }}
          >
            Save Doodle
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

import { ArrowBack, ArrowForward, Menu as MenuIcon, VolumeUp, Stop, Pause, PlayArrow, ColorLens, FormatSize } from '@mui/icons-material';
import { Button, Dropdown, MenuButton, MenuItem, Menu, Box, ColorPaletteProp, TypographySystem, Grid, IconButton, ButtonGroup } from '@mui/joy';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { generateSpeech } from '../../api/tts';
import { showToast, ToastSeverity } from '../../components/UI/ToastMessageUtils';
import { Chapter } from '../../types/chapter';

export default function ChapterReaderControl({
  chapter,
  bookChapters,
  setFontSize,
  setThemeColor,
}: {
  chapter: Chapter;
  bookChapters: Chapter[];
  setFontSize: (value: keyof TypographySystem) => void;
  setThemeColor: (value: ColorPaletteProp) => void;
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleSpeechToggle = () => {
    if (isSpeaking && audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsSpeaking(false);
      return;
    }

    if (chapter.content) {
      playSpeech(chapter.content);
    }
  };

  const handlePauseResumeToggle = () => {
    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play();
        setIsSpeaking(true);
      } else {
        audioElement.pause();
        setIsSpeaking(false);
      }
    }
  };

  const prepareAudioChunk = async (text: string, audio: HTMLAudioElement) => {
    try {
      const blob = await generateSpeech(text);
      const newBlobUrl = URL.createObjectURL(blob);
      audio.src = newBlobUrl;
      audio.load();
    } catch {
      setIsSpeaking(false);
    }
  };

  const playSpeech = async (text: string) => {
    showToast({
      title: '正在合成音频',
      message: '请稍等片刻',
      severity: ToastSeverity.Primary,
      duration: 3000,
    });
    const audio = audioElement || new Audio();
    await prepareAudioChunk(text, audio);

    audio.onplay = () => setIsSpeaking(true);
    audio.onended = () => setIsSpeaking(false);
    audio.onerror = () => {
      setIsSpeaking(false);
    };

    setAudioElement(audio);

    try {
      await audio.play();
      showToast({
        title: '正在播放',
        message: '音频合成成功！',
        severity: ToastSeverity.Success,
        duration: 3000,
      });
    } catch {
      showToast({
        title: '播放失败',
        message: '请检查音频设置',
        severity: ToastSeverity.Danger,
        duration: 3000,
      });
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [audioElement]);

  const fontSizes: {
    value: keyof TypographySystem;
    name: string;
  }[] = [
      { value: 'body-lg', name: '大' },
      { value: 'body-md', name: '中' },
      { value: 'body-sm', name: '小' },
      { value: 'body-xs', name: '特小' },
    ];
  const themeColors: {
    value: ColorPaletteProp;
    name: string;
  }[] = [
      { value: 'primary', name: '青花' },
      { value: 'warning', name: '余晖' },
      { value: 'danger', name: '胭脂' },
      { value: 'neutral', name: '水墨' },
      { value: 'success', name: '翠竹' },
    ];
  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 2, mx: { xs: 0, md: 4 } }}
    >
      <Grid xs={12} sm={8} md={6}>
        <ButtonGroup
          color='primary'
          variant="soft">
          <Button
            component={Link}
            to={`/chapters/${chapter.previous}`}
            disabled={!chapter.previous}
            startDecorator={<ArrowBack />}
            size="sm"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            上一章
          </Button>
          <Dropdown>
            <MenuButton
              startDecorator={<MenuIcon />}
              size="sm"
              color='primary'
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              章节列表
            </MenuButton>
            <Menu>
              {bookChapters.map((ch) => (
                <MenuItem key={ch.id} component={Link} to={`/chapters/${ch.id}`}>
                  {ch.name}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
          <Button
            component={Link}
            to={`/chapters/${chapter.next}`}
            disabled={!chapter.next}
            endDecorator={<ArrowForward />}
            size="sm"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            下一章
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid xs={12} sm={4} md={3}>
        <ButtonGroup>
          <Button
            onClick={handleSpeechToggle}
            variant="soft"
            size="sm"
            color={isSpeaking ? 'danger' : 'primary'}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
            startDecorator={isSpeaking ? <Stop /> : <VolumeUp />}
          >
            {isSpeaking ? '停止朗读' : '朗读章节'}
          </Button>
          <IconButton
            onClick={handlePauseResumeToggle}
            variant="soft"
            size="sm"
            color={audioElement?.paused ? 'success' : 'warning'}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {audioElement?.paused ? <PlayArrow /> : <Pause />}
          </IconButton>
        </ButtonGroup>
      </Grid>
      <Grid xs={12} sm={6} md={4}
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Dropdown>
            <MenuButton size="sm" variant="soft" startDecorator={<FormatSize />}>
              调整字体
            </MenuButton>
            <Menu>
              {fontSizes.map((size) => (
                <MenuItem
                  key={size.value}
                  onClick={() => setFontSize(size.value)}
                >
                  {size.name}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
          <Dropdown>
            <MenuButton size="sm" variant="soft" startDecorator={<ColorLens />}>
              调整主题
            </MenuButton>
            <Menu>
              {themeColors.map((theme) => (
                <MenuItem
                  key={theme.value}
                  onClick={() => setThemeColor(theme.value)}
                  color={theme.value}
                >
                  {theme.name}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </Box>
      </Grid>
    </Grid >
  );
}
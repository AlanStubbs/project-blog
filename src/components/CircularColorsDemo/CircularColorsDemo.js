'use client'
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [play, setPlay] = React.useState(false);

  function handleReset() {
    setPlay(false);
    setTimeElapsed(0);
  }

  React.useEffect(() => {
    let interval;
    if (play) {
      interval = window.setInterval(() => setTimeElapsed(currentTime => currentTime + 1), 1000)
    } else {
      window.clearInterval(interval);
    }

    return () => window.clearInterval(interval);
  }, [play])

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const id = React.useId();

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
              style={{ isolation: 'isolate' }}
            >
              {isSelected && (
                <motion.div
                  layoutId={id}
                  key={id}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className={
                    styles.selectedColorOutline
                  }
                  style={{ zIndex: 2 }}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                  zIndex: 1
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => setPlay(play => !play)}>
            {play
              ? <>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>
              </>
              : <>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </>}
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;

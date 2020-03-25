import React from 'react';
import { cn } from '../../utils/bem';
import './Loader.css';

export interface ILoader {
  className?: string;
  size?: 'm' | 'l';
}

export const cnLoader = cn('loader');

export const Loader: React.FC<ILoader> = ({ className, size = 'm' }) => {
  return (
    <div className={cnLoader({ size }, [className])}>
      <div className={cnLoader('dot')} />
    </div>
  );
};
import clsx from 'clsx';
import React from 'react';

export interface StackProps {
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  gap?: '1' | '2' | '4' | '8' | '12';
  spacer?: React.ReactNode;
  className?: string;
}

const Stack: React.FC<StackProps> = ({
  children,
  orientation = 'vertical',
  gap = '4',
  spacer,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);
  const content = spacer
    ? childrenArray.flatMap((child, index) => {
      if (index === childrenArray.length - 1) return [child];
      return [child, <span key={`spacer-${index}`}>{spacer}</span>];
    })
    : childrenArray;

  // Use Tailwind classes to set the flex direction.
  const flexDirection = orientation === 'vertical' ? 'flex-col ' : 'flex-row';

  return (
    <div className={clsx('flex items-center', flexDirection, `gap-${gap}`, className)}>
      {content}
    </div>
  );
};

export default Stack;

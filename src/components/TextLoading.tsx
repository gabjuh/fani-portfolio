import React from 'react';

interface ITextLoading {
  nr: number;
  align?: 'left' | 'center' | 'right' | 'justify';
}

interface ILine {
  align?: ITextLoading['align'];
  width?: string;
}

const Line: React.FC<ILine> = ({ align, width }) => {
  return (
    <div
      className={`block min-h-[1em] my-5 w-10/12 cursor-wait bg-secondary align-middle text-base text-neutral-700 opacity-50 dark:text-neutral-50 ${align === 'center' ? 'mx-auto' : ''}}`}
      style={{width: width ? width : '100%'}}
    >
    </div>
  );
};

const TextLoading: React.FC<ITextLoading> = ({ nr, align }) => {

  const generateRandomWidthBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString() + '%';
  };

  return (
    <>
      {[...Array(nr)].map((_, i) => {
        return (
          <Line key={i} align={align} />
        );
      })}
      {/* give a random number betewwn 30 and 70 */}
      <Line align='left' width={generateRandomWidthBetween(20, 80)}/>
    </>
  );
};

export default TextLoading;
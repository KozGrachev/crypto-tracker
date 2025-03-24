'use client';

interface PriceChangeTextProps {
  value: number;
}

const PriceChangeText: React.FC<PriceChangeTextProps> = ({ value }) => {
  const isPositive = value >= 0;
  const formatted = `${isPositive ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} font-medium`}>
      {formatted}
    </span>
  );
};

export default PriceChangeText;

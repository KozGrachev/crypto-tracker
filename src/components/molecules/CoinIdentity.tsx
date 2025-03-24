'use client';

import Image from 'next/image';
import Stack from '../atoms/Stack';

interface CoinIdentityProps {
  name: string;
  symbol: string;
  image: string;
}

const CoinIdentity: React.FC<CoinIdentityProps> = ({ name, symbol, image }) => {
  return (
    <Stack orientation="horizontal" gap="4">
      <div className="flex-shrink-0 w-8 h-8 relative">
        <Image
          src={image}
          alt={name}
          fill
          sizes="32px"
          className="object-contain rounded-full"
        />
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{symbol}</p>
      </div>
    </Stack>
  );
};

export default CoinIdentity;

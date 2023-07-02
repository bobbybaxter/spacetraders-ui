import { printDelimiter } from './print-delimiter';

export function printLocation({
  x,
  y,
  symbol,
}: {
  x: number;
  y: number;
  symbol: string;
}) {
  return (
    <span>
      {x}, {y} {printDelimiter()} {symbol}
    </span>
  );
}

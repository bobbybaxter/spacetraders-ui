import printDelimiter from './print-delimiter';

export default function printLocation({
  route: {
    destination: { x, y, type, symbol },
  },
  status,
}: ShipNav) {
  // TODO: figure out how to do a full word break on the symbol
  return (
    <span>
      {status} {printDelimiter()} {x}, {y} {printDelimiter()} {type}{' '}
      {printDelimiter()} {symbol}
    </span>
  );
}

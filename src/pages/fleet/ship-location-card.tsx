import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function printRow(title: string, valueArray: string[]) {
  function printValueRows(values: string[]) {
    const highValueText = [
      'BURN',
      'DRIFT',
      'MARKETPLACE',
      'SHIPYARD',
      'STEALTH',
      'UNCHARTED',
    ];
    return values.map((value: string) => {
      const highlightText = highValueText.includes(value)
        ? 'text-yellow-400'
        : '';
      return (
        <div key={`${title}_${value}`} className={`w-[225px] ${highlightText}`}>
          {value}
        </div>
      );
    });
  }
  return (
    <div className="flex flex-row">
      <div className="text-muted-foreground-darker w-[100px]">{title}</div>
      <div className="flex flex-col">{printValueRows(valueArray)}</div>
    </div>
  );
}

export default function shipLocationCard({
  symbol,
  type,
  x,
  y,
  traits,
  chart,
}: Waypoint) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>LOCATION</CardTitle>
        </CardHeader>
        <CardContent>
          {printRow('symbol', [symbol])}
          {printRow('type', [type])}
          {printRow('coordinates', [`${x}, ${y}`])}
          {/* {printRow('orbitals', orbitals)} */}
          {printRow(
            'traits',
            traits.map((x) => x.symbol)
          )}
          {/* {printRow('status', nav.status)} */}
          {/* {printRow('flight_mode', nav.flightMode)} */}
        </CardContent>
      </Card>
    </div>
  );
}

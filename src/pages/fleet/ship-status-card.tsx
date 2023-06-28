import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import printLocation from '@/helpers/print-location';

function printRow(title: string, value: any) {
  return (
    <div className="flex flex-row">
      <div className="text-muted-foreground-darker w-[325px] basis-1/4">
        {title}
      </div>
      <div className="basis-3/4">{value}</div>
    </div>
  );
}

export default function shipStatusCard({ fuel, nav }: Ship) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>STATUS</CardTitle>
        </CardHeader>
        <CardContent>
          {printRow('fuel', `${fuel.current}/${fuel.capacity}`)}
          {printRow('location', printLocation(nav))}
          {printRow('flight_mode', nav.flightMode)}
        </CardContent>
      </Card>
    </div>
  );
}

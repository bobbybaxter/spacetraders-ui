import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function printRow(title: string, value: any) {
  return (
    <div className="flex flex-row">
      <div className="text-muted-foreground-darker w-[100px]">{title}</div>
      <div className="w-[225px]">{value}</div>
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
          {printRow('status', nav.status)}
          {printRow('flight_mode', nav.flightMode)}
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShipActionsCard({ nav }: Ship) {
  const [wayPoint, setWaypoint] = useState<string | undefined>(undefined);
  const isInOrbit = nav.status === 'ORBIT';
  const isInTransit = nav.status === 'IN_TRANSIT';
  const isDocked = nav.status === 'DOCKED';
  const isInAsteroidField = nav.route.destination.type === 'ASTEROID_FIELD';

  function printButtonRow(title: string, buttons: any) {
    return (
      <div className="flex flex-row gap-3">
        <h4 className="basis-1/6">{title}</h4>
        <div className="flex basis-3/4 flex-row flex-wrap gap-3">{buttons}</div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {printButtonRow(
          'NAV',
          <>
            {isInOrbit && <Button variant="outline">Dock</Button>}
            {/* TODO: select which flight mode to change to */}
            <Button variant="outline">Change Flight Mode</Button>
            {/* TODO: hide if ship doesn't have requirement materials */}
            {/* TODO: select location to jump to */}
            <Button variant="outline">Jump</Button>
            {/* TODO: select location to navigate to */}
            {!isInTransit && <Button variant="outline">Navigate</Button>}
            {isDocked && <Button variant="outline">Orbit</Button>}
            {/* TODO: hide if in transit or docked at a location without a fuel market */}
            <Button variant="outline">Refuel</Button>
            {/* TODO: hide if ship doesn't have a warp drive */}
            {/* TODO: disable if ship doesn't have enough fuel to complete warp */}
            {/* TODO: select location to warp to */}
            <Button variant="outline">Warp</Button>
          </>
        )}

        {printButtonRow(
          'CHART',
          <>
            {/* TODO: hide if waypoint is already charted*/}
            <Button variant="outline">Chart</Button>
            {/* TODO: hide if ship doesn't have sensor array */}
            {/* TODO: work on the backend to capture this data */}
            <Button variant="outline">Scan Ships</Button>
            <Button variant="outline">Scan Systems</Button>
            <Button variant="outline">Scan Waypoints</Button>
          </>
        )}

        {printButtonRow(
          'MINE',
          <>
            {/* TODO: hide if not in asteroid field */}
            {/* TODO: select which minerals to extract */}
            {isInOrbit && isInAsteroidField && (
              <Button variant="outline">Extract</Button>
            )}
            {/* TODO: hide if no cargo, no refiner, or no refinery materials */}
            <Button variant="outline">Refine</Button>
            {/* TODO: work on storing the survey information for extraction */}
            {isInAsteroidField && <Button variant="outline">Survey</Button>}
          </>
        )}

        {printButtonRow(
          'CARGO',
          <>
            {/* TODO: hide if nothing in cargo */}
            {/* TODO: select which cargo to jettison */}
            <Button variant="outline">Jettison</Button>
            {/* TODO: hide if not at a planet with a market */}
            <Button variant="outline">Purchase Cargo</Button>
            {/* TODO: hide if nothing in cargo or not docked at marketplace*/}
            {/* TODO: select which cargo to sell*/}
            <Button variant="outline">Sell Cargo</Button>
            {/* TODO: hide if not docked in the same location as the receiving ship */}
            <Button variant="outline">Transfer</Button>
          </>
        )}

        {printButtonRow(
          'WORK',
          <>
            {/* TODO: hide if there is already a contract */}
            {/* TODO: hide if not at faction HQ */}
            <Button variant="outline">Negotiate</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

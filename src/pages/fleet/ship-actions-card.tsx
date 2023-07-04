import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  jumpDrives,
  refineries,
  sensorArrays,
  warpDrives,
} from '@/helpers/constants';

function printButtonRow(title: string, buttons: any) {
  let hideRow = false;

  if (Array.isArray(buttons.props.children)) {
    hideRow = buttons.props.children.every(
      (child: React.JSX.Element | boolean) => child === false
    );
  } else {
    hideRow = !buttons.props.children;
  }

  return hideRow ? (
    ''
  ) : (
    <div className="flex flex-row gap-3">
      <h4 className="w-1/4 md:basis-1/6">{title}</h4>
      <div className="flex w-3/4 flex-row flex-wrap gap-3 md:basis-3/4">
        {buttons}
      </div>
    </div>
  );
}

export default function ShipActionsCard({
  agent,
  contracts,
  dockHandler,
  market,
  orbitHandler,
  ship: { cargo, fuel, modules, mounts, nav, symbol },
  waypoint,
}: {
  agent: Agent;
  contracts: Contract[];
  dockHandler: () => void;
  market: Market;
  orbitHandler: () => void;
  ship: Ship;
  waypoint: Waypoint;
}) {
  const atAsteroidField = waypoint.traits.some(
    (trait) => trait.symbol === 'ASTEROID_FIELD'
  );
  const atHq = nav.waypointSymbol === agent.headquarters;
  const atJumpGate = waypoint.type === 'JUMP_GATE';
  const atMarketplace = waypoint.traits.some(
    (trait) => trait.symbol === 'MARKETPLACE'
  );
  const hasAntimatter = cargo.inventory.some(
    (item) => item.symbol === 'ANTIMATTER'
  );
  const hasCargo = cargo.units > 0;
  const hasCargoSpace = cargo.capacity - cargo.units > 0;
  const hasContracts = contracts.length > 0;
  const hasJumpDrive = modules.some((module) =>
    jumpDrives.includes(module.symbol)
  );
  const hasMiningLaser = mounts.some(
    (mount) => mount.symbol === 'MINING_LASER'
  );
  const hasRefinery = modules.some((module) =>
    refineries.includes(module.symbol)
  );
  const hasSensorArray = mounts.some((mount) =>
    sensorArrays.includes(mount.symbol)
  );
  const hasWarpDrive = modules.some((module) =>
    warpDrives.includes(module.symbol)
  );
  const isInOrbit = nav.status === 'IN_ORBIT';
  const isDocked = nav.status === 'DOCKED';
  const isUncharted = waypoint.traits.some(
    (trait) => trait.symbol === 'UNCHARTED'
  );
  const needsFuel = fuel.current <= fuel.capacity - 100;
  const sellsFuel = market
    ? market.tradeGoods.some((tradeGoods) => tradeGoods.symbol === 'FUEL')
    : false;

  const canJump =
    isInOrbit && atJumpGate ? true : hasJumpDrive && hasAntimatter;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ACTIONS</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {printButtonRow(
          'NAV',
          <>
            {isInOrbit && (
              <Button variant="outline" onClick={dockHandler}>
                Dock
              </Button>
            )}
            {isDocked && (
              <Button variant="outline" onClick={orbitHandler}>
                Orbit
              </Button>
            )}
            {isDocked && needsFuel && sellsFuel && (
              <Button variant="outline">Refuel</Button>
            )}
            {/* TODO: select location to navigate to and try to calculate fuel costs*/}
            {isInOrbit && <Button variant="outline">Navigate</Button>}
            {/* TODO: select location to jump to */}
            {canJump && <Button variant="outline">Jump</Button>}
            {/* TODO: disable if ship doesn't have enough fuel to complete warp */}
            {/* TODO: select location to warp to */}
            {isInOrbit && hasWarpDrive && (
              <Button variant="outline">Warp</Button>
            )}
            {/* TODO: select which flight mode to change to */}
            <Button variant="outline">Change Flight Mode</Button>
          </>
        )}

        {printButtonRow(
          'CHART',
          <>
            {isUncharted && <Button variant="outline">Chart</Button>}
            {/* TODO: work on the backend to capture this data */}
            {hasSensorArray && <Button variant="outline">Scan Ships</Button>}
            {hasSensorArray && <Button variant="outline">Scan Systems</Button>}
            {hasSensorArray && (
              <Button variant="outline">Scan Waypoints</Button>
            )}
          </>
        )}

        {printButtonRow(
          'MINE',
          <>
            {/* TODO: select which minerals to extract */}
            {/* TODO: determine which types of minerals that can be extracted based on Gas Siphon or Mining Laser */}
            {isInOrbit && atAsteroidField && hasMiningLaser && (
              <Button variant="outline">Extract</Button>
            )}
            {/* TODO: hide if no cargo, no refiner, or no refinery materials */}
            {hasRefinery && hasCargo && (
              <Button variant="outline">Refine</Button>
            )}
            {/* TODO: work on storing the survey information for extraction */}
            {atAsteroidField && <Button variant="outline">Survey</Button>}
          </>
        )}

        {printButtonRow(
          'CARGO',
          <>
            {/* TODO: select which cargo to jettison */}
            {hasCargo && <Button variant="outline">Jettison</Button>}
            {atMarketplace && hasCargoSpace && (
              <Button variant="outline">Purchase Cargo</Button>
            )}
            {/* TODO: select which cargo to sell*/}
            {atMarketplace && hasCargo && (
              <Button variant="outline">Sell Cargo</Button>
            )}
            {/* TODO: select the ship to transfer with */}
            {isDocked && <Button variant="outline">Transfer</Button>}
          </>
        )}

        {printButtonRow(
          'WORK',
          <>
            {atHq && !hasContracts && (
              <Button variant="outline">Negotiate</Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

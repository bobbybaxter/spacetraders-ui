/* eslint-disable react/jsx-no-comment-textnodes */
import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  camelToSnakeCase,
  fetcher,
  printDelimiter,
  ssrResponseHandler,
} from '@/helpers/index';
import shipActionsCard from './ship-actions-card';
import shipLocationCard from './ship-location-card';
import shipStatusCard from './ship-status-card';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const agentUrl = `${baseUrl}/api/my/agent`;
const contractsUrl = `${baseUrl}/api/my/contracts`;
const shipsUrl = `${baseUrl}/api/my/ships`;

// TODO: have a selected ship state of All

const Fleet: NextPage = () => {
  const [selectedShip, setSelectedShip] = useState<Ship>();
  const { data: agent } = useSWR<Agent, Error>(agentUrl, fetcher);
  const { data: contracts } = useSWR<Contract[], Error>(contractsUrl, fetcher);
  const { data: ships, mutate: refetchShips } = useSWR<Ship[], Error>(
    shipsUrl,
    fetcher
  );
  const { data: waypoint } = useSWR<Waypoint, Error>(
    selectedShip
      ? `${baseUrl}/api/systems/${selectedShip.nav.systemSymbol}/waypoints/${selectedShip.nav.waypointSymbol}`
      : null,
    fetcher
  );
  const { data: market } = useSWR<Market, Error>(
    selectedShip
      ? `${baseUrl}/api/systems/${selectedShip.nav.systemSymbol}/waypoints/${selectedShip.nav.waypointSymbol}/market`
      : null,
    fetcher
  );

  const router = useRouter();

  useEffect(() => {
    if (ships) {
      setSelectedShip(ships[0]);
    }
  }, [ships]);

  function refreshData() {
    router.replace(router.asPath);
  }

  async function dockHandler() {
    const res = await fetch(
      `${baseUrl}/api/my/ships/${selectedShip?.symbol}/dock`,
      { method: 'POST' }
    );

    const { nav } = await ssrResponseHandler(res);
    setSelectedShip({ ...(selectedShip as Ship), nav });
  }

  async function orbitHandler() {
    const res = await fetch(
      `${baseUrl}/api/my/ships/${selectedShip?.symbol}/orbit`,
      { method: 'POST' }
    );

    const { nav } = await ssrResponseHandler(res);
    setSelectedShip({ ...(selectedShip as Ship), nav });
  }

  if (!agent || !contracts || !ships || !waypoint || !market) {
    return <div>Loading...</div>;
  }

  function updateShip(selectShipSymbol: string) {
    setSelectedShip(ships?.find((ship) => ship.symbol === selectShipSymbol));
  }

  const DropdownList = ships.map((ship) => {
    return (
      <SelectItem key={ship.symbol} value={ship.symbol}>
        {ship.symbol}
      </SelectItem>
    );
  });

  function listItem(title: string, value: string | number) {
    let displayTitle = title;
    if (title === 'slots' && value === 1) {
      displayTitle = 'slot';
    }

    return (
      <>
        {value}{' '}
        <span className="pl-1 text-muted-foreground">
          {displayTitle || title}
        </span>
      </>
    );
  }

  function requirementsCard(
    key: string,
    { power, crew, slots }: ShipRequirements
  ) {
    return (
      <tr key={key}>
        <td className="p-0 pr-3 align-top text-muted-foreground-darker">
          {key}
        </td>
        <td className="p-0">
          <p>
            {crew > 0 && listItem('crew', crew)}
            {crew > 0 && (power || slots) ? printDelimiter() : ''}
            {power && listItem('power', power)}
            {slots && printDelimiter()}
            {slots && listItem('slots', slots)}
          </p>
        </td>
      </tr>
    );
  }

  function shipNavRouteWaypointCard(
    key: string,
    { symbol, type, x, y }: ShipNavRouteWaypoint
  ) {
    const tdKeyClass = 'p-0 text-muted-foreground pr-3 align-top';
    return (
      <tr>
        <td className={tdKeyClass}>{key}</td>
        <td className="p-0">
          <span>
            {x}, {y} {printDelimiter()} {type} {printDelimiter()} {symbol}
          </span>
        </td>
      </tr>
    );
  }

  function moduleCard(module: ShipModule | ShipMount, index: number) {
    return (
      <div className="w-[390px]" key={`${module.symbol}_${index}`}>
        {buildCard('', module)}
      </div>
    );
  }

  // function shipModuleCard(key: string, module: ShipModule) {
  //   return (
  //     <tr key={key}>
  //       <td className="text-muted-foreground-darker pr-3 align-top">{key}</td>
  //       <td>
  //         <p>
  //           {module.type} {printDelimiter()} {module.name}
  //         </p>
  //       </td>
  //     </tr>
  //   );
  // }

  function buildCard(title: string, content: any, inner = false) {
    function printContentAsTable(content: any) {
      const arr = Object.entries(content);
      return arr.map(([key, value]: [key: string, value: any]) => {
        if (key === 'requirements') {
          return requirementsCard(key, value);
        }
        if (key === 'destination' || key === 'departure') {
          return shipNavRouteWaypointCard(key, value);
        }

        return (
          <tr key={key}>
            <td className="p-0 pr-3 align-top text-muted-foreground-darker">
              {camelToSnakeCase(key)}
            </td>
            {typeof value === 'string' || typeof value === 'number' ? (
              <td className="max-w-xs p-0">{value}</td>
            ) : (
              <td className="p-0">{buildCard('', value, true)}</td>
            )}
          </tr>
        );
      });
    }

    if (!inner) {
      return (
        <Card className="background-pattern h-full">
          <CardHeader>
            <CardTitle>{title.toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <table>
              <tbody>{printContentAsTable(content)}</tbody>
            </table>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <table>
          <tbody>{printContentAsTable(content)}</tbody>
        </table>
      );
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-between p-3">
      <div
        className={clsx(
          'z-10 w-full items-start justify-between',
          'font-mono text-sm lg:flex'
        )}
      >
        <Head>
          <title>Fleet</title>
          <meta name="description" content="Fleet" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="wrap flex w-full flex-col gap-3">
          {/* SHIP SELECTOR */}
          <Select onValueChange={(shipSymbol) => updateShip(shipSymbol)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={selectedShip?.symbol} />
            </SelectTrigger>
            <SelectContent>{DropdownList}</SelectContent>
          </Select>

          {/* SHIP NAME */}
          <div className="flex flex-col sm:flex-row sm:items-end">
            <h1 className="mr-3">{selectedShip?.registration.name}</h1>
            <p className="text-base text-muted-foreground">
              {selectedShip?.registration.role} {printDelimiter()}{' '}
              {selectedShip?.registration.factionSymbol}
            </p>
          </div>

          {/* TODO: change to flex-column when screen is smaller */}
          <div className="wrap flex flex-col gap-3 lg:flex-row">
            <div className="wrap flex flex-col gap-3">
              {/* SHIP STATUS */}
              {selectedShip && shipStatusCard(selectedShip)}
              {/* SHIP LOCATION */}
              {waypoint && shipLocationCard(waypoint)}
            </div>

            {/* SHIP ACTIONS */}
            {selectedShip &&
              waypoint &&
              market &&
              shipActionsCard({
                agent,
                contracts,
                dockHandler,
                market,
                orbitHandler,
                ship: selectedShip,
                waypoint,
              })}
          </div>

          {/* MODULES */}
          <div>
            <h2 className="text-muted-foreground">MODULES</h2>
            <div className="mt-3 flex w-full flex-row flex-wrap gap-3">
              {selectedShip?.modules &&
                selectedShip.modules.map((module, index) =>
                  moduleCard(module, index)
                )}
            </div>
          </div>

          {/* MOUNTS */}
          <div>
            <h2 className="text-muted-foreground">MOUNTS</h2>
            <div className="mt-3 flex w-full flex-row flex-wrap gap-3">
              {selectedShip?.mounts &&
                selectedShip.mounts.map((mount) => moduleCard(mount))}
            </div>
          </div>

          {/* MISC DETAILS */}
          <div>
            <h2 className="text-muted-foreground">MISC DETAILS</h2>
            <div className="mt-3 flex w-full flex-row flex-wrap gap-3">
              <div className="w-fit">
                {buildCard('Cargo', selectedShip?.cargo)}
              </div>
              <div className="w-fit">
                {buildCard('Crew', selectedShip?.crew)}
              </div>
              <div className="w-[400px]">
                {buildCard('Reactor', selectedShip?.reactor)}
              </div>
              <div className="w-[400px]">
                {buildCard('Frame', selectedShip?.frame)}
              </div>
              <div className="w-[400px]">
                {buildCard('Engine', selectedShip?.engine)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;

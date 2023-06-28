/* eslint-disable react/jsx-no-comment-textnodes */
import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { camelToSnakeCase } from '@/helpers/camel-to-snake-case';
import printDelimiter from '@/helpers/print-delimiter';
import shipActionsCard from './ship-actions-card';
import shipStatusCard from './ship-status-card';

type HomeProps = { ships: Ship[] };

// TODO: have a selected ship state of All
const Fleet: NextPage<HomeProps> = ({ ships }) => {
  const [selectedShip, setSelectedShip] = useState<Ship | undefined>(ships[0]);

  function updateShip(selectShipSymbol: string) {
    setSelectedShip(ships.find((ship) => ship.symbol === selectShipSymbol));
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
        <span className="pl-1 text-muted-foreground">{displayTitle}</span>
      </>
    );
  }

  function requirementsCard(
    key: string,
    { power, crew, slots }: ShipRequirements
  ) {
    return (
      <tr key={key}>
        <td className="text-muted-foreground-darker pr-3 align-top">{key}</td>
        <td>
          <p>
            {crew && listItem('crew', crew)}
            {power || slots ? printDelimiter() : ''}
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
    const tdKeyClass = 'text-muted-foreground pr-3 align-top';
    return (
      <tr>
        <td className={tdKeyClass}>{key}</td>
        <td>
          <span>
            {x}, {y} {printDelimiter()} {type} {printDelimiter()} {symbol}
          </span>
        </td>
      </tr>
    );
  }

  function shipModuleCard(key: string, module: ShipModule) {
    return (
      <tr key={key}>
        <td className="text-muted-foreground-darker pr-3 align-top">{key}</td>
        <td>
          <p>
            {module.type} {printDelimiter()} {module.name}
          </p>
        </td>
      </tr>
    );
  }

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
            <td className="text-muted-foreground-darker p-0 pr-3 align-top">
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
        <Card className="max-h-min">
          <CardHeader>
            <CardTitle>{title.toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <tbody>{printContentAsTable(content)}</tbody>
          </CardContent>
        </Card>
      );
    } else {
      return printContentAsTable(content);
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
          <div className="flex flex-row items-end">
            <h1 className="mr-3">{selectedShip?.registration.name}</h1>
            <p className="text-base text-muted-foreground">
              {selectedShip?.registration.role} {printDelimiter()}{' '}
              {selectedShip?.registration.factionSymbol}
            </p>
          </div>

          {/* TODO: change to flex-column when screen is smaller */}
          <div className="wrap flex flex-row gap-3">
            {/* SHIP STATUS */}
            {selectedShip && shipStatusCard(selectedShip)}

            {/* SHIP ACTIONS */}
            {selectedShip && shipActionsCard(selectedShip)}
          </div>

          {/* SHIP DETAILS */}
          <div>
            <h2 className="text-muted-foreground">MISC DETAILS</h2>
          </div>
          <div className="flex w-full flex-row flex-wrap gap-3">
            {buildCard('Cargo', selectedShip?.cargo)}
            {buildCard('Crew', selectedShip?.crew)}
            {buildCard('Reactor', selectedShip?.reactor)}
            {buildCard('Frame', selectedShip?.frame)}
            {buildCard('Engine', selectedShip?.engine)}
            {buildCard('Nav', selectedShip?.nav)}
            {buildCard('Mounts', selectedShip?.mounts)}
            {buildCard('Modules', selectedShip?.modules)}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const shipsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/my/ships`,
    {
      method: 'GET',
    }
  );

  if (shipsRes.status !== 200) {
    throw new Error(`Error: ${shipsRes.status}`);
  }

  const ships: Ship[] = await shipsRes.json();

  return { props: { ships } };
}

export default Fleet;

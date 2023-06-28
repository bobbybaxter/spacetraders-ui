interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
}

interface AgentDetails {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
}

interface Ship {
  symbol: string;
  registration: ShipRegistration;
  nav: ShipNav;
  crew: ShipCrew;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  modules: ShipModule[];
  mounts: ShipMount[];
  cargo: ShipCargo;
  fuel: ShipFuel;
}

interface ShipCargo {
  capacity: number;
  units: number;
  inventory: ShipCargoItem[];
}

interface ShipCargoItem {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

interface ShipCrew {
  current: number;
  required: number;
  capacity: number;
  rotation: string;
  morale: number;
  wages: number;
}

interface ShipEngine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  speed: number;
  requirements: ShipRequirements;
}

interface ShipFrame {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: ShipRequirements;
}

interface ShipFuel {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: string;
  };
}

interface ShipNav {
  systemSymbol: string;
  waypointSymbol: string;
  route: ShipNavRoute;
  status: string;
  flightMode: string;
}

interface ShipModule {
  symbol: string;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: ShipRequirements;
}

interface ShipMount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits: string[];
  requirements: ShipRequirements;
}

interface ShipNavRoute {
  destination: ShipNavRouteWaypoint;
  departure: ShipNavRouteWaypoint;
  departureTime: string;
  arrival: string;
}

interface ShipNavRouteWaypoint {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

interface ShipReactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  powerOutput: number;
  requirements: ShipRequirements;
}

interface ShipRegistration {
  name: string;
  factionSymbol: string;
  role: string;
}

interface ShipRequirements {
  crew: number;
  power?: number;
  slots?: number;
}

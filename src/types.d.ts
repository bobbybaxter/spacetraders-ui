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

interface Chart {
  waypointSymbol: string;
  submittedBy: string;
  submittedOn: Date;
}

interface Contract {
  id: string;
  factionSymbol: string;
  type: string;
  terms: ContractTerms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: Date;
  deadlineToAccept: Date;
}

interface ContractDeliverGood {
  tradeSymbol: string;
  destinalSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

interface ContractPayment {
  onAccepted: number;
  onFulfilled: number;
}

interface ContractTerms {
  deadline: Date;
  payment: ContractPayment;
  deliver: ContractDeliverGood[];
}

interface Market {
  symbol: string;
  exports: TradeGood[];
  imports: TradeGood[];
  exchange: TradeGood[];
  transactions: MarketTransaction[];
  tradeGoods: MarketTradeGood[];
}

interface MarketTradeGood {
  symbol: string;
  tradeVolume: number;
  supply: string;
  purchasePrice: number;
  sellPrice: number;
}

interface MarketTransaction {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: string;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: Date;
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
    timestamp: Date;
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
  departureTime: Date;
  arrival: Date;
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

interface TradeGood {
  symbol: string;
  name: string;
  description: string;
}

interface Waypoint {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: string[];
  faction: WaypointFaction;
  traits: WaypointTrait[];
  chart: Chart;
}

interface WaypointFaction {
  symbol: string;
}

interface WaypointTrait {
  symbol: string;
  name: string;
  description: string;
}

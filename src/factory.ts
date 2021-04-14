abstract class TransportCreator {
  abstract fabricMethod(): ITransport;

  public someFunctions(): void {
    console.log("action");
  }
}

interface ITransport {
  brand: string;
  move(): string;
}

class Truck implements ITransport {
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  public move(): string {
    return `Truck ${this.brand} is moving`;
  }
}

class Plane implements ITransport {
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  public move(): string {
    return `Plane ${this.brand} is flying`;
  }
}

class TruckCreator extends TransportCreator {
  constructor(public brand: string) {
    super();
    this.brand = brand;
  }

  fabricMethod(): ITransport {
    return new Truck(this.brand);
  }
}

class PlaneCreator extends TransportCreator {
  constructor(public brand: string) {
    super();
    this.brand = brand;
  }

  fabricMethod(): ITransport {
    return new Plane(this.brand);
  }
}

enum PLANE_BRANDS {
  AIRBUS = "Airbus",
  BOEING = "Boeing",
}

enum TRUCK_BRANDS {
  MAN = "Man",
  PEUGEOT = "Peugeot",
}

const postOffice = (transportCreator: TransportCreator) => {
  const transport = transportCreator.fabricMethod();
  const deliveringMessage = transport.move();
  console.log(deliveringMessage);
};

const airbusCreator: TransportCreator = new PlaneCreator(PLANE_BRANDS.AIRBUS);
const boeingCreator: TransportCreator = new PlaneCreator(PLANE_BRANDS.BOEING);
const manCreator: TransportCreator = new TruckCreator(TRUCK_BRANDS.MAN);

interface IProductA {
  getInfo(): string;
}

interface IProductB {
  getInfo(): string;
}

class RedProductA implements IProductA {
  getInfo(): string {
    return "Red product A";
  }
}

class RedProductB implements IProductB {
  getInfo(): string {
    return "Red product B";
  }
}

class BlueProductA implements IProductA {
  getInfo(): string {
    return "Blue product A";
  }
}

class BlueProductB implements IProductB {
  getInfo(): string {
    return "Blue product B";
  }
}

abstract class AbstractFactory {
  abstract createProductA(): IProductA;
  abstract createProductB(): IProductB;
}

class RedItemsFactory extends AbstractFactory {
  createProductA(): IProductA {
    return new RedProductA();
  }
  createProductB(): IProductB {
    return new RedProductB();
  }
}

class BlueItemsFactory extends AbstractFactory {
  createProductA(): IProductA {
    return new BlueProductA();
  }
  createProductB(): IProductB {
    return new BlueProductB();
  }
}

const clientCode = (factory: AbstractFactory) => {
  const productA = factory.createProductA();
  const productB = factory.createProductB();
  console.log(productA.getInfo());
  console.log(productB.getInfo());
};

const blueItemsFactory = new BlueItemsFactory();
const redItemsFactory = new RedItemsFactory();

clientCode(blueItemsFactory);

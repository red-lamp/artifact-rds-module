import { PortIBCalculation } from '../ports/port.ib.calculation';

export class FooControllerAdapter implements PortIBCalculation {
  totalItems(lengthOfUser: number, lengthOfAdmin: number): number {
    return lengthOfUser + lengthOfAdmin;
  }
}

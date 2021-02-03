import { PortIBDecorator } from '../ports/port.ib.decorator';

export class FooControllerAdapter implements PortIBDecorator {
  totalItems(lengthOfUser: number, lengthOfAdmin: number): number {
    return lengthOfUser + lengthOfAdmin;
  }
}

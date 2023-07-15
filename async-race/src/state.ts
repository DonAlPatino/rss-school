export default class State {
  idUpdateCar:number;

  constructor() {
    this.idUpdateCar = 0;
  }

  setIdUpdateCar(idUpdateCar:number):void {
    this.idUpdateCar = idUpdateCar;
  }

  getIdUpdateCar():number {
    return this.idUpdateCar;
  }
}

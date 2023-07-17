export default class State {
  idUpdateCar:number;

  infoAnimation: Animation[];

  constructor() {
    this.idUpdateCar = 0;
    this.infoAnimation = [];
  }

  setIdUpdateCar(idUpdateCar:number):void {
    this.idUpdateCar = idUpdateCar;
  }

  getIdUpdateCar():number {
    return this.idUpdateCar;
  }

  setIdAnimation(idCar: number, animation:Animation):void {
    this.infoAnimation[idCar] = animation;
    this.infoAnimation[idCar].id = idCar.toString();
  }

  getIdAnimation(idCar: number):Animation {
    return this.infoAnimation[idCar] ;
  }

}

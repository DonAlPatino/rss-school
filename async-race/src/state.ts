import { Pages } from './types';

export default class State {
  idUpdateCar:number;

  activePage: Pages;

  infoAnimation: Animation[];

  curGaragePage:number;

  curWinnersPage:number;

  raceArr: number [];

  startRace: number;

  constructor() {
    this.idUpdateCar = 0;
    this.infoAnimation = [];
    this.activePage = Pages.GARAGE;
    this.curGaragePage = 1;
    this.curWinnersPage = 1;
    this.raceArr = [];
    this.startRace = 0;
  }

  setCurWinnersPage(curGaragePage: number):void {
    this.curWinnersPage = curGaragePage;
  }

  getCurWinnersPage():number {
    return this.curWinnersPage;
  }

  setCurGaragePage(curGaragePage: number):void {
    this.curGaragePage = curGaragePage;
  }

  getCurGaragePage():number {
    return this.curGaragePage;
  }

  setActivePage(activePage: Pages):void {
    this.activePage = activePage;
  }

  getActivePage():Pages {
    return this.activePage;
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

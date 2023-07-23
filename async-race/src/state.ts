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
    this.curGaragePage = Number(JSON.parse(localStorage.getItem('curGaragePage') || '1'));
    this.curWinnersPage = Number(JSON.parse(localStorage.getItem('curWinnersPage') || '1'));
    this.raceArr = [];
    this.startRace = 0;
  }

  setCurWinnersPage(curGaragePage: number):void {
    this.curWinnersPage = curGaragePage;
    localStorage.setItem('curWinnersPage', this.curWinnersPage.toString());
  }

  getCurWinnersPage():number {
    this.curWinnersPage = Number(JSON.parse(localStorage.getItem('curWinnersPage') || '1'));
    return this.curWinnersPage;
  }

  setCurGaragePage(curGaragePage: number):void {
    this.curGaragePage = curGaragePage;
    localStorage.setItem('curGaragePage', this.curGaragePage.toString());
  }

  getCurGaragePage():number {
    this.curGaragePage = Number(JSON.parse(localStorage.getItem('curGaragePage') || '1'));
    return this.curGaragePage;
  }

  setActivePage(activePage: Pages):void {
    this.activePage = activePage;
    localStorage.setItem('activePage', this.activePage.toString());
  }

  getActivePage():Pages {
    this.activePage = <Pages>localStorage.getItem('activePage') || Pages.GARAGE;
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

// TODO может его в статик?
export default class State {
    private currentLevel: number;
    // private progress: any[];
    constructor() {
        this.currentLevel = 1;
        //this.progress = [];
    }
    getCurrentLevel(): number {
        this.currentLevel= Number(JSON.parse(localStorage.getItem('currentLevel') || '1'));
        return this.currentLevel;
    }
    setCurrentLevel(currentLevel:number): void {
        this.currentLevel = currentLevel;
        localStorage.setItem('currentLevel', this.currentLevel.toString());
    }
    clearData(): void {
        localStorage.removeItem('currentLevel');
        localStorage.removeItem('progressBirds');
    }
}

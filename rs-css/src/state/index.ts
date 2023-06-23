// TODO может его в статик?
import {levels} from "../data/data";

export default class State {
    private currentLevel: number;
    private maxLevel: number;
    private progress: boolean[];

    constructor() {
        this.currentLevel = 0;
        this.maxLevel = levels.length - 1;
        this.progress = Array(this.maxLevel).fill(false);
    }
    getCurrentLevel(): number {
        this.currentLevel= Number(JSON.parse(localStorage.getItem('currentLevel') || '1'));
        return this.currentLevel;
    }
    setCurrentLevel(currentLevel:number): void {
        this.currentLevel = currentLevel;
        localStorage.setItem('currentLevel', this.currentLevel.toString());
    }

    getProgress(): boolean[] {
        const progress = JSON.parse(localStorage.getItem('progress') || '1 ')
        if (progress === 1) this.progress= Array(this.maxLevel).fill(false);
        else this.progress = progress;
        return this.progress;
    }
    setProgress(currentLevel:number): void {
        this.progress[currentLevel] = true;
        localStorage.setItem('progress', JSON.stringify(this.progress));
    }
    clearData(): void {
        localStorage.removeItem('currentLevel');
        localStorage.removeItem('progress');
    }
}

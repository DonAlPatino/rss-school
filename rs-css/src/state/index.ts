// TODO может его в статик?
import {levels} from "../data/data";

export default class State {
    private currentLevel: number;
    maxLevel: number;
    private progress: boolean[];
    private help: boolean[];

    constructor() {
        this.currentLevel = 0;
        this.maxLevel = levels.length - 1;
        this.progress = Array(this.maxLevel).fill(false);
        this.help = Array(this.maxLevel).fill(false);
        this.maxLevel = levels.length;

    }
    getCurrentLevel(): number {
        this.currentLevel= Number(JSON.parse(localStorage.getItem('currentLevel') || '0'));
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

    getHelp(): boolean[] {
        const help = JSON.parse(localStorage.getItem('help') || '1 ')
        if (help === 1) this.help= Array(this.maxLevel).fill(false);
        else this.help = help;
        return this.help;
    }
    setHelp(currentLevel:number): void {
        this.help[currentLevel] = true;
        localStorage.setItem('help', JSON.stringify(this.help));
    }

    clearData(): void {
        localStorage.removeItem('currentLevel');
        localStorage.removeItem('progress');
        localStorage.removeItem('help');
    }
}

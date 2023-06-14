export default class GameComponent {
    private readonly cry: string;
    constructor(cry: string) {
        this.cry = cry;
    }

    render(): HTMLDivElement {
        const game = document.createElement('div');
        game.classList.add('game');

        // TODO: Game
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerText = this.cry;

        game.append(task);
        // TODO: Game
        return game;
    }
}

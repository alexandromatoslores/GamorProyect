class Room {
    constructor(name, platform, game, members, state, language) {
        this.name = name;
        this.platform = platform;
        this.game = game;
        this.members = members;
        this.state = state;
        this.language = language;
    }
}

class Game {
    constructor(name, category) {
        this.name = name;
        this.category = category;
    }
}

export { Room, Game }; 
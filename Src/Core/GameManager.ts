class GameManager {
  private static instance: GameManager;
  private constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  public startGame(): void {
    console.log("Game started");
  }

  public endGame(): void {
    console.log("Game ended");
  }
}

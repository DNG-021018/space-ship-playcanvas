export class HealthSystem {
  private maxHealth: number;
  private currentHealth: number;

  constructor(initialHealth: number) {
    this.maxHealth = initialHealth;
    this.currentHealth = initialHealth;
  }

  public takeDamage(amount: number): void {
    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.onDeath();
    }
  }

  public heal(amount: number): void {
    this.currentHealth += amount;
    if (this.currentHealth >= this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
  }

  public isAlive(): boolean {
    return this.currentHealth > 0;
  }

  public onDeath(): boolean {
    return this.currentHealth <= 0;
  }
}

export function HealthSystem(initialHealth) {
  this.maxHealth = initialHealth;
  this.currentHealth = initialHealth;
}

HealthSystem.prototype = {
  takeDamage: function (amount) {
    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.onDeath();
    }
  },

  heal: function (amount) {
    this.currentHealth += amount;
    if (this.currentHealth >= this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
  },

  isAlive: function () {
    return this.currentHealth > 0;
  },

  onDeath: function () {
    return this.currentHealth <= 0;
  },
};

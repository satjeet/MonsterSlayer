new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turno: 0,
    registroCombate: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = !this.gameIsRunning;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turno = 0;
      this.registroCombate = [];
    },
    attack: function() {
      var max = 10;
      var min = 3;
      var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.monsterHealth -= damage;
      this.registroCombate.unshift({
        jugador: 'El jugador le pego al enemigo ' + damage
      });
      //ataque del enemigo(min,max)
      this.ataqueEnemigo(5, 12);
      this.condicionVictoria();
      this.turno++;
    },
    specialAttack: function() {
      //ataque del jugador
      var max = 17;
      var min = 8;

      var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.monsterHealth -= damage;
      this.registroCombate.unshift({
        jugador: 'El jugador le pego Duro al enemigo ' + damage
      });
      //ataque del enemigo(min,max)
      this.ataqueEnemigo(5, 12);
      this.condicionVictoria();
      this.turno++;
    },
    heal: function() {
      if (this.playerHealth <= 85) {
        this.playerHealth += 15;
      } else {
        this.playerHealth = 100;
      }
      this.registroCombate.unshift({
        jugador: 'El jugador se curo 15'
      });
      this.ataqueEnemigo(5, 12);

      this.turno++;
    },
    giveUp: function() {
      this.registroCombate.unshift({
        jugador: 'El jugador es un cobarde y se rindio'
      });
      this.gameIsRunning = false;
    },
    ataqueEnemigo: function(min, max) {
      var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      this.playerHealth -= damage;
      this.registroCombate.unshift({
        enemigo: 'El enemigo le pego al jugador ' + damage
      });
    },
    condicionVictoria: function() {
      if (this.playerHealth <= 0) {
        if (confirm('Perdiste, deseas volver a jugar?')) {
          this.startGame;
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.monsterHealth <= 0) {
        if (confirm('Ganaste, deseas volver a jugar?')) {
          this.startGame;
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
    }
  }

  //
});

class Demonstration extends Phaser.Scene{
    constructor(){
        super("demonstrationScene");
    }

    preload(){ 
        // load images/title sprites
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create(){
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        // place rocket
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,  borderUISize*5 + borderPadding*2, 'spaceship', 0, 30).setOrigin(0,0);

          // Text configuration
          let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ff4d00',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.clock = this.time.delayedCall(1500, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 4 * (borderUISize + borderPadding), "Your incessant toys keep trespassing", textConfig).setOrigin(0.5);
    }, null, this);
        
        this.clock = this.time.delayedCall(3000, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 3 * (borderUISize + borderPadding), 'in MY domain', textConfig).setOrigin(0.5);
    }, null, this);

        this.clock = this.time.delayedCall(4500, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'I want you to kill them', textConfig).setOrigin(0.5);
    }, null, this);
        

        this.clock = this.time.delayedCall(6000, () => {
            this.add.text(game.config.width/2, game.config.height/2 + 2 * (borderUISize + borderPadding), 'Using your own bodies as kindling', textConfig).setOrigin(0.5);
    }, null, this);

        this.clock = this.time.delayedCall(7500, () => {
            this.add.text(game.config.width/2, game.config.height/2 + 4 * (borderUISize + borderPadding), "(Don't worry)", textConfig).setOrigin(0.5);
    }, null, this);

        this.clock = this.time.delayedCall(9000, () => {
            this.scene.start("encourageScene");
        }, null, this);
    }

    update(){
        this.starfield.tilePositionX -= starSpeed;
        this.ship01.update();
    }
}
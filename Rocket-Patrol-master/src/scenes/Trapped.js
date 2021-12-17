class Trapped extends Phaser.Scene {
    constructor(){
        super("trappedScene");
    }
    preload(){ 
        // load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('hands', './assets/Hands.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create(){
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // place handbackdrop
        this.hands = this.add.tileSprite(0, 0, 640, 480, 'hands').setOrigin(0, 0);

        //place unmoving rockets
        this.p1Rocket = new Rocket(this, game.config.width/2 - (borderPadding +  borderUISize)/2, game.config.height/2 + (borderPadding + borderUISize), 'rocket', true).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2 + 2 *(borderPadding + borderUISize), game.config.height/2 + (borderPadding + borderUISize), 'rocket', false).setOrigin(0.5, 0);
        
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
        
        // Switch back after 1.5 seconds
        this.clock = this.time.delayedCall(1000, () => {
            this.add.text(game.config.width/4, game.config.height/2 - 4 * (borderUISize + borderPadding), 'How does it feel?', textConfig).setOrigin(0.5);
        }, null, this);

        this.clock = this.time.delayedCall(2500, () => {
            firstTime = false; 
            this.scene.start('mockeryScene');
        }, null, this);
    }

    update(){
        this.starfield.tilePositionX -= starSpeed;
    }
}
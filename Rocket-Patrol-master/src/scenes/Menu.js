class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
         // load audio
         this.load.audio('sfx_select', './assets/blip_select12.wav');
         this.load.audio('sfx_explosion', './assets/explosion38.wav');
         this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
         this.load.image('starfield', './assets/starfield.png');
         this.load.image('hands', './assets/Hands.png');
    }

    create(){
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // place handbackdrop
        this.hands = this.add.tileSprite(0, 0, 640, 480, 'hands').setOrigin(0, 0);

        // menu text configuration
        let menuConfig = {
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

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 4 * (borderUISize + borderPadding), 'HAND OF CHAOS', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#c0f';
        this.add.text(game.config.width/2, game.config.height/2 - 2 * (borderUISize + borderPadding), 'Player 1', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00b1ff';
        this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding), 'Use <--> to move & SHIFT to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#c0f';
        this.add.text(game.config.width/2, game.config.height/2, 'Player 2', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00b1ff';
        this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), 'Use A & D to move & F to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        this.add.text(game.config.width/2, game.config.height/2 + 3 * (borderUISize + borderPadding), 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#c0f';
        this.add.text(game.config.width/2, game.config.height/2 + 4 * (borderUISize + borderPadding), 'High Score:' + highScore, menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //this.starfield.tilePositionX -= starSpeed;
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            if(!firstTime){
                this.scene.start('dialogueScene');
            }
            else if(firstTime = true){
                this.scene.start('playScene');
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            if(!firstTime){
                this.scene.start('dialogueScene');
            }
            else if(firstTime = true){
                this.scene.start('playScene');
            }
        }
    }
}
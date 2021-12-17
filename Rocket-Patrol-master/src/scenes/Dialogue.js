class Dialogue extends Phaser.Scene {
    constructor(firstTime = false){
        super("dialogueScene");
        let enterTimes = 0;
    }

    preload(){ 
        // load images/title sprites
        this.load.image('body', './assets/Body.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create(){
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // Add body
        this.body = this.add.tileSprite(0, 0, 640, 480, 'body').setOrigin(0, 0);

        // Dialogue text configuration
        let diaConfig = {
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

        // Dialogue on timer based on firstTime true or not
        if(!firstTime){
            this.clock = this.time.delayedCall(1000, () => {
                this.add.text(game.config.width/2, game.config.height/2 + 3 * (borderUISize + borderPadding), 'Well Mortals...', diaConfig).setOrigin(0.5);
            }, null, this);
            
            this.clock = this.time.delayedCall(2500, () => {
                this.add.text(game.config.width/2 - 2 * (borderUISize + borderPadding), game.config.height/2 + 4* (borderUISize + borderPadding), 'You are in my hand.', diaConfig).setOrigin(0.5);  
            }, null, this);
    
            this.clock = this.time.delayedCall(4500, () => {
                this.scene.start('trappedScene');
            }, null, this);
        }
        if(firstTime == true){
            this.add.text(3 * game.config.width/4 - (borderUISize + borderPadding), game.config.height/2 - 5 * (borderUISize + borderPadding), 'But I can be fair', diaConfig).setOrigin(0.5);
            this.clock = this.time.delayedCall(2000, () => {
                this.add.text(game.config.width/2, game.config.height/2, "Let's play a game", diaConfig).setOrigin(0.5);
            }, null, this);
            this.clock = this.time.delayedCall(3000, () => {
                this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding), "just the three of us", diaConfig).setOrigin(0.5);
            }, null, this);
            this.clock = this.time.delayedCall(4000, () => {
                this.scene.start('demonstrationScene');
            }, null, this);
        }
    }

    update(){
        this.starfield.tilePositionX -= starSpeed;

        /*   
        // my attempt at tying text to input but it all just resolves simultaneously and I was running out of time 
        if(Phaser.Input.Keyboard.JustDown(enterKey)) {
           if(this.okInput == true){
                if (this.enterTimes == 0){
                this.okInput = false;
                this.add.text(game.config.width/2, game.config.height/2 + 3 * (borderUISize + borderPadding), 'Well Mortals...', diaConfig).setOrigin(0.5);
                this.enterTimes++;
                }
                if (this.enterTimes == 1){
                    this.add.text(game.config.width/2 - 2 * (borderUISize + borderPadding), game.config.height/2 + 4* (borderUISize + borderPadding), 'You are in my hand.', diaConfig).setOrigin(0.5);  
                    this.enterTimes++;
                    this.okInput = false;
                }
                if (this.enterTimes == 2){
                    this.scene.start('trappedScene');
                }
           }
        }
        if(Phaser.Input.Keyboard.JustUp(enterKey)) {
            this.okInput = true;
        }*/


    }
}
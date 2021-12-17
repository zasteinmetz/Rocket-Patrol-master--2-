class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){ 
        // load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('hands', './assets/Hands.png');
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create(){
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // place handbackdrop
        this.hands = this.add.tileSprite(0, 0, 640, 480, 'hands').setOrigin(0, 0);

       // white borders
       this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
       this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
       this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
       this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

       // add rocket (players 1 & 2)
       this.p1Rocket = new Rocket(this, game.config.width/4 * 3, game.config.height - borderUISize - borderPadding, 'rocket', true).setOrigin(0.5, 0);
       this.p2Rocket = new Rocket(this, game.config.width/4, game.config.height - borderUISize - borderPadding, 'rocket', false).setOrigin(0.5, 0);

       // add spaceship (x3)
       this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
       this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
       this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

       // define keys
       keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      

       // animation config
       this.anims.create({
           key: 'explode',
           frames: this.anims.generateFrameNumbers('explosion',{
               start: 0,
               end: 9,
               first: 0
           }),
           frameRate: 30
       });

       // initialize score
       this.p1Score = 0;
       this.p2Score = 0;

       // display score
       let scoreConfig = {
           fontFamily: 'Courier',
           fontSize: '28px',
           backgroundColor: '#F3B141',
           color: '#843605',
           align: 'right',
           padding: {
               top: 5,
               bottom: 5,
           },
           fixedWidth: 100,
       }

       // Show scores and names
       this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'P2:' + this.p2Score, scoreConfig);
       this.scoreRight = this.add.text(game.config.width/2 + 4 * (borderUISize + borderPadding), borderUISize + borderPadding*2, "P1:" + this.p1Score, scoreConfig);
       
       // GAME OVER flag
       this.gameOver = false;

         // Show Timer
       scoreConfig.fixedWidth = 50;
       scoreConfig.backgroundColor = '#ff4d00';
       scoreConfig.color = '#000';
       this.middleTimer = this.add.text(game.config.width/2 - (borderUISize + borderPadding), borderUISize + borderPadding*2, (game.settings.gameTimer/1000), scoreConfig);

       // use recursive function to update timer each second
       this.timerUpdate(this, scoreConfig);

        // add and destroy warning text
        scoreConfig.fixedWidth = 0;
        this.warning = this.add.text(game.config.width/2, game.config.height/2 - 2 * (borderUISize + borderPadding), 'Every five seconds somebody changes', scoreConfig).setOrigin(0.5);
        this.time.delayedCall(1500, () => {
            this.warning.destroy();
        }, null, this);
       
       // 60-second play clock
       this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
           if(this.p1Score > this.p2Score){
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'Player 1', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Your victory is paved in blood', scoreConfig).setOrigin(0.5);
            if(this.p1Score > highScore){
                highScore = this.p1Score;
            }
           }
           if(this.p1Score < this.p2Score){
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'Player 2', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 32, 'Your victory is paved in blood', scoreConfig).setOrigin(0.5);
            if(this.p2Score > highScore){
                highScore = this.p2Score;
            }
           }

           if(this.p1Score == this.p2Score){
            this.add.text(game.config.width/2, game.config.height/2 - 32, 'Your parity displeases me', scoreConfig).setOrigin(0.5);
            if(this.p1Score > highScore){
                highScore = this.p1Score;
            }
        }
        // reset scoreConfig
        scoreConfig.color = '#843605';
        scoreConfig.backgroundColor = '#F3B141';
        this.add.text(game.config.width/2, game.config.height/2 + 96, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
       }, null, this);

       // Speed increase at half time
       this.clock = this.time.delayedCall(game.settings.gameTimer/2, () => {
           this.p1Rocket.moveSpeed = 3;
           this.p2Rocket.moveSpeed = 3;
        }, null, this);

        // use recursive function to switch key controls
        this.timedSwitch(this);
    }



    update(){
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= starSpeed;

        // update
        if (!this.gameOver){
        this.p1Rocket.update();     // update rocket sprite
        this.p2Rocket.update();
        this.ship01.update();   // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        }

        // check collisons
        if(this.checkCollision(this.p1Rocket, this.ship03)){
           this.p1Rocket.reset();
           this.shipExplode(this.ship03, this.p1Rocket);   
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.p1Rocket);  
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01,  this.p1Rocket);  
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, this.p2Rocket);   
         }
         if(this.checkCollision(this.p2Rocket, this.ship02)){
             this.p2Rocket.reset();
             this.shipExplode(this.ship02, this.p2Rocket);  
         }
         if(this.checkCollision(this.p2Rocket, this.ship01)){
             this.p2Rocket.reset();
             this.shipExplode(this.ship01, this.p2Rocket);  
         }
    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
    }
    shipExplode(ship, rocket){
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();   // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });

        // score add and repaint
        if (!rocket.isP1){
        this.p2Score += ship.points;
        this.scoreLeft.text = "P2:" + this.p2Score;
        }

        else if (rocket.isP1 = true){
            this.p1Score += ship.points;
            this.scoreRight.text = "P1:" + this.p1Score;
        }
        this.sound.play('sfx_explosion');
    }

    // Recursive function which will call itself every second to update timer text
    timerUpdate (scene){
        scene.clock = scene.time.delayedCall(1000, () => {
            if (!scene.gameOver){
            scene.middleTimer.text -= 1;
            scene.timerUpdate(scene);
            }
            else{
                scene.middleTimer.text = 0; 
            }
        }, null, this);
    }

    // Recursive function to switch key sets the rockets respond to
    timedSwitch (scene, scoreConfig){
        scene.clock = scene.time.delayedCall(5000, () => {
            if (!scene.gameOver){
                scene.switchText = scene.add.text(game.config.width/2, game.config.height/2, 'Switch', "28px").setOrigin(0.5);
                // Switches isP1 values
                if(!scene.p1Rocket.isP1){
                    scene.p1Rocket.isP1 = true;
                    scene.p2Rocket.isP1 = false;
                }

                else if (scene.p1Rocket.isP1 = true) {
                    scene.p1Rocket.isP1 = false;
                    scene.p2Rocket.isP1 = true;
                }

                // Redetermines Keys
                this.p1Rocket.determineKeys(scene);
                this.p2Rocket.determineKeys(scene);
                scene.timedSwitch(scene);
                scene.time.delayedCall(1000, () => {
                    scene.switchText.destroy();
                }, null, this);
            }
        }, null, this);
    }
}
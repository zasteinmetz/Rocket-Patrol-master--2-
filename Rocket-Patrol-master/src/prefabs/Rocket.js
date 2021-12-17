// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, p1, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track rocket firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket');     // add rocket sfx
        this.isP1 = p1;   // sets p1 value to determine player
        this.determineKeys(scene);   // determines which keys to use
    }

    update() {
        // left/right movement
        if(!this.isFiring){
            if(this.leftKey.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            }
            else if(this.rightKey.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(this.firingKey)){
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move rocket up
        if(this.isFiring && this.y >= borderUISize * 3){
            this.y -= this.moveSpeed;          
        }
        // reset on miss
        if(this.y <= borderUISize * 3){
            this.reset();
        }
    }
    // reset rocket to ground
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    // determines which key is which for two players
    determineKeys(scene){
        if(!this.isP1){
            this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.firingKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        }

        else if(this.isP1 = true){
            this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.firingKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        }
    }
}
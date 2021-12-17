class Encouragement extends Phaser.Scene{
    constructor(){
        super("encourageScene");
    }
    create(){
        // text configuration
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
            this.add.text(game.config.width/2, game.config.height/2 - 4 * (borderUISize + borderPadding), "I'll make sure you survive", textConfig).setOrigin(0.5);
    }, null, this);
        
        this.clock = this.time.delayedCall(3000, () => {
            this.add.text(game.config.width/2, game.config.height/2 - 3 * (borderUISize + borderPadding), 'so you can do it over and over', textConfig).setOrigin(0.5);
    }, null, this);

        this.clock = this.time.delayedCall(4500, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'Till you learn to savor that pain', textConfig).setOrigin(0.5);
    }, null, this);
        

        this.clock = this.time.delayedCall(6000, () => {
            this.add.text(game.config.width/2, game.config.height/2 + 2 * (borderUISize + borderPadding), 'But there can only be one winner', textConfig).setOrigin(0.5);
    }, null, this);

        this.clock = this.time.delayedCall(7500, () => {
            this.add.text(game.config.width/2, game.config.height/2 + 4 * (borderUISize + borderPadding), "The one who kills the most", textConfig).setOrigin(0.5);
    }, null, this);

        this.clock = this.time.delayedCall(9000, () => {
            this.scene.start("playScene");
        }, null, this);
    }
}
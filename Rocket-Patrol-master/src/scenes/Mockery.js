class Mockery extends Phaser.Scene{
    constructor(){
        super("mockeryScene");
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
        
        // dialogue popping in
        if(!firstTime){
            this.clock = this.time.delayedCall(1000, () => {
                this.add.text(game.config.width/2 - (borderUISize + borderPadding), game.config.height/2 - 4 * (borderUISize + borderPadding), 'To be trapped in a pathetic', textConfig).setOrigin(0.5);
                this.clock = this.time.delayedCall(1000, () => {
                    this.add.text(game.config.width/2 - (borderUISize + borderPadding), game.config.height/2 - 3 * (borderUISize + borderPadding), 'container of metal and wire?', textConfig).setOrigin(0.5);
                }, null, this);
            }, null, this);
        
            this.clock = this.time.delayedCall(4000, () => {
                this.add.text(game.config.width/2 - (borderUISize + borderPadding), game.config.height/2 - (borderUISize + borderPadding), "It's all you can do to keep from", textConfig).setOrigin(0.5);
                this.clock = this.time.delayedCall(1000, () => {
                    this.add.text(game.config.width/2 - (borderUISize + borderPadding), game.config.height/2, 'screaming into the endless void', textConfig).setOrigin(0.5);
                }, null, this);
            }, null, this);
        
            this.clock = this.time.delayedCall(7000, () => {
                this.add.text(game.config.width/2 - (borderUISize + borderPadding), game.config.height/2 + 2 * (borderUISize + borderPadding), 'But no one will hear your cries', textConfig).setOrigin(0.5);
            }, null, this);

            this.clock = this.time.delayedCall(8500, () => {
                firstTime = true;
                this.scene.start('mockeryScene');
            }, null, this);
        }
        if(firstTime == true){
            this.add.text(game.config.width/2 - (borderUISize + borderPadding), game.config.height/2 - (borderUISize + borderPadding), 'Only me', textConfig).setOrigin(0.5);
            this.clock = this.time.delayedCall(1000, () => { 
                this.scene.start('dialogueScene');
            }, null, this);
        }
    }
}
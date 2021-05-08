import Phaser from '../lib/phaser.js'

export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }
    init() {
    }

    preload()
	{
        this.load.image('playbutton', 'assets/Icons/play.png')
        this.load.image('menu', 'assets/Icons/Menu.png')	
	}

    create() { //creating the menu screen


        this.entryForest = false;
        this.attack = false;
        this.life = 3;
        
        //create images (z order)


        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0).setScale(0.7);

        let playButton = this.add.image(this.game.renderer.width / 2, (this.game.renderer.height / 2)+50, 'playbutton').setDepth(-1).setScale(0.8);


        /* 
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('upside_world', {entryForest:this.entryForest, attack:this.attack , health:this.life});
        })

    }
}
import Phaser from '../lib/phaser.js'

import EnnemiF from '../game/EnnemiF.js'

export default class Forest extends Phaser.Scene {
    constructor() {
        super('forest')
    }
	init(data){
		this.life = data.health

	}
	preload(){

        //Images Preloaders
		this.load.image('hero', 'assets/hero.png')
		this.load.image('ennemyF','assets/Monstres&Ennemis/Ennemi.png')


        this.load.image('Tileset', 'assets/TilesetVillage.png')

        this.load.tilemapTiledJSON('Forest', 'assets/Forest.json');

		this.cursors = this.input.keyboard.createCursorKeys()

		this.load.image('life', 'assets/life.png')
		this.load.image('sword','assets/Collectibles/Sword.png')

    }

    create(){

		this.entryForest = true

		this.immune = true

        if (this.life == 3){
			this.health1 = this.add.image(32,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
			this.health2 = this.add.image(64,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
			this.health3 = this.add.image(96,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
		}

		else if (this.life == 2){
			this.health1 = this.add.image(32,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
			this.health2 = this.add.image(64,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
		}
		else if (this.life == 1){
			this.health1 = this.add.image(32,70,'life').setScrollFactor(0).setDepth(3).setScale(1.7);
		}

        //Mapping
        let Forest = this.make.tilemap({key:'Forest'});

        let Terrain = Forest.addTilesetImage('TilesetVillage','Tileset');

        let Background = Forest.createLayer('Bot', Terrain, 0, 0).setDepth(-3);
        let Layer1 = Forest.createLayer('Elements2', Terrain, 0, 0).setDepth(-2);
        let Layer2 = Forest.createLayer('Elements', Terrain, 0, 0).setDepth(-1);
		let Layer3 = Forest.createLayer('Elements3', Terrain, 0, 0);

		this.sword = this.physics.add.image(575, 250, 'sword');

		const spawnPoint = Forest.findObject("Objects", obj => obj.name === "Spawn Point");
		this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero').setDepth(1);


		this.ennemisF = this.physics.add.group();

		new EnnemiF(this,400,100,'ennemyF').setDepth(0);
		new EnnemiF(this,900,250,'ennemyF').setDepth(0);
		new EnnemiF(this,350,400,'ennemyF').setDepth(0);

		/*this.forestborder = this.physics.add.staticGroup();
		this.forestborder.create(1152,16,'border1').setDepth(0);

		this.dreamborder = this.physics.add.staticGroup();
		this.dreamborder.create(127,832,'warp')*/

	
        //Animations
        
        this.anims.create({
			key: 'normal',
			frames: [ { key: 'hero', frame: 0 } ],
			frameRate: 10
		});
		
		this.anims.create({
			key:'up',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 1, 5, 9, 13 ] }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key:'down',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 0, 4, 8, 12 ] }),
			frameRate: 8,
			repeat: -1
		})
		

		this.anims.create({
			key:'right',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 3, 7, 11, 15 ] }),
			frameRate: 8,
			repeat: -1
		})
		this.anims.create({
			key:'left',
			frames: this.anims.generateFrameNumbers('hero', {frames : [ 2, 6, 10, 14 ] }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key: 'attackr',
			frames: [ { key: 'hero', frame: 19 } ],
			frameRate: 10
		});

		this.anims.create({
			key: 'attackl',
			frames: [ { key: 'hero', frame: 18 } ],
			frameRate: 8
		});

		this.anims.create({
			key: 'attacku',
			frames: [ { key: 'hero', frame: 17 } ],
			frameRate: 8
		});
		this.anims.create({
			key: 'attackd',
			frames: [ { key: 'hero', frame: 16 } ],
			frameRate: 8
		});

		//Colliders

		//this.physics.add.collider(this.player, this.forestborder, this.warpingPlayerToForest, null, this);
		//this.physics.add.collider(this.player, this.dreamborder, this.warpingPlayerToDream, null, this);

        this.physics.add.collider(this.player, Background);
        
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer1);
        
        Layer1.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer2);
        
        Layer2.setCollisionByProperty({collides:true});

		this.physics.add.collider(this.player, Layer3);
        
        Layer3.setCollisionByProperty({collides:true});

		this.physics.add.overlap(this.player, this.ennemisF, this.hitEnnemi, null, this);
		this.physics.add.overlap(this.player, this.sword, this.getSword, null, this);


		/* const debugGraphics = this.add.graphics().setAlpha(0.75);
		Background.renderDebug(debugGraphics, {
  			tileColor: null, // Color of non-colliding tiles
  			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
		});
		Layer1.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
	  	});
		Layer2.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
	  	}); */
        

		  //Camera
		  this.cameras.main.startFollow(this.player);
		  this.cameras.main.setBounds(0,0,Forest.widthInPixels, Forest.heightInPixels);
		  this.cameras.main.setZoom(1.5);
		  this.physics.world.setBounds(0,0, Forest.widthInPixels, Forest.heightInPixels);
		  this.player.setCollideWorldBounds(true);

        //Variables
		var test = this;

		this.ennemisF.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x-200,
				duration: 5000,
				ease: 'Power2',
				yoyo: true,
				delay: 100,
				loop: 10
			});
		})

        

        //Manette

        this.paddleConnected=false;

		this.input.gamepad.once('connected', function (pad) {
			this.paddleConnected = true;
			paddle = pad;
			});


    }
    update(t,dt){

		const speed = 175;

        if (!this.player)
		{
			return
		}

        //KeyEvents

		this.player.setVelocity(0)
		this.player.anims.play('normal')

        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(speed);
            	this.player.anims.play('right', true);
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-speed);
            	this.player.anims.play('left', true);
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-speed);
            	this.player.anims.play('up', true);
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(speed);
            	this.player.anims.play('down', true);
        	}


		}

		else if (this.cursors.up.isDown)
		{
			this.player.setVelocityY(-speed)
			this.player.anims.play('up', true);
		}


		else if (this.cursors.left.isDown)
		{
            this.player.setVelocityX(-speed)
			this.player.anims.play('left', true)
		}

		else if (this.cursors.right.isDown)
		{
            this.player.setVelocityX(speed)
			this.player.anims.play('right', true)	
		}
        else if (this.cursors.down.isDown)
		{
            this.player.setVelocityY(speed)
			this.player.anims.play('down', true)	
		}		

    }

	getSword(player, sword){
        this.attack = true; 
        this.scene.start('upside_world', {entryForest:this.entryForest, attack:this.attack, health: this.life})
    }

	hitEnnemi(){
		if (this.immune){
			this.life -= 1;
			this.immune = false;
			
			if(this.life > 0){
				this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
			}

			this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immune = true}, callbackScope: this});

		}

		if (this.life == 2){
			this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.health3.visible = !this.health3.visible;}, callbackScope: this});
			this.health3.destroy()
		}
		if (this.life == 1){
			this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.health2.visible = !this.health2.visible;}, callbackScope: this});
			this.health2.destroy()
		}
		
		
		if(this.life == 0){
			this.scene.start('game-over')
		}
	}
/*
	warpingPlayerToForest(){
		this.scene.start('forest')
	}
	warpingPlayerToDream(){
		this.scene.start('downside_world')
	}
*/
}
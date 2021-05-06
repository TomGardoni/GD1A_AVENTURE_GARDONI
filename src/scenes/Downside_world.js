import Phaser from '../lib/phaser.js'

import Ennemi from '../game/Ennemi.js'

export default class Downside_world extends Phaser.Scene {
    constructor() {
        super('downside_world')
    }

	init(data){
		this.attack = data.attack
		this.life = data.health

	}
	preload(){

        //Images Preloaders
		this.load.image('hero', 'assets/hero.png')
		this.load.image('ennemy','assets/Monstres&Ennemis/ennemy.png')

        this.load.image('TilesetMaudit', 'assets/TrucMaudit.png')

        this.load.tilemapTiledJSON('MapdeMort', 'assets/MapDeMort.json');

		this.cursors = this.input.keyboard.createCursorKeys()
		this.boutonAttaque = this.input.keyboard.addKey('A');

		this.load.image('life', 'assets/life.png')
		this.load.image('sword','assets/Collectibles/Sword.png')
		this.load.image('money','assets/Collectibles/Money.png')

    }

    create(){

		this.immunity = true

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
        let Village = this.make.tilemap({key:'MapdeMort'});

        let Terrain = Village.addTilesetImage('TrucMaudit','TilesetMaudit');

        let Background = Village.createLayer('Bottom', Terrain, 0, 0).setDepth(-2);
        let Layer1 = Village.createLayer('Bot1', Terrain, 0, 0).setDepth(-1);
        let Layer2 = Village.createLayer('Bot 2', Terrain, 0, 0);


		const spawnPoint = Village.findObject("Objects", obj => obj.name === "Spawn Point 3");
		this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero').setDepth(1);

		this.moneys = this.physics.add.group();
        this.sword = this.physics.add.group();
		this.ennemis = this.physics.add.group();

		new Ennemi(this,544,480,'ennemy').setDepth(0);
		new Ennemi(this,1728,640,'ennemy').setDepth(0);
		new Ennemi(this,1152,928,'ennemy').setDepth(0);

	
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

		this.physics.add.collider(this.player, this.forestborder, this.warpingPlayerToForest, null, this);
		this.physics.add.collider(this.player, this.dreamborder, this.warpingPlayerToDream, null, this);

        this.physics.add.collider(this.player, Background);
        
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer1);
        
        Layer1.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer2);
        
        Layer2.setCollisionByProperty({collides:true});

		this.physics.add.overlap(this.player, this.ennemis, this.hitEnnemy, null, this);
		this.physics.add.overlap(this.sword, this.ennemis, this.killEnnemy, null, this);
		this.physics.add.overlap(this.player, this.moneys, this.MOONEY, null,this);

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
        
        //Variables

        //Camera
        this.cameras.main.startFollow(this.player)
		this.cameras.main.setBounds(0,0,Village.widthInPixels, Village.heightInPixels);
        this.physics.world.setBounds(0,0, Village.widthInPixels, Village.heightInPixels);
		this.player.setCollideWorldBounds(true);

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
                this.player.direction='right';
            	this.player.setVelocityX(speed);
            	this.player.anims.play('right', true);
        	}
        	else if (paddle.left)
        	{
                this.player.direction='left';
            	this.player.setVelocityX(-speed);
            	this.player.anims.play('left', true);
        	}
            else if (paddle.up)
        	{
                this.player.direction='up';
            	this.player.setVelocityY(-speed);
            	this.player.anims.play('up', true);
        	}
            else if (paddle.down)
        	{
                this.player.direction='down';
            	this.player.setVelocityY(speed);
            	this.player.anims.play('down', true);
        	}

			else if (this.attack && paddle.A){

			}

		}

		else if (this.cursors.up.isDown)
		{
			this.player.direction='up';
			this.player.setVelocityY(-speed)
			this.player.anims.play('up', true);
		}


		else if (this.cursors.left.isDown)
		{
			this.player.direction='left';
            this.player.setVelocityX(-speed)
			this.player.anims.play('left', true)
		}

		else if (this.cursors.right.isDown)
		{
			this.player.direction='right';
            this.player.setVelocityX(speed)
			this.player.anims.play('right', true)	
		}
        else if (this.cursors.down.isDown)
		{
			this.player.direction='down';
            this.player.setVelocityY(speed)
			this.player.anims.play('down', true)	
		}	
		
		else if (this.attack && Phaser.Input.Keyboard.JustDown(this.boutonAttaque)){
			this.player.setVelocity(0)
			this.attaquer(this.player);
		}

    	

		for(var i = 0; i < this.ennemis.getChildren().length; i++){
            var ennemi = this.ennemis.getChildren()[i];

            ennemi.movement(this.player);
          
        }

    }

	attaquer(player) {
		var peutAttaquer = true
        if (peutAttaquer)
       {
           var coefDirx = 0;
           var coefDiry = 0;
             peutAttaquer = false;
             this.time.addEvent({delay: 300, callback: function(){peutAttaquer= true;}, callbackScope: this}); 
	         if (this.player.direction == 'left') { coefDirx = -1; } 
             else if(this.player.direction == 'right') { coefDirx = 1 } 
			 else{coefDirx = 0}

             if(this.player.direction == 'up') { coefDiry = -1 } 
             else if(this.player.direction == 'down') { coefDiry = 1 } 
			 else{coefDiry = 0}

             var sword = this.sword.create(player.x + (25 * coefDirx), player.y + (25 * coefDiry), 'sword');
			 this.time.addEvent({delay: 300, callback: function(){sword.destroy()}, callbackScope: this});
        }
    }

	killEnnemy(sword, ennemis)
    {
    	var money = this.moneys.create(ennemis.x,ennemis.y,'money')
        ennemis.destroy();
		sword.destroy();
    }
	MOONEY(player, argent)
    {
        argent.destroy();
    }

	hitEnnemy(){
		if (this.immunity){
			this.life -= 1;
			this.immunity = false;
			
			if(this.life > 0){
				this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
			}

			this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immunity = true}, callbackScope: this});
			
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
}
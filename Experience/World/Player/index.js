import * as THREE from 'three';
import { Capsule } from "three/examples/jsm/math/Capsule";

import Experience from '../../';
import Avatar from './Avatar';
import Controls from './Controls';
import FirstPersonCamera from './FirstPersonCamera';

export default class Player
{
	constructor()
	{
		this.experience = new Experience();
		this.octree = this.experience.world.octree;
		this.camera = this.experience.camera;
		this.physics = this.experience.world.physics;
		this.time = this.experience.time;
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.sizes = this.experience.sizes;

		// Debug
		if(this.experience.debug) {
			this.debugFolder = this.experience.debug.addFolder('Player');
			this.debugFolder.open();
		}

		this.initialize();
	}

	initialize()
	{
		this.player = {};

        this.player.camera = this.camera.perspectiveCamera;
        this.player.animation = "idle";

        this.jumpOnce = false;
        this.player.onFloor = false;
        this.player.gravity = 60;

        this.player.height = 10;
        this.player.speedMultiplier = 2.8;
        this.player.rotation= new THREE.Quaternion();

        this.upVector = new THREE.Vector3(0, 1, 0);
        this.player.velocity = new THREE.Vector3();
        this.player.direction = new THREE.Vector3();


        // Créez une instance de Capsule
        this.player.collider = new Capsule(
            new THREE.Vector3(0, this.player.height, 0),  // Position initiale du haut de la capsule
            new THREE.Vector3(0, 0, 0), // Position initiale du bas de la capsule
            0.35  // Rayon de la capsule
        );

		this.setAvatar();
		this.initControls();
        this.initCamera();
	}

	setAvatar()
	{
		this.avatar = new Avatar({ 
            player: this.player 
        });
	}

	initControls()
	{
		this.controls = new Controls({ 
            player: this.player, 
        });
	}

	initCamera()
    {
        this.fpsCamera = new FirstPersonCamera({
            player: this.player,
            avatar: this.avatar,
            controls: this.controls,
        });
    }	

	update()
	{
        if(this.fpsCamera) {
            this.fpsCamera.update();
        }    
        if(this.avatar) {
            this.avatar.update();
        }
        if(this.controls) {
            this.controls.update();
        }
        
	}
}
import * as THREE from "three";

import Experience from "../../..";
import Object from "../Object";
import Body from "./Body";
import Head from "./Head";

export default class Player extends Object
{
	constructor({ keyboard, debug })
	{
		super();

		this.experience = new Experience();

		this.keyboard = keyboard;
		this.debug = debug;

		// Mise en place des paramètres
		this.settings = {};
		this.settings.timeZeroToMax = 0.005;
		this.settings.maxSpeed = 7.0;
		this.settings.speed = new THREE.Vector3();
		this.settings.acceleration = this.settings.maxSpeed / this.settings.timeZeroToMax;
		this.settings.deceleration = -this.settings.maxSpeed;
		this.settings.mouseSpeed = 0.002;
		this.settings.angles = new THREE.Euler();
		this.settings.pitch = new THREE.Quaternion();
        this.settings.yaw = new THREE.Quaternion();
		this.settings.jumpVelocity = 5.0;
		this.settings.yOffset = 0.5;
		this.settings.tempVec = new THREE.Vector3();
        this.settings.moveDirection = new THREE.Vector3();
        this.settings.xAxis = new THREE.Vector3(1.0, 0.0, 0.0);
        this.settings.yAxis = new THREE.Vector3(0.0, 1.0, 0.0);

		// Mise en place
		this.container = new THREE.Object3D();
		this.container.name = 'PlayerContainer';
		this.container.matrixAutoUpdate = true;

		// Debug
		if(this.debug) {
			this.debugFolder = this.debug.addFolder('Player');
		}
	}

	initialize()
	{
		this.setup();
		super.initialize();
	}

	setup()
	{
		this.container.position.set(2.14, 1.48, -1.36);

		this.addComponent('body', new Body({
			container: this.container,
			debug: this.debugFolder,
		}));
		this.addComponent('head', new Head({
			container: this.container,
			debug: this.debugFolder,
		}));
	}	

	accelerate(direction, elapsedTime) 
	{
		const acceleration = this.settings.tempVec.copy(direction)
								.multiplyScalar(this.settings.acceleration * elapsedTime);
		this.settings.speed.add(acceleration);
		this.settings.speed.clampLength(0.0, this.settings.maxSpeed);

	}

	decelerate(elapsedTime)
	{
		const deceleration = this.settings.tempVec.copy(this.settings.speed)
								.multiplyScalar(this.settings.deceleration * elapsedTime);
		this.settings.speed.add(deceleration);
	}

	getDirection()
	{
		const forward = this.keyboard.get('KeyS') - this.keyboard.get('KeyW');
		const right = this.keyboard.get('KeyD') - this.keyboard.get('KeyA');
		const direction = this.settings.moveDirection.set(right, 0.0, forward).normalize();

		return direction;
	}

	update(elapsedTime)
	{
		const direction = this.getDirection();
		this.accelerate(direction, elapsedTime);
		this.decelerate(elapsedTime);

		// console.log(this.settings.speed);
		super.update(elapsedTime);

		this.container.position.add(
			this.settings.speed.clone().multiplyScalar(elapsedTime)
		)
	}
}
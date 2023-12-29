import * as THREE from 'three';
import Experience from '../..';

export default class FirstPersonCamera
{
	constructor({ player, avatar })
	{
		this.experience = new Experience();
		this.time = this.experience.time;
		this.avatar = avatar;
		this.player = player;

		this.angles = new THREE.Euler();
		this.pitch = new THREE.Quaternion();
		this.yaw = new THREE.Quaternion();

		this.xAxis = new THREE.Vector3(1.0, 0.0, 0.0);
        this.yAxis = new THREE.Vector3(0.0, 1.0, 0.0);

		this.quaternion = new THREE.Quaternion();

		this.mouseSpeed = 0.002;
        this.isLocked = false;
		this.cumulativeYaw = 0;

		this.initialize();

		document.addEventListener('pointerlockchange', this.onPointerlockChange)

		document.addEventListener("click", () => {
			if (!this.isLocked) {
				document.body.requestPointerLock();
			}
		
		});
		document.addEventListener("mousemove", this.onMouseMove);
	}

	initialize()
	{
		this.angles.setFromQuaternion(this.player.rotation);
	}

	onPointerlockChange = () => {
        if (document.pointerLockElement) {
            this.isLocked = true;
            return;
        }

        this.isLocked = false;
    }

	onMouseMove = (event) => {
        if (!this.isLocked) {
          return;
        }
    
        const { movementX, movementY } = event

    
        this.angles.y -= (movementX * this.mouseSpeed);
		this.angles.x -= (movementY * this.mouseSpeed);

		this.cumulativeYaw += event.movementX * this.mouseSpeed;

		// Limiter l'angle vertical entre -90 et 90 degrés
        this.angles.x = Math.max(-Math.PI / 8, Math.min(Math.PI / 8, this.angles.x));

		// console.log(this.angles);
        this.updateRotation();
    }

	updateRotation()
	{
		this.yaw.setFromAxisAngle(this.xAxis, this.angles.x);
        this.pitch.setFromAxisAngle(this.yAxis, this.angles.y);

		this.quaternion.multiplyQuaternions(this.pitch, this.yaw);

		this.player.camera.quaternion.copy(this.quaternion);
	}

	updateCamera()
	{
		// Set the camera position based on the player's collider end position
		this.player.camera.position.set(
			this.player.collider.end.x,
			this.player.collider.end.y,
			this.player.collider.end.z
		);
	
		// Adjust the camera's height
		this.player.camera.position.y += (this.player.height / 1) + 0.1;
		// Copy only the player's rotation without affecting the camera's rotation

		let horizontalRotation = new THREE.Euler(0, this.angles.y, 0, 'YXZ');
		this.player.rotation.setFromEuler(horizontalRotation);
	}

	update()
	{
		this.updateRotation();
		this.updateCamera();
	}
}
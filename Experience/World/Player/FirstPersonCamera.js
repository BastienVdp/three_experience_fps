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

		this.mouseSpeed = 0.002;
        this.isLocked = false;

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

        this.angles.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.angles.x));

        // this.updateRotation();
    }

	updateRotation()
	{
		this.pitch.setFromAxisAngle(this.xAxis, this.angles.x);
        this.yaw.setFromAxisAngle(this.yAxis, this.angles.y);

		this.player.rotation.multiplyQuaternions(this.yaw, this.pitch);

		// this.player.camera.quaternion.copy(this.player.rotation);
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
	}

	update()
	{
		this.updateRotation();
		this.updateCamera();
	}
}
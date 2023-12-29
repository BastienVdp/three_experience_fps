import * as THREE from 'three';
import Experience from '../..';

export default class FirstPersonCamera
{
	constructor({ player, avatar, playerContainer })
	{
		this.experience = new Experience();
		this.renderer = this.experience.renderer;
		this.time = this.experience.time;
		this.avatar = avatar;
		this.player = player;
		this.playerContainer = playerContainer;

		this.container = new THREE.Object3D();
		this.container.name = 'PlayerCameraContainer';
		this.playerContainer.add(this.container);

		
		// Setup
		this.angles = new THREE.Euler();
		
		this.horizontalRotation = new THREE.Quaternion();
        this.verticalRotation = new THREE.Quaternion();

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
		this.container.add(this.player.camera);
		this.renderer.setCameraToRenderer(this.player.camera);
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

		// Rotation horizontale totale 
		this.cumulativeYaw -= event.movementX * this.mouseSpeed;

		// Limiter l'angle vertical entre -15 et 15 degrés
        this.angles.x = Math.max(-Math.PI / 12, Math.min(Math.PI / 12, this.angles.x));

        this.updateRotation();
    }

	updateRotation()
	{
		// Gestion de la rotation horizontale (yaw)
		this.horizontalRotation.setFromAxisAngle(this.yAxis, this.angles.y);

		// Gestion de la rotation verticale (pitch)
		this.verticalRotation.setFromAxisAngle(this.xAxis, this.angles.x);

		// Multiplier les deux rotations pour obtenir la rotation finale
		this.quaternion.multiplyQuaternions(this.horizontalRotation, this.verticalRotation);

		// Appliquer la rotation au container de la caméra
		this.container.quaternion.copy(this.quaternion);
	}

	updateCamera()
	{
		// Positionner le container de la caméra à la position du haut de la capsule
		this.container.position.copy(this.player.collider.end);
		// Positionner le container de la caméra vers le haut
		this.container.position.y += (this.player.height / 1) + 0.1;

		this.player.position = this.container.position;
	}

	update()
	{
		this.updateRotation();
		this.updateCamera();
	}
}
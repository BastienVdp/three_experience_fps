import * as THREE from "three";
import Experience from "../..";

export default class Controls
{
	constructor({ player })
	{
        this.experience = new Experience();
        this.octree = this.experience.world.octree;
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;

        this.player = player;
        
		this.actions = {};

		document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
	}

    playerCollisions() {
        const result = this.octree.capsuleIntersect(this.player.collider);
        this.player.onFloor = false;

        if (result) {
            
            this.player.onFloor = result.normal.y > 0;

            this.player.collider.translate(
                result.normal.multiplyScalar(result.depth)
            );
        }
    }

    getForwardVector() {
        this.player.camera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();

        return this.player.direction;
    }

    getSideVector() {
        this.player.camera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();
        this.player.direction.cross(this.player.camera.up);

        return this.player.direction;
    }

	updateColliderMovement()
	{
		const speed =
            (this.player.onFloor ? 1.75 : 0.1) *
            this.player.gravity *
            this.player.speedMultiplier;

        let speedDelta = this.time.delta * speed;

        if (this.actions.run) {
            speedDelta *= 1.5;
        }

        if (this.actions.forward) {
            this.player.velocity.add(
                this.getForwardVector().multiplyScalar(speedDelta)
            );
        }
        if (this.actions.backward) {
            this.player.velocity.add(
                this.getForwardVector().multiplyScalar(-speedDelta)
            );
        }
        if (this.actions.left) {
            this.player.velocity.add(
                this.getSideVector().multiplyScalar(-speedDelta)
            );
        }
        if (this.actions.right) {
            this.player.velocity.add(
                this.getSideVector().multiplyScalar(speedDelta)
            );
        }

        if (this.player.onFloor) {
            if (this.actions.jump && this.jumpOnce) {
                this.player.velocity.y = 30;
            }
            this.jumpOnce = false;
        }

        let damping = Math.exp(-15 * this.time.delta) - 1;

        if (!this.player.onFloor) {
            if (this.player.animation === "jumping") {
                this.player.velocity.y -= this.player.gravity * 0.7 * this.time.delta;
            } else {
                this.player.velocity.y -= this.player.gravity * this.time.delta;
            }
            damping *= 0.1;
        }

        this.player.velocity.addScaledVector(this.player.velocity, damping);

        const deltaPosition = this.player.velocity
            .clone()
            .multiplyScalar(this.time.delta);

        this.player.collider.translate(deltaPosition);
        this.playerCollisions();
        

        if(this.player.position.y < -20) {
        
            this.outOfBounds();
        }
	}

    outOfBounds()
    {
        const spawnPos = new THREE.Vector3(0, 0, 0);
        this.player.velocity = new THREE.Vector3();

        this.player.collider.start.copy(spawnPos);
        this.player.collider.end.copy(spawnPos);

        this.player.collider.end.y += this.player.height;
    }

	onKeyDown = (e) => {
        if (e.code === "KeyW" || e.code === "ArrowUp") {
            this.actions.forward = true;
        }
        if (e.code === "KeyS" || e.code === "ArrowDown") {
            this.actions.backward = true;
        }
        if (e.code === "KeyA" || e.code === "ArrowLeft") {
            this.actions.left = true;
        }
        if (e.code === "KeyD" || e.code === "ArrowRight") {
            this.actions.right = true;
        }

        if (e.code === "ShiftLeft") {
            this.actions.run = true;
        }

        if (e.code === "Space" && !this.actions.jump && this.player.onFloor) {
            this.actions.jump = true;
            this.jumpOnce = true;
        }
    }

    onKeyUp = (e) => {
        if (e.code === "KeyW" || e.code === "ArrowUp") {
            this.actions.forward = false;
        }
        if (e.code === "KeyS" || e.code === "ArrowDown") {
            this.actions.backward = false;
        }
        if (e.code === "KeyA" || e.code === "ArrowLeft") {
            this.actions.left = false;
        }
        if (e.code === "KeyD" || e.code === "ArrowRight") {
            this.actions.right = false;
        }
        if (e.code === "ShiftLeft") {
            this.actions.run = false;
        }
		if (e.code === "Space") {
            this.actions.jump = false;
        }
    }

    update()
    {
        this.updateColliderMovement();
    }
}
import * as THREE from "three";
import Experience from "../..";

export default class Avatar {
	constructor({ player, camera, playerContainer })
	{
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.avatar = this.resources.get('rifle');
		// console.log(this.avatar);

		this.player = player;
		this.camera = camera;
		this.playerContainer = playerContainer;

		this.container = new THREE.Object3D();
		this.container.name = 'AvatarContainer';
		this.playerContainer.add(this.container);
		
		this.initialize();
	}

	initialize()
	{
		this.avatar.scale.set(.2, .2, .2);
		this.avatar.rotateY(Math.PI);
		this.avatar.axesHelper = new THREE.AxesHelper(15); 
		this.avatar.add(this.avatar.axesHelper);
		this.container.add(this.avatar);

		this.createDebug();
	}

	updatePosition() 
	{
		// Copier la position du container de l'avatar
        this.container.position.copy(this.player.collider.end);
        this.container.position.y += this.player.height - 3

		// Rotation du container de l'avatar par rapport a la rotation horizontal de la caméra
		this.container.rotation.y = this.camera.cumulativeYaw;

		// Rotation des bras par rapport a la rotation vertical de la caméra
		this.avatar.rotation.x = Math.PI + this.camera.verticalRotation.x;
    }

	createDebug()
	{
		// Créez une géométrie en fil de fer pour la capsule
        const radius = 2;

        const capsuleGeometry = new THREE.BufferGeometry();
        const vertices = [];

        // Ajoutez des points à la géométrie pour représenter la capsule
        const numSegments = 16; // Vous pouvez ajuster cela en fonction de la qualité souhaitée
        for (let i = 0; i <= numSegments; i++) {
            const theta = (i / numSegments) * Math.PI * 2;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            vertices.push(x, this.player.height, z); // Haut de la capsule
            vertices.push(x, 0, z); // Bas de la capsule
        }

        capsuleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // Créez un matériau pour la géométrie en fil de fer
        const capsuleMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

        // Créez une ligne en fil de fer à partir de la géométrie et du matériau
        this.capsuleWireframe = new THREE.LineSegments(capsuleGeometry, capsuleMaterial);

        // Ajoutez la ligne en fil de fer à votre scène
        this.capsuleWireframe.position.copy(this.player.collider.start);

        this.container.add(this.capsuleWireframe);
	}

	update()
	{
		this.updatePosition();
	}
}
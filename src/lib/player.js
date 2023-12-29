import * as BABYLON from '@babylonjs/core';
import * as Material from '@babylonjs/materials';

export const createPlayer = (scene) => {
	let playerBox = BABYLON.Mesh.CreateBox('Box', 1.0, scene);

	playerBox.physicsImpostor = new BABYLON.PhysicsImpostor(
		playerBox,
		BABYLON.PhysicsImpostor.BoxImpostor,
		{ mass: 1, friction: 0.02, restitution: 0.2 },
		scene
	);
	playerBox.checkCollisions = true;
	// playerBox.position.y = 0;

	let playerMaterial = new Material.GridMaterial('playerMaterial', scene);
	playerMaterial.gridRatio = 0.3;
	playerMaterial.lineColor = BABYLON.Color3.FromHexString('#F9C80E');
	// playerMaterial.lineColor = BABYLON.Color3.FromHexString('#01FE0A');
	playerBox.material = playerMaterial;

	return playerBox;
};

// function randomIntFromInterval(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1) + min);
// }

export function createPlayerClones(maxClones, radius, player, scene) {
	for (var i = 0; i < maxClones; i++) {
		const angle = (2 * Math.PI * i) / maxClones;
		const x = radius * Math.sin(angle);
		const z = radius * Math.cos(angle);

		var clone = player.createInstance('Clone: ' + i);
		// clone.scaling = clone.scaling.scale(scale);
		clone.position = new BABYLON.Vector3(x, 0, z);
		clone.rotationQuaternion = null;
		clone.alwaysSelectAsActiveMesh = true;
		clone.freezeWorldMatrix();
		clone.isPickable = false;

		clone.physicsImpostor = new BABYLON.PhysicsImpostor(
			clone,
			BABYLON.PhysicsImpostor.BoxImpostor,
			{
				mass: 1,
				friction: 0.02,
				restitution: 0.2
			},
			scene
		);
		clone.checkCollisions = true;
	}
}

// export function createPlayerClones(originalPlayerBox, scene) {
// 	// Create a new box for the player clones
// 	const cloneBox = BABYLON.Mesh.CreateBox('cloneBox', 1.0, scene);

// 	let cloneBoxMaterial = new Material.GridMaterial('playerMaterial', scene);
// 	cloneBoxMaterial.gridRatio = 0.3;
// 	cloneBoxMaterial.lineColor = BABYLON.Color3.FromHexString('#01FE0A');
// 	cloneBox.material = cloneBoxMaterial;

// 	for (let i = 0; i < cloneCount; i++) {
// 		// Make an instance of the cloned box
// 		let playerClone = cloneBox.createInstance('player: ' + i);

// 		let scale = Math.random() * 10 + 1;
// 		playerClone.scaling = playerClone.scaling.scale(scale);

// 		let radius = Math.random() * 400;
// 		let angle = Math.PI * 2 * Math.random();

// 		playerClone.position = new BABYLON.Vector3(
// 			Math.cos(angle) * radius,
// 			Math.random() * 20,
// 			Math.sin(angle) * radius
// 		);
// 		playerClone.rotation.x = Math.random() * Math.PI;
// 		playerClone.rotation.y = Math.random() * Math.PI;
// 		playerClone.rotation.z = Math.random() * Math.PI;
// 		playerClone.rotationQuaternion = null;

// 		playerClone.physicsImpostor = new BABYLON.PhysicsImpostor(
// 			playerClone,
// 			BABYLON.PhysicsImpostor.BoxImpostor,
// 			{
// 				mass: scale,
// 				friction: 0.5,
// 				restitution: 0.2
// 			},
// 			scene
// 		);
// 		playerClone.checkCollisions = true;
// 	}

// 	// Dispose of the cloned box (we only needed it to create instances)
// 	// cloneBox.dispose();
// }

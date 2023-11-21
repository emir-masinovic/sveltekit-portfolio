// createGridBox.js
import * as BABYLON from '@babylonjs/core';
import * as Material from '@babylonjs/materials';

export const createGridBox = (scene) => {
	let gridBox = BABYLON.Mesh.CreateBox('Box', 1.0, scene);

	// Physics impostor
	// gridBox.physicsImpostor = new BABYLON.PhysicsImpostor(
	// 	gridBox,
	// 	BABYLON.PhysicsImpostor.BoxImpostor,
	// 	{ mass: 1, friction: 0.02, restitution: 0.2 },
	// 	scene
	// );

	// gridBox.checkCollisions = true;
	// Set shape for setting boundaries in the render loop

	// Create and set grid material
	let gridBoxMaterial = new Material.GridMaterial('gridBoxMaterial', scene);
	gridBoxMaterial.gridRatio = 0.3;
	gridBoxMaterial.lineColor = BABYLON.Color3.FromHexString('#01FE0A');
	gridBox.material = gridBoxMaterial;

	return gridBox;
};

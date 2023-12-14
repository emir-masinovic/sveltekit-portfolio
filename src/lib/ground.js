import * as BABYLON from '@babylonjs/core';
import * as Material from '@babylonjs/materials';

export const createGround = (scene) => {
	let groundPlane = BABYLON.MeshBuilder.CreatePlane(
		'Ground Plane',
		{
			width: 1000,
			height: 1000,
			sideOrientation: BABYLON.Mesh.DOUBLESIDE
		},
		scene
	);

	groundPlane.position.x = 0;
	groundPlane.position.y = -0.5;
	groundPlane.rotation.x = BABYLON.Tools.ToRadians(90);

	groundPlane.physicsImpostor = new BABYLON.PhysicsImpostor(
		groundPlane,
		BABYLON.PhysicsImpostor.BoxImpostor,
		{ mass: 0, friction: 0.08, restitution: 0 },
		scene
	);
	groundPlane.checkCollisions = true;

	let groundMaterial = new Material.GridMaterial('Ground Plane Material', scene);
	groundMaterial.gridRatio = 3;
	groundMaterial.majorUnitFrequency = 30;
	groundMaterial.lineColor = BABYLON.Color3.FromHexString('#fe01f5');
	// groundMaterial.lineColor = BABYLON.Color3.FromHexString('#F9C80E');
	groundPlane.material = groundMaterial;

	// let wireFrameMaterial = new BABYLON.StandardMaterial('mm', scene);
	// wireFrameMaterial.wireframe = true;
	// groundPlane.material = wireFrameMaterial;

	return groundPlane;
};

import * as BABYLON from '@babylonjs/core';

export const createArcRotateCamera = (scene) => {
	const arcCamera = new BABYLON.ArcRotateCamera(
		'Arc Camera',
		BABYLON.Tools.ToRadians(-90),
		BABYLON.Tools.ToRadians(80),
		10.0,
		new BABYLON.Vector3(0, 0, 0),
		scene
	);
	arcCamera.angularSensibilityX = 3000;
	arcCamera.angularSensibilityY = 3000;
	arcCamera.wheelPrecision = 10;
	return arcCamera;
};

export const createFreeCamera = (scene) => {
	const freeCamera = new BABYLON.FreeCamera('Free Camera', new BABYLON.Vector3(0, 5, -10), scene);
	freeCamera.rotation.x = BABYLON.Tools.ToRadians(30);
	freeCamera.inputs.addMouseWheel();
	freeCamera.speed = 2;
	let zoomSpeed = 0.5;
	freeCamera.inputs.attached.mousewheel.wheelPrecisionX = zoomSpeed;
	freeCamera.inputs.attached.mousewheel.wheelPrecisionY = zoomSpeed;
	freeCamera.inputs.attached.mousewheel.wheelPrecisionZ = zoomSpeed;
	return freeCamera;
};

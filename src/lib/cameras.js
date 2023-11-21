import * as BABYLON from '@babylonjs/core';

export const createArcRotateCamera = (scene) => {
	const arcCamera = new BABYLON.ArcRotateCamera(
		'arcCamera',
		BABYLON.Tools.ToRadians(-90),
		BABYLON.Tools.ToRadians(80),
		10.0,
		new BABYLON.Vector3(0, 0, 0),
		scene
	);

	arcCamera.angularSensibilityX = 3000;
	arcCamera.angularSensibilityY = 3000;
	return arcCamera;
};

export const createFreeCamera = (scene) => {
	const freeCamera = new BABYLON.FreeCamera('freeCamera', new BABYLON.Vector3(0, 5, -10), scene);
	// freeCamera.inputs.remove(freeCamera.inputs.attached.keyboard);
	// freeCamera.inputs.clear();
	freeCamera.inputs.addMouseWheel();
	// freeCamera.inputs.addKeyboard();
	return freeCamera;
};

export const switchCam = (cameraType, arcCamera, freeCamera, canvas, shape, scene) => {
	if (cameraType === 'arc camera') {
		freeCamera.detachControl(canvas);
		arcCamera.lockedTarget = shape;
		scene.activeCamera = arcCamera;
		arcCamera.attachControl(canvas, false);
		return arcCamera;
	}

	if (cameraType === 'free camera') {
		arcCamera.detachControl(canvas);
		scene.activeCamera = freeCamera;
		freeCamera.attachControl(canvas, false);
		return freeCamera;
	}

	// Handle other camera types or invalid inputs
	console.error('Invalid cameraType:', cameraType);
	return null;
};

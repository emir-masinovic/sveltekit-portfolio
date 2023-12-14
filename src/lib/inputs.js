import * as BABYLON from '@babylonjs/core';

let playerSpeed = 0.2;
let jumpSpeed = 5;
let rotationSpeed = 0.02;

export function setupInputHandling(
	canvas,
	scene,
	player,
	engine,
	freeCamera,
	arcCamera,
	gridPlane
) {
	const dsm = new BABYLON.DeviceSourceManager(engine);

	document.addEventListener('pointerlockchange', () => {}, false);
	canvas.onclick = function () {
		canvas.requestPointerLock = canvas.requestPointerLock;
		canvas.requestPointerLock();
	};

	scene.registerBeforeRender(() => {
		let keyboard = dsm.getDeviceSource(BABYLON.DeviceType.Keyboard);
		let mouse = dsm.getDeviceSource(BABYLON.DeviceType.Mouse);

		if (keyboard) {
			//WSAD
			if (keyboard.getInput(87) == 1)
				player.translate(BABYLON.Axis.Z, playerSpeed, BABYLON.Space.LOCAL);
			if (keyboard.getInput(83) == 1)
				player.translate(BABYLON.Axis.Z, -playerSpeed, BABYLON.Space.LOCAL);
			if (keyboard.getInput(65) == 1)
				player.translate(BABYLON.Axis.X, -playerSpeed, BABYLON.Space.LOCAL);
			if (keyboard.getInput(68) == 1)
				player.translate(BABYLON.Axis.X, playerSpeed, BABYLON.Space.LOCAL);

			// if (keyboard.getInput(87) == 1) player.position.z += playerSpeed;
			// if (keyboard.getInput(83) == 1) player.position.z -= playerSpeed;
			// if (keyboard.getInput(65) == 1) player.position.x -= playerSpeed;
			// if (keyboard.getInput(68) == 1) player.position.x += playerSpeed;

			// QE Rotations
			if (keyboard.getInput(81) == 1) player.rotate(new BABYLON.Vector3(0, -1, 0), rotationSpeed);
			if (keyboard.getInput(69) == 1) player.rotate(new BABYLON.Vector3(0, 1, 0), rotationSpeed);
			// SPACE
			if (keyboard.getInput(32) == 1) {
				player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, jumpSpeed, 0));
				player.translate(BABYLON.Axis.Y, playerSpeed, BABYLON.Space.LOCAL);
			}
			// CTRL
			if (keyboard.getInput(17) == 1) {
				player.translate(BABYLON.Axis.Y, -playerSpeed, BABYLON.Space.LOCAL);
			}

			// F = free camera
			// C = arc camera
			if (keyboard.getInput(70) == 1) {
				freeCamera.position = player.position;
				freeCamera.rotation.x = BABYLON.Tools.ToRadians(0);
				scene.activeCamera = freeCamera;
				playerSpeed = 0;
			}
			if (keyboard.getInput(67) == 1) {
				arcCamera.radius = 10;
				scene.activeCamera = arcCamera;
			}

			// R for resetting
			if (keyboard.getInput(82) == 1) player.position = new BABYLON.Vector3(0);

			// M for menu
			if (keyboard.getInput(77) == 1) console.log('MENU');
		}

		if (mouse) {
			if (mouse.getInput(2) == 1) {
				// console.log('MOUSE CLICKED');
			}
		}
	});
}

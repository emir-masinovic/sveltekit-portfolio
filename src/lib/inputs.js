import * as BABYLON from '@babylonjs/core';

let playerSpeed = 0.3;
let jumpSpeed = 2;
let rotationSpeed = 0.02;
let localAxisBool = false;
let localAxes;

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
		canvas.requestPointerLock();
	};

	// player.physicsImpostor.setLinearVelocity(
	// player.physicsImpostor.getLinearVelocity().add(transformForce(player, new BABYLON.Vector3(0, -1, 0)))
	//   );

	scene.registerBeforeRender(() => {
		let keyboard = dsm.getDeviceSource(BABYLON.DeviceType.Keyboard);
		let mouse = dsm.getDeviceSource(BABYLON.DeviceType.Mouse);

		// When it's at groud level (fake ground collision)
		if (player.position.y < 1) jumpSpeed = 2;

		// player.rotation.y = -arcCamera.alpha;
		// player.rotation.x = -arcCamera.beta;
		// player.rotation.z = -arcCamera.rotation.z;

		if (keyboard) {
			//WSAD

			// if (keyboard.getInput(87) == 1) translate(player, new BABYLON.Vector3(0, 0, 1), playerSpeed);
			// if (keyboard.getInput(83) == 1) translate(player, new BABYLON.Vector3(0, 0, -1), playerSpeed);
			// if (keyboard.getInput(65) == 1) translate(player, new BABYLON.Vector3(-1, 0, 0), playerSpeed);
			// if (keyboard.getInput(68) == 1) translate(player, new BABYLON.Vector3(1, 0, 0), playerSpeed);

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
			if (keyboard.getInput(81) == 1) {
				player.rotate(new BABYLON.Vector3(0, -1, 0), rotationSpeed);
				arcCamera.alpha += rotationSpeed;
			}
			if (keyboard.getInput(69) == 1) {
				player.rotate(new BABYLON.Vector3(0, 1, 0), rotationSpeed);
				arcCamera.alpha -= rotationSpeed;
			}
			// SPACE
			if (keyboard.getInput(32) == 1) {
				if (player.physicsImpostor.getLinearVelocity().y > 10) {
					// player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
					jumpSpeed = 0;
					return;
				}
				player.physicsImpostor.setLinearVelocity(
					new BABYLON.Vector3(0, player.physicsImpostor.getLinearVelocity().y + jumpSpeed, 0)
				);

				// player.translate(BABYLON.Axis.Y, playerSpeed, BABYLON.Space.LOCAL);
			}
			// CTRL
			// if (keyboard.getInput(17) == 1) {
			// 	player.translate(BABYLON.Axis.Y, -playerSpeed, BABYLON.Space.LOCAL);
			// }

			// F = free camera
			// C = arc camera
			if (keyboard.getInput(70) == 1) {
				freeCamera.position = player.position;
				freeCamera.rotation.x = BABYLON.Tools.ToRadians(0);
				scene.activeCamera = freeCamera;
				// playerSpeed = 0;
			}
			if (keyboard.getInput(67) == 1) {
				arcCamera.radius = 10;
				scene.activeCamera = arcCamera;
			}

			// R for resetting
			if (keyboard.getInput(82) == 1) player.position = new BABYLON.Vector3(0);

			// M for menu
			if (keyboard.getInput(77) == 1) console.log('MENU');

			if (keyboard.getInput(76) == 1) {
				localAxisBool = !localAxisBool;
				if (localAxisBool) {
					localAxes = new BABYLON.AxesViewer(scene);
					localAxes.xAxis.parent = player;
					localAxes.yAxis.parent = player;
					localAxes.zAxis.parent = player;
				} else {
					localAxes.dispose();
					localAxes = null;
				}
			}
		}

		if (mouse) {
			// 12 mousemove but error
			// if (mouse.getInput(12) == 1) {
			// 	console.log(mouse);
			// 	arcCamera.alpha += 0.1;
			// }
		}
	});
}

function translate(mesh, direction, power) {
	// console.log(mesh.physicsImpostor.getLinearVelocity().z)
	let speedLimit = 20;
	if (mesh.physicsImpostor.getLinearVelocity().z > speedLimit) {
		return;
	}
	if (-mesh.physicsImpostor.getLinearVelocity().z > speedLimit) {
		return;
	}
	if (mesh.physicsImpostor.getLinearVelocity().x > speedLimit) {
		return;
	}
	if (-mesh.physicsImpostor.getLinearVelocity().x > speedLimit) {
		return;
	}
	if (mesh.physicsImpostor.getLinearVelocity().y > speedLimit) {
		return;
	}
	if (-mesh.physicsImpostor.getLinearVelocity().y > speedLimit) {
		return;
	}

	// if (mesh.physicsImpostor.getLinearVelocity().y > 10) {
	//     mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(
	//         mesh.physicsImpostor.getLinearVelocity().z,
	//         0,
	//         mesh.physicsImpostor.getLinearVelocity().x
	//     ));
	//     return;
	// }

	// mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, 0, 1 + mesh.physicsImpostor.getLinearVelocity().z));

	// console.log(mesh.physicsImpostor.getLinearVelocity());

	mesh.physicsImpostor.setLinearVelocity(
		mesh.physicsImpostor.getLinearVelocity().add(transformForce(mesh, direction.scale(power)))
	);
}

function transformForce(mesh, vec) {
	let myMatrix = new BABYLON.Matrix();
	mesh.rotationQuaternion.toRotationMatrix(myMatrix);
	return BABYLON.Vector3.TransformNormal(vec, myMatrix);
}

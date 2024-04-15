// "use client";

// import { useEffect, useRef } from "react";
// import Phaser from "phaser";
// import { INFURA_GATEWAY } from "../../../../lib/constants";
// import { Direccion } from "../types/game.types";

// const useConfig = () => {
//   const gameRef = useRef<HTMLElement | undefined>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined" && gameRef.current) {
//       const parentWidth = 1512;
//       const parentHeight = 830;
//       const step = 5;
//       const margin = 50;
//       class CustomPhaserScene extends Phaser.Scene {
//         muchacho?: Phaser.Physics.Arcade.Sprite | null;
//         escritorio1?: Phaser.GameObjects.Image | null;
//         escritorio2?: Phaser.GameObjects.Image | null;
//         escritorio3?: Phaser.GameObjects.Image | null;
//         escritorio4?: Phaser.GameObjects.Image | null;
//         silla1?: Phaser.GameObjects.Image | null;
//         silla2?: Phaser.GameObjects.Image | null;
//         silla3?: Phaser.GameObjects.Image | null;
//         silla4?: Phaser.GameObjects.Image | null;
//         sofaUno?: Phaser.GameObjects.Image | null;
//         sofaDos?: Phaser.GameObjects.Image | null;
//         panelDeControl?: Phaser.GameObjects.Image | null;
//         cursor?: Phaser.Types.Input.Keyboard.CursorKeys | null;
//         initialPointerPosition?: { x: number; y: number };
//         frameCount: number;
//         coordinateHistory: { x: number; y: number }[];
//         sentadoSofa: boolean;
//         sentadoEscritorio: boolean;
//         isMoving: boolean;
//         movimientosDesdeSentado: number;
//         estaSentado: boolean;
//         estaMoviendoHaciaObjeto: boolean;
//         currentPath: { coords: { x: number; y: number }[]; direc: Direccion[] };
//         sentado: {
//           animacion: string | undefined;
//           eleccion: Phaser.GameObjects.Image | null | undefined;
//         };

//         constructor() {
//           super();
//           this.initialPointerPosition = { x: 0, y: 0 };
//           this.muchacho = null;
//           this.cursor = null;
//           this.currentPath = {
//             coords: [],
//             direc: [],
//           };
//           this.coordinateHistory = [];
//           this.escritorio1 = null;
//           this.escritorio2 = null;
//           this.escritorio3 = null;
//           this.escritorio4 = null;
//           this.sofaUno = null;
//           this.sofaDos = null;
//           this.estaSentado = false;
//           this.panelDeControl = null;
//           this.frameCount = 0;
//           this.sentadoSofa = false;
//           this.estaMoviendoHaciaObjeto = false;
//           this.sentadoEscritorio = false;
//           this.isMoving = false;
//           this.nextMoveTime = 0;
//           this.movimientosDesdeSentado = 0;
//           this.sentado = {
//             eleccion: undefined,
//             animacion: undefined,
//           };
//         }

//         preload() {
//           this.load.image(
//             "fondo",
//             `${INFURA_GATEWAY}/ipfs/QmQho15EawdPjxhZ6QcnFoGHiEV8r2dTS1u7TczQv9cd44`
//           );
//           this.load.image(
//             "pared",
//             `${INFURA_GATEWAY}/ipfs/QmcR8PpyDhRaUzJJW5UoxhnyzqNk88imgXS2MGuhgfYsYK`
//           );
//           this.load.image(
//             "nevera",
//             `${INFURA_GATEWAY}/ipfs/QmaGoMNwYt7aEgG6AoKGmDdmWUQgshQ8KtASkgoHKgmcS2`
//           );
//           this.load.image(
//             "maquina",
//             `${INFURA_GATEWAY}/ipfs/QmVubKFGVcdfZS2pSEhmK8DtpFWbiC8H2BX11VPTd9xnNp`
//           );
//           this.load.image(
//             "sofaUno",
//             `${INFURA_GATEWAY}/ipfs/QmQfqKAD2Hepe9kQ9VxBSNmwZrywCvuPrnAr5AiF4bMvwB`
//           );
//           this.load.image(
//             "sofaDos",
//             `${INFURA_GATEWAY}/ipfs/QmUFsXQpp1ZZWKWCnHAED4pgZgeLSBnp4ofMz9ae1BkhAR`
//           );
//           this.load.image(
//             "alfombra",
//             `${INFURA_GATEWAY}/ipfs/QmQaZhrMnuwkKbP2UbYtnMxRiUcpZfNGyuEhGuqd7xcFAj`
//           );
//           this.load.image(
//             "escritorio1",
//             `${INFURA_GATEWAY}/ipfs/QmWtr9iRZ4HiPe1PBxrJfiB9hEQNa3GWxtipt7hqFvBPvs`
//           );
//           this.load.image(
//             "silla1",
//             `${INFURA_GATEWAY}/ipfs/QmariT81Kgxw4mNHCt8wGHmgH5avzrZt2r6vNiik4qeSwK`
//           );
//           this.load.image(
//             "escritorio2",
//             `${INFURA_GATEWAY}/ipfs/QmTwbtXhizeCxBbZk9Nbd3yrt67kcB7Ytm6sKAzx5rFtCd`
//           );
//           this.load.image(
//             "silla2",
//             `${INFURA_GATEWAY}/ipfs/Qmc8VyBMDALMJJknadELsL9SBQuYSuTHpa3e1SqfX61Egn`
//           );
//           this.load.image(
//             "escritorio3",
//             `${INFURA_GATEWAY}/ipfs/Qmcy6nTw4YaGj8AEtba2WVm8gYy1vj9LbyMNk9qGptz4ny`
//           );
//           this.load.image(
//             "silla3",
//             `${INFURA_GATEWAY}/ipfs/QmUuHUnrMHhusH1JrgG6WonoCUxG1t7LQe348gru2d4uHM`
//           );
//           this.load.image(
//             "escritorio4",
//             `${INFURA_GATEWAY}/ipfs/Qmd8VH1yPkPGtxoRM1bdAvLJnjyTG21pgswddCVnECxDHh`
//           );
//           this.load.image(
//             "silla4",
//             `${INFURA_GATEWAY}/ipfs/QmfZPky9neYWSuQcZ7wtyajqMCRPBaq7WiPjaab4ZxC8PZ`
//           );
//           this.load.image(
//             "panelDeControl",
//             `${INFURA_GATEWAY}/ipfs/QmWMPF4YYvRLGW4F76kufDSxg2LnYojDNZK7cfdkwQxdXw`
//           );
//           this.load.image(
//             "arcade",
//             `${INFURA_GATEWAY}/ipfs/QmaNMrJo7TqEpvsveTFJk7zwBbS4SukM3gnuVwhiY5sCoa`
//           );
//           this.load.image(
//             "audio1",
//             `${INFURA_GATEWAY}/ipfs/QmYrGLoU35kwH9HyVLi283hG2GzX1fbxuszHT3j1qfAs8G`
//           );
//           this.load.image(
//             "audio2",
//             `${INFURA_GATEWAY}/ipfs/QmQA2cgeuAMvLSqj75CWrhmNhKoQV2GKapy94Co6WmWQVi`
//           );
//           this.load.image(
//             "planta1",
//             `${INFURA_GATEWAY}/ipfs/QmXYg1FC5zTHXHP1czJmsusC9DT33JCwHnLacYAui1HH84`
//           );
//           this.load.image(
//             "planta2",
//             `${INFURA_GATEWAY}/ipfs/QmdcSwsasjt18R7Hey77X6idnW9qz25Q1XkVsHT7inqbm7`
//           );
//           this.load.image(
//             "telefono",
//             `${INFURA_GATEWAY}/ipfs/QmSz2dcSRdX9vtxpXH91dS4pe8PAkAakbwfb4mGZNwunkk`
//           );
//           this.load.image(
//             "capsula",
//             `${INFURA_GATEWAY}/ipfs/QmYjXKxmyRQHf6fDdqEaNPEdc3W7gcFuNxogsVL38kR3M9`
//           );
//           this.load.spritesheet(
//             "muchacho",
//             `${INFURA_GATEWAY}/ipfs/QmUHDrL3JTUMwztqyzr8cUdCjYLpjET9pRXrLTRPtfgSBx`,
//             {
//               frameWidth: 600,
//               frameHeight: 600,
//               margin: 0,
//               startFrame: 0,
//               endFrame: 143,
//             }
//           );
//         }

//         create() {
//           const fondo = this.add.image(0, 0, "fondo").setOrigin(0, 0);
//           fondo.displayWidth = parentWidth;
//           fondo.displayHeight = parentHeight;
//           const pared = this.physics.add
//             .staticImage(fondo.width, 0, "pared")
//             .setOrigin(0.62, 0)
//             .setScale(1.1);
//           pared.scaleX = 1.3;
//           pared.body
//             .setSize(pared.width, pared.height / 1.5, false)
//             .setOffset(-0.5, 0);
//           const nevera = this.physics.add
//             .staticImage(0, 0, "nevera")
//             .setOrigin(0, 0)
//             .setScale(1.1);
//           nevera.scaleX = 1.4;
//           nevera.body
//             .setSize(nevera.width * 2, nevera.height * 0.8, false)
//             .setOffset(0, 0);
//           const maquina = this.physics.add
//             .staticImage(
//               nevera.width + nevera.width / 2,
//               nevera.height / 7,
//               "maquina"
//             )
//             .setOrigin(0, 0)
//             .setScale(1.1);
//           maquina.scaleX = 1.6;
//           maquina.body
//             .setSize(maquina.width, maquina.height / 3, false)
//             .setOffset(maquina.width, maquina.height / 5);
//           const alfombra = this.add
//             .image(fondo.width / 4, fondo.height / 2, "alfombra")
//             .setOrigin(0, 0)
//             .setScale(1.2);
//           alfombra.scaleX = 1.5;
//           this.sofaUno = this.add
//             .image(fondo.width / 1.5, pared.height / 1.4, "sofaUno")
//             .setOrigin(0, 0)
//             .setScale(1.2);
//           this.sofaDos = this.add
//             .image(fondo.width / 0.9, pared.height / 1.4, "sofaDos")
//             .setOrigin(0, 0)
//             .setScale(1.2);

//           this.panelDeControl = this.add
//             .image(
//               Number(parentWidth),
//               Number(parentHeight) / 1.1,
//               "panelDeControl"
//             )
//             .setOrigin(1, 1);

//           this.escritorio1 = this.add
//             .image(
//               Number(parentWidth) - 20,
//               Number(parentHeight) / 2.2,
//               "escritorio1"
//             )
//             .setOrigin(1, 1);
//           this.silla1 = this.add
//             .image(
//               Number(this.escritorio1.x) - Number(this.escritorio1.width / 2.5),
//               this.escritorio1.y,
//               "silla1"
//             )
//             .setOrigin(1, 1);
//           this.escritorio2 = this.add
//             .image(
//               Number(parentWidth) - 20,
//               Number(parentHeight) / 1.6,
//               "escritorio2"
//             )
//             .setOrigin(1, 1);
//           this.silla2 = this.add
//             .image(
//               Number(this.escritorio2.x) - Number(this.escritorio2.width / 2.5),
//               this.escritorio2.y,
//               "silla2"
//             )
//             .setOrigin(1, 1);

//           this.escritorio3 = this.add
//             .image(
//               Number(parentWidth) - (this.escritorio1.width + 20),
//               Number(parentHeight) / 2.2,
//               "escritorio3"
//             )
//             .setOrigin(1, 1);
//           this.silla3 = this.add
//             .image(
//               Number(this.escritorio3.x) - Number(this.escritorio3.width / 2.5),
//               this.escritorio3.y,
//               "silla3"
//             )
//             .setOrigin(1, 1);

//           this.escritorio4 = this.add
//             .image(
//               Number(parentWidth) - (this.escritorio2.width + 20),
//               Number(parentHeight) / 1.6,
//               "escritorio4"
//             )
//             .setOrigin(1, 1);
//           this.silla4 = this.add
//             .image(
//               Number(this.escritorio4.x) - Number(this.escritorio4.width / 2.5),
//               this.escritorio4.y,
//               "silla4"
//             )
//             .setOrigin(1, 1);

//           const arcade = this.physics.add
//             .staticImage(Number(parentWidth), Number(parentHeight), "arcade")
//             .setOrigin(1, 1)
//             .setDepth(10000);
//           const telefono = this.physics.add
//             .staticImage(0, Number(parentHeight), "telefono")
//             .setOrigin(0, 1)
//             .setDepth(10000);
//           telefono.body
//             .setSize(telefono.width, telefono.height, false)
//             .setOffset(0, -telefono.height / 2);
//           const capsula = this.physics.add
//             .staticImage(0, Number(parentHeight) - telefono.height, "capsula")
//             .setOrigin(0, 1)
//             .setDepth(10000);
//           capsula.body
//             .setSize(capsula.width, capsula.height, false)
//             .setOffset(0, -capsula.height / 2);

//           this.muchacho = this.physics.add
//             .sprite(
//               alfombra.x + alfombra.x / 2,
//               alfombra.y + alfombra.y / 2,
//               "muchacho"
//             )
//             .setScale(0.5);
//           this.cameras.main.startFollow(this.muchacho, true, 0.05, 0.05);

//           const audio1 = this.add
//             .image(Number(parentWidth) / 2, Number(parentHeight), "audio1")
//             .setOrigin(1, 1)
//             .setDepth(10000);
//           this.add
//             .image(
//               Number(parentWidth) / 2 + audio1.width,
//               Number(parentHeight),
//               "audio2"
//             )
//             .setOrigin(1, 1)
//             .setDepth(10000);
//           const planta1 = this.add
//             .image(Number(parentWidth) / 2.5, Number(parentHeight), "planta1")
//             .setOrigin(1, 1)
//             .setDepth(10000);
//           this.add
//             .image(
//               Number(parentWidth) / 2.5 - planta1.width,
//               Number(parentHeight),
//               "planta2"
//             )
//             .setOrigin(1, 1)
//             .setDepth(10000);
//           this.physics.world.bounds.width = parentWidth;
//           this.physics.world.bounds.height = parentHeight;
//           this.cameras.main.setBounds(0, 0, parentWidth, parentHeight);

//           this.cursor = this.input.keyboard?.createCursorKeys();
//           this.physics.add.collider(
//             this.muchacho,
//             capsula,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             telefono,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             arcade,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             pared,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             nevera,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             maquina,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             this.sofaUno,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.physics.add.collider(
//             this.muchacho,
//             this.sofaDos,
//             () => {
//               this.stopCharacterAndPlanNextMove();
//             },
//             undefined,
//             this
//           );
//           this.muchacho.setCollideWorldBounds(true);

//           this.anims.create({
//             key: "inactivo",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 132,
//               end: 143,
//             }),
//             frameRate: 0.3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "arriba",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 0,
//               end: 11,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "izquierda",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 24,
//               end: 35,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "abajo",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 12,
//               end: 23,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "derecha",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 36,
//               end: 47,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "izquierdaAbajo",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 72,
//               end: 83,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "izquierdaArriba",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 48,
//               end: 59,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "derechaArriba",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 60,
//               end: 71,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "derechaAbajo",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 84,
//               end: 95,
//             }),
//             frameRate: 3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "sentadoSofa",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 97,
//               end: 108,
//             }),
//             frameRate: 0.3,
//             repeat: -1,
//           });
//           this.anims.create({
//             key: "sentadoEscritorio",
//             frames: this.anims.generateFrameNumbers("muchacho", {
//               start: 108,
//               end: 119,
//             }),
//             frameRate: 0.3,
//             repeat: -1,
//           });
//         }
//         update() {
//           if (this.movimientosDesdeSentado >= 4 && !this.estaSentado) {
//             this.decidirSentarse();
//             this.movimientosDesdeSentado = 0;
//           } else {
//             if (!this.currentPath || this.currentPath.coords.length === 0) {
//               this.elegirCoorinados();
//               this.calcularDirecciones();
//             }

//             if (this.currentPath.coords.length > 0) {
//               this.isMoving = true;
//               this.seguirCamino();
//             }
//           }

//           // if (
//           //   !this.isMoving &&
//           //   (!this.nextMoveTime || this.time.now > this.nextMoveTime)
//           // ) {
//           // } else if (this.isMoving) {
//           //   const reachedWorldBounds =
//           //     this.muchacho?.body?.blocked.right ||
//           //     this.muchacho?.body?.blocked.left ||
//           //     this.muchacho?.body?.blocked.up ||
//           //     this.muchacho?.body?.blocked.down;

//           //   if (reachedWorldBounds) {
//           //     this.stopCharacterAndPlanNextMove();
//           //   }
//           // }

//           this.manejarProfundidad();

          
//         }
//         stopCharacterAndPlanNextMove() {
//           if (!this.estaSentado) {
//             this.muchacho?.setVelocity(0, 0);
//             this.muchacho?.anims.play("inactivo", true);
//             this.isMoving = false;
//           }
//         }
//         seguirCamino() {
//           const nextCoord = this.currentPath.coords[0];
//           const direction = this.currentPath.direc[0];
//           this.moveCharacter(direction);
//           this.adjustMovementTowards(nextCoord);
//         }
//         adjustMovementTowards(target) {
//           const dx = target.x - this.muchacho.x;
//           const dy = target.y - this.muchacho.y;

//           if (Math.sqrt(dx * dx + dy * dy) < 5) {
//             this.muchacho.x = target.x;
//             this.muchacho.y = target.y;
//             this.currentPath.coords.shift();
//             this.currentPath.direc.shift();
//             this.seguirCamino();
//           } else {
//             this.muchacho.x += dx * 0.1;
//             this.muchacho.y += dy * 0.1;
//           }
//         }
//         detectarColision(x: number, y: number) {
//           if (
//             x < 0 ||
//             x > Number(this.game.config.width) ||
//             y < 0 ||
//             y > Number(this.game.config.height)
//           ) {
//             return true;
//           }

//           // Verifica colisiones con obstáculos
//           // for (let obstaculo of this.obstaculos) {
//           //   if (
//           //     Phaser.Geom.Intersects.RectangleToRectangle(
//           //       obstaculo.getBounds(),
//           //       new Phaser.Geom.Rectangle(
//           //         x,
//           //         y,
//           //         this.muchacho.width,
//           //         this.muchacho.height
//           //       )
//           //     )
//           //   ) {
//           //     return true;
//           //   }
//           // }

//           return false;
//         }
//         calcularDirecciones() {
//           let directions: Direccion[] = [];
//           let lastPosition: { x: number; y: number } = {
//             x: Number(this.muchacho?.x),
//             y: Number(this.muchacho?.y),
//           };

//           for (let coords of this.currentPath.coords) {
//             let direction: Direccion;
//             const angle =
//               (Math.atan2(
//                 coords.y - lastPosition.y,
//                 coords.x - lastPosition.x
//               ) *
//                 180) /
//               Math.PI;

//             if (angle >= -22.5 && angle < 22.5) {
//               direction = Direccion.Derecha;
//             } else if (angle >= 22.5 && angle < 67.5) {
//               direction = Direccion.DerechaAbajo;
//             } else if (angle >= 67.5 && angle < 112.5) {
//               direction = Direccion.Abajo;
//             } else if (angle >= 112.5 && angle < 157.5) {
//               direction = Direccion.IzquierdaAbajo;
//             } else if (
//               (angle >= 157.5 && angle <= 180) ||
//               (angle >= -180 && angle < -157.5)
//             ) {
//               direction = Direccion.Izquierda;
//             } else if (angle >= -157.5 && angle < -112.5) {
//               direction = Direccion.IzquierdaArriba;
//             } else if (angle >= -112.5 && angle < -67.5) {
//               direction = Direccion.Arriba;
//             } else if (angle >= -67.5 && angle < -22.5) {
//               direction = Direccion.DerechaArriba;
//             }
//             directions.push(direction);
//             lastPosition = coords;
//           }

//           this.currentPath.direc = directions;
//         }
//         elegirCoorinados() {
//           this.movimientosDesdeSentado++;
//           const numCoords = Phaser.Math.Between(1, 7);
//           let newCoords: { x: number; y: number }[] = [];

//           for (let j = 0; j < numCoords; j++) {
//             let newX: number, newY: number, tooClose: boolean;
//             do {
//               tooClose = false;
//               newX = Phaser.Math.Between(
//                 10,
//                 Number(this.game.config.width) - 10
//               );
//               newY = Phaser.Math.Between(
//                 10,
//                 Number(this.game.config.height) - 10
//               );

//               for (let i = 0; i < newCoords.length; i++) {
//                 if (
//                   Phaser.Math.Distance.Between(
//                     newX,
//                     newY,
//                     newCoords[i].x,
//                     newCoords[i].y
//                   ) < 100
//                 ) {
//                   tooClose = true;
//                   break;
//                 }
//               }

//               if (!tooClose) {
//                 for (
//                   let i = 0;
//                   i < this.coordinateHistory.length && i < 6;
//                   i++
//                 ) {
//                   let oldCoord =
//                     this.coordinateHistory[
//                       this.coordinateHistory.length - 1 - i
//                     ];
//                   if (
//                     Phaser.Math.Distance.Between(
//                       newX,
//                       newY,
//                       oldCoord.x,
//                       oldCoord.y
//                     ) < 100
//                   ) {
//                     tooClose = true;
//                     break;
//                   }
//                 }
//               }
//             } while (tooClose);

//             newCoords.push({ x: newX, y: newY });
//           }

//           this.coordinateHistory = this.coordinateHistory.concat(newCoords);
//           if (this.coordinateHistory.length > 6) {
//             this.coordinateHistory = this.coordinateHistory.slice(-6);
//           }

//           this.currentPath.coords = newCoords;
//         }
//        
//         moveCharacter(direction: Direccion) {
//           switch (direction) {
//             case Direccion.Izquierda:
//               this.muchacho?.setVelocityX(-160);
//               break;
//             case Direccion.Derecha:
//               this.muchacho?.setVelocityX(160);
//               break;
//             case Direccion.Arriba:
//               this.muchacho?.setVelocityY(-160);
//               break;
//             case Direccion.Abajo:
//               this.muchacho?.setVelocityY(160);
//               break;
//             case Direccion.IzquierdaAbajo:
//               this.muchacho?.setVelocityX(-160);
//               this.muchacho?.setVelocityY(160);
//               break;
//             case Direccion.DerechaAbajo:
//               this.muchacho?.setVelocityX(160);
//               this.muchacho?.setVelocityY(160);
//               break;
//             case Direccion.IzquierdaArriba:
//               this.muchacho?.setVelocityX(-160);
//               this.muchacho?.setVelocityY(-160);

//               break;
//             case Direccion.DerechaArriba:
//               this.muchacho?.setVelocityX(160);
//               this.muchacho?.setVelocityY(-160);

//               break;
//           }

//           this.muchacho?.anims.play(direction, true);
//         }
//         moverHaciaObjeto() {
//           const posibilidades = [
//             this.sofaUno,
//             this.sofaDos,
//             this.silla1,
//             this.silla2,
//             this.silla3,
//             this.silla4,
//           ];
//           this.sentado!.eleccion = Phaser.Utils.Array.GetRandom(posibilidades)!;

//           this.sentado!.animacion =
//             this.sentado?.eleccion === this.sofaUno ||
//             this.sentado?.eleccion === this.sofaDos
//               ? "sentadoSofa"
//               : "sentadoEscritorio";

//           this.estaMoviendoHaciaObjeto = true;
//           const direccionX =
//             Number(this.sentado?.eleccion?.x) - Number(this.muchacho?.x);
//           const direccionY =
//             Number(this.sentado?.eleccion?.y) - Number(this.muchacho?.y);
//           const distancia = Math.sqrt(
//             direccionX * direccionX + direccionY * direccionY
//           );

//           const normDirX = direccionX / distancia;
//           const normDirY = direccionY / distancia;

//           this.muchacho?.setVelocityX(normDirX * 160);
//           this.muchacho?.setVelocityY(normDirY * 160);

//           const angulo = (Math.atan2(normDirY, normDirX) * 180) / Math.PI;

//           if (direccionX > 0 && direccionY > 0) {
//             this.muchacho?.anims.play("derechaAbajo", true);
//           } else if (direccionX < 0 && direccionY > 0) {
//             this.muchacho?.anims.play("izquierdaAbajo", true);
//           } else if (direccionX < 0 && direccionY < 0) {
//             this.muchacho?.anims.play("izquierdaArriba", true);
//           } else if (direccionX > 0 && direccionY < 0) {
//             this.muchacho?.anims.play("derechaArriba", true);
//           } else if (angulo >= 45 && angulo < 135) {
//             this.muchacho?.anims.play("abajo", true);
//           } else if (angulo >= 135 || angulo < -135) {
//             this.muchacho?.anims.play("izquierda", true);
//           } else if (angulo >= -135 && angulo < -45) {
//             this.muchacho?.anims.play("arriba", true);
//           } else if (angulo >= -45 && angulo < 45) {
//             this.muchacho?.anims.play("derecha", true);
//           }
//         }
//         decidirSentarse() {
//           if (this.estaMoviendoHaciaObjeto) {
//             this.checkLlegada();
//           } else {
//             this.moverHaciaObjeto();
//           }
//         }
//         checkLlegada() {
//           if (
//             Phaser.Math.Distance.Between(
//               this.muchacho?.x!,
//               this.muchacho?.y!,
//               this.sentado?.eleccion?.x!,
//               this.sentado?.eleccion?.y!
//             ) < 10 ||
//             this.muchacho?.anims.getName() == "inactivo"
//           ) {
//             this.estaSentado = true;
//             this.muchacho?.setVelocityX(0);
//             this.muchacho?.setVelocityY(0);
//             this.muchacho?.anims.play(this.sentado?.animacion!);
//             this.estaMoviendoHaciaObjeto = false;

//             const tiempoSentado = Phaser.Math.Between(10000, 20000);
//             this.time.delayedCall(
//               tiempoSentado,
//               () => {
//                 this.estaSentado = false;
//                 this.stopCharacterAndPlanNextMove();
//               },
//               [],
//               this
//             );
//           }
//         }
//         bloqueoDinamico(direccion: Direccion): boolean {
//           const numeroUmbral = 20;
//           const bloqueos = [
//             this.escritorio1,
//             this.silla1,
//             this.escritorio2,
//             this.silla2,
//             this.escritorio3,
//             this.silla3,
//             this.escritorio4,
//             this.silla4,
//             this.panelDeControl,
//           ];

//           const esBloqueado = bloqueos.some(
//             (item: Phaser.GameObjects.Image | null | undefined) => {
//               const escritorio4Y =
//                 this.muchacho!?.y > item!?.y - item!?.height - numeroUmbral &&
//                 this.muchacho!?.y < item!?.y - item!?.height + numeroUmbral;
//               const escritorio4DerechoX =
//                 this.muchacho!?.x >= item!?.x - item!?.width - numeroUmbral &&
//                 this.muchacho!?.x <= item!?.x - item!?.width + numeroUmbral;
//               const escritorio4IzquierdoX =
//                 this.muchacho!?.x <= item!?.x + numeroUmbral &&
//                 this.muchacho!?.x >= item!?.x - numeroUmbral;

//               const escritorio4X =
//                 this.muchacho!?.x > item!?.x - item!?.width - numeroUmbral &&
//                 this.muchacho!?.y < item!?.x - item!?.width + numeroUmbral;

//               const escritorio4AbajoY =
//                 this.muchacho!?.y >= item!?.y - item!?.height - numeroUmbral &&
//                 this.muchacho!?.y <= item!?.y - item!?.height + numeroUmbral;
//               const escritorio4ArribaY =
//                 this.muchacho!?.y <=
//                   item!?.y - item!?.height / 1.5 + numeroUmbral &&
//                 this.muchacho!?.y >=
//                   item!?.y - item!?.height / 1.5 - numeroUmbral;

//               if (direccion == Direccion.Izquierda) {
//                 if (escritorio4Y && escritorio4IzquierdoX) {
//                   return true;
//                 }
//               } else if (direccion == Direccion.Derecha) {
//                 if (escritorio4Y && escritorio4DerechoX) {
//                   return true;
//                 }
//               } else if (direccion == Direccion.Arriba) {
//                 if (escritorio4X && escritorio4ArribaY) {
//                   return true;
//                 }
//               } else if (direccion == Direccion.Abajo) {
//                 if (escritorio4X && escritorio4AbajoY) {
//                   return true;
//                 }
//               }

//               return false;
//             }
//           );

//           return !esBloqueado;
//         }
//         // adjustCharacterForSitting(
//         //   destino: {
//         //     x: number;
//         //     y: number;
//         //   },
//         //   action: string
//         // ) {
//         //   this.muchacho?.body?.stop();
//         //   this.muchacho?.setPosition(destino.x, destino.y);
//         //   this.muchacho?.anims.play(action, true);

//         //   if (action === "sentadoEscritorio") {
//         //     this.handleTolerancia();
//         //   }
//         // }
//         // handleTolerancia() {
//         //   [
//         //     { escritorio: this.escritorio1!, silla: this.silla1! },
//         //     { escritorio: this.escritorio2!, silla: this.silla2! },
//         //     { escritorio: this.escritorio3!, silla: this.silla3! },
//         //     { escritorio: this.escritorio4!, silla: this.silla4! },
//         //   ].forEach(
//         //     (item: {
//         //       escritorio: Phaser.GameObjects.Image;
//         //       silla: Phaser.GameObjects.Image;
//         //     }) => {
//         //       const centroEscritorioX =
//         //         Number(item.escritorio.x) -
//         //         Number(item.escritorio.displayWidth) * 0.5;
//         //       const frenteEscritorioY = Number(item.escritorio.y);
//         //       const muchachoX = this.muchacho?.x;
//         //       const muchachoY = this.muchacho?.y;

//         //       const toleranciaX = Number(item.escritorio.displayWidth) * 0.5;
//         //       const toleranciaY = 100;

//         //       if (
//         //         Math.abs(Number(muchachoX) - centroEscritorioX) <=
//         //           toleranciaX &&
//         //         Math.abs(Number(muchachoY) - frenteEscritorioY) <= toleranciaY
//         //       ) {
//         //         item.escritorio?.setDepth(1);
//         //         item.silla?.setDepth(2);
//         //         this.muchacho?.setDepth(1.5);
//         //       }
//         //     }
//         //   );
//         // }
//         // handleAction(waypoint: Waypoint) {
//         //   const { duracion, direccion } = waypoint;
//         //   this.isMoving = true;
//         //   if (direccion) this.muchacho?.anims.play(direccion, true);

//         //   this.time.delayedCall(duracion!, () => {
//         //     this.isMoving = false;
//         //     this.advanceToNextWaypoint();
//         //   });
//         // }
//         // advanceToNextWaypoint() {
//         //   this.currentWaypointIndex++;
//         //   if (this.currentWaypointIndex >= this.waypoints.length) {
//         //     this.currentWaypointIndex = 0;
//         //   }
//         // }
//       }

//       const config: Phaser.Types.Core.GameConfig = {
//         type: Phaser.AUTO,
//         width: gameRef.current.clientWidth,
//         height: gameRef.current.clientHeight,
//         physics: {
//           default: "arcade",
//           arcade: {
//             gravity: { y: 0, x: 0 },
//             debug: false,
//           },
//         },
//         scene: [CustomPhaserScene],
//         parent: gameRef.current as HTMLElement,
//       };

//       const game = new Phaser.Game(config);

//       return () => {
//         game.destroy(true);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.js";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return {
//     gameRef,
//   };
// };

// export default useConfig;

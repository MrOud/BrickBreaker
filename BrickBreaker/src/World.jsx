import { Physics, RigidBody } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import LevelBounds from './LevelBounds.jsx'

export default function World()
{
    const { camera } = useThree()
    camera.position.copy(new THREE.Vector3(0, 75, 75))
    camera.lookAt(new THREE.Vector3(0, 40, 0))

    // const {camPos, camRot, camLook } = useControls({
    //     camPos: { x: 0, y: 57, z: 48 },
    //     camRot: { x: 0, y: 0, z: 0 },
    //     camLook: { x: 0, y: 51, z: 0 },
    // })

    // useFrame((state) => 
    // {
    //     state.camera.position.copy(new THREE.Vector3(camPos.x, camPos.y, camPos.z))
    //     state.camera.lookAt(camLook.x, camLook.y, camLook.z)
    //     state.camera.rotateX(camRot.x)
    //     state.camera.rotateY(camRot.y)
    //     state.camera.rotateZ(camRot.z)
    // })
    
    return <>
        <color args={['#3C7EF0']} attach="background" />
        <Physics>
            <RigidBody type='fixed'>
                <mesh>
                    <boxGeometry args={[80, 0.5, 3]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            </RigidBody>
            <LevelBounds />
            <Ball />
            <Player />
            <Lights />
        </Physics>
    </>
}
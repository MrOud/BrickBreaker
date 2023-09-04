import { Physics } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import LevelBounds from './LevelBounds.jsx'
import Brick from './Brick.jsx'

export default function World()
{
    const { camera } = useThree()
    camera.position.copy(new THREE.Vector3(5, 50, 70))
    camera.zoom = 10
    camera.lookAt(new THREE.Vector3(0, 35, 0))

    return <>
        <color args={['#3C7EF0']} attach="background" />
        <Physics debug={false}>
            <LevelBounds />
            <Ball />
            <Brick position={[6, 19, 0]} />
            <Brick position={[30, 20, 0]} />
            <Brick position={[-30, 36, 0]} />
            <Brick position={[6, 35, 0]} />
            <Brick position={[-12, 15, 0]} />
            <Player />
            <Lights />
        </Physics>
    </>
}
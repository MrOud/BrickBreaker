import { Physics } from '@react-three/rapier'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import LevelManager from './LevelManager.jsx'

export default function World()
{
    const { camera } = useThree()
    camera.position.copy(new THREE.Vector3(5, 50, 70))
    camera.zoom = 10
    camera.lookAt(new THREE.Vector3(0, 35, 0))

    return <>
        <color args={['#3C7EF0']} attach="background" />
        <Physics debug={true}>
            <LevelManager />
            <Lights />
        </Physics>
    </>
}
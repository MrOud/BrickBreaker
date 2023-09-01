import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import Ball from './Ball.jsx'
import LevelBounds from './LevelBounds.jsx'

export default function World()
{
    return <>
        <color args={['#3C7EF0']} attach="background" />
        <OrbitControls />
        <Physics debug>
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
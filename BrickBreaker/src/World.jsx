import { Physics, RigidBody } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'

export default function World()
{
    return <>
        <color args={['#3C7EF0']} attach="background" />
        <OrbitControls />
        <Physics>
            <RigidBody type='fixed'>
                <mesh>
                    <boxGeometry args={[20, 0.5, 20]} />
                    <meshStandardMaterial color={'green'} />
                </mesh>
            </RigidBody>
            <RigidBody>
                <mesh position={[0, 20, 0]}>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color={'blue'} />
                </mesh>
            </RigidBody>
            <Lights />
        </Physics>
    </>
}
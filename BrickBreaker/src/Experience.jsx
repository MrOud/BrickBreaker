import './Experience.css'
import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import World from './World.jsx'
import WorldUI from './WorldUI.jsx'

export default function Experience()
{
    return <>
    <KeyboardControls
        map={[
                {name: 'pushLeft', keys: ['ArrowLeft', 'KeyA']},
                {name: 'pushRight', keys: ['ArrowRight', 'KeyD']},
                {name: 'space', keys: ['Space']}
             ]}> 
            <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 57, 48 ]
            } }
            >
                <World />
            </Canvas>
            <WorldUI />
        </KeyboardControls>
    </>
}
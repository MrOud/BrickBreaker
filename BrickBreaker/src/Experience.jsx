import './Experience.css'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrthographicCamera } from '@react-three/drei'
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
            <Canvas>
                <OrthographicCamera
                    makeDefault
                    zoom={10}
                    far={100}
                    position={[0, 0, 0]}
                />
                <World />
            </Canvas>
            <WorldUI />
        </KeyboardControls>
    </>
}
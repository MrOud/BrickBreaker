import { useState, useRef } from 'react'
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export default function Brick({ color='yellowgreen', args=[6, 2, 3], position=[0, 0, 0]})
{
    const brick = useRef()
    const [ isActive, setIsActive ] = useState(true)

    const hitBrick = (event) => 
    {
        const name = event.colliderObject.name
        if (name === 'ball') {
            // brick.current.setNextKinematicTranslation({x: position[0], y: position[1], z: position[2] + 50})
            setIsActive(false)
        }
    }

    const renderBrick = () => 
    {
        return <>
        {/* Collider for main body of brick - hitting here is hitting the top of bottom face */}
        <RigidBody ref={ brick }
        position={ position }
        type="kinematicPosition"
        name="brick"
        onCollisionEnter={ (event) => hitBrick(event) }
        >
            <mesh>
                <boxGeometry args={args} />
                <meshStandardMaterial color={ color } />
            </mesh>
            
        </RigidBody>
        
        {/* Side Colliders */}
        <CuboidCollider
                name='brickSide'
                args={[0.1, (args[1] / 2) - 0.1, (args[2] / 2) - 0.1]} 
                position={[position[0] + (args[0] / 2) + 0.1, position[1], position[2]]}
                onCollisionEnter={ (event) => hitBrick(event) }
            />
        <CuboidCollider
            name='brickSide'
            args={[0.1, (args[1] / 2) - 0.1, (args[2] / 2) - 0.1]} 
            position={[position[0] - (args[0] / 2) + 0.1, position[1], position[2]]}
            onCollisionEnter={ (event) => hitBrick(event) }
        />
        </>
    }

    return <>
       {(isActive) ? renderBrick() : null}
    </>
}
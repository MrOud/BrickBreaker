import { useState, useRef } from 'react'
import { CuboidCollider, RigidBody } from "@react-three/rapier"

export default function Brick({ hits=2, color='yellowgreen', args=[6, 2, 3], position=[0, 0, 0]})
{
    const brick = useRef()
    const [ isActive, setIsActive ] = useState(true)
    const [ hitPoints, setHitPoints ] = useState(hits)

    const hitBrick = (event) => 
    {
        const name = event.colliderObject.name
        if (name === 'ball') {
            if (hitPoints == 1) {
                setIsActive(false)
            } else {
                setHitPoints(hitPoints - 1)
            }
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
                <meshStandardMaterial color={ (hitPoints == 1) ? 'red' : color } />
            </mesh>
            
        </RigidBody>

        {/* Side Colliders */}
        <CuboidCollider
                name='brickSide'
                args={[0.1, (args[1] / 2) - 0.2, (args[2] / 2) - 0.1]} 
                position={[position[0] + (args[0] / 2), position[1], position[2]]}
                onCollisionEnter={ (event) => hitBrick(event) }
            />
        <CuboidCollider
            name='brickSide'
            args={[0.1, (args[1] / 2) - 0.2, (args[2] / 2) - 0.1]} 
            position={[position[0] - (args[0] / 2), position[1], position[2]]}
            onCollisionEnter={ (event) => hitBrick(event) }
        />
        </>
    }

    return <>
       {(isActive) ? renderBrick() : null}
    </>
}
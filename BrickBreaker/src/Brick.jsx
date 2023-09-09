import { useState, useRef, useEffect } from 'react'
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import useGame from './useGame'

export default function Brick({ hits=2, color='yellowgreen', args=[6, 2, 3], position=[0, 0, 0], seed=0})
{
    const brick = useRef()
    const [ isActive, setIsActive ] = useState(true)
    const [ hitPoints, setHitPoints ] = useState(hits)
    let alreadyDecremented = false

    const incrementBricks = useGame((state) => { return state.incrementBricks})
    const decrementBricks = useGame((state) => { return state.decrementBricks})

    useEffect(() => 
    {
        incrementBricks()
    }, [])

    useEffect(() =>
    {
        if (!isActive) 
        {
            //Reset any bricks that were not totally rerendered
            setIsActive(true)
            setHitPoints(hits)
            incrementBricks()
            alreadyDecremented = false
        }
    }, [seed])

    const hitBrick = (event) => 
    {
        const name = event.colliderObject.name
        if (name === 'ball') {
            if (hitPoints == 1) {
                setIsActive(false)
                if (!alreadyDecremented) {
                    decrementBricks()
                    alreadyDecremented = true
                }
                
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
        seed={seed}
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
        seed={seed}
            name='brickSide'
            args={[0.1, (args[1] / 2) - 0.2, (args[2] / 2) - 0.2]} 
            position={[position[0] + (args[0] / 2), position[1], position[2]]}
            onCollisionEnter={ (event) => hitBrick(event) }
        />
        <CuboidCollider
        seed={seed}
            name='brickSide'
            args={[0.1, (args[1] / 2) - 0.2, (args[2] / 2) - 0.2]} 
            position={[position[0] - (args[0] / 2), position[1], position[2]]}
            onCollisionEnter={ (event) => hitBrick(event) }
        />
        </>
    }

    return <>
       {(isActive) ? renderBrick() : null}
    </>
}
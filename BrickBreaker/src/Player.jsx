import { useEffect, useRef } from "react"
import { RigidBody } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Player()
{
    const body = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    const moveLeft = () =>
    {
        body.current.applyImpulse({x: -10, y: 0, z: 0})
    }

    const moveRight = () =>
    {
        body.current.applyImpulse({x: 10, y: 0, z: 0})
    }

    const pressSpace = () =>
    {
        //console.log(body.current)
    }
    
    useEffect(() => 
    {
        const unsubscribeSpace = subscribeKeys(
            (state) => state.space,
            (value) => 
            {
                if (value) pressSpace()
            }
        )

        return () =>
        {
            unsubscribeSpace()
        }
    }, [])

    useFrame((state, delta) =>
    {
        const { pushLeft, pushRight } = getKeys()

        if (pushLeft && !pushRight) moveLeft()
        if (!pushLeft && pushRight) moveRight()
    })

    return <>
        <RigidBody ref={ body }
            name={'player'}
            canSleep={ false }
            linearDamping={ 1.0 }
            lockRotations={ true }
        >
            <mesh position={[0, 1.5, 0]}>
                    <boxGeometry args={[6, 2, 3]} />
                    <meshStandardMaterial color={'blue'} />
                </mesh>
        </RigidBody>
    </>
}
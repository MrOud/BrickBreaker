import { useRef, useEffect } from "react"
import { RigidBody } from "@react-three/rapier"

export default function Ball()
{
    const ball = useRef()
    let forceScalar = 15
    let bounceAngle = Math.PI / 3
    let bounceAngleState = 2

    useEffect(() => 
    {
        ball.current.setLinvel({x: forceScalar, y: forceScalar, z: 0})
    }, [])

    const getAngleFromBounceAngleState = () =>
    {
        if (bounceAngleState == 1) return (Math.PI) / 6
        if (bounceAngleState == 2) return (Math.PI) / 3
        if (bounceAngleState == 3) return (Math.PI) / 2
        if (bounceAngleState == 4) return (2 * Math.PI) / 3
        if (bounceAngleState == 5) return (5 * Math.PI) / 6
        if (bounceAngleState == -1) return (11 * Math.PI) / 6
        if (bounceAngleState == -2) return (5 * Math.PI) / 3
        if (bounceAngleState == -3) return (3 * Math.PI) / 2
        if (bounceAngleState == -4) return (4 * Math.PI) / 3
        if (bounceAngleState == -5) return (7 * Math.PI) / 6
    }

    const calcAngleOnPlayerHit = (xHitIn) =>
    {
        if (xHitIn < 1.5) 
        {
            bounceAngleState = 1
        } else if (xHitIn < 3) {
            bounceAngleState = 2
        } else if (xHitIn < 5) {
            bounceAngleState = 3
        } else if (xHitIn < 6.5) {
            bounceAngleState = 4
        } else bounceAngleState = 5
        
        bounceAngle = getAngleFromBounceAngleState()
    }

    const flipAngleX = () =>
    {
        if (bounceAngleState == 1) {
            bounceAngleState = 5
        } else if (bounceAngleState == 2) {
            bounceAngleState = 4
        } else if (bounceAngleState == 4) {
            bounceAngleState = 2
        } else if (bounceAngleState == 5) {
            bounceAngleState = 1
        } else if (bounceAngleState == -1) {
            bounceAngleState = -5
        } else if (bounceAngleState == -2) {
            bounceAngleState = -4
        } else if (bounceAngleState == -4) {
            bounceAngleState = -2
        } else if (bounceAngleState == -5) {
            bounceAngleState = -1
        }

        bounceAngle = getAngleFromBounceAngleState()
    }

    const flipAngleY = () =>
    {
       bounceAngleState *= -1

        bounceAngle = getAngleFromBounceAngleState()
    }

    const hitObject = (event) =>
    {
        ball.current.setLinvel({x: 0, y: 0, z: 0})
        const name = event.colliderObject.name
        if (name === 'topWall') 
        {
            flipAngleY()
        } else if (name === 'leftWall' || name === 'rightWall') {
            flipAngleX()
        } else if(name === 'player') {
            //Find point of contact between player and ball
            const xHitpoint = event.colliderObject.parent.position.x - ball.current.translation().x
            calcAngleOnPlayerHit(xHitpoint + 4)
        } else if (name === 'brick') {
            flipAngleY()
        } else if (name === 'brickSide') {
            flipAngleX()
        }
        ball.current.setLinvel({x: Math.cos(bounceAngle) * forceScalar, y: Math.sin(bounceAngle) * forceScalar, z: 0})
        
    }

    return <>
        <RigidBody ref={ ball }
            name="ball"
            type="dynamic"
            gravityScale={0}
            canSleep = { false}
            colliders="ball"
            position={[0, 10, 0]}  
            onCollisionEnter={(event) => { hitObject(event)}}  
        >
            <mesh>
                <sphereGeometry args={[1, 12, 12]} />
                <meshStandardMaterial color={'red'} />
            </mesh>
        </RigidBody>
    </>
}
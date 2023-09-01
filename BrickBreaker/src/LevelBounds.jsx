import { CuboidCollider, RigidBody } from "@react-three/rapier"

export default function LevelBounds()
{
    return <>
        <RigidBody type="fixed">
            {/* Left and right bounds */}
            <CuboidCollider name="rightWall"
                args={[1, 20, 3]} 
                position={[41, 20, 0]}
            />
            <CuboidCollider name="leftWall"
                args={[1, 20, 3]} 
                position={[-41, 20, 0]}
            />

            {/* Top Bounds */}
            <CuboidCollider name="topWall"
                args={[42, 1, 3]} 
                position={[0, 41, 0]}
            />
        </RigidBody>
    </>
}
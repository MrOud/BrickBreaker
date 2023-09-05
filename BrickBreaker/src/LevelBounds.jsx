import { CuboidCollider, RigidBody } from "@react-three/rapier"

export default function LevelBounds({width=90, height=60})
{
    return <>
        <RigidBody type="fixed">
            {/* Left and right bounds */}
            <CuboidCollider name="rightWall"
                args={[1, height / 2, 3]} 
                position={[(width / 2) + 1, height / 2, 0]}
            />
            <CuboidCollider name="leftWall"
                args={[1, height / 2, 3]} 
                position={[-(width / 2) - 1, height / 2, 0]}
            />

            {/* Top and bottom Bounds */}
            <CuboidCollider name="topWall"
                args={[width / 2 + 2, 1, 3]} 
                position={[0, height + 1, 0]}
            />
            <CuboidCollider name="ground"
                args={[width / 2, 0.125, 3]} 
                position={[0, 0, 0]}
            />
        </RigidBody>
        <mesh>
            <boxGeometry args={[width, 0.5, 3]} name="ground"/>
            <meshStandardMaterial color={'green'} />
        </mesh>
    </>
}
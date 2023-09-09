import { useState, useEffect } from 'react'
import { Physics } from '@react-three/rapier'
import { useThree, addEffect } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import Lights from './Lights.jsx'
import LevelManager from './LevelManager.jsx'
import Ball from './Ball.jsx'
import Player from './Player.jsx'
import useGame from './useGame.jsx'

export default function World()
{
    const { camera } = useThree()
    camera.position.copy(new THREE.Vector3(5, 50, 70))
    camera.zoom = 10
    camera.lookAt(new THREE.Vector3(0, 35, 0))

    /**
     * Level Data
     */
    const levelData = [
    {
        levelWidth: 7,
        levelHeight: 60,
        rows: [
            [],
            [1,2,3,5,6,7],
            [2,3,5,6],
            [3,5],
            [2,3,5,6],
            [1,2,3,5,6,7],
            [1,2,3,5,6,7],
            [1,2,3,5,6,7]
            ],
        hitsMin: 1,
        hitsRange: 0
    },
    {
        levelWidth: 9,
        levelHeight: 40,
        rows: [
            [1,2,3,4,6,7,8,9],
            [],
            [1,2,3,4,6,7,8,9],
            [1,9],
            [1,9],
            [1,9],
            [1,9],
            [1,2,3,4,6,7,8,9],
            ],
        hitsMin: 1,
        hitsRange: 3
    },
    {
        levelWidth: 7,
        levelHeight: 60,
        rows: [
            [1,3,5,7], 
            [2,6],
            [1,3,5,7],
            [2,6],
            [1,3,5,7],
            [2,6],
            [1,3,5,7]
            ],
        hitsMin: 1,
        hitsRange: 0
    },
    {
        levelWidth: 9,
        levelHeight: 60,
        rows: [
            [3,4,6,7],
            [2,3,4,6,7,8,],
            [1,2,3,4,6,7,8,9],
            ],
        hitsMin: 2,
        hitsRange: 0
    }]

    const currentLevel = useGame((state) => { return state.currentLevel })
    const incCurrentLevel = useGame((state) => { return state.incCurrentLevel })
    const maxLevel = useGame((state) => { return state.setMaxLevel })
    const levelCleared = useGame((state) => { return state.levelCleared })
    const start = useGame((state) => { return state.start })
    const resetBricksTotal = useGame((state) => { return state.resetBricksTotal })
    const seed = useGame((state) => { return state.getSeedValue })
    const [ displayLevel, setDisplayLevel] = useState(true)

    useEffect(() =>
    {
        maxLevel(levelData.length)
        const unsubscribeBrickTotal = addEffect(() =>
        {
            const state = useGame.getState()
            if (state.phase == 'playing') {
                if (state.totalBricks == 0) { 
                    setupNextLevel()
                }
            }
            if (state.currentLevel == state.maxLevel) {
                console.log('You Win!')
                setDisplayLevel(false)
            } 
        })

        return () => 
        {
            unsubscribeBrickTotal()
        }
       
    }, [])

    const setupNextLevel = () => 
    {
        
        if (currentLevel == levelData.length) 
        {
            console.log('You Win!')
        } else {
            levelCleared()
            resetBricksTotal()
            incCurrentLevel()
            start()
        }
    }

    const renderLevel = () =>
    {
        return <LevelManager levelData={levelData[currentLevel % levelData.length]}>
                    <Ball seed={seed()} />
                    <Player seed={seed()} /> 
                </LevelManager>
    }

    const renderVictory = () =>
    {
        return <Text 
            scale={10}
            position={[0,25,0]}
        >You Win!</Text>
    }

    return <>
        <color args={['#3C7EF0']} attach="background" />
        <Physics debug={true}>
            {displayLevel ? renderLevel() : renderVictory()}
            <Lights />
        </Physics>
    </>
}
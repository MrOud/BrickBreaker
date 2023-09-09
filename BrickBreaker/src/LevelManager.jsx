import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"
import LevelBounds from "./LevelBounds"
import Brick from "./Brick"
import Ball from "./Ball"
import Player from "./Player"
import useGame from "./useGame"

export default function LevelManager(width=90, height=60, bricks=20, minHits=1, maxHits=1)
{
    /**
     * Level Data
     */
    const levelData = [
        {
            levelWidth: 7,
            levelHeight: 60,
            rows: [
                [4],
                [4],
                [4]
                ],
            hitsMin: 1,
            hitsRange: 0
        },
        {
            levelWidth: 7,
            levelHeight: 60,
            rows: [
                [],
                [],
                [],
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
                [],
                [],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,2,3,4,6,7,8,9],
                [1,9]
                ],
            hitsMin: 2,
            hitsRange: 0
        }
    ]

    const [currentLevel, setCurrentLevel] = useState(0)
    var levelWidth = levelData[currentLevel].levelWidth * 6
    var levelHeight = levelData[currentLevel].levelHeight
    var hitsMin = levelData[currentLevel].hitsMin
    var hitsRange = levelData[currentLevel].hitsRange
    var levelRows = levelData[currentLevel].rows

    const levelCleared = useGame((state) => { return state.levelCleared })
    const start = useGame((state) => { return state.start })
    const curLevel = useGame((state) => { return state.currentLevel})
    const incCurLevel = useGame((state) => { return state.increaseCurrentLevel })

    useEffect(() =>
    {
        const unsubscribeBrickTotal = addEffect(() =>
        {
            const state = useGame.getState()
            console.log(state.phase, curLevel)
            if (state.phase == 'playing') {
                
                if (state.totalBricks == 0) {
                    console.log('LEVEL CLEAR', state.phase) 
                    setupNextLevel()
                }
            }
        })

        return () => 
        {
            unsubscribeBrickTotal()
        }
       
    }, [])

    const setupNextLevel = () => 
    {
        levelCleared()
        incCurLevel()
        loadNewLevelData(levelData)
        setCurrentLevel(currentLevel + 1)
        
        generateLevel()
        start()
    }

    const loadNewLevelData = (levelData) =>
    {
        levelWidth = levelData[curLevel].levelWidth * 6
        levelHeight = levelData[curLevel].levelHeight
        hitsMin = levelData[curLevel].hitsMin
        hitsRange = levelData[curLevel].hitsRange
        levelRows = levelData[curLevel].rows
    }

    /**
     * 
     * @param {number} row - row to place brick in
     * @param {number} column - column to place brick in
     * @param {*} key - key for react mapping
     * @returns <Brick />
     */
    const generateBrick = (row, column, key) => 
    {
        const placementX = (column * 6) - (levelWidth / 2) - 3
        const placementY = levelHeight - (row * 2) + 1
        const hitsForThisBrick = hitsMin + Math.floor(Math.random() * hitsRange)
        return <Brick key={key} position={[placementX, placementY, 0]} hits={hitsForThisBrick}/>
    }

    /**
     * 
     * @param {number} row - row to be filled
     * @param {number[]} colArray - columns to be filled
     * @returns
     */
    const generateRow = (row, colArray) => 
    {
        
        return colArray.map((col, index) => {
            return generateBrick(row, col, index)
        })
    }

    const generateLevel = () => 
    {
        return <>
            <LevelBounds width={levelWidth} height={levelHeight}/>
            {levelRows.map((row, index) => 
            {
                return generateRow(index+1, row)
            })}
            <Ball />
            <Player />
        </>
    }

    return generateLevel()
}
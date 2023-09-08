import LevelBounds from "./LevelBounds"
import Brick from "./Brick"
export default function LevelManager(width=90, height=60, bricks=20, minHits=1, maxHits=1)
{
    let currentLevel = 0
    
    const levelData = [
        {
            levelWidth: 90,
            levelHeight: 60,
            rows: 5,
            maxBricksPerRow: 3,
            hitsMin: 1,
            hitsMax: 1
        }
    ]

    const levelWidth = levelData[currentLevel].levelWidth
    const levelHeight = levelData[currentLevel].levelHeight
    const spacesPerRow = levelWidth / 6
    const rows = levelData[currentLevel].rows
    const maxBricksPerRow = levelData[currentLevel].maxBricksPerRow
    const hitsMin = levelData[currentLevel].hitsMin
    const hitsMax = levelData[currentLevel].hitsMax

    const generateBrick = (row, column) => 
    {
        const placementX = (column * 6) - (levelWidth / 2) - 3
        const placementY = levelHeight - (row * 2) + 1
        return <Brick position={[placementX, placementY, 0]}/>
    }

    const generateRow = (row, colArray) => 
    {
        return colArray.map((col) => {
            return generateBrick(row, col)
        })
    }

    const generateLevel = () => 
    {
        return <>
            <LevelBounds width={levelWidth} />
            {generateRow(1, [1,3,5,7,9,11,13,15])}
            {generateRow(2, [1,3,5,7,9,11,13,15])}
            {generateRow(3, [2,4,6,10,12,14])}
            {generateRow(4, [3,4,6,10,12,13])}
            {generateRow(5, [4,6,10,12])}
            {generateRow(6, [5,6,7,9,10,11,12])}
            {generateRow(7, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])}
        </>
    }

    return generateLevel()
}
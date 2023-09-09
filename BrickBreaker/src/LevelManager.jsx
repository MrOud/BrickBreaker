import LevelBounds from "./LevelBounds"
import Brick from "./Brick"
import useGame from "./useGame"

export default function LevelManager({levelData, children})
{

    const levelWidth = levelData.levelWidth * 6
    const levelHeight = levelData.levelHeight
    const hitsMin = levelData.hitsMin
    const hitsRange = levelData.hitsRange
    const levelRows = levelData.rows
    const seed = useGame((state) => { return state.getSeedValue})
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
        return <Brick key={key} position={[placementX, placementY, 0]} hits={hitsForThisBrick} seed={seed()}/>
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
            <LevelBounds width={levelWidth} height={levelHeight} />
            {levelRows.map((row, index) => 
            {
                return generateRow(index+1, row)
            })}
            {children}
                    
        </>
    }

    return generateLevel()
}
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        totalBricks: 0,

        incrementBricks: () =>
        {
            set((state) => 
            {
                return {totalBricks: state.totalBricks + 1}
            })
        },

        decrementBricks: () =>
        {

            set((state) =>
            {
                return {totalBricks: state.totalBricks - 1}
            })
        },

        resetBricksTotal: () =>
        {
            set((state) => 
            {
                return { totalBricks: 0 }
            })
        },

        phase: 'playing',
        
        levelCleared: () =>
        {
            set((state) =>
            {
                if (state.phase == 'playing') {
                    return {phase: 'levelSetup'}
                }
                return {}
            })
        },

        start: () =>
        {
            set((state) =>
            {
                if (state.phase == 'levelSetup' && state.currentLevel != state.maxLevel) {
                    return {phase: 'playing'}
                }
                if (state.phase == 'levelSetup' && state.currentLevel == state.maxLevel) {
                    return {phase: 'victory'}
                }
                return {}
            })
        },

        getSeedValue: () =>
        {
            return Math.random()
        },

        currentLevel: 0,
        incCurrentLevel: () =>
        {
            set((state) =>
            {
                return { currentLevel: state.currentLevel + 1 }
            })
        },

        maxLevel: 4,
        setMaxLevel: (value) =>
        {
            set((state) =>
            {
                return {maxLevel: value }
            })
        }
    }
}))

import React from 'react'
import SudokuLogo from '../../assets/sudoku-logo.svg'

const Loading = () => {
    return (
        <div>
            <div class="flex items-center justify-center space-x-2 animate-bounce">
                <img src={SudokuLogo} className="w-full mb-6" alt="Sudoku Logo" />
            </div>
        </div>
    )
}

export default Loading

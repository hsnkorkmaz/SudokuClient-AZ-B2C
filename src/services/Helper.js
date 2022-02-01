export const calculatePoints = (incorrectEntries, timeSpent, difficulty) => {
    let startPoint = 1000;
    let diffictultyLevel = calculateDifficulty(difficulty);
    let time = timeSpent;
    let mistakes = incorrectEntries;
    let fineFactor = 10;
    let points =
        (startPoint - fineFactor * mistakes) / (time / diffictultyLevel);
    return points;
};

export const calculateDifficulty = (difficulty) => {
    if (difficulty === "Easy") {
        return 2;
    } else if (difficulty === "Medium") {
        return 20;
    } else if (difficulty === "Hard") {
        return 30;
    } else if (difficulty === "Challenging") {
        return 45;
    } else {
        return 80;
    }
};
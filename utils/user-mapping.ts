import { saveUserData } from "@/services/user";
import { User } from "@/types/user";

export const createUserStats = async (user: User, correctAnswer: boolean, flagged: boolean, skipped: boolean, isAuthenticated: boolean, lastQuestionNum: string) => {
    let today = new Date().toDateString();
    if (user.dailyProgress === undefined) {
        user.dailyProgress = [];
    }

    let todayProgressIndex = user.dailyProgress.findIndex(x => new Date(x.date).toDateString() === today);
    if (todayProgressIndex >= 0) {
        let temp = user.dailyProgress[todayProgressIndex];
        user.dailyProgress[todayProgressIndex] = {
            attempted: temp.attempted + 1,
            date: new Date(temp.date).toDateString(),
            correct: (!skipped && !flagged) ? (correctAnswer ? temp.correct + 1 : temp.correct) : temp.correct,
            incorrect: (!skipped && !flagged) ? (correctAnswer ? temp.incorrect + 0 : temp.incorrect + 1) : temp.incorrect,
            skipped: skipped ? temp.skipped + 1 : temp.skipped,
            flagged: flagged ? temp.flagged + 1 : temp.flagged
        };
    } else {
        user.dailyProgress.push({
            attempted: 1,
            date: today,
            correct: !flagged ? (correctAnswer ? 1 : 0) : 0,
            incorrect: !flagged ? (correctAnswer ? 0 : 1) : 0,
            skipped: skipped ? 1 : 0,
            flagged: flagged ? 1 : 0
        });
    }
    await saveUserData(user, isAuthenticated);
};
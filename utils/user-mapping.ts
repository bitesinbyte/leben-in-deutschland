import { saveUserData } from "@/services/user";
import { PrepareQuestionActions } from "@/types/prepare-question";
import { User } from "@/types/user";

export const addDaily = () => {

};

export const createUserStats = async (user: User, correctAnswer: boolean, optionSelected: string, isAuthenticated: boolean, lastQuestionNum: string) => {
    let today = new Date().toLocaleDateString();
    if (user.dailyProgress === undefined) {
        user.dailyProgress = [];
    }
    user.lastQuestionNum = lastQuestionNum;

    let todayProgressIndex = user.dailyProgress.findIndex(x => x.date === today);
    if (todayProgressIndex >= 0) {
        let temp = user.dailyProgress[todayProgressIndex];
        user.dailyProgress[todayProgressIndex] = {
            attempted: temp.attempted + 1,
            date: temp.date,
            correct: correctAnswer ? temp.correct + 1 : temp.correct,
            incorrect: correctAnswer ? temp.incorrect + 0 : temp.incorrect + 1
        };
    } else {
        user.dailyProgress.push({
            attempted: 1,
            date: today,
            correct: correctAnswer ? 1 : 0,
            incorrect: correctAnswer ? 0 : 1
        });
    }
    if (!user.overallProgress) {
        user.overallProgress = {
            attempted: 0,
            correct: 0,
            incorrect: 0,
            mockAttempted: 0,
            mockFailed: 0,
            mockPassed: 0,
            flagged: 0,
            skipped: 0
        };
    }

    let indexOfUserProgress = user.questionProgress.findIndex(x => x.num === lastQuestionNum);
    if (indexOfUserProgress > -1) {
        let tempData = user.questionProgress[indexOfUserProgress];
        if (tempData.flagged) {
            user.overallProgress.flagged = user.overallProgress.flagged + 1;
        }
        if (tempData.skipped) {
            user.overallProgress.skipped = user.overallProgress.skipped + 1;
        }
        if (tempData.answerSelected && tempData.answeredCorrectly) {
            user.overallProgress.correct = user.overallProgress.correct + 1;
        }
        if (tempData.answerSelected && !tempData.answeredCorrectly) {
            user.overallProgress.incorrect = user.overallProgress.incorrect + 1;
        }
        user.overallProgress.attempted = user.overallProgress.attempted + 1;

        if (tempData.num.startsWith(user.state.stateCode)) {
            user.state.attempted = user.state.attempted + 1;
            if (tempData.answerSelected && tempData.answeredCorrectly) {
                user.state.correct = user.state.correct + 1;
            }
            if (tempData.answerSelected && !tempData.answeredCorrectly) {
                user.state.incorrect = user.state.incorrect + 1;
            }
        }

    }

    await saveUserData(user, isAuthenticated);
};
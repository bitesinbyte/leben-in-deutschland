"use client";

import PrepareQuiz from "@/components/prepare-quiz";
import StateSelect from "@/components/state-select";
import { questionsData } from "@/data/data";
import { getUserData } from "@/services/user";
import { PrepareQuestionActions } from "@/types/prepare-question";
import { Question } from "@/types/question";
import { User } from "@/types/user";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Prepare() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [user, setUser] = useState<User>();
    const searchParams = useSearchParams();
    const action = searchParams.get('action');

    const getAction = (action: string | null) => {
        switch (action) {
            case "correct": return PrepareQuestionActions.Correct;
            case "incorrect": return PrepareQuestionActions.Incorrect;
            case "flagged": return PrepareQuestionActions.Flagged;
            case "skipped": return PrepareQuestionActions.Skipped;
            case "state": return PrepareQuestionActions.State;
            case "mock": return PrepareQuestionActions.Mock;
            case "random": return PrepareQuestionActions.Random;
            case "failed": return PrepareQuestionActions.Failed
            case "prepare": return PrepareQuestionActions.Prepare;
            default: return PrepareQuestionActions.Prepare;
        };
    };

    useEffect(() => {
        let tempUser = getUserData();
        if (tempUser !== null) {
            setUser(tempUser);
        }

    }, []);

    useEffect(() => {
        let questions = questionsData();
        setQuestions(questions);
    }, []);

    return (
        <div className="content-center">
            {!user?.state.stateName && <StateSelect />}
            {questions && questions.length > 0 && user &&
                <PrepareQuiz originalQuestions={questions} user={user}
                    prepareQuestion={{ selected: false, action: getAction(action) }} />
            }
        </div>
    );
}
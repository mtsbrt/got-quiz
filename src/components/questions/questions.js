import React, { useState } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import './questions.css';
import Question from '../question/question';

const GET_QUESTIONS_QUERY = gql`query {
    questionsList {
        items {
            question
            options
            answer
            image {
                id
                downloadUrl
            }
        }
    }
}`;

const loading = (<p>Carregando</p>);

export const Questions = ({ questions }) => {
    const [currentIndex, setcurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFinished, setShowFinished] = useState(false);
    const currentQuestion = questions[currentIndex];

    const onNextClicked = selectedOption => {
        if (currentQuestion.answer === selectedOption) setScore(score + 1);

        if (currentIndex + 1 > questions.length - 1) {
            setShowFinished(true);
            return;
        }

        setcurrentIndex(currentIndex + 1);
    };

    const resetQuiz = () => {
        setcurrentIndex(0);
        setShowFinished(false);
        setScore(0);
    };
    console.log(questions);
    return questions.length ? (
        <div>
            {showFinished ? (<div className="results">
        <img
            src="https://i.imgflip.com/1fmzy9.jpg"
            alt="Você perdeu"/>
            <h3>
                Fim de Jogo. Marcou {score} de {questions.length}.
            </h3>
    </div>) : (
                <Question onNextClicked={onNextClicked} question={currentQuestion} key={currentQuestion.id} />
            )}
        </div>
    ) : (loading);
};


export default graphql(GET_QUESTIONS_QUERY, {
    props: result => {
        const {loading, data} = result;

        let items = [];

        if (data && data.questionsList) items = data.questionsList.items;

        return {
            loading,
            questions: items
        };
    }
})(Questions);
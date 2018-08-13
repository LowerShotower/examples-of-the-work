import { sortBy, reverse, slice } from 'lodash-es';
import { setScoreWasLoaded, displayTheError } from './game.js';

export const setScoreElement = ({
    fName, lName, email, points
} = {}) => ({
    name: fName + ' ' + lName,
    email,
    points
})

export const setScoreData = (scoreData) => ({
    type: 'SCORE_DATA_SET',
    scoreData

});

export const downloadScore = () => {
    return (dispatch) => {
        fetch('http://mmg-score.herokuapp.com/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            let scoreData = slice(reverse(sortBy(data.result, o => o.score)), 0, 10);
            console.log(data);
            dispatch(setScoreData(scoreData));
        }).then(function () {
            dispatch(setScoreWasLoaded(true));
        });
    }
};

export const uploadScore = ({ points, lName, fName, email }) => {
    return (dispatch) => {
        console.log(points);
        let myHeaders = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'no-cors',
        });

        fetch('http://mmg-score.herokuapp.com/', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                username: fName + " " + lName,
                email: email,
                score: points
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            dispatch(downloadScore());
        }).catch(err => {
            
                  dispatch(displayTheError(err));
                  dispatch(setScoreWasLoaded(false));
            
        })
    };
}
import keys from 'lodash/object/keys';

UserFactory.$inject = ['$timeout'];

export default function UserFactory($timeout){
  let user = {}; // so fake

  let levelStructure = {
    1: 0,
    2: 100,
    3: 250,
    4: 500,
    5: 1000,
    6: 2000,
    7: 4000,
    8: 8000,
    9: 16000,
    10: 32000,
    11: 64000
  };

  initializeUser();

  return {
    getUser,
    increaseUserScore
  };

  function getUser(){
    return user;
  }

  function initializeUser(){
    user.id = 123456;
    user.score = 0;
  }

  function calcLevel(score){
    for (let i = 1; i < keys(levelStructure).length; i++){
      if(score >= levelStructure[i] && score < levelStructure[i + 1]){ return i; }
    }
  }

  function increaseUserScore(amount){
    user.score = user.score + amount;
    user.currLevel = calcLevel(user.score);
    user.percentageToNextLevel = Math.ceil(((user.score - levelStructure[user.currLevel]) / levelStructure[user.currLevel + 1]) * 100);
  }
}


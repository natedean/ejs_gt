QuestionFactory.$inject = ['$http'];

export default function QuestionFactory($http){

  return {
    getQuestion: getQuestion
  }

  function getQuestion(category){
    //let arrLength = questions.length;
    //let rand = random(0, arrLength - 1);
    //return questions[rand];
    return $http.get('/api/music-theory/question').then( data =>{
      return data.data;
    });
  }
}
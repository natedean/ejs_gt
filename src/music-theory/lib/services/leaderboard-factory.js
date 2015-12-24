LeaderboardFactory.$inject = ['$http'];

export default function LeaderboardFactory($http){

  return {
    getLeaders
  };

  function getLeaders(){
    return $http.get('/test').then(data => data.data);
  }
}

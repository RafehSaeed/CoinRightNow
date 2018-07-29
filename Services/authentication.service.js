// (function () {


  function authentication ($http, $window ,$location) {

    var saveToken = function (token) {
      console.log('token');
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
      return $http.post('http://localhost:5000/register', user).then(function(response){
        saveToken(response.data.token);
      });
    };

    var login = function(user) {
      return $http.post('http://localhost:5000/login', user).then(function(response) {
        saveToken(response.data.token);
      });
    };

    var logout = function() {
      $window.localStorage.removeItem('mean-token');
        $location.path('/');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }

export default authentication
// })();
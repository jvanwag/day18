angular.module('rtfmApp', ['firebase', 'ui.router'])
.constant('fb', {
  url: 'https://real-time-forum1.firebaseio.com/'
})
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
  .state('threads', {
    url: '/threads',
    controller: 'threadsCtrl',
    templateUrl: 'views/threads.html',
    resolve: {
      threadsRef: function(threadService){
        return threadService.getThreads()
      }
    }
  })
  .state('thread', {
    url: '/threads/:threadId',
    templateUrl: 'views/thread.html',
    controller: 'threadCtrl',
    resolve: {
      threadRef: function(threadService, $stateParams) {
        return threadService.getThread($stateParams.threadId);
    },
    commentsRef: function(threadService, $stateParams) {
      return threadService.getComments($stateParams.threadId);
    }
  }
  })
  $urlRouterProvider.otherwise('/threads')

})

angular.module('storyCtrl', ['storyService']) 
.controller('StoryController', StoryController)
.controller('AllStoryController', AllStoryController);

function StoryController(Story, socketio) {
    var vm = this;
    Story.allStory()
    .success(function(data) {
        vm.stories = data; 
    });
    
    vm.create = function() {
        vm.message = '';
           Story.create(vm.storyData)
           .success(function(data) {
               
               // clear up the form
               vm.storyData = {};
               
               vm.message = data.message;
                
//               vm.stories.push(data);
           });
    };
    
    socketio.on('story', function(data) {
        vm.stories.push(data);
    });
}
function AllStoryController(stories, socketio) {
    var vm = this;
    
    vm.stories = stories.data;
    
    socketio.on('story', function(data) {
        vm.stories.push(data);
    });
}
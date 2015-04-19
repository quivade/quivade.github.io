/*
 * Apllication Module
 *
 */

var quivade = angular.module('quivadeApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '800', // by default use shade 400 from the palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('blue', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
});


/*
 * Apllication Controller
 *
 */

quivade.controller('AppCtrl', ['$scope', '$mdDialog', function($scope, $mdDialog){

  // TOGGLE MAIN NAV (TOP) ON MOBILE
  $scope.toggleDocsMenu = function(event) {
    $scope.showDocsNav = !$scope.showDocsNav;
  };

  // TOGGLE DOCS NAV
  $scope.toggleMainMenu = function(event) {
    $scope.showMainNav = !$scope.showMainNav;
  };

  // TOGGLE DOCS VERSION & LANGUAGE
  $scope.toggleVersionMenu = function(event) {
    $scope.showMenu = !$scope.showMenu;
  };

  // CONTACT MODAL
  $scope.showContact = function($event) {
    var parentEl = angular.element(document.body);
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      template:
        '<md-dialog class="contact" aria-label="Contact Quivade">' +
        '  <md-content>' +
        '    <h3 class="text-headline">Contact Quivade</h3>' +
        '    <form name="contact">' +
        '      <md-input-container>' +
        '        <label>Name</label>' +
        '        <input ng-model="contact.name" type="text">' +
        '      </md-input-container>' +
        '      <md-input-container>' +
        '        <label>e-mail</label>' +
        '        <input ng-model="contact.mail" type="email">' +
        '      </md-input-container>' +
        '      <md-input-container flex>' +
        '        <label>Message</label>' +
        '        <textarea ng-model="contact.msg" columns="1"></textarea>' +
        '      </md-input-container>' +
        '      <div class="md-actions">' +
        '        <md-button ng-click="sendMsg()">' +
        '          Send' +
        '        </md-button>' +
        '      </div>' +
        '    </form>' +
        '  </md-content>' +
        '</md-dialog>',
      locals: {
        contact: $scope.contact
      },
      controller: ContactController
    });

    function ContactController(scope, $mdDialog, contact) {
      scope.contact = {
        name:  'Name',
        email: 'your@email.com',
        msg:   'Message'
      };
      scope.closeDialog = function() {
        $mdDialog.hide();
      };
    }
  };

  // BIO MODAL
  $scope.showBio = function($event) {
    var parentEl = angular.element(document.body);
    var person = angular.element($event.currentTarget);
    var name = person.attr('data-name');
    var bio = person.attr('data-bio');
    var pic = person.attr('data-pic');
    var twitter = person.attr('data-twitter');
    var website =  person.attr('data-website');
    var linkedin = person.attr('data-linkedin');
    var $twitter  = twitter  !== 'undefined'  ? '<a class="button button-subtle button-small" href="https://twitter.com/' +  person.attr('data-twitter') + '" md-button>Twitter</a>' : '';
    var $website  = website  !== 'undefined'  ? '<a class="button button-subtle button-small" href="' + person.attr('data-website') + '" md-button>Website</a>' : '';
    var $linkedin = linkedin !==  'undefined' ? '<a class="button button-subtle button-small" href="https://www.linkedin.com/profile/view?id=' +  person.attr('data-linkedin') + '" md-button>LinkedIn</a>' : '';
    $mdDialog.show({
      parent: parentEl,
      targetEvent: $event,
      template:
        '<md-dialog class="modal" aria-label="List dialog">' +
        '  <md-content>' +
        '     <img class="left" src="' + pic + '" />' +
        '     <h3 class="text-headline">' + name + '</h3>' +
        '     <div class="modal-social">' + $twitter + $linkedin + $website + '</div>' +
        '     <p class="text-body">' + bio + '</p>' +
        '  </md-content>' +
        '  <div class="md-actions">' +
        '    <md-button ng-click="closeDialog()">' +
        '      Close Bio' +
        '    </md-button>' +
        '  </div>' +
        '</md-dialog>',
      locals: {
        items: $scope.items
      },
      controller: DialogController
    });

    function DialogController(scope, $mdDialog, items) {
      scope.items = items;
      scope.closeDialog = function() {
        $mdDialog.hide();
      };
    }
  };

  // INITIALIZE PRETTY PRINT
  prettyPrint();
}]);

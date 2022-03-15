import config from 'ember-boilerplate/config/environment';
import EmberRouter from '@embroider/router';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('dashboard', function () {
    this.route('month');
    this.route('week');
  });
  this.route('404', { path: '/*path' });
  this.route('resources');
  this.route('users');
  this.route('enterprises');
  this.route('assignment-type');
  this.route('roles');
  this.route('statistics');
});

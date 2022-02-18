import config from 'ember-boilerplate/config/environment';
import EmberRouter from '@embroider/router';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('dashboard', function () {
    this.route('week', {
      path: 'week/:id',
    });

    this.route('month', {
      path: 'month/:id',
    });
  });
  this.route('404', { path: '/*path' });
  this.route('resources', function () {
    this.route('id', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('users', function () {
    this.route('id', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('enterprises', function () {
    this.route('id', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('assignment-type', function () {
    this.route('id', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('roles', function () {
    this.route('id', {
      path: ':id',
    });
    this.route('create');
  });
  this.route('statistics');
});

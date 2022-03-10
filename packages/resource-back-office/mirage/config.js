import { Response } from 'miragejs';

export default function () {
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.urlPrefix = 'http://localhost:8080'; // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api/v1'; // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
    
    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
    */
  this.get('/users');
  this.get('/enterprises');
  this.get('/enterprises/:enterpriseId', (schema, request) => {
    const enterpriseId = request.params.enterpriseId;
    return schema.enterprises.findBy(enterpriseId);
  });
  this.post('/enterprises');
  this.patch('/enterprises/:enterpriseId', (schema, request) => {
    const enterpriseId = request.params.enterpriseId;
    const enterpriseToEdit = schema.enterprises.findBy(enterpriseId);
    return enterpriseToEdit;
  });
  this.del('/enterprises/:enterpriseId', (schema, request) => {
    const enterpriseId = request.params.enterpriseId;
    const enterpriseToDelete = schema.enterprises.findBy(enterpriseId);
    return enterpriseToDelete;
  });

  this.get('/resources');
  this.get('/resources/:resourceId', (schema, request) => {
    const resourceId = request.params.resourceId;
    return schema.resources.findBy(resourceId);
  });
  this.post('/resources');
  this.patch('/resources/:resourceId', (schema, request) => {
    const resourceId = request.params.resourceId;
    const resourceToEdit = schema.resources.findBy(resourceId);
    return resourceToEdit;
  });
  this.del('/resources/:resourceId', (schema, request) => {
    const resourceId = request.params.resourceId;
    const resourceToEdit = schema.resources.findBy(resourceId);
    return resourceToEdit;
  });

  this.get('/assignment-types');
  this.get('/assignment-types/:assignmenttypeid', (schema, request) => {
    const assignmentTypeId = request.params.assignmenttypeid;
    return schema.types.findBy(assignmentTypeId);
  });
  this.post('/assignment-types');
  this.patch('/assignment-types/:assignmenttypeid', (schema, request) => {
    const assignmentTypeId = request.params.assignmenttypeid;
    const assignmenttypeToEdit = schema.types.findBy(assignmentTypeId);
    return assignmenttypeToEdit;
  });
  this.del('/assignment-types/:assignmenttypeid', (schema, request) => {
    const assignmentTypeId = request.params.assignmenttypeid;
    const assignmenttypeToEdit = schema.types.findBy(assignmentTypeId);
    return assignmenttypeToEdit;
  });

  this.get('/users/profile', (schema) => {
    return schema.users.find(1);
  });

  this.get('/not-found', () => {
    return new Response(404, {}, {});
  });

  this.post('/auth/login', (_, request) => {
    const body = JSON.parse(request.requestBody);
    if (body.password === '123' && body.email === 'dev@triptyk.eu') {
      return new Response(
        200,
        {},
        {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0Ijo1MDg2MjM5MDIyfQ.drnymZMDGW_JPV04DVBwKDY2KZpt8kuaLVf__fGmDKo',
          refreshToken: '123',
        }
      );
    }
    return new Response(417, {}, { message: 'Invalid username or password' });
  });
}

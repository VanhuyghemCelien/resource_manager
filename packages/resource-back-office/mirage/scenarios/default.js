export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.createList('user', 1);

  server.createList('assignment-type', 3);
  server.createList('assignment-title', 1);
  server.createList('enterprise', 1);
  server.create('resource', {
    image: '/assets/icons/Users.svg',
    emailAddress: 'second@gmail.com',
    firstName: 'pastoto',
    lastName: 'pasfitdevoie',
    phoneNumber: '0456734526',
    roleUser: 'user',
    enterprise: 'TPK',
  });
  server.create('assignment', {
    resource: server.create('resource'),
  });
}

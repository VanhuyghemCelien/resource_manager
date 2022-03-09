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
    emailaddress: 'second@gmail.com',
    firstname: 'pastoto',
    lastname: 'pasfitdevoie',
    phonenumber: '0456734526',
    roleuser: 'user',
    enterprise: 'TPK',
  });
  server.create('assignment', {
    resource: server.create('resource'),
  });
}

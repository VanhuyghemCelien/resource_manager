export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.createList('user', 1);

  server.createList('resource', 4);
  server.createList('assignment-type', 1);
  server.createList('assignment-title', 1);
  server.createList('enterprise', 1);
}

const rootHTML =
  "<html><head><base target='_parent'><title>Welcome to the page!</title></head><body><h1>Hi</h1><a href='/users'>View Users</a><br><h4>Add a User</h4><form action='/create-user' method='POST'><input type='text' name='newUser'><button>Submit</button></form></body></html>";

const usersHTML =
  "<html><head><base target='_parent'><title>Welcome to the Users page!</title></head><body><h1>Our Users</h1><a href='/'>Home</a><ul><li>User 1</li><li>Nick</li></ul></body></html>";

module.exports = {
  root: rootHTML,
  users: usersHTML
};

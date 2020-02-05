
exports.seed = async function(knex) {

  await knex("users").insert([
    {
      password: "000000",
      email: "student0@thisschooltho.com",
      name: "Student Zero",
      role: 'student'
    },
    {
      password: "000000",
      email: "helper0@thisschooltho.com",
      name: "Helper Zero",
      role: 'helper'
    },
    {
      password: "000000",
      email: "admin@thisschooltho.com",
      name: "Admin Zero",
      role: 'both'
    }
  ]);
  
};

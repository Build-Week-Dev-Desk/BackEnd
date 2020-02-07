


exports.seed = async function(knex) {


  await knex("users").insert([
    {
      password: "00000000",
      email: "student0@thisschooltho.com",
      name: "Student Zero",
      role: 'student'
    },
    {
      password: "00000000",
      email: "staff@thisschooltho.com",
      name: "Helper Zero",
      role: 'helper'
    },
    {
      password: "00000000",
      email: "admin@thisschooltho.com",
      name: "Admin Zero",
      role: 'both'
    }
  ]);
  
};

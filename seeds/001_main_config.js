
exports.seed = async function(knex) {
  await knex('user_type').insert([
    { userType: "Student" },
    { userType: "Helper" }
  ])

  await knex('ticketStatus').insert([
    { status: "Open" },
    { status: "Claimed" },
    { status: "Resolved" }
  ])

  await knex('ticketCategory').insert([
    { category: "HTML" },
    { category: "CSS" },
    { category: "JavaScript" },
    { category: "React" },
    { category: "Backend" },
    { category: "User Experience"},
    { category: "DataScience"}
  ])
  await knex("users").insert([
    {
      username: "student00",
      password: "0000000",
      name: "Student 00",
      email: "student0@thisschooltho.com",
      usertypeId: "1"
    }
  ])  
};

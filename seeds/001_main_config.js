
exports.seed = async function(knex) {
  await knex('roles').insert([
    { role: "Student" },
    { role: "Helper" }
  ])

  await knex('ticketStatus').insert([
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
};

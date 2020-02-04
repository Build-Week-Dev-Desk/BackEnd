
exports.seed = async function(knex) {
  await knex('roles').insert([
    { role: "student" },
    { role: "staff" },
    { role: "both" }
  ])
  
};

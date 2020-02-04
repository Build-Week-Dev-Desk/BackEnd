
exports.seed = async function(knex) {
  await knex('roles').insert([
    { role: "Student" },
    { role: "Helper" }
  ])
  
};

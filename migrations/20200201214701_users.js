
exports.up = async function(knex) {

  await knex.schema.createTable("users", tbl => {
      tbl.increments("id").notNullable()
      tbl.string("name").notNullable()
      tbl.string("email").notNullable().unique()
      tbl.string("password").notNullable()
      tbl.string("role").notNullable()
      tbl.time("createdAt").defaultTo(knex.fn.now())
  })


  await knex.schema.createTable("tickets", tbl => {
    tbl.increments("id").notNullable()
    tbl.string("title").notNullable()
    tbl.text("status").notNullable()
    tbl.text("description").notNullable()
    tbl.text("attemptedSolutions").notNullable()
    tbl.text("category").notNullable()
    tbl.integer("asker").notNullable().references("id").inTable("users")
    tbl.time("createdAt").defaultTo(knex.fn.now())
    tbl.integer("assignee").nullable().references("id").inTable("users")
    tbl.text("solution").nullable().defaultTo(null)
  })

  await knex.schema.createTable("solutions", tbl => {
    tbl.increments("id").notNullable()
    tbl.integer("ticketId").references("id").inTable("tickets")
    tbl.text("body").notNullable()
    tbl.integer("answerer").references("id").inTable("users")
    tbl.time("createdAt").defaultTo(knex.fn.now())
  })
  
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("solutions")
  await knex.schema.dropTableIfExists("tickets")
  await knex.schema.dropTableIfExists("users")
};

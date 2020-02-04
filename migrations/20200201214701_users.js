
exports.up = async function(knex) {
  
  await knex.schema.createTable("roles", tbl => {
    tbl.increments("id").notNullable()
    tbl.string("role").notNullable().unique()
  })

  await knex.schema.createTable("users", tbl => {
      tbl.increments("id").notNullable()
      tbl.string("name").notNullable()
      tbl.string("email").notNullable()
      tbl.string("username").notNullable().unique()
      tbl.string("password").notNullable()
      tbl.integer("roleId").notNullable().references("roleId").inTable("")
      tbl.timestamp("createdAt").defaultTo(knex.fn.now())
  })

  await knex.schema.createTable("ticketStatus", tbl => {
    tbl.increments("id").notNullable()
    tbl.string("status").notNullable().unique()
  })

  await knex.schema.createTable("ticketCategory", tbl => {
    tbl.increments("id").notNullable()
    tbl.string("category").notNullable().unique()
  })


  await knex.schema.createTable("tickets", tbl => {
    tbl.increments("id").notNullable()
    tbl.string("title").notNullable()
    tbl.integer("statusId").notNullable().references("id").inTable("ticketStatus").defaultTo(1)
    tbl.text("description").notNullable()
    tbl.text("attempt").notNullable()
    tbl.integer("categoryId").notNullable().references("id").inTable("ticketCategory")
    tbl.integer("askedBy").references("id").inTable("users")
    tbl.integer("assignedTo").references("id").inTable("users")
    tbl.timestamp("createdAt").defaultTo(knex.fn.now())
  })


  await knex.schema.createTable("solutions", tbl => {
    tbl.increments("id").notNullable()
    tbl.text("solution").notNullable()
    tbl.integer("ticketId").references("id").inTable("tickets")
    tbl.integer("solutionBy").references("id").inTable("users")
  })
  
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("solutions")
  await knex.schema.dropTableIfExists("tickets")
  await knex.schema.dropTableIfExists("ticketStatus")
  await knex.schema.dropTableIfExists("ticketCategory")
  await knex.schema.dropTableIfExists("roles")
  await knex.schema.dropTableIfExists("users")
};

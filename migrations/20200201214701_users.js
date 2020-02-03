
exports.up = async function(knex) {
  await knex.schema.createTable("users", tbl => {
      tbl.increments("userId").notNullable()
      tbl.string("name").notNullable()
      tbl.string("email").notNullable()
      tbl.string("username").notNullable().unique()
      tbl.string("password").notNullable()
      tbl.integer("usertypeId").notNullable()
      tbl.timestamp("createdAt").defaultTo(knex.fn.now())
  })

  await knex.schema.createTable("user_type", tbl => {
    tbl.increments("id").notNullable()
    tbl.string("userType").notNullable().unique()
  })

  await knex.schema.createTable("ticketStatus", tbl => {
    tbl.increments("statusId").notNullable()
    tbl.string("status").notNullable().unique()
  })

  await knex.schema.createTable("ticketCategory", tbl => {
    tbl.increments("categoryId").notNullable()
    tbl.string("category").notNullable().unique()
  })


  await knex.schema.createTable("tickets", tbl => {
    tbl.increments("ticketId").notNullable()
    tbl.string("title").notNullable()
    tbl.integer("status").notNullable().references("statusId").inTable("ticketStatus").defaultTo(1)
    tbl.text("description").notNullable()
    tbl.integer("category").notNullable().references("categoryId").inTable("ticketCategory")
    tbl.integer("askedBy").references("userId").inTable("users")
    tbl.integer("assignedTo").references("userId").inTable("users")
    tbl.timestamp("createdAt").defaultTo(knex.fn.now())
  })


  await knex.schema.createTable("solutions", tbl => {
    tbl.increments("solutionId").notNullable()
    tbl.text("solution").notNullable()
    tbl.integer("ticketId").references("ticketId").inTable("tickets")
    tbl.integer("solutionBy").references("userId").inTable("users")
  })
  
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("solutions")
  await knex.schema.dropTableIfExists("tickets")
  await knex.schema.dropTableIfExists("ticketCategory")
  await knex.schema.dropTableIfExists("ticketStatus")
  await knex.schema.dropTableIfExists("user_type")
  await knex.schema.dropTableIfExists("users")
};

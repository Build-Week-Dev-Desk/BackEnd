
exports.seed = async function(knex) {

  await knex("users").insert([
    {
      username: "student0",
      password: "000000",
      email: "student0@thisschooltho.com",
      name: "Student Zero",
      roleId: 1
    },
    {
      username: "Helper0",
      password: "000000",
      email: "helper0@thisschooltho.com",
      name: "Helper Zero",
      roleId: 2
    }
  ]);

  await knex("tickets").insert([
    {
      title: "WhO iS hTmL?",
      statusId: 2,
      description: "Can somebody please answer my questions?",
      attempt: "I opened a Word Document and started typing and nothing happened",
      categoryId: 1,
      askedBy: 1,
      assignedTo: 2
    },
    {
      title: "What is React?",
      statusId: 2,
      description: "Is it the same as reaction??",
      attempt: "Typed it in google, there were so many Reacts that came up",
      categoryId: 1,
      askedBy: 1,
      assignedTo: 2
    }
  ])

  await knex("solutions").insert([
    {
      solution: "Have you heard of this thing call Google? I suggest you try that first",
      ticketId: 1,
      solutionBy: 2
    },
    {
      solution: "Good question, which React do you need?",
      ticketId: 1,
      solutionBy: 2
    }
  ])
};

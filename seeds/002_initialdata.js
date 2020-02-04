
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
      status: "Open",
      description: "Can somebody please answer my questions?",
      attemptedSolutions: "I opened a Word Document and started typing and nothing happened",
      category: "HTML",
      asker: 1
    },
    {
      title: "What is React?",
      status: "Open",
      description: "Is it the same as reaction??",
      attemptedSolutions: "Typed it in google, there were so many Reacts that came up",
      category: "React",
      asker: 1
    }
  ])

  await knex("solutions").insert([
    {
      body: "Have you heard of this thing call Google? I suggest you try that first",
      ticketId: 1,
      answerer: 2
    },
    {
      body: "Good question, which React do you need?",
      ticketId: 2,
      answerer: 2
    }
  ])
};

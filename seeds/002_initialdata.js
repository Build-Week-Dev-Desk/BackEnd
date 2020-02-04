
exports.seed = async function(knex) {

  await knex("users").insert([
    {
      password: "000000",
      email: "student0@thisschooltho.com",
      name: "Student Zero",
      roleId: 1
    },
    {
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
      asker: 1,
      assignee: null,
      solution: null
    },
    {
      title: "What is React?",
      status: "Open",
      description: "Is it the same as reaction??",
      attemptedSolutions: "Typed it in google, there were so many Reacts that came up",
      category: "React",
      asker: 1,
      assignee: null,
      solution: null
    },
    {
      title: "Submitting this ticket will fix the bug, right?",
      status: "Open",
      description: "I have bugs all over my house. I was told to submit a tickets",
      attemptedSolutions: "I can't use insecticide because of my cats, and there were too many. What do I do?",
      category: "Bugs",
      asker: 1,
      assignee: null,
      solution: null
    },
    {
      title: "I need this fixed in 2 minutes. I have a presentation.",
      status: "Open",
      description: "Here's the catch, it's Redux",
      attemptedSolutions: "Would turning my computer on and off again work?",
      category: "Redux",
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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('issues').del();
  await knex('issues').insert([
    { user_id: 1, name: "Abundance of homlessness", village_id: 1, issue_desc: "We have an abundane of homlessness  here in greenpoint" },
    { user_id: 1, name: "Dirty Water", village_id: 1, issue_desc: "Brown water is flowing through my pipe" },
    { user_id: 1, name: "Loud construction", village_id: 1, issue_desc: "Construction workers have been making noise all day!" },
  ]);
};

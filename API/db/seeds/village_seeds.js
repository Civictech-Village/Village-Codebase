const Village = require('../models/village');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('villages').del();
  await Village.create("Muarry Hill", "murrayhill.jpg", "Manhattan NY", 1);
  await Village.create("Greenpoint", "greenpoint.jpg", "Brooklyn NY", 1);
  await Village.create("Bushwick Houses", "bushwick.jpg", "Brooklyn NY", 1);
  await Village.create("High Bridge", "highbridge.jpg", "Bronx NY", 1);
  await Village.create("Astoria", "astoria.jpg", "Queens NY", 1);
  await Village.create("Forest Hills", "foresthills.jpg", "Queens NY", 1);
};

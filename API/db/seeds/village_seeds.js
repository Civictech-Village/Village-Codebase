const Village = require('../models/village');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.seed = async (knex) => {
//   // Deletes ALL existing entries
//   await knex('villages').del();
//   await Village.create("Muarry Hill", "murrayhill.jpg", "Manhattan NY", 1);
//   await Village.create("Greenpoint", "greenpoint.jpg", "Brooklyn NY", 1);
//   await Village.create("Bushwick Houses", "bushwick.jpg", "Brooklyn NY", 1);
//   await Village.create("High Bridge", "highbridge.jpg", "Bronx NY", 1);
//   await Village.create("Astoria", "astoria.jpg", "Queens NY", 1);
//   await Village.create("Forest Hills", "foresthills.jpg", "Queens NY", 1);
// };
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('villages').truncate()
    .then(() => knex('villages').insert([
      { village_id: 1, name: 'Greenpoint', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007282/greenpoint_nlaalx.jpg", location: "Brooklyn NY" },
      { village_id: 2, name: 'Bushwick', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/bushwick_udkuxp.jpg", location: "Brooklyn NY" },
      { village_id: 3, name: 'High Bridge', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/highbridge_twmjxt.jpg", location: "Bronx NY" },
      { village_id: 4, name: 'Astoria', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/astoria_atnifn.jpg", location: "Queens NY" },
      { village_id: 5, name: 'Forest Hills', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/foresthills_asuiaz.jpg", location: "Queens NY" },
      { village_id: 6, name: 'Muarry Hill', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/murrayhill_xuecaf.jpg", location: "Manhattan NY" },
    ]));
};

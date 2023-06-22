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
      { name: 'Greenpoint', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007282/greenpoint_nlaalx.jpg", location: "Brooklyn NY", latitude:'40.740900', longitude:'-73.922000' },
      {name: 'Bushwick', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/bushwick_udkuxp.jpg", location: "Brooklyn NY",latitude:'40.692630', longitude:'-73.923660' },
      {name: 'High Bridge', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/highbridge_twmjxt.jpg", location: "Bronx NY", latitude:'40.842140', longitude:'-73.928160' },
      {name: 'Astoria', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/astoria_atnifn.jpg", location: "Queens NY", latitude:'40.766891', longitude:'-73.921387' },
      {name: 'Forest Hills', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/foresthills_asuiaz.jpg", location: "Queens NY", latitude:'40.720670', longitude:'-73.846320' },
      {name: 'Muarry Hill', image: "https://res.cloudinary.com/ddj0t5srx/image/upload/v1687007281/murrayhill_xuecaf.jpg", location: "Manhattan NY", latitude:'40.747680', longitude:'-73.978780'  },
    ]));
};

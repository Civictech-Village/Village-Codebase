const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await User.deleteAll();
  await User.create('Christianps', '1234', 'Christianps@gmail.com', 'His/Him', '2004-11-06T05:00:00.000Z');
  await User.create('Protagonist', '1234', 'Protagonist@gmail.com', 'His/Him', '2004-11-06T05:00:00.000Z');
  await User.create('Vincent', '1234', 'Vincent@gmail.com', 'His/Him', '2004-11-06T05:00:00.000Z');
  await User.create('ginniss', '1234', 'HimmyTurner@GOAT.com', 'Iam/Him', '2004-11-06T05:00:00.000Z');
};

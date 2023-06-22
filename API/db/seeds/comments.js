/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').truncate()
  await knex('comments').insert([
    {post_id: 1,user_id:2,text:'I would love to volunteer'},
    {post_id: 1,user_id:4,text:'I have no time, but wish you the best'},
    {post_id: 1,user_id:3,text:'I noticed this recently sign me up!'},

    {post_id: 2,user_id:4,text:'I had to wear rain boots the other day!'},
    {post_id: 2,user_id:2,text:'Yea this needs to get fixed'},

    {post_id: 3,user_id:2,text:'Wear Earmuffs lol'},
    {post_id: 3,user_id:3,text:'Skill Issue'},

    {post_id: 4,user_id:4,text:'This!!!!'},
    {post_id: 4,user_id:3,text:'They need to find them real help and shelters'},
    {post_id: 4,user_id:2,text:'Yea, we should bring this up to someone'},

    {post_id: 5,user_id:4,text:'WHOS IN MY GREENPOINT'},
    {post_id: 5,user_id:2,text:'Lol, its like a very muddy playground'},

    {post_id: 6,user_id:3,text:'IM FREEZING OVA HERE'},
    {post_id: 6,user_id:1,text:'Hot cocoa and home alone has been doing the trick D:'},

    {post_id: 7,user_id:3,text:'EEEEEVVVVE'},
    {post_id: 7,user_id:4,text:'Reuse Reduce Recycle'},

    
    {post_id: 8,user_id:3,text:'Traffic sucks man I feel for you'},
    {post_id: 8,user_id:2,text:'Early is On time'},

    {post_id: 9,user_id:4,text:'3000 a month for a meat hangar lol'},
    {post_id: 9,user_id:2,text:'PAAAAAIIIN'},

    {post_id: 10,user_id:2,text:'Yea its pretty loud by me too'},
    {post_id: 10,user_id:3,text:'Might as well sleep by atlantic at this point'},
  ]);
};

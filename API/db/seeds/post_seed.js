/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').truncate()
  await knex('posts').insert([
    {user_id: 1, issue_id: 1,village_id:1,message:'We should volunteer to help the homeless find appropriate shelters', image:'https://images.unsplash.com/photo-1605032660041-23c2c35d5fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'},
    {user_id: 1, issue_id: 2,village_id:1,message:'The drainage system has been blocked for a while now.', image:'https://www.gladesvilleplumbing.com.au/wp-content/uploads/2019/02/blocked-stormwater-drain-186x186.jpg'},
    {user_id: 1, issue_id: 3,village_id:1,message:'Recently I have had trouble focusing because of this construction!', image:'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG91ZCUyMGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'},
    {user_id: 1, issue_id: 1,village_id:1,message:'The city needs to do something about these homeless people in the city.', image:'https://images.unsplash.com/photo-1605032659978-a5bd04094a16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWJ1bmRhbmNlJTIwb2YlMjBob21lbGVzc25lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'},
    {user_id: 1, issue_id: 2,village_id:1,message:'It looks like a swamp out here!!!', image:'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX42800024.jpg'},
    
   
    {user_id: 2, issue_id: 4,village_id:2,message:'There no heat in our apratment, I have to sleep with the oven on!!!', image:'https://images.unsplash.com/photo-1599028274511-e02a767949a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGVhdGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'},
    {user_id: 2, issue_id: 5,village_id:2,message:'I can not walk outside without it looking like the earth from WALL-E', image:'https://images.unsplash.com/photo-1565886728041-a239b6a3ec42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'},
    {user_id: 2, issue_id: 6,village_id:2,message:'I left at the same time I always leave to get to work, and I was two hours late!!!', image:'https://images.unsplash.com/photo-1597762333765-cbcd63dd8acc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZmZpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'},
    {user_id: 2, issue_id: 4,village_id:2,message:'Am I paying all this rent money to get frostbite in my own home???', image:'https://images.unsplash.com/photo-1602891867216-78a0a30c18ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMGhvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'},
    {user_id: 2, issue_id: 6,village_id:2,message:'The traffic is so bad, it constantly sounds like im at times square when im home _._', image:'https://images.unsplash.com/photo-1569261655993-3ae347322edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWZmaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'},
    
  ]);
};

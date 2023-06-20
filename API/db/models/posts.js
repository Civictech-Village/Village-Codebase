const knex = require("../knex");

class Posts {
  constructor({
    post_id,
    user_id,
    issue_id,
    message,
    time,
    image,
    village_id,
  }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.issue_id = issue_id;
    this.message = message;
    this.village_id = village_id;
    this.time = time;
    this.image = image;
  }

  static async create(user_id, issue_id, village_id, message, image = null) {
    const query = `INSERT INTO posts (user_id, issue_id,village_id, message, image)
    VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const {
      rows: [posts],
    } = await knex.raw(query, [user_id, issue_id, village_id, message, image]);
    return new Posts(posts);
  }

  static async listByIssue(issue_id) {
    const query = `SELECT posts.*, likes.likeCount, issues.name, users.username, users.profile_picture
    FROM posts
    LEFT JOIN (
      SELECT post_id, COUNT(*) AS likeCount
      FROM likes
      GROUP BY post_id
    ) likes ON posts.post_id = likes.post_id
    LEFT JOIN issues ON posts.issue_id = issues.issue_id
    LEFT JOIN users ON posts.user_id = users.id
    WHERE issues.issue_id = ?
    ORDER BY likes.likeCount DESC;`;
    const { rows } = await knex.raw(query, [issue_id]);
    return rows;
  }

  static async listVillages(village_id) {
    try {
      const query = `SELECT posts.user_id,
      posts.issue_id,
      posts.message,
      posts.village_id,
      posts.post_id,
      issues.name
      FROM posts 
      JOIN issues ON issues.issue_id=posts.issue_id
      WHERE posts.village_id = ?
      `;
      const { rows } = await knex.raw(query, [village_id]);
      console.log(rows);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(post_id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    const {
      rows: [post],
    } = await knex.raw(query, [post_id]);
    return post ? new Posts(post) : null;
  }

  static async destroyPost(post_id) {
    try {
      const query = "DELETE FROM posts WHERE post_id = ? RETURNING *;";
      const { rows } = await knex.raw(query, [post_id]);
      return rows.map((post) => new Posts(post));
    } catch (err) {
      console.log(err);
    }
  }

  static async update(post_id, message, image) {
    try {
      const query = `UPDATE posts SET message = ?, image = ?, WHERE post_id = ${post_id} RETURNING *;`;
      const {
        rows: [party],
      } = await knex.raw(query, [message, image]);
      return new Posts(party);
    } catch (err) {
      console.log(err);
    }
  }

  static async like(userId, postId) {
    try {
      const countQuery = `SELECT COUNT(*) AS likeCount
      FROM likes
      WHERE user_id = ? AND post_id = ?;`;
      const result = await knex.raw(countQuery, [userId, postId]);
      if (Number(result.rows[0].likecount) < 1) {
        const query = `INSERT INTO likes (user_id, post_id) VALUES (?, ?) RETURNING *`;
        const { rows } = await knex.raw(query, [userId, postId]);
        return rows;
      } else {
        return { result: false };
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async likeCount(postId) {
    try {
      const query = `SELECT COUNT(*) AS likecount
      FROM likes
      WHERE post_id = ?;`;
      const { rows } = await knex.raw(query, [postId]);
      return rows[0].likecount;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async hasLiked(userId, postId) {
    try {
      const countQuery = `SELECT COUNT(*) AS likeCount
      FROM likes
      WHERE user_id = ? AND post_id = ?;`;
      const {
        rows: [like],
      } = await knex.raw(countQuery, [userId, postId]);
      if (like.likecount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async destroyLike(userId, postId) {
    try {
      const countQuery = `DELETE FROM likes
      WHERE user_id = ? AND post_id = ?
      RETURNING *;
      `;
      const {
        rows: [like],
      } = await knex.raw(countQuery, [userId, postId]);
      return like;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async listPopularLiked() {
    try {
      const query = `SELECT posts.*, likes.likeCount, issues.name, users.username, users.profile_picture
      FROM posts
      LEFT JOIN (
        SELECT post_id, COUNT(*) AS likeCount
        FROM likes
        GROUP BY post_id
      ) likes ON posts.post_id = likes.post_id
      LEFT JOIN issues ON posts.issue_id = issues.issue_id
      LEFT JOIN users ON posts.user_id = users.id
      ORDER BY likes.likeCount DESC;`;
      const { rows } = await knex.raw(query);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async listVillagePosts(userId) {
    try {
      const query = `SELECT posts.*, likes.likeCount, issues.name, users.username, users.profile_picture
      FROM posts
      LEFT JOIN (
        SELECT post_id, COUNT(*) AS likeCount
        FROM likes
        GROUP BY post_id
      ) likes ON posts.post_id = likes.post_id
      LEFT JOIN issues ON posts.issue_id = issues.issue_id
      LEFT JOIN users ON posts.user_id = users.id
      INNER JOIN users_villages uv ON posts.village_id = uv.village_id
      WHERE uv.user_id = ?
      ORDER BY likes.likeCount DESC;`;
      const {rows} = await knex.raw(query, [userId])
      return rows
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async listUsersPosts(userId) {
    try {
      const query = `SELECT posts.*, likes.likeCount, issues.name, users.username, users.profile_picture
      FROM posts
      LEFT JOIN (
        SELECT post_id, COUNT(*) AS likeCount
        FROM likes
        GROUP BY post_id
      ) likes ON posts.post_id = likes.post_id
      LEFT JOIN issues ON posts.issue_id = issues.issue_id
      LEFT JOIN users ON posts.user_id = users.id
      LEFT JOIN villages ON posts.village_id = villages.village_id
      WHERE users.id = ?
      ORDER BY likes.likeCount DESC;`;
      const {rows} = await knex.raw(query, [userId])
      return rows
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    return knex.raw("TRUNCATE posts;");
  }
}

module.exports = Posts;

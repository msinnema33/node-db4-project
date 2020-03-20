const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db("resources");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then(resource => {
        if (resource) {
          return mappers.resourceToBody(resource);
        } else {
          return null;
        }
      });
  } else {
    return query.then(resources => {
      return resources.map(resource => mappers.resourceToBody(resource));
    });
  }
}

function insert(resource) {
  return db("resources")
    .insert(resource)
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("resources")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("resources")
    .where("id", id)
    .del();
}

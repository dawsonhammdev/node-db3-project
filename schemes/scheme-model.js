const db = require("../data/db-config.js")

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove
}

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
    .where({ id }).first()
}

function findSteps(id){
    return db('steps').where("scheme_id" , id)
    .join('schemes', 'steps.scheme_id', 'schemes.id' )
    .select('steps.id','schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .orderBy('steps.step_number')
  }

function add(schemeData) {
    return db("schemes")
    .insert(schemeData, "id")
    .then(ids => {
    return findById(ids[0])
    })
}

function remove(id) {
    return db("schemes")
    .where({ id })
    .del()
}
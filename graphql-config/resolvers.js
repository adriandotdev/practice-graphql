
const pool = require('../mysql.js')

const resolvers = {

    Query: {

        cpos() {

            return new Promise((resolve, reject) => {

                pool.query("SELECT * FROM cpos", (err, result) => {

                    if (err) {
                        reject(err);
                    }

                    resolve(result)
                })
            })
        },
        locations() {

            return new Promise((resolve, reject) => {

                pool.query("SELECT * FROM locations", (err, result) => {

                    if (err) {
                        reject(err);
                    }

                    resolve(result)
                })
            })
        },
        cpo(_, args) {
            return new Promise((resolve, reject) => {

                pool.query(`SELECT * FROM cpos WHERE party_id = ? LIMIT 1`, [args.party_id], (err, result) => {

                    if (err) {
                        reject(err);
                    }

                    resolve(result)
                })
            })
        },
        evses() {

            return new Promise((resolve, reject) => {

                pool.query(`SELECT * FROM evses`, (err, result) => {

                    if (err) {
                        reject([])
                    }

                    resolve(result);
                })
            })
        }
    },
    CPO: {
        locations(parent) {
            return new Promise((resolve, reject) => {

                pool.query(`SELECT * FROM locations WHERE party_id = ?`,
                    [parent.party_id], (err, result) => {

                        if (err) {
                            reject([]);
                        }

                        resolve(result);
                    })
            })
        }
    },
    Location: {

        cpo(parent) {

            return new Promise((resolve, reject) => {

                pool.query(`SELECT * FROM cpos WHERE party_id = ? LIMIT 1`, [parent.party_id], (err, result) => {

                    if (err) {
                        reject(null);
                    }

                    resolve(result)
                })
            })
        }
    }
}

module.exports = resolvers;
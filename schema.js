const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const pool = require('./mysql');

const Location = new GraphQLObjectType({

    name: 'Locations',
    fields: () => ({
        party_id: { type: GraphQLString },
        country_code: { type: GraphQLString },
        name: { type: GraphQLString }
    })
})
// Define the Person type
const CPO = new GraphQLObjectType({
    name: 'CPOs',
    fields: () => ({
        party_id: { type: GraphQLString },
        country_code: { type: GraphQLString },
        locations: {
            type: new GraphQLList(Location),
            resolve: function (parent) {

                return new Promise((resolve, reject) => {

                    pool.query('SELECT * FROM locations WHERE party_id = ?', [parent.party_id], (err, result) => {

                        if (err) {
                            reject(err);
                        }

                        resolve(result)
                    })
                })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cpos: {
            type: new GraphQLList(CPO),
            resolve: function () {
                return new Promise((resolve, reject) => {

                    pool.query('SELECT * FROM cpos', (err, result) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(result);
                    })
                })
            }
        },
        locations: {
            type: new GraphQLList(Location),
            resolve: function () {
                return new Promise((resolve, reject) => {

                    pool.query('SELECT * FROM locations', (err, result) => {

                        if (err) {
                            reject(err);
                        }

                        resolve(result);
                    })
                })
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});

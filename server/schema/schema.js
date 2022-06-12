//const { projects, clients } = require('../sampleData.js')
// mongose models
const Project = require('../Models/Project')
const Client = require('../Models/Client')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');

// project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId) // return the client object
            }
        }
    })
})

// client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID }, 
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString } 
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find(); // return all projects
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id); // return a single project by id
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find(); // return all clients
                }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id); // return a single client by id
                },
            },
        },
},);

// mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add a new client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save()},// save the client to the database
        },
        // delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }, // id of the client to delete
        },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id) // delete the client from the database
            },
        },
        // add a new project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({ 
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'not started' },
                            progress: { value: 'in progress' },
                            completed: { value: 'completed' },
                        }
                    }),
                    defaultValue: 'not started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) { 
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                })
                return project.save(); // save the project to the database
            },
        },
        // delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id) // delete the project from the database
            }
        },  
        // // update the project in the database
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString},
                description: { type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({ 
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'not started' },
                            progress: { value: 'in progress' },
                            completed: { value: 'completed' },
                        }
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id, 
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }, 
                    },
                {new: true}) // create a new document if it doesn't exist 
                },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
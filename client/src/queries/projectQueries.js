import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            id
            name
            status
        }
    }`

const GET_PROJECT = gql`
    query GetProject($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }

        
        }}`

export {GET_PROJECTS, GET_PROJECT};
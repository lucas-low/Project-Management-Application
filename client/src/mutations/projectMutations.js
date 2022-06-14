import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
    }}

export {ADD_PROJECT}
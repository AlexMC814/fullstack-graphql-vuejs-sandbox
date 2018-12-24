import { gql } from 'apollo-boost';

/* Posts queries */
export const GET_POSTS = gql`
    query {
        getPosts {
            _id
            title
            description
            imageUrl
        }
    }
`;

/* User queries */

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            _id
            username
            email
            password
            avatar
            joinDate
            favourites {
                _id
                title
                imageUrl
            }
        }
    }
`;

/* Posts mutations */

/* User mutations */

export const SIGNUP_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        signUpUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!) {
        signInUser(username: $username, password: $password) {
            token
        }
    }
`;

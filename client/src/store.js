import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

import { defaultClient as apolloClient } from './main';

import { GET_CURRENT_USER, GET_POSTS, SIGNIN_USER } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        user: null,
        posts: [],
        error: null,
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload;
        },
        setError: (state, paylod) => {
            state.error = paylod;
        },
        clearUser: state => (state.user = null),
        clearError: state => (state.error = null),
    },
    actions: {
        getCurrentUser: ({ commit }) => {
            commit('setLoading', true);
            apolloClient
                .query({
                    query: GET_CURRENT_USER,
                })
                .then(({ data }) => {
                    commit('setLoading', false);
                    // Add user data to state
                    commit('setUser', data.getCurrentUser);
                    console.log(data.getCurrentUser);
                })
                .catch(err => {
                    commit('setLoading', false);
                    console.log(err);
                });
        },
        getPosts: ({ commit }) => {
            commit('setLoading', true);
            // use ApolloClient to fire getPosts query
            apolloClient
                .query({
                    query: GET_POSTS,
                })
                .then(({ data }) => {
                    // Get data from actions to state via mutations
                    // commit passes data from actions along to mutation function
                    commit('setPosts', data.getPosts);
                    commit('setLoading', false);
                })
                .catch(err => {
                    commit('setLoading', false);
                    console.error(err);
                });
        },
        signinUser: ({ commit }, payload) => {
            commit('clearError');
            commit('setLoading', true);
            // clear token to prevent errors if malformed
            localStorage.setItem('token', '');
            apolloClient
                .mutate({
                    mutation: SIGNIN_USER,
                    variables: payload,
                })
                .then(({ data }) => {
                    commit('setLoading', false);
                    localStorage.setItem('token', data.signInUser.token);
                    // to make sure created method is run in main.js (we run getCurrentUser), reload the page
                    router.go();
                })
                .catch(err => {
                    commit('setLoading', false);
                    commit('setError', err);
                    console.error(err);
                });
        },
        signoutUser: async ({ commit }) => {
            // clear user in state
            commit('clearUser', null);
            // remove token in localStorage
            localStorage.setItem('token', '');
            // end the session
            await apolloClient.resetStore();
            // redirect user home - out of private pages
            router.push('/');
        },
    },
    getters: {
        posts: state => state.posts,
        user: state => state.user,
        loading: state => state.loading,
        error: state => state.error,
    },
});

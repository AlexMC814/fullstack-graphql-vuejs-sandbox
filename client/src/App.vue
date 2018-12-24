<template>
  <v-app style="background: #E3E3E3;">
    <v-navigation-drawer app fixed temporary v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" @click="handleSignoutUser">
          <v-list-tile-action>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-tile-action>Sign Out
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal navbar -->
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">VueShare</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flex
        prepend-icon="fa-search"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon left class="hidden-sm-only">{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <!-- Profile button -->
        <v-btn flat to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>fa-user</v-icon>
          <v-badge right color="blue darken-2">
            <!-- <span slot="badge">1</span> -->
            Profile
          </v-badge>
        </v-btn>

        <!-- SignOut button -->
        <v-btn flat v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>fa-sign-out-alt</v-icon>Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </main>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters(["user"]),
    horizontalNavItems() {
      let items = [
        { icon: "fa-comment-alt", title: "Posts", link: "/posts" },
        { icon: "fa-lock-open", title: "Sign In", link: "/signin" },
        { icon: "fa-user-plus", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [{ icon: "fa-comment-alt", title: "Posts", link: "/posts" }];
      }

      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "fa-comment-alt", title: "Posts", link: "/posts" },
        { icon: "fa-lock-open", title: "Sign In", link: "/signin" },
        { icon: "fa-user-plus", title: "Sign Up", link: "/signup" }
      ];
      if (this.user) {
        items = [
          { icon: "fa-comment-alt", title: "Posts", link: "/posts" },
          { icon: "fa-plus", title: "Create Post", link: "/post/add" },
          { icon: "fa-user", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
 

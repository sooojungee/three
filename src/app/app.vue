<template>
  <v-app>
    <v-navigation-drawer v-model="drawer"
                         app
                         :disable-route-watcher="false"
                         @click="drawer = !drawer">
      <v-list>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/example">
          <v-list-item-action>
            <v-icon>code</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Example</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/bufferGeometry">
          <v-list-item-action>
            <v-icon>code</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>bufferGeometry</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/wave">
          <v-list-item-action>
            <v-icon>code</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>bufferGeometry.wave</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app
               clipped-right
               color="blue-grey"
               dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>

</template>

<script src="./app.ts"/>
<style lang="scss" scoped>
@import "./app.scss";
</style>

<template>
  <v-container fluid
               ma-0
               pa-0>
    <div id="renderer"
         ref="renderer"></div>
  </v-container>
</template>

<script src="./example.ts"/>

<style lang="scss" scoped>
@import "./example.scss";
#renderer {
  width: 100%;
  height: calc(100vh - 64px);
  // background: red;
}
</style>
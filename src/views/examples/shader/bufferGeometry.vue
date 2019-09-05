<template>
  <div id="bfrenderer"
       ref="renderer">

  </div>
</template>

<script src="./bufferGeometry.ts"/>

<style lang="scss" scoped>
@import "./bufferGeometry.scss";
#bfrenderer {
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
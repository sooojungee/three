<template>
  <div id="bfrenderer"
       ref="renderer">

  </div>
</template>

<script src="./bufferGeometry.wave.ts"/>

<style lang="scss" scoped>
@import "./bufferGeometry.wave.scss";
#bfrenderer {
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
<script setup>
const a = 1
const test = a ?? new Map()
const test2 = test !== null && test !== undefined ? test : new Map()
</script>

<template>
  <div>
    {{ test2 }}
  </div>
</template>

<style rel="stylesheet/less" lang="less">

</style>

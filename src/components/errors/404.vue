<template>
  <a-result status="404" title="404" sub-title="NOT FOUND">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">atras</a-button>
    </template>
  </a-result>
</template>
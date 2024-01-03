<template>
  <div @click="toAccount">toAccount</div>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
function toAccount() {
  router.push({
    name: "account",
  });
}
</script>

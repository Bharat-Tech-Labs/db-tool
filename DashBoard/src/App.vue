<template>
  <v-app>
    <FileSelect/>
  </v-app>
</template>

<script lang="ts">

import Vue from 'vue';
import FileSelect from "@/components/FileSelect.vue";
export default Vue.extend({
  name: 'App',

  components: {
    FileSelect,
  },

  data: () => ({
    //
  }),
});
</script>

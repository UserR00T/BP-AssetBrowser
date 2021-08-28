<template>
  <footer class="mb-12 md:flex md:items-center md:justify-between">
    <section class="flex justify-center space-x-6 md:order-2">
      <span class="text-gray-400 cursor-pointer hover:text-gray-500" @click="toggleDarkMode">
        <SvgSun v-show="darkMode" />
        <SvgMoon v-show="!darkMode" />
      </span>
      <a href="https://github.com/UserR00T/BP-AssetBrowser" rel="noreferrer noopener" class="text-gray-400 hover:text-gray-500">
        <span class="sr-only">GitHub</span>
        <SvgGithub />
      </a>
    </section>
    <aside class="mt-8 md:mt-0 md:order-1">
      <p class="text-base text-center text-gray-400">Made with &lt;3 by UserR00T.</p>
    </aside>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  head() {
    return {
      bodyAttrs: {
        // @ts-ignore
        class: this.darkMode ? 'dark' : '',
      }
    }
  },
  data() {
    return {
      darkMode: false,
    };
  },
  created() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode.toString());
    },
  },
});
</script>
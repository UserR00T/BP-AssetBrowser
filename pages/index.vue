<template>
  <section class="w-4/5 mx-auto text-gray-600 dark:text-gray-300">
    <header class="pt-8">
      <input
        type="text"
        class="w-full px-2 py-4 mb-2 text-lg text-gray-800 rounded-md shadow dark:bg-gray-700 dark:text-gray-300"
        placeholder="Waiting for input..."
        v-model="search"
      />
      <aside class="flex">
        <section class="flex mr-2">
          <h4>Grid size</h4>
          <select name="grid" class="text-gray-800 dark:bg-gray-600 dark:text-gray-400" v-model="gridSize">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </section>
        <section class="flex mx-4">
          <h4>Search</h4>
          <select name="grid" class="text-gray-800 dark:bg-gray-600 dark:text-gray-400" v-model="searchMode">
            <option value="name">Name</option>
            <option value="hash">Hash</option>
          </select>
        </section>
      </aside>
    </header>
    <LayoutFooter />
    <main :class="['grid', 'gap-8', `grid-cols-${gridSize}`]">
      <article v-for="(entry, i) in shownEntries" :key="i" class="flex justify-between px-2 py-2 rounded-md shadow hover:shadow-md">
        <section>
          <img :src="`snapshots/${entry.Name}.png`" />
        </section>
        <aside class="mt-4 mr-8">
          <ul>
            <li class="flex">
              <SvgDocumentText /><span class="ml-2 font-bold">{{ entry.Name }}</span>
            </li>
            <li class="flex">
              <SvgIdentification /><span class="ml-2">{{ entry.Hash }}</span>
            </li>
          </ul>
        </aside>
      </article>
    </main>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      gridSize: 4,
      searchMode: 'name',
      entries: [],
      search: '',
      page: 1,
    };
  },
  mounted() {
    window.onscroll = async () => {
      if (window.innerHeight + window.pageYOffset < document.body.offsetHeight - 2) {
        return;
      }
      this.page++;
    };
  },
  computed: {
    filteredEntries() {
      if (!this.search || this.search.length < 3) {
        // @ts-ignore
        return this.entries;
      }
      this.page = 1;
      console.log(this.entries);
      if (this.searchMode === 'name') {
        // @ts-ignore
        return this.entries.filter((x) => x.Name.toLowerCase().includes(this.search.toLowerCase()));
      } else {
        // @ts-ignore - use abstract equality here as this.search is not a int
        return this.entries.filter((x) => x.Hash == this.search);
      }
    },
    shownEntries() {
      // @ts-ignore
      return this.filteredEntries.slice(0, 50 * this.page);
    },
  },
  async asyncData() {
    const entries = await fetch(`entries.json`).then((x) => x.json());
    return { entries };
  },
});
</script>
<template>
  <div id="app">
    <Counter/>
    <Setting/>
  </div>
</template>

<script>
import Counter from './components/Counter'
import Setting from './components/Setting'

export default {
  name: 'app',
  components: {
    Counter,
    Setting
  },
  mounted () {
    let lastVisit = this.$store.getters.getLastTime
    if (lastVisit != null) {
      let i = this.$moment().diff(lastVisit, 'second')
      this.$toasted.info(`Welcome Back! You have away for ${i} seconds`)
    }

    this.$store.dispatch('updateLastTime')
  },
  computed: {
    toggle: function () {
      return this.$store.getters['getToggle']
    }
  },
  watch: {
    toggle: function () {
      this.openNoteModal()
    }
  },
  methods: {
    openNoteModal () {
      this.$modal.show('noteModal')
    }
  }
}
</script>

<style>
html {
  height: 100%;
  background-color: black;
  font-family: Roboto,Helvetica,Arial,sans-serif;
}
</style>

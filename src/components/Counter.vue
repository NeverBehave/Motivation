<template>
<div id="counter" @click="clicked">
  <p id="content">{{ string }}</p>
</div>
</template>

<script>

export default {
  name: 'CountDown',
  data () {
    return {
      string: 'Click to Set Time',
      interval: null
    }
  },
  computed: {
    fromDate () {
      return this.$store.getters.getDate
    }
  },
  watch: {
    fromDate (newv, oldv) {
      if (newv !== null) {
        this.start()
      }
    }
  },
  methods: {
    filterLevel () {
      // WTF? Original
      // Terrifying 9 digits
      // Moderate 8 digits
      // Light 7 digits
      let n = this.$moment().diff(this.fromDate, 'year', true)
      switch (this.$store.getters.getLevel) {
        case 'Terrifying':
          this.string = n.toFixed(9)
          return
        case 'Moderate':
          this.string = n.toFixed(8)
          return
        case 'Light':
          this.string = n.toFixed(7)
          return
        case 'WTF?':
        default:
          this.string = n
      }
    },
    start () {
      this.interval = setInterval(this.filterLevel, 33)
    },
    clicked () {
      this.$store.dispatch('toggleModal')
    }
  },
  mounted () {
    if (this.fromDate !== null) {
      this.start()
    }
  }
}
</script>

<style scoped>
  #counter {
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
  #content {
    margin: 0 0 0 0;
    text-align: center;
    color: white;
    font-size: 6vw;
  }
</style>

<template>
  <vue-modal
    @before-open="beforeOpen"
    :adaptive="true"
    name="noteModal"
  >
    <div class="pure-g">
      <ViewOnGithub/>
      <div class="pure-u-1-3"></div>
      <div class="pure-u-1-3"><h2 class="title">{{ $t('title.motivation') }}</h2></div>
      <div class="pure-u-1-3"></div>
    </div>
    <div class="pure-g">
      <div class="pure-u-1-3">
        <form class="pure-form pure-form-stacked">
          <fieldset class="pure-group">
            <label for="year"  class="pure-input-1 color">{{ $t('title.date') }}</label>
            <input id="year" class="pure-input-1" v-model="year" type="number" :placeholder="$t('placeholder.year')">
            <input v-model="month" class="pure-input-1" type="number" :placeholder="$t('placeholder.month')">
            <input v-model="day"  class="pure-input-1" type="number" :placeholder="$t('placeholder.day')">
            <button type="button" @click="update" class="pure-button">{{ $t('button.confirm') }}</button>
          </fieldset>
        </form>
      </div>
      <div class="pure-u-1-3">
        <form class="pure-form pure-form-stacked">
          <fieldset class="pure-group">
              <label class="color" for="level">{{ $t('title.level') }}</label>
              <select id="level" v-model="level" class="pure-input-1">
                <option :value="`light`">{{ $t('level.light') }}</option>
                <option :value="`moderate`">{{ $t('level.moderate') }}</option>
                <option :value="`terrifying`">{{ $t('level.terrifying') }}</option>
                <option :value="`wtf`">{{ $t('level.wtf') }}</option>
              </select>
          </fieldset>
        </form>
      </div>
      <div class="pure-u-1-3 color" v-html="$t('message.readme')">
      </div>
    </div>
  </vue-modal>
</template>

<script>
import ViewOnGithub from './ViewOnGithub'
export default {
  name: 'Setting',
  components: {
    ViewOnGithub
  },
  data () {
    return {
      year: null,
      month: null,
      day: null
    }
  },
  computed: {
    time: function () {
      return this.$store.getters.getDate
    },
    level: {
      get () {
        return this.$store.state.level
      },
      set (value) {
        this.$store.commit('updateLevel', value)
      }
    }
  },
  methods: {
    pad (d) {
      return d.toString().padStart(2, '0')
    },
    beforeOpen () {
      if (this.time != null) {
        this.year = this.time.year()
        this.month = this.time.month() + 1 // 0 - 11, as API said
        this.day = this.time.date()
      }
    },
    update () {
      let str = this.year + '-' + this.pad(this.month) + '-' + this.pad(this.day)
      this.$store.dispatch('updateTime', str).then((r) => {
        if (!r) {
          this.$toasted.error(this.$t('toasted.date_invaild'))
          return
        }

        this.$toasted.info(this.$t('toasted.set_date'))
        this.close()
      })
    },
    close () {
      this.$modal.hide('noteModal')
    }
  }
}
</script>

<style>
.color {
  color: white;
}

.title {
  color: white;
  text-align: center;
}

.pure-form-stacked {
  margin: 0 10px 10px 0;
}

.v--modal {
  background-color: #151513 !important;
}
</style>

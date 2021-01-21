<template>
  <div>
    <DatePicker
      v-model="time"
      type="date"
      placeholder="Choose date"
      valueType="format"
      :show-second="false"
      :show-time-header="true"
      @change="pickDate()"
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'Date',
  components: { DatePicker },
  props: {
    date: String
  },
  data() {
    return {
      time: ''
    };
  },
  methods: {
    pickDate() {
      if (!this.time) {
        this.time = new Date().toJSON().slice(0, 10);
        this.$emit('pick-date', this.time);
      } else {
        this.$emit('pick-date', this.time);
      }
    }
  },
  beforeDestroy() {
    this.pickDate();
  }
};
</script>

<style lang="scss">
.mx-input-wrapper {
  display: flex;
  justify-content: start;
  width: 125px;
}

.mx-input {
  height: 28px;
  width: 100%;
}

.mx-icon-calendar {
  right: 10px;
}
</style>

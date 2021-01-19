<template>
  <div>
    <DatePicker
      v-model="time"
      type="date"
      placeholder="Choose date"
      valueType="format"
      :show-second="false"
      :show-time-header="true"
      @confirm="pickDate()"
      confirm
    ></DatePicker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { DatePicker },
  data() {
    return {
      time: null
    };
  },
  methods: {
    pickDate() {
      this.$emit('pick-date', this.time);
    }
  }
};
</script>

<style lang="scss" scoped></style>

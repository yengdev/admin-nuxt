<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        dense
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable locale="th_TH">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> ຍົກເລີກ </v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(date)">
        ຕົກລົງ
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    label: {
      type: String,
      default: "ວັນທີ່",
    },
  },
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
  }),
  watch: {
    date(value) {
      this.$emit("update:date", value);
    },
  },
};
</script>

<template>
  <div>
    <v-card class="mx-auto" width="500" flat>
      <v-card-title>ເພີ່ມຂໍ້ມູນຜູ້ສະໜອງ</v-card-title>
      <v-card-text>
        <v-text-field v-model="form.name" label="ຊື່ຜູ້ສະຫນອງ"></v-text-field>
        <v-text-field
          v-model="form.telephone"
          label="ເບີໂທຕິດຕໍ່"
        ></v-text-field>
        <v-textarea v-model="form.detail" label="ລາຍລະອຽດ"></v-textarea>
        <v-btn class="my-5" color="primary" block @click="create">ເພີ່ມ</v-btn>
      </v-card-text>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">ຊື່ຜູ້ສະຫນອງ</th>
                <th class="text-left">ເບີໂທລະສັບ</th>
                <th class="text-left">ລາຍລະອຽດ</th>
                <th class="text-left">ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in suppliers" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.telephone }}</td>
                <td>{{ item.detail }}</td>
                <td>
                  <v-btn x-small color="errro" @click="remove(item.id)"
                    >ລົບ</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  computed: {
    suppliers() {
      return this.$store.state.suppliers.suppliers;
    },
  },
  mounted() {
    this.$store.dispatch("suppliers/suppliers");
  },
  methods: {
    create() {
      this.$store.dispatch("suppliers/createSupplier", this.form);
    },
    remove(id) {
      this.$store.dispatch("suppliers/deleteSupplier", id);
    },
  },
};
</script>

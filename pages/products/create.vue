<template>
  <v-container>
    <h1 class="dark--text lighten-5">ສ້າງສິນຄ້າໃໝ່</h1>
    <v-form>
      <v-card class="pb-10" flat>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="form.barcode"
                label="ບາໂຄດ"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="form.category_id"
                :items="categories"
                :item-text="(item) => item.name_lao"
                item-value="id"
                label="ປະເພດສິນຄ້າ"
                dense
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.product_name_lao"
                label="ສິນຄ້າພາສາລາວ"
                hide-details="auto"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.product_name_en"
                label="ສິນຄ້າພາສາອັງກິດ"
                hide-details="auto"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.product_price"
                label="ລາຄາສິນຄ້າ"
                hide-details="auto"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.quantity"
                label="ຈຳນວນ"
                hide-details="auto"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-file-input v-model="form.images" dense multiple></v-file-input>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.show_only"
                dense
                label="ມີໄວ້ເພື່ອສະແດງຢ່າງດຽວ (ບໍ່ສາມາດຂາຍ)"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="suppliers"
                :item-text="(item) => item.name"
                item-value="id"
                label="ຜູ້ສະຫນອງ"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-textarea
                v-model="form.description_lao"
                label="ລາຍລະອຽດສິນຄ້າພາສາລາວ"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="4">
              <v-textarea
                v-model="form.description_en"
                label="ລາຍລະອຽດສິນຄ້າພາສາອັງກິດ"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn color="primary" small @click="create">ບັນທຶກ</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        category_id: null,
        product_name_en: null,
        product_name_lao: null,
        product_price: null,
        description_en: null,
        description_lao: null,
        quantity: null,
        images: null,
        barcode: null,
        show_only: false,
      },
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },
    suppliers() {
      return this.$store.state.suppliers.suppliers;
    },
  },
  mounted() {
    this.$store.dispatch("categories/categories");
    this.$store.dispatch("suppliers/suppliers");
  },
  methods: {
    create() {
      const form = { ...this.form };
      form.show_only = this.form.show_only === true ? 1 : 0;
      this.$store.dispatch("products/create", form);
    },
  },
};
</script>

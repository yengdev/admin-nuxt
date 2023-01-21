<template>
  <v-container>
    <h1 class="dark--text lighten-5">ແກ້ໄຂສິນຄ້າໃໝ່</h1>
    <v-form>
      <v-card class="pb-10">
        <v-card-text>
          <v-row>
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
              <v-file-input v-model="form.image" dense></v-file-input>
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
            <v-col v-if="productsImage.length > 0">
              <v-row>
                <v-col
                  v-for="(item, index) in productsImage"
                  :key="index"
                  cols="3"
                >
                  <v-img
                    :src="`${$config.API_DOMAIN}/image/${item.url}`"
                    max-width="100"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn color="primary" small @click="update">ບັນທຶກ</v-btn>
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
      image: null,
      form: {
        category_id: null,
        product_name_en: null,
        product_name_lao: null,
        product_price: null,
        description_en: null,
        description_lao: null,
        quantity: null,
        image: null,
      },
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },
    products() {
      return this.$store.state.products.products;
    },
    productsImage() {
      return this.$store.state.products.productsImage;
    },
  },
  watch: {
    products(value) {
      if (value.length > 0) {
        const product = value[0];
        this.form.category_id = product.category_id;
        this.form.product_name_en = product.product_name_en;
        this.form.product_name_lao = product.product_name_lao;
        this.form.product_price = product.product_price;
        this.form.description_en = product.description_en;
        this.form.description_lao = product.description_lao;
        this.form.quantity = product.quantity;
        this.form.id = this.$route.params.id;
        this.image = product.url;
      }
    },
  },
  mounted() {
    this.$store.dispatch("categories/categories");
    this.$store.dispatch("products/product", this.$route.params.id);
    this.$store.dispatch("products/productImages", this.$route.params.id);
  },
  methods: {
    update() {
      this.$store.dispatch("products/update", this.form);
    },
  },
};
</script>

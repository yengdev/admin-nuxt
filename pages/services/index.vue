<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card max-width="800" flat class="mx-auto">
          <v-card-title>ຮູບເລື່ອນ</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col
                    v-for="(item, id) in sliders"
                    :key="id"
                    cols="12"
                    md="6"
                  >
                    <v-img
                      :src="`${$config.API_DOMAIN}/image/${item.image}`"
                      contain
                    >
                      <v-btn icon color="white" @click="deleteSlider(item.id)">
                        <v-icon>mdi-delete-empty</v-icon>
                      </v-btn>
                    </v-img>
                    <div>
                      <v-text-field
                        hide-details="auto"
                        label="ເລກລຳດັບ"
                        type="number"
                      ></v-text-field>
                      <v-text-field
                        hide-details="auto"
                        label="ຄຳອະທິບາຍ"
                      ></v-text-field>
                      <v-btn
                        class="mt-3"
                        color="primary"
                        small
                        @click="saveSlider"
                        >ບັນທຶກ</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sliderForm.sequence"
                      label="ເລກລຳດັບ"
                      type="number"
                    ></v-text-field>
                    <v-text-field
                      v-model="sliderForm.title"
                      label="ຄຳອະທິບາຍ"
                    ></v-text-field>
                    <v-file-input
                      v-model="sliderForm.image"
                      dense
                      hide-details="auto"
                      placeholder="Slider Image"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="primary" small @click="saveSlider"
                      >ເພີ່ມ</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card max-width="800" flat class="mx-auto">
          <v-card-title>ສິນຄ້າແນະນຳ</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="item in products" :key="item.id" cols="12" md="3">
                <v-card>
                  <v-img
                    :src="`${$config.API_DOMAIN}/image/${item.url}`"
                    contain
                  >
                  </v-img>
                  <v-card-text>
                    {{ item.product_name_en }}
                    <v-btn
                      v-if="checkProductExist(item.id)"
                      color="primary"
                      x-small
                      @click="closeProduct(item.id)"
                    >
                      ກຳລັງສະແດງໃນເວັບ
                    </v-btn>
                    <v-btn
                      v-else
                      color="error"
                      x-small
                      @click="openProduct(item.id)"
                    >
                      ບໍ່ຖືກສະແດງ
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card max-width="800" class="mx-auto" flat>
          <v-card-title>ຮູບພື້ນຫຼັງ</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <div v-if="backgrounds.length > 0">
                  <v-img
                    :src="`${$config.API_DOMAIN}/image/${backgrounds[0].uri}`"
                    contain
                  >
                  </v-img>
                  <div class="text-subtitle-1">
                    {{ backgrounds[0].title }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="backgroundForm.title"
                  label="ຫົວຂໍ້"
                ></v-text-field>
                <v-file-input
                  v-model="backgroundForm.image"
                  dense
                  hide-details="auto"
                  placeholder="ຮູບພື້ນຫລັງ"
                ></v-file-input>
                <v-btn color="primary" small class="mt-5" @click="addBackground"
                  >ບັນທຶກ</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      sliderForm: {},
      productForm: {},
      backgroundForm: {},
    };
  },
  computed: {
    products() {
      return this.$store.state.products.products;
    },
    backgrounds() {
      return this.$store.state.services.backgrounds;
    },
    recommendProducts() {
      return this.$store.state.services.products;
    },
    sliders() {
      return this.$store.state.services.sliders;
    },
  },
  mounted() {
    this.$store.dispatch("products/products");
    this.$store.dispatch("services/backgrounds");
    this.$store.dispatch("services/products");
    this.$store.dispatch("services/sliders");
  },
  methods: {
    saveSlider() {
      this.$store.dispatch("services/createSliders", this.sliderForm);
    },
    updateProduct() {
      console.log(this.productForm);
    },
    addBackground() {
      this.$store.dispatch("services/createBackground", this.backgroundForm);
    },
    checkProductExist(id) {
      const filter = this.recommendProducts.filter((el) => el.id == id);
      if (filter.length > 0) return true;
      return false;
    },
    openProduct(id) {
      this.$store.dispatch("services/createProducts", { id });
    },
    closeProduct(id) {
      this.$store.dispatch("services/deleteProducts", id);
    },
    deleteSlider(id) {
      this.$store.dispatch("services/deleteSliders", id);
    },
  },
};
</script>

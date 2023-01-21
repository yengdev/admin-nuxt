<template>
  <div>
    <v-card flat max-width="400" class="mx-auto">
      <v-card-title>ສ້າງກິດຈະກຳ ຫຼື ຂ່າວສານຕ່າງໆ</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="form.title"
            outlined
            label="ຫົວຂໍ້ຂ່າວສານ"
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            label="ລາຍລະອຽດ"
            outlined
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-textarea>
          <v-text-field
            v-model="form.website_link"
            label="ລິ້ງເວັບໄຊ"
            outlined
            dense
            required
            :rules="[
              (v) => !!v || 'ຈຳເປັນ',
              (v) => this.isURL(v) || 'URL ບໍ່ຖືກຕ້ອງ',
            ]"
          ></v-text-field>
          <v-file-input
            v-model="form.editImage"
            label="ເລືອກຮູບພາບ"
            dense
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
          ></v-file-input>
          <v-img v-if="form.editImage" :src="url" class="my-3"> </v-img>
          <v-img
            v-else-if="form.image"
            :src="`${$config.API_DOMAIN}/image/${form.image}`"
            max-width="100"
            contain
            class="my-3"
          >
          </v-img>
          <v-btn color="primary" block @click="create"> ບັນທຶກ </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      valid: true,
    };
  },
  computed: {
    url() {
      if (!this.form.editImage) return;
      return URL.createObjectURL(this.form.editImage);
    },
    news() {
      return this.$store.state.news.news;
    },
  },
  mounted() {
    const filter = this.news.find((el) => el.id == this.$route.params.id);
    console.log(this.news);
    this.form = { ...filter };
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("news/updateNews", this.form);
      }
    },
    isURL(str) {
      let url;

      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
  },
};
</script>

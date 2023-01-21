<template>
  <div>
    <div class="d-flex">
      <h1>ຂ່າວສານ</h1>
      <v-spacer></v-spacer>
      <v-btn icon small color="primary" to="/news/create">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-card :loading="loading" elevation="0">
      <v-data-table :headers="headers" :items="products">
        <template #[`item.image`]="{ item }">
          <v-img
            :src="`${$config.API_DOMAIN}/image/${item.image}`"
            max-width="100"
            contain
          >
          </v-img>
        </template>
        <template #[`item.website_link`]="{ item }">
          <v-btn x-small color="primary">
            <v-icon small>mdi-content-copy</v-icon>
            {{ item.website_link.substring(0, 5) }}
          </v-btn>
        </template>
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format("YYYY-MM-DD hh:mm:ss") }}
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn icon small :to="`/news/edit/${item.id}`">
            <v-icon small color="primary"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn icon small @click="remove(item.id)">
            <v-icon small color="error"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "News",
  middleware: "auth",
  data() {
    return {
      headers: [
        { text: "ຫົວຂໍ້", value: "title" },
        { text: "ລາຍລະອຽດ", value: "description" },
        { text: "ຮູບພາບ", value: "image" },
        { text: "ລີ້ງເວັບໄຊ", value: "website_link" },
        { text: "ສ້າງຂື້ນ", value: "created_at" },
        { text: "ຈັດການ", value: "actions" },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.state.news.loading;
    },
    products() {
      return this.$store.state.news.news;
    },
  },
  mounted() {
    this.$store.dispatch("news/news");
  },
  methods: {
    remove(id) {
      if (confirm("ກົດຢືນຢັນເພື່ອລົບ")) {
        this.$store.dispatch("news/deleteNews", id);
      }
    },
  },
};
</script>

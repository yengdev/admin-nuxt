<template>
  <div>
    <h1>ປະເພດສິນຄ້າ</h1>
    <v-card :loading="loading" elevation="0">
      <v-card-title>
        <v-btn color="primary" small :to="`/categories/create`">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        v-if="categories.length > 0"
        :items="categories"
        :headers="headers"
        item-key="id"
      >
        <template #[`item.url`]="{ item }">
          <v-img :src="item.url" max-width="100"> </v-img>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon small :to="`/categories/edit/${item.id}`">
            <v-icon small color="primary"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn icon small @click="removeItem(item.id)">
            <v-icon small color="error"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Categories",
  middleware: "auth",
  data() {
    return {
      headers: [
        { text: "ປະເພດສິນຄ້າພາສາອັງກິດ", value: "name_en" },
        { text: "ປະເພດສິນຄ້າພາສາລາວ", value: "name_lao" },
        { text: "ຈັດການ", value: "actions" },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    categories() {
      return this.$store.state.categories.categories;
    },
  },
  mounted() {
    this.$store.dispatch("categories/categories");
  },
  methods: {
    removeItem(id) {
      this.$store.dispatch("categories/delete", id);
    },
  },
};
</script>

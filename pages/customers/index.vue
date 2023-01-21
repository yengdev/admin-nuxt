<template>
  <div>
    <h1>ລູກຄ້າ</h1>
    <v-card :loading="loading" elevation="0">
      <v-data-table :headers="headers" :items="users">
        <template #[`item.url`]="{ item }">
          <v-img
            :src="`${$config.API_DOMAIN}/image/${item.url}`"
            max-width="100"
          >
          </v-img>
        </template>
        <template #[`item.is_login_by_google`]="{ item }">
          <v-chip
            small
            :color="
              getUserLoginBy(item.is_login_by_google) ? 'primary' : 'success'
            "
            >{{
              getUserLoginBy(item.is_login_by_google) ? "ແມ່ນ" : "ບໍ່ແມ່ນ"
            }}</v-chip
          >
        </template>

        <template #[`item.created_at`]="{ item }">
          <span>{{
            $moment(item.created_at).format("YYYY-MM-DD hh:mm:ss")
          }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon small>
            <v-icon small color="error" @click="deleteItem(item.user_id)">
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Customers",
  middleware: "auth",
  data() {
    return {
      headers: [
        { text: "ອີເມວ", value: "email" },
        { text: "ໃຊ້ Account ໃນການເຂົ້າສູ່ລະບົບ", value: "is_login_by_google" },
        { text: "ເປັນສະມາຊິກ", value: "created_at" },
        { text: "ຈັດການ", value: "actions" },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
    users() {
      return this.$store.state.users.users;
    },
  },
  mounted() {
    this.$store.dispatch("users/users");
  },
  methods: {
    getUserLoginBy(status) {
      if (status === 1) {
        return true;
      }
      return false;
    },
    deleteItem(id) {
      if (confirm("ທ່ານແນ່ໃຈທີ່ຈະລົບລູກຄ້າທ່ານນີ້ອອກແລ້ວບໍ?")) {
        this.$store.dispatch('users/deleteUser', id)
      }
    },
  },
};
</script>
ƒ

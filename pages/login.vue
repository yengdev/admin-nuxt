<template>
  <div id="backgrond-image">
    <v-card class="mx-auto my-5" max-width="400" elevation="10">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="https://architectus.com.au/wp-content/uploads/2019/09/ba_pub_NMAG_Refurb_33_300ppi-800x533.jpg"
      ></v-img>

      <v-card-title>ກະລຸນາເຂົ້າສູ່ລະບົບ</v-card-title>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ຊື່ຜູ້ໃຊ້"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-account-key </v-icon>
            </template>
          </v-text-field>
          <v-text-field
            v-model="password"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ລະຫັດຜ່ານ"
            type="password"
          >
            <template #prepend-inner>
              <v-icon color="primary" right>mdi-key-plus </v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card v-if="false" class="ma-3" outlined>
          <v-card-text class="pa-0">
            <v-card-title>For Testing</v-card-title>
            <v-card-text>
              <strong>Username: kayengxiong</strong>
              <br />
              <strong>Password: password</strong>
            </v-card-text>
          </v-card-text>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login" :loading="loading">
            ເຂົ້າສູ່ລະບົບ
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "empty",
  middleware: "noAuth",
  data() {
    return {
      valid: true,
      username: null,
      password: null,
    };
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
  },
  methods: {
    login() {
      this.$refs.form.validate();

      this.$store.dispatch("users/login", {
        username: this.username,
        password: this.password,
      });
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
#backgrond-image {
  background: url("https://wallpaperaccess.com/full/6984584.jpg") no-repeat
    center center fixed !important;
  background-size: cover;
  height: 100vh;
}
</style>

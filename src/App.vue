<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app v-if='logueado'
    >
    <!-- <template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="logueado"
    > -->
    <v-list>
          <!-- <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="./assets/logo-usach_0.png"></v-img>
            </v-list-item-avatar>
          </v-list-item> -->
          
          <v-img src="./assets/logo-usach_0.png" height="100" width="100" ></v-img>


          <v-list-item link >
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ email }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ rol }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
        <v-list-group  v-if="esAdmin || esSuperadmin">
          <v-list-item slot="activator">
          <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-view-list</v-icon>
            Mantenedor
          </v-list-item-title> 
        </v-list-item-content>   
          </v-list-item>
          <v-list-item :to="{name: 'CppView'}">
            <v-list-item-icon>
              <v-icon>mdi-file-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Carreras Programas Planes</v-list-item-title>
          </v-list-item>
        </v-list-group>
          <v-list-item :to="{name: 'Users'}" v-if="esSuperadmin">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Administración de usuarios</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item>
        </v-list>    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if='logueado'></v-app-bar-nav-icon>

      <v-toolbar-title v-if='logueado'>Menú</v-toolbar-title>
      <v-spacer></v-spacer>




      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="currentItem"
          fixed-tabs
          slider-color="blue"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            :to="{name: item}"
          >
            {{ item }}
          </v-tab>


        </v-tabs>
      </template>


<v-btn icon @click="salir" v-if='logueado'>
  <v-icon>mdi-logout</v-icon>
</v-btn>
    </v-app-bar>


    <v-main>
    <v-main>
      <router-view/>
    </v-main>    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      currentItem: 'tab-Web',
      items: [
        'CppView', 'Users', 'Login',
      ],
    }),
    // data: () => ({ drawer: null }),
  computed:{
    logueado(){
      return this.$store.state.email;
    },
    esSuperadmin(){
      return this.$store.state.email && this.$store.state.rol == 'Superadmin';
    },
    esAdmin(){
      return this.$store.state.email && this.$store.state.rol == 'Admin';
    },
    esUsuario(){
      return this.$store.state.email && this.$store.state.rol == 'Usuario';
    },
    email() {
      return this.$store.state.email;
    },
    rol() {
      return this.$store.state.rol;
    }
  },
  created(){
   // this.$store.dispatch("autoLogin");
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    }
  }
  }
</script>

<template>
  <v-layout align-start>
      <v-flex>
          <v-toolbar flat color="white">
              <v-toolbar-title>Carreras Programas y PLanes</v-toolbar-title>
              <v-divider
              class="mx-2"
              inset
              vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-text-field class="text-xs-center" v-model="search" append-icon="mdi-search-web" 
              label="Buscar plan" single-line hide-details></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">Agregar PLan</v-btn>
                  </template>
                  <v-card>
                      <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                      </v-card-title>            
                      <v-card-text>
                      <v-container grid-list-md>
                          <v-layout wrap>
                              <v-flex xs12 sm6 md6>
                                  <v-text-field v-model="ANOMAT" label="Año">
                                  </v-text-field>
                              </v-flex>                   
                              <v-flex xs12 sm6 md6>
                                  <v-text-field v-model="COD_PLAN" label="Código de Plan">
                                  </v-text-field>
                              </v-flex>                 
                              <v-flex xs12 sm12 md12>
                                  <v-text-field v-model="PLAN" label="Nombre de Plan">                                        
                                  </v-text-field>
                              </v-flex>                                                                     

                              <v-flex xs12 sm12 md12>
                                  <v-text-field v-model="observaciones" label="Observaciones">                                        
                                  </v-text-field>
                              </v-flex>            
                                                                                                                                                                                  
                                                 
                              <v-flex xs12 sm12 md12 v-show="valida">
                                  <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                                  </div>
                              </v-flex>
                          </v-layout>
                      </v-container>
                      </v-card-text>            
                      <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                      <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
                      </v-card-actions>
                  </v-card>
              </v-dialog>
          </v-toolbar>
          <v-data-table
              :headers="headers"
              :items="planes"
              :search="search"
              class="elevation-1"
          >

<template v-slot:[`item.acciones`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
        mdi-pencil
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="deleteItem(item)"
        >
        mdi-delete
        </v-icon>        

      </template>
              <template v-slot:items="props">
            <td>{{ props.item.ANOMAT }}</td>
              <td>{{ props.item.COD_PLAN }}</td>
              <td>{{ props.item.PLAN }}</td>
              <td>{{ props.item.ESTA_ANHO_ANTERIOR }}</td>        
              </template>
              <template v-slot:no-data>
              <v-btn color="primary" @click="listar_views()">Resetear</v-btn>
              </template>
          </v-data-table>
      </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  export default {
      data(){
          return{
              dialog: false,
              search:'',
              planes:[],
              headers: [
                  { text: 'Acciones', value: 'acciones', sortable: false },
                //   { text: 'Id Plan Año', value: 'id_plan_anho', sortable: true },
                  { text: 'Año', value: 'ANOMAT', sortable: true },
                  { text: 'Código Plan', value: 'COD_PLAN', sortable: false  },
                  { text: 'Nombre de Plan', value: 'PLAN', sortable: false  },
                  { text: 'Está año anterior', value: 'ESTA_ANHO_ANTERIOR', sortable: false  }  
              ],
              editedIndex: -1,
              id:'',
              id_plan_anho:'',
            //   tipo_persona:'Proveedor',
            //   tipo_documento:'',
              lista_jornada_sies: ['0','1','2','3','4','5'],
              lista_jornada_usach: ['0','1','2'],
              lista_estado_jornada: ['OK','NOK'],
            //   num_documento: '',
            //   direccion: '',
            //   telefono: '',
            //   email: '',
              valida:0,
              validaMensaje:[],
            //    adModal:0,
            //   adAccion:0,
            //   adNombre:'',
            //   adId:''
          }
      },
      computed: {
          formTitle () {
          return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
          }
      },
      watch: {
          dialog (val) {
          val || this.close()
          }
      },
      created () {
          this.listar_views()
      },
      methods: {

          listar_views(){
              let me=this;
              let header={"Token" : this.$store.state.token};
              let configuracion= {headers : header};
              axios.get('http://localhost:4000/cpp/list_view',configuracion).then(function (response){
                  me.planes=response.data;
              }).catch(function(error){
                  console.log(error);
              });

          },
          
          limpiar(){
              this.id='';
              this.ANOMAT='';
              this.COD_PLAN='';
              this.PLAN='';
              this.ESTA_ANHO_ANTERIOR='';          
              this.valida=0;
              this.validaMensaje=[];
              this.editedIndex=-1;
          },
         validar(){
              this.valida=0;
              this.validaMensaje=[];
            //   if(this.anho.length<1 || this.nombre.length>50){
            //       this.validaMensaje.push('El nombre de la persona debe tener entre 1-50 caracteres.');
            //   }
              if(!Number.isInteger(Number(this.anho))){
                  this.validaMensaje.push('Debe ingresar un año válido');
              }
              if(!Number.isInteger(Number(this.anho_search))){
                  this.validaMensaje.push('Debe ingresar un año de búsqueda válido');
              }
              if(!this.plan_nombre || this.plan_nombre.length<5){
                  this.validaMensaje.push('Ingrese un Nombre Plan válido.');
              }
              if(!this.programa_sies || this.programa_sies.length<5){
                  this.validaMensaje.push('Ingrese un Nombre Programa SIES válido.');
              }
              if(!this.nombre_carrera || this.nombre_carrera.length<5){
                  this.validaMensaje.push('Ingrese un Nombre de Carrera válido.');
              }          
              if(!this.cod_carrera){
                  this.validaMensaje.push('Ingrese un Código de Carrera válido.');
              }       
              if(!Number.isInteger(Number(this.jornada_sies))){
                  this.validaMensaje.push('Favor seleccione Jornada SIES');
              }           
              if(!Number.isInteger(Number(this.jornada_usach))){
                  this.validaMensaje.push('Favor seleccione Jornada USACH');
              }       
              if(!Number.isInteger(Number(this.cod_plan))){
                  this.validaMensaje.push('Debe ingresar un Código de Plan válido');
              }   
              if(!this.cod_sies || this.cod_sies.length<7){
                  this.validaMensaje.push('Ingrese un Código SIES válido.');
              }                                                                          
              if (this.validaMensaje.length){
                  this.valida=1;
              }
              return this.valida;
          },
          guardar(){
              let me=this;
            //   let header={"Token" : this.$store.state.token};
             //  let configuracion= {headers : header};
              if (this.validar()){
                  return;
              }
              if (this.editedIndex >-1){
                  //Código para editar
                  axios.put(`http://localhost:4000/cpp/update/${this.id}`,{
                      'id':this.id,
                      'id_plan_anho':this.anho+this.cod_plan,
                      'anho':this.anho,
                      'anho_search':this.anho_search,
                      'plan_nombre':this.plan_nombre,
                      'jornada_usach':this.jornada_usach,
                      'jornada_sies':this.jornada_sies,
                      'estado_jornada': this.estado_jornada,
                      'cod_plan':this.cod_plan,
                      'cod_sies':this.cod_sies,
                      'id_anho_sies':this.anho+this.cod_sies,
                      'programa_sies':this.programa_sies,
                      'observaciones':this.observaciones,
                      'cod_carrera': this.cod_carrera,
                      'nombre_carrera':this.nombre_carrera
             //     },configuracion)
                  })
                  .then(function(response){
                      me.limpiar();
                      me.close();
                      me.listar_views();
                  })
                  .catch(function(error){
                      console.log(error);
                  });
              }else{
                  //Código para guardar
                  axios.post('http://localhost:4000/cpp/add',{
                      'id_plan_anho':this.anho+this.cod_plan,                    
               //       'id_plan_anho':this.id_plan_anho,
                      'anho':this.anho,
                      'anho_search':this.anho_search,
                      'plan_nombre':this.plan_nombre,
                      'jornada_usach':this.jornada_usach,
                      'jornada_sies':this.jornada_sies,
                      'estado_jornada': this.estado_jornada,
                      'cod_plan':this.cod_plan,
                      'cod_sies':this.cod_sies,
                    //   'id_anho_sies':this.plan_nombre,
                      'id_anho_sies':this.anho+this.cod_sies,
                      'programa_sies':this.programa_sies,
                      'observaciones':this.observaciones,
                      'cod_carrera': this.cod_carrera,
                      'nombre_carrera':this.nombre_carrera
                  })
                  .then(function(response){
                      me.limpiar();
                      me.close();
                      me.listar_views();
                  })
                  .catch(function(error){
                      console.log(error);
                  });
              }
          },
          editItem (item) {
              this.id=item.id;
              this.id_plan_anho=item.id_plan_anho;
              this.anho=item.anho;
              this.anho_search=item.anho_search;
              this.plan_nombre=item.plan_nombre;
              this.jornada_usach=item.jornada_usach;
              this.jornada_sies=item.jornada_sies;
              this.estado_jornada=item.estado_jornada;
              this.cod_plan=item.cod_plan;
              this.cod_sies=item.cod_sies;
              this.id_anho_sies=item.id_anho_sies;
              this.programa_sies=item.programa_sies;
              this.observaciones=item.observaciones;       
              this.cod_carrera=item.cod_carrera;
              this.nombre_carrera=item.nombre_carrera;                         
              this.dialog = true;
              this.editedIndex=1;
          },


        async deleteItem(item) {
            if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        try {
          // Hacer la petición DELETE a la API con Axios
          const respuesta = await axios.delete(`http://localhost:4000/cpp/delete/${item.id}`);
          
       //   Verificar si la petición fue exitosa y mostrar un mensaje al usuario
          if (respuesta.status != 200) {
            throw new Error('Error al eliminar el elemento');
          }
        } catch (error) {
          console.error(error);
          alert('Ocurrió un error al eliminar el elemento');
        }
        this.planes.splice(this.editedIndex, 1)

    }

      },

          close () {
              this.dialog = false;
          }
      }
  }
</script>

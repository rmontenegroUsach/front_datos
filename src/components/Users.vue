<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Usuarios</v-toolbar-title>
                <v-divider
                class="mx-2"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="mdi-search-web" 
                label="Buscar usuario" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Agregar Usuario</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                        </v-card-title>            
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="email" label="Email">
                                    </v-text-field>
                                </v-flex>                   
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="nombres" label="Nombres">
                                    </v-text-field>
                                </v-flex>                 
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="apPat" label="Apellido Paterno">                                        
                                    </v-text-field>
                                </v-flex>          
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="apMat" label="Apellido Materno">                                        
                                    </v-text-field>
                                </v-flex>         
                                <v-flex xs12 sm6 md6>
                                    <v-text-field type="password" v-model="password" label="Password"></v-text-field>
                                </v-flex>    
                                <v-flex xs12 sm6 md6>
                                    <v-text-field type="password" v-model="confirmPassword" label="Confirma Password"></v-text-field>
                                </v-flex>                                                                                                                                                               
                                <v-flex xs12 sm6 md6>
                                  <v-select v-model="rol"
                                  :items="lista_roles" label="Rol">
                                  </v-select>
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
                <!-- <v-dialog v-model="adModal" max-width="290">
                    <v-card>
                        <v-card-title class="headline" v-if="adAccion==1">
                            Activar Item
                        </v-card-title>
                        <v-card-title class="headline" v-if="adAccion==2">
                            Desactivar Item
                        </v-card-title>
                        <v-card-text>
                            Estás a punto de <span v-if="adAccion==1">activar </span>
                            <span v-if="adAccion==2">desactivar </span> el item {{adNombre}}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="activarDesactivarCerrar()" color="green darken-1" flat="flat">
                                Cancelar
                            </v-btn>
                            <v-btn v-if="adAccion==1" @click="activar()" color="orange darken-4" flat="flat">
                                Activar
                            </v-btn>
                            <v-btn v-if="adAccion==2" @click="desactivar()" color="orange darken-4" flat="flat">
                                Desactivar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog> -->
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="usuarios"
                :search="search"
                class="elevation-1"
            >
  
  
        <!-- <template v-slot:[`item.estado`]="{ item }">
          <v-chip
            :color="getColor(item.estado)"
            dark
          >
            <div v-if="item.estado"><span> Activo</span></div>
            <div v-else><span> Inactivo</span></div>
          </v-chip>
        </template> -->
  
  
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
         
          <!-- <template v-if="item.estado">
                        <v-icon
                        small
                        @click="activarDesactivarMostrar(2,item)"
                        >
                        block
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon
                        small
                        @click="activarDesactivarMostrar(1,item)"
                        >
                        check
                        </v-icon>
                    </template>  -->
  
        </template>
                <template v-slot:items="props">
              <td>{{ props.item.email }}</td>
                <td>{{ props.item.nombres }}</td>
                <td>{{ props.item.apPat }}</td>
                <td>{{ props.item.apMat }}</td>
                <td>{{ props.item.rol }}</td>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="listar()">Resetear</v-btn>
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
                usuarios:[],
                headers: [
                    { text: 'Acciones', value: 'acciones', sortable: false },
                    { text: 'Email', value: 'email', sortable: true },
                    { text: 'Nombres', value: 'nombres', sortable: true },
                    { text: 'Apellido Paterno', value: 'apPat', sortable: false  },
                    { text: 'Apellido Materno', value: 'apMat', sortable: false  },
                    { text: 'Rol', value: 'rol', sortable: false  }   
                ],
                editedIndex: -1,
                id:'',
                email:'',
              //   tipo_persona:'Proveedor',
                lista_roles: ['Superadmin','Admin','Usuario'],
                nombres: '',
                apPat: '',
                apMat: '',
                rol: '',
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
            return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
            }
        },
        watch: {
            dialog (val) {
            val || this.close()
            }
        },
        created () {
            this.listar()
        },
        methods: {
  //             getColor (estado) {
  //     if (estado) {
  //       return 'green'
  //     } else {
  //       return 'red'
  //     }
  //   },
            listar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('http://localhost:4000/users/list',configuracion).then(function (response){
                    me.usuarios=response.data;
                }).catch(function(error){
                    console.log(error);
                });
  
            },
            
            limpiar(){
                this.id='';
                this.email='';
                this.nombres='';
                this.apPat='';
                this.apMat='';
                this.rol='';              
                this.password='';           
                this.confirmPassword='';              
                this.valida=0;
                this.validaMensaje=[];
                this.editedIndex=-1;
            },
           validar(){
                this.valida=0;
                this.validaMensaje=[];
                if(!this.nombres){
                    this.validaMensaje.push('Ingrese un Nombre válido.');
                }
                if(!this.apPat){
                    this.validaMensaje.push('Ingrese un Apellido paterno válido.');
                }
                if(!this.apMat){
                    this.validaMensaje.push('Ingrese un Apellido materno válido.');
                }          
                if(!this.rol){
                    this.validaMensaje.push('Seleccione un rol para el usuario.');
                }          
                // if(!this.password){
                //     this.validaMensaje.push('Ingrese contraseña.');
                // }         
                // if(!this.confirmPassword){
                //     this.validaMensaje.push('Confirme contraseña.');
                // }     
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            guardar(){
                let me=this;
              //   let header={"Token" : this.$store.state.token};
               //  let configuracion= {headers : header};
                // if (this.validar()){
                //     return;
                // }
                if (this.editedIndex >-1){
                    //Código para editar
                    axios.put(`http://localhost:4000/users/update/${this.id}`,{
                        'id':this.id,
                        'email':this.email,
                        'nombres':this.nombres,
                        'apPat':this.apPat,
                        'apMat':this.apMat,
                        'rol':this.rol,
                        'password':this.password,
                        'confirmPassword':this.confirmPassword,
               //     },configuracion)
                    })
                    .then(function(response){
                        me.limpiar();
                        me.close();
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }else{
                    //Código para guardar
                    axios.post('http://localhost:4000/users/add',{
                        'email':this.email,                    
                        'nombres':this.nombres,
                        'apPat':this.apPat,
                        'apMat':this.apMat,
                        'rol':this.rol,
                        'password':this.password,
                        'confirmPassword':this.confirmPassword
                    })
                    .then(function(response){
                        me.limpiar();
                        me.close();
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }
            },
            editItem (item) {
                this.id=item.id;
                this.email=item.email;              
                this.nombres=item.nombres;
                this.apPat=item.apPat;
                this.apMat=item.apMat;
                this.rol=item.rol;
                this.password=item.password;  
                this.confirmPassword=item.confirmPassword;       
                this.dialog = true;
                this.editedIndex=1;
            },
          //   activarDesactivarMostrar(accion,item){
          //       this.adModal=1;
          //       this.adNombre=item.nombre;
          //       this.adId=item._id;
          //       if (accion==1){
          //           this.adAccion=1;
          //       } else if(accion==2){
          //           this.adAccion=2;
          //       } else{
          //           this.adModal=0;
          //       }
          //   },
          //   activarDesactivarCerrar(){
          //       this.adModal=0;
          //   },
  
  
  
          async deleteItem(item) {
              if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
          try {
            // Hacer la petición DELETE a la API con Axios
            const respuesta = await axios.delete(`http://localhost:4000/users/delete/${item.id}`);
            
         //   Verificar si la petición fue exitosa y mostrar un mensaje al usuario
            if (respuesta.status != 200) {
              throw new Error('Error al eliminar el elemento');
            }
          } catch (error) {
            console.error(error);
            alert('Ocurrió un error al eliminar el elemento');
          }
          this.usuarios.splice(this.editedIndex, 1)
  
      }
  
        },
  
  
  
      //       async deleteItem(item) {
      //         if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      //     try {
      //       // Hacer la petición DELETE a la API con Axios
      //       const respuesta = await axios.delete(`http://localhost:4000/cpp/delete/${item.id}`);
            
      //    //   Verificar si la petición fue exitosa y mostrar un mensaje al usuario
      //       if (respuesta.status === 200) {
      //         alert('Elemento eliminado exitosamente');
      //       } else {
      //         throw new Error('Error al eliminar el elemento');
      //       }
      //     } catch (error) {
      //       console.error(error);
      //       alert('Ocurrió un error al eliminar el elemento');
      //     }
      //     this.planes.splice(this.editedIndex, 1)
  
      // }
  
      //   },
  
          //   activar(){
          //       let me=this;
          //       let header={"Token" : this.$store.state.token};
          //       let configuracion= {headers : header};
          //       axios.put('persona/activate',{'_id':this.adId},configuracion)
          //           .then(function(response){
          //               me.adModal=0;
          //               me.adAccion=0;
          //               me.adNombre='';
          //               me.adId='';
          //               me.listar();
          //           })
          //           .catch(function(error){
          //               console.log(error);
          //           });
          //   },
          //   desactivar(){
          //       let me=this;
          //       let header={"Token" : this.$store.state.token};
          //       let configuracion= {headers : header};
          //       axios.put('persona/deactivate',{'_id':this.adId},configuracion)
          //           .then(function(response){
          //               me.adModal=0;
          //               me.adAccion=0;
          //               me.adNombre='';
          //               me.adId='';
          //               me.listar();
          //           })
          //           .catch(function(error){
          //               console.log(error);
          //           });
          //   },
            close () {
                this.dialog = false;
            }
        }
    }
  </script>
  
<template>
  <div>
    
    <v-btn @click="createPipelineDialog=true" color="primary">Create Pipiline</v-btn>
    <div v-if="createPipelineDialog">
      <v-card>
        <v-card-title class="headline">Create Pipeline</v-card-title>

        <v-card-text>
          <v-text-field v-model="pipelineName" label="Pipeline Name" required></v-text-field>
          <v-data-table :headers="headers" :items="tableHeader">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-dialog v-model="editDialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
                  </template>
                  <v-card>
                    <v-card-text>
                        
                            <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                          
                            <v-textarea
          v-model="editedItem.code"
          :value="editedItem.code"
          label="Enter code here"
        ></v-textarea>
        <v-container>
        <div
     v-for="output in editedItem.output"
     :key="output.id"
     class="text-fields-row"
    >
    <v-row>
                          <v-col cols="12" sm="6" md="4">
      <v-text-field
       label="Output"
       v-model="output.output"
      ></v-text-field>
</v-col>
                          <v-col cols="12" sm="6" md="4">
      <v-text-field
       label="Next"
       v-model="output.next"
      ></v-text-field>
      </v-col>
                        </v-row>
      
        </div>
        </v-container>
        <v-btn color="primary" @click="addOutput()">Add Output</v-btn>
                      
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            
            <template v-slot:item.output="{ item }">
              <div
     v-for="output in item.output"
     :key="output.output.id"
     class="text-fields-row"
    >
    {{output.output}}:{{output.next}}
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="createPipelineDialog = false">Cancle</v-btn>
            <v-btn color="primary" @click="createPipeline()">Create</v-btn>
            
          
        </v-card-actions>
      </v-card>
    <!-- </v-dialog> -->
    </div>

  </div>
</template>

<script>
// import request from "request";
export default {
  name: "FlowChart",

  data() {
    return {
      start:[],
        previewQueryDialogBox:false,
        createTableQuery:"",
      pipelineName: "",
      createPipelineDialog: false,
      tableHeader:[],
      editDialog:false,
      editedItem: {
        id: "",
        code: "",
        output:[],
        start:false,
      },
      editedIndex:-1,
      headers: [
        { text: "Id", value: "id" },
        {
          text: "Code",
          value: "code"
        },
        {
          text: "Output",
          value: "output"
        },
        { text: "Actions", value: "actions" }
      ]
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.tableHeader.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.tableHeader.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tableHeader.splice(index, 1);
    },
    close() {
      this.editDialog = false;
      this.editedItem={
        id: "",
        code: "",
        output:[],
      };
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableHeader[this.editedIndex], this.editedItem);
      } else {
        this.tableHeader.push(this.editedItem);
      }
      // console.log(this.tableHeader);
      this.editedItem={
        id: "",
        code: "",
        output:[],
      };
      this.close();
    },
    addOutput()
    {
      // console.log(this.editedItem)
      this.editedItem.output.push({
          output: "",
          next: ""})
    },
    createPipeline(){
      console.log(this.tableHeader)
    }
    
  },
  computed: {
      
  }
};
</script>
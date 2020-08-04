<template>
  <div>
    <v-btn @click="createPipelineDialog=true" color="primary">Create Pipiline</v-btn>
    <div v-if="createPipelineDialog">
      <v-card>
        <v-card-title class="headline">Create Pipeline</v-card-title>

        <v-card-text>
          <v-text-field v-model="pipelineName" label="Pipeline Name" required></v-text-field>
          <v-data-table :headers="headers" :items="pipeline">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field v-model="startId" label="Start Id" required></v-text-field>
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
                              <v-text-field label="Output" v-model="output.output"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Next" v-model="output.next"></v-text-field>
                            </v-col>
                            <v-btn @click="remove(output)" class="error small">delete</v-btn>
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
              >{{output.output}}:{{output.next}}</div>
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
import request from "request";
export default {
  name: "FlowChart",

  data() {
    return {
      startId: "",
      currentProcessId: "",
      previewQueryDialogBox: false,
      pipelineName: "",
      createPipelineDialog: false,
      pipeline: [],
      editDialog: false,
      editedItem: {
        id: "",
        code: "",
        output: [],
      },
      editedIndex: -1,
      headers: [
        { text: "Id", value: "id" },
        {
          text: "Code",
          value: "code",
        },
        {
          text: "Output",
          value: "output",
        },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.pipeline.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.pipeline.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.pipeline.splice(index, 1);
    },
    close() {
      this.editDialog = false;
      this.editedItem = {
        id: "",
        code: "",
        output: [],
      };
      this.editedIndex = -1;
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pipeline[this.editedIndex], this.editedItem);
      } else {
        this.pipeline.push(this.editedItem);
      }
      this.editedIndex = -1;
      console.log(this.pipeline);
      this.editedItem = {
        id: "",
        code: "",
        output: [],
      };
      this.close();
    },
    addOutput() {
      // console.log(this.editedItem)
      this.editedItem.output.push({
        output: "",
        next: "",
      });
    },
    remove (output) {
      console.log(output)
      console.log(this.editedItem.output)
      for(let i=0;i<this.editedItem.output.length;i++)
      {
        if(this.editedItem.output[i]===output)
        {
          console.log(i);
          this.editedItem.output.splice(i, 1);
          break;
        }
      }
        //  this.editedItem.output.splice(this.editedItem.output.findIndex(output), 1)
     },
    currentProcess(process) {
      console.log(process);
      return new Promise((resolve, reject) => {
        let currentProcessId = "";
        request.post(
          {
            url: "http://127.0.0.1:8082/pipeline",
            form: encodeURIComponent(JSON.stringify(process.code)),
          },
          function (error, response, body) {
            // console.log("query");
            if (!error && response.statusCode == 200) {
              for (let i = 0; i < process.output.length; i++) {
                body === process.output[i].output;
                if (body === process.output[i].output) {
                  console.log(body);
                  currentProcessId = process.output[i].next;
                }
              }
              // console.log(body);
            } else {
              console.log(error);
              console.log(response);
            }
            resolve(currentProcessId);
          }
        );
      });
    },
    pipelineEcexute(currentProcessId)
    {
      for (let i = 0; i < this.pipeline.length; i++) {
          if (this.pipeline[i].id === currentProcessId) {
            console.log(currentProcessId, this.pipeline[i]);
            this.currentProcess(this.pipeline[i]).then((id) => {
              currentProcessId = id;
              console.log(currentProcessId);
              if (currentProcessId)  this.pipelineEcexute(currentProcessId);
            });
            break;
          }
        }
    },
    createPipeline() {
      console.log(this.pipeline, this.pipelineName, this.startId);
      this.currentProcessId = this.startId;
      this.pipelineEcexute(this.currentProcessId);
        // start:for (let i = 0; i < this.pipeline.length; i++) {
        //   if (this.pipeline[i].id === this.currentProcessId) {
        //     console.log(this.currentProcessId, this.pipeline[i]);
        //     this.currentProcess(this.pipeline[i]).then((id) => {
        //       this.currentProcessId = id;
        //       console.log(this.currentProcessId);
        //       if (this.currentProcessId)  continue start;
        //     });
        //     break;
        //   }
        // }
    },
  },
  computed: {},
};
</script>
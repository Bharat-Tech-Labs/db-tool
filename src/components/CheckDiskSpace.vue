<template>
  <div>
    <v-btn color="primary" @click="checkDiskSpaceDialog=true">Check Disk Space</v-btn>
    <v-dialog v-model="checkDiskSpaceDialog">
      <v-card>

        <v-card-text>
          <v-text-field v-model="sshHost" label="SSH Host" required></v-text-field>
          <v-text-field v-model="sshPort" label="SSH Port" required></v-text-field>
          <v-text-field v-model="sshUser" label="SSH User" required></v-text-field>
          <v-text-field
            v-model="sshPassword"
            :append-icon="sshPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="sshPasswordShow ? 'text' : 'password'"
            label="Password"
            @click:append="sshPasswordShow = !sshPasswordShow"
          ></v-text-field>
          <v-file-input label="SSH Key" v-model="sshKey"></v-file-input>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            @click="checkDiskSpaceDialog = false
            
            ,sshPasswordShow=false"
          >Cancle</v-btn>

          <v-btn color="primary" @click="checkDiskSpace()">check</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import request from "request";
export default {
  name: "CheckDiskSpace",


  data() {
    return {
      sshPasswordShow:false,
      sshHost:"internal.bharattechlabs.com",
      sshPort:"22",
      sshUser:"ubuntu",
      sshKey:[],
      sshPassword:'',
      checkDiskSpaceDialog:false
      
    };
  },
  // computed: {
  //   connectionDialogBox(){
  //     return this.connectionDialog;
  //   }
  // },
  methods: {
    async checkDiskSpace() {
      let sshKeyPath='';
      if(this.sshPassword==='')
{
  sshKeyPath=this.sshKey.path;
}
      await request.post(
        {
          url: "http://127.0.0.1:8082/checkDiskSpace",
          form: JSON.stringify({
            sshHost:this.sshHost,
            sshPort:this.sshPort,
            sshUser:this.sshUser,
            sshKey:sshKeyPath,
            sshPassword:this.sshPassword
          })
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
          } else {
            console.log(error);
            console.log(response);
          }
        }
      );
    }
  }
};
</script>

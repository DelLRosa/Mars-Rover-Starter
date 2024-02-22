class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(msg){
      let response = {
         message: msg.name,
         results: []
      }
      for (let i = 0; i<msg.commands.length; i++){
         if (msg.commands[i].commandType === "STATUS_CHECK"){
            let result = {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts:this.generatorWatts,
                  position: this.position
               }
            };
            response.results.push(result);
         } else if (msg.commands[i].commandType === "MODE_CHANGE"){
            this.mode=msg.commands[i].value;
            let result = {
               completed: true
            };
            response.results.push(result);
         } else if (msg.commands[i].commandType==="MOVE"){
            let result={}
            if(this.mode==="LOW_POWER"){
               result = { completed: false}
            } else {
               this.position=msg.commands[i].value;
               result = {
                  completed: true
               };
            }
            response.results.push(result);
         }
         
      }
      return response;
   }
   // Write code here!
}

module.exports = Rover;
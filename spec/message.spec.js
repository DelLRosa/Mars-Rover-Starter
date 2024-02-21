const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if a name is NOT passed into the contstructor as the first parameter", function(){
        expect( function() { new Message();}).toThrow(new Error('name required.'));
    });

    it("constructor sets name", function(){
        let testMsg = new Message("test");
        expect(testMsg.name).toEqual("test");
    });

    it("contains a commands array passed into the constructor as the 2nd argument", function(){
        let testCmd1 = new Command("MOVE",'123');
        let cmdArray=[testCmd1];
        let testMsg = new Message("Test", cmdArray);
        expect(testMsg.commands[0].commandType).toEqual("MOVE");
        expect(testMsg.commands[0].value).toEqual('123');
    });
});

const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it ("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(1234);
    expect(testRover.position).toEqual(1234);
    expect(testRover.mode).toEqual('NORMAL');
    expect(testRover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual('Test message with two commands')
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check test', commands);
    let rover = new Rover(1); 
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([
      {
        completed: true,
        roverStatus: {
          mode: 'NORMAL',
          generatorWatts: 110,
          position: 1
        }
      }
    ]);
    ;
  });

  it("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE','LOW_POWER')];
    let message = new Message('Mode change test', commands);
    let rover = new Rover(1); 
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode",function (){
    let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('MOVE',50)];
    let message = new Message('MOVE response test', commands);
    let rover = new Rover(1); 
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);
  });

  it("responds with the position for the move command", function(){
    let commands = [new Command('MOVE',50)];
    let message = new Message('MOVE response test', commands);
    let rover = new Rover(1); 
    let response = rover.receiveMessage(message);
    expect(rover.position).toBe(50);

  });
});

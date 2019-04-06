const stompit = require('stompit');

var i = 21.0;

stompit.connect({ 'client-id': 'Building_one', host: 'localhost', port: 61613 }, (err, client) => {
 
  client.subscribe({ 'activemq.subscriptionName': 'Building One Temp. Actuator', destination: '/topic/B1_Temp_Actuator' }, (err, msg) => {
 
    msg.readString('UTF-8', (err, body) => {
      console.log(body);
      if(body == 'UP'){
        i += 0.5
      } else if (body == 'DOWN'){
        i -= 0.5;
      }
    });
 
  });
 
});

setInterval(() => {
 
  stompit.connect({ host: 'localhost', port: 61613 }, (err, client) => {


    const frame = client.send({ destination: '/topic/B1_Temperature' });

    frame.write(""+i);

    frame.end();

    client.disconnect();

  });
  var rand = Math.random() * (1000);
  if(rand < 200){
    i += 1;
  } else if(rand > 900){
    i -= 1;
  }

}, 2000);
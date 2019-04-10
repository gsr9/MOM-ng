const stompit = require('stompit');

var i = 500;

stompit.connect({ 'client-id': 'Building_one', host: 'localhost', port: 61613 }, (err, client) => {

  client.subscribe({ 'activemq.subscriptionName': 'Building One Light Actuator', destination: '/topic/B1_Light_Actuator' }, (err, msg) => {

    msg.readString('UTF-8', (err, body) => {
      console.log(body);
      if(body == 'UP'){
        i += 50
      } else if (body == 'DOWN'){
        i -= 50;
      }
    });

  });

});

setInterval(() => {

  stompit.connect({ host: 'localhost', port: 61613 }, (err, client) => {


    const frame = client.send({ destination: '/topic/B1_Brightness' });

    frame.write(""+i);

    frame.end();

    client.disconnect();

  });
  var rand = Math.random() * (1000);
  if(rand < 200){
    i += 50;
  } else if(rand > 800){
    i -= 50;
  }

}, 2000);

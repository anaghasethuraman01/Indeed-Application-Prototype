var connection =  new require('./kafka/Connection');
const conn2 = require('./config/mongo_connection')
const conn1 = require('./config/mysql_connection')

// Connect to MySQL database
conn1.mysqlCon
// Connect to MongoDB
conn2()

//Define all the models

require('./models/JobSeeker')
require('./models/Company')
require('./models/Photo')
require('./models/Conversation')
require('./models/Message')

const jobseeker = require('./services/jobseeker');
const employer = require('./services/employer');
const company = require('./services/company');
const admin = require('./services/admin');
const user = require('./services/user');

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name)
  var producer = connection.getProducer()
  console.log('server is running ')
  consumer.on('message', function (message) {
    console.log('message received for ' + topic_name + ' ', fname)
    console.log(JSON.stringify(message.value))
    var data = JSON.parse(message.value)

    fname.handle_request(data.data, function (err, res) {
      console.log('after handle', res)
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ]
      console.log('sending response' + JSON.stringify(payloads))
      producer.send(payloads, function (err, data) {
        console.log(data)
      })
      return
    })
  })
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("jobseeker",jobseeker);
handleTopicRequest("employer",employer);
handleTopicRequest("admin",admin);
handleTopicRequest("company",company);
handleTopicRequest("user",user);

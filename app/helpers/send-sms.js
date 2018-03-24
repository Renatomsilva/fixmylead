const config = require('nconf');
const AWS = require('aws-sdk');

class SendSMS {

  constructor(mobile) {

    AWS.config.update({
      'region': "us-east-1",
      'accessKeyId': process.env.ACCESSKEY,
      'secretAccessKey': process.env.SECRET
    });

    this.sns = new AWS.SNS();
    this.params = {
      Message: `${mobile.message}`,
      MessageStructure: 'string',
      PhoneNumber: `+55${mobile.number}`
    };
  }

  send() {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.sns.publish(that.params, function (err, data) {
        if (err)
          throw err;
        else
          resolve(data.MessageId);
      })
    });
  }
}

module.exports = SendSMS;

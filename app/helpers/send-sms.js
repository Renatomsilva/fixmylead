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

    this.SNS_TOPIC_ARN = process.env.TOPIC;

    this.sns.setSMSAttributes(
      {
        attributes: {
          DefaultSMSType: 'Transactional',
        },
      },
      (error) => {
        if (error)
          console.log(error);
      },
    );

    this.params = {
      Message: `${mobile.message}`,
      MessageStructure: 'string',
      PhoneNumber: `+55${mobile.number}`
    };

  }

  send() {
    const that = this;
    return new Promise(((resolve, reject) => {
      that.sns.subscribe({
        Protocol: 'sms',
        // You don't just subscribe to "news", but the whole Amazon Resource Name (ARN)
        TopicArn: that.SNS_TOPIC_ARN,
        Endpoint: that.params.PhoneNumber,
      }, (error, dataSubscribe) => {
        if (error)
          reject('erro');

        const [SubscriptionArn] = [dataSubscribe.SubscriptionArn];

        const params = {
          TargetArn: that.SNS_TOPIC_ARN,
          Message: that.params.Message,
          // hardcode now
          Subject: 'PinCode',
        };

        that.sns.publish(params, (errPublish, dataPublish) => {
          if (errPublish)
            reject('erro');

          const paramsUnsubscribe = {
            SubscriptionArn,
          };

          that.sns.unsubscribe(paramsUnsubscribe, (err, dataUnsbscribe) => {
            if (err)
              reject('erro');

            if (errPublish == null)
              resolve(dataPublish.MessageId);
          });
        });
      });
    }));
  }
}

module.exports = SendSMS;

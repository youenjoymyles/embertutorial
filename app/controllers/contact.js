import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',
  message: '',

  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageEnoughLong: Ember.computed.gte('message.length', 5),

  isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),
  isDisabled: Ember.computed.not('isValid'),

  actions: {

    submitContact() {

      const email = this.get('emailAddress');
      const response = this.get('message');

      const newContact = this.store.createRecord('contact', { email:email, response:response });

      newContact.save().then((response) => {
        this.set('responseMessage', `Thank you! We will be contacting you shortly!`);
        this.set('emailAddress', '');
        this.set('message', '');
      });

      // alert(`Sending email address in progress`);
      // this.set('responseMessage', `Thank you! We will be contacting you shortly!`);
      // this.set('emailAddress', '');
      // this.set('message', '');
    }



    // submitContact() {
    //   alert(`Your message is sending`);
    //   this.set('submitContact', `We got your message and we'll get in touch soon!`);
    //   this.set('emailAddress', '');
    //   this.set('message', '');
    // }
  }

});

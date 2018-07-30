'use strict';

module.exports = function(Chatmember) {
  Chatmember.addMember = async (chatId, personId) => {
    var member = await Chatmember.findOne({
      where: {
        and: [{chatId: chatId}, {personId: personId}],
      },
    });

    if (!member) {
      console.log('new member');
      var newMember = await Chatmember.create({
        chatId: chatId,
        personId: personId,
      });
    } else {
      newMember = {err: 'Пользоватеьл уже на канале'};
    }
    return newMember;
  };

  Chatmember.remoteMethod('addMember', {
    accepts: [
      {arg: 'chatId', type: 'number'},
      {arg: 'personId', type: 'number'},
    ],
    returns: {arg: 'messages', type: 'array'},
    http: {path: '/add-member', verb: 'post'},
  });
};

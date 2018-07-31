'use strict';
var loopback = require('loopback');

module.exports = function(Chatmember) {
  var app = require('../../server/server');

  Chatmember.addMember = async (chatId, userId) => {
    var newMember = {};
    var chat = await app.models.Chat.findById(chatId);
    var user = await app.models.user.findById(userId);

    console.log('Chat and User', chat);
    if (!chat || !user) {
      return (newMember = {err: 'Пользователь или канал не существуют'});
    }

    var member = await Chatmember.findOne({
      where: {
        and: [{chatId: chatId}, {userId: userId}],
      },
    });
    console.log('found member ', member);
    if (!member) {
      console.log('new member');
      newMember = await Chatmember.create({
        chatId: chatId,
        userId: userId,
      });
    } else {
      newMember = {err: 'Пользователь уже на канале'};
    }
    return newMember;
  };

  Chatmember.remoteMethod('addMember', {
    accepts: [{arg: 'chatId', type: 'number'}, {arg: 'userId', type: 'number'}],
    returns: {arg: 'messages', type: 'array'},
    http: {path: '/add-member', verb: 'post'},
  });
};

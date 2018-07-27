'use strict';

module.exports = function(Chat) {
  // List all chat members and their messages
  Chat.listMessages = function(id, cb) {
    Chat.findById(id, {include: {chatMessages: ['author']}}, cb);
  };

  Chat.remoteMethod('listMessages', {
    accepts: {arg: 'id', type: 'number'},
    returns: {arg: 'messages', type: 'array'},
    http: {path: '/list-messages', verb: 'get'},
  });

  Chat.listMembers = function(id, cb) {
    Chat.findById(id, {include: {chatMembers: ['member']}}, cb);

    Chat.findById(id, {include: ['chatMessages', 'chatMembers']}).then(res => {
      console.log('Chat by id ===', id, res);
    });
  };

  Chat.remoteMethod('listMembers', {
    accepts: {arg: 'id', type: 'number'},
    returns: {arg: 'members', type: 'array'},
    http: {path: '/list-members', verb: 'get'},
  });

  // Chat.addMember = function(chatId, personId, cb) {
  //   var chat = Chat.findById(chatId);

  // };

  // Chat.membersMessages = function(id, cb) {
  //   Chat.findById(id, {include: {messages: 'author'}}, cb);
  // };

  // Chat.remoteMethod('membersMessages', {
  //   accepts: {arg: 'id', type: 'number'},
  //   returns: {arg: 'Messages', type: 'array'},

  //   http: {path: '/membersMessages', verb: 'get'},
  // });
};

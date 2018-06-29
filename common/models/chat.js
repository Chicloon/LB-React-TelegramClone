'use strict';

module.exports = function(Chat) {
  // List all chat members and their messages
  Chat.listMessages = function(cb) {
    Chat.find({include: 'messages'}, cb);
  };

  Chat.remoteMethod('listMessages', {
    returns: {arg: 'messages', type: 'array'},
    http: {path: '/list-messages', verb: 'get'},
  });

  Chat.membersMessages = function(id, cb) {
    Chat.findById(id, {include: {messages: 'author'}}, cb);
  };

  Chat.remoteMethod('membersMessages', {
    accepts: {arg: 'id', type: 'number'},
    returns: {arg: 'Messages', type: 'array'},

    http: {path: '/membersMessages', verb: 'get'},
  });
};

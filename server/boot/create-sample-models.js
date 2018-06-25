'use strict';

module.exports = function(app) {
  // app.dataSources.pgDs.automigrate('Chat', function(err) {
  //   if (err) throw err;

  //   app.models.Chat.create(
  //     [
  //       {
  //         messages: ['test', 'test2'],
  //         members: ['Member1', 'Member2'],
  //         name: 'ChatName',
  //       },
  //     ],

  //     function(err, chats) {
  //       if (err) throw err;

  //       console.log('chats created \n', chats);
  //     }
  //   );
  // });

  // app.dataSources.pgDs.automigrate('ChatMember', function(err) {
  //   if (err) throw err;

  //   app.models.ChatMember.create(
  //     [
  //       {
  //         role: 'User',
  //       },
  //     ],

  //     function(err, chatMembers) {
  //       if (err) throw err;

  //       console.log('chatMembers created \n', chatMembers);
  //     }
  //   );
  // });

  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create(
      [
        {
          name: 'Bel Cafe',
          city: 'Vancouver',
        },
        {
          name: 'Three Bees Coffee House',
          city: 'San Mateo',
        },
        {
          name: 'Caffe Artigiano',
          city: 'Vancouver',
        },
      ],
      function(err, coffeeShops) {
        if (err) throw err;

        console.log('Models created: \n', coffeeShops);
      }
    );
  });
};

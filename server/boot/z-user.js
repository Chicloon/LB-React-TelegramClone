var loopback = require('loopback');

module.exports = app => {
  // Добавление дополнительных полей для пользователей

  // app.models.User.embedsOne('Person', {
  //   property: 'person',
  // });

  // Создание нулевого пользователя, если база пустая
  app.models.User.find((err, res) => console.log(res));

  app.models.User.count((error, count) => {
    if (!error && count === 0) {
      app.models.User.create(
        {email: 'mail@example.com', password: 'password'},
        (error, user) => {
          console.log('Created default user', user);
        }
      );
    }
  });
};

'use strict';

var loopback = require('loopback');

module.exports = function enableAuthentication(server) {
  /**
   * Включаем стандартную авторизацию пользователей через /api/users/login|logout
   */
  server.enableAuth();

  /**
   * Включаем cookie для отслеживания авторизации, в куках будет храниться access_token.
   * Также включаем работу /api/users/me - вернет текущего авторизованного пользователя
   */
  server.middleware(
    'auth',
    loopback.token({
      model: server.models.accessToken,
      currentUserLiteral: 'me',
    })
  );

  server.models.user
    .getDataSource()
    .connector.observe('before execute', function(ctx, next) {
      //		console.log ('Connector.execute:', ctx);
      next();
    });

  server.models.user.afterRemote('login', function(context, accessToken, next) {
    if (accessToken != null) {
      if (accessToken.id != null) {
        context.res.cookie('access_token', accessToken.id, {
          signed: true,
          maxAge: 1000 * accessToken.ttl,
        });
      }
    }
    return next();
  });

  server.models.User.afterRemote('logout', function(context, result, next) {
    context.res.clearCookie('access_token');
    return next();
  });
};

#!/usr/bin/node

/*
  Скрипт взят из работы фирмы SmartUnit
*/

const EventEmitter = require('events');
const server = require('./server');

// Убрираем ограничение по количеству Emitters
EventEmitter.defaultMaxListeners = 0;

const pgSource = server.dataSources.postgres;

/**
 * Обновляет constraints моделей
 */
const updateConstraints = (models, callback) => {
  let constraintsQuery = '';

  Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    const relations = model.relations;

    Object.keys(relations || {}).forEach(relationName => {
      const relation = relations[relationName];

      if (relation.type == 'belongsTo') {
        constraintsQuery += `
					ALTER TABLE ${modelName} DROP CONSTRAINT IF EXISTS ${modelName}_${
          relation.modelTo.modelName
        }_${relation.keyTo}_fk;
					ALTER TABLE ${modelName} ADD  CONSTRAINT ${modelName}_${
          relation.modelTo.modelName
        }_${relation.keyTo}_fk
						FOREIGN KEY (${
              relation.keyFrom
            }) REFERENCES "${relation.modelTo.modelName.toLowerCase()}" (${
          relation.keyTo
        }) ON DELETE CASCADE;
				`;
      }
    });
  });

  pgSource.connector.execute(constraintsQuery, callback);
};

pgSource.autoupdate(function(error) {
  updateConstraints(pgSource.models, error => {
    if (error) {
      // throw error;
    } else {
      console.log('Models updated');
    }
    pgSource.disconnect();
  });
});

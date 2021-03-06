const { Model } = require('objection');
const BaseQueryBuilder = require('./BaseModel.queries');

class BaseModel extends Model {

  static get QueryBuilder() {

    // This register the custom query builder
    return BaseQueryBuilder;

  }

  // Modifiers are reusable query snippets that can be used in various places.
  static get modifiers() {

    return {
      orderByCreation(builder) {

        builder.orderBy('createdAt');

      },

    };

  }

  $formatJson(instance) {

    super.$formatJson(instance);

    // eslint-disable-next-line no-param-reassign
    delete instance.id;

    return instance;

  }

  // Add an updated value each time a model is updated
  $beforeUpdate() {

    this.updatedAt = new Date().toISOString();

  }

}

module.exports = BaseModel;

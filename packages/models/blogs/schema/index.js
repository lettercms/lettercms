import Schema  from './blogs';

Schema.methods.addCategory = async (subdomain, name, alias) => {
  try {
    const rows = await this.findOne({ subdomain });

    rows.categories.push({ name, alias });

    rows.save();

    return Promise.resolve('success');
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Delete Category
 *
 * @param {String} name
 *
 * @return {Promise<String|Error>}
 */
Schema.methods.deleteCategory = async (subdomain, name) => {
    try {
      const rows = await this.findOne({ subdomain });

      for (let category of rows.categories) {
          if (category.name === name) {
            rows.categories[rows.categories.indexOf(category)].remove();
            break;
          }
      }

      rows.save();

      return Promise.resolve('success');
    } catch (err) {
      return Promise.reject(err);
    }
  };

Schema.methods.blogMetadata = async (subdomain, fields) => {
  try {
    const rows = await this.findOne.where({ subdomain });

    if (!fields)
      return Promise.resolve(rows);
    else {
      const meta = {};

      fields.forEach(e => meta[e] = rows[e]);

      return Promise.resolve(meta);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export default Schema;

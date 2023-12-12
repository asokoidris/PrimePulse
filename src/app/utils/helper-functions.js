import fs from 'fs';
import path from 'path';
import randomstring from 'randomstring';
import bcrypt from 'bcrypt';
import keys from '../config/keys';
import { ADMIN_TYPES } from '../utils/constant/options';

class HelperFunctions {
  /**
   * @description this function is used to hash the password
   * @param {*} password - password to be hashed
   * @returns {Object} - returns the hashed password
   */
  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, Number(keys.BCRYPT));
    return hash;
  }

  /**
   * @description this function is used to compare the password
   * @param {*} password - password to be compared
   * @param {*} hash - hashed password
   * @returns {Object} - returns true if the password matches the hashed password else false
   */
  static async comparePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  /**
   * @description this function is used to capitalize the first letter of a string
   * @param {*} string - string to be capitalized
   * @returns {Object} - returns the capitalized string
   */
  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * @description this function is used to create directory if it does not exist
   * @param {*} dirPath - directory path
   * @returns {Object} - returns the directory path
   */
  static async createDirectoryIfNotExist(directory = 'uploads') {
    const dir = path.join(__dirname, '../../../', directory);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

  /**
   * @description this function is to covert a string to number
   * @param {*} str - string to be converted
   * @returns {Object} - returns the number
   */
  static async convertToNumber(page = 1, limit = 200) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return { pageNumber, limitNumber };
  }

  /**
   * @description this function is to generate a random digit token
   * @param {*} integer - Length of token to be generated
   * @returns {Object} - returns the number
   */
  static async generateRandomNumber(_length = 6) {
    const randomNumber = randomstring.generate({
      length: _length,
      charset: 'numeric',
    });
    return randomNumber;
  }

  /**
   * @description function to check if a user is a super admin
   * @param {Object} data - req body object from the AuthController
   * @return {Boolean} Returned object
   */
  static isSuperAdmin(data) {
    const { superAdmin } = keys;
    const { email, password } = data;

    if (email === superAdmin.email && !password) {
      superAdmin.password = undefined;
      return superAdmin;
    }

    if (email === superAdmin.email && password === superAdmin.password) {
      superAdmin.password = undefined;
      return superAdmin;
    }
    return false;
  }

  /**
   * @description function to return a dynamic admin response message
   * @param {String} role - admin role
   * @param {String} addedMessage - message to be added to the response
   * @return {String} Returned a formatted string
   */
  static dynamicAdminResponseMessage(role, addedMessage) {
    switch (HelperFunctions.capitalizeFirstLetter(role)) {
      case ADMIN_TYPES.SUPER_ADMIN:
        return `${ADMIN_TYPES.SUPER_ADMIN} ${addedMessage}`;
      case ADMIN_TYPES.ADMIN:
        return `${ADMIN_TYPES.ADMIN} ${addedMessage}`;
    }
    return `${addedMessage}`;
  }
}

export default HelperFunctions;

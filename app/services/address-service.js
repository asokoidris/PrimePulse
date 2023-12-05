import AddressModel from '../models/address-model.js';
import { ADDRESS_STATUS } from '../utils/constant/options.js';
import keys from '../config/keys.js';

/**
 * @description Address Service
 */
class AddressService {
  /**
   * @description function to create address
   * @param {Object} user - the user object
   * @param {Object} data - the data address object
   * @return {Object} object containing the status of the address creation
   */
  static async createAddressService(user, data) {
    const address = await AddressModel.findOne({
      userId: user._id || user.id,
      address: data.address.toLowerCase(),
    });

    if (address)
      return {
        statusCode: 409,
        message: 'Address already exists',
      };

    const newAddress = await AddressModel.create({
      userId: user._id || user.id,
      address: data.address.toLowerCase(),
      ...data,
    });

    logger.info(
      `createAddressService -> newAddress: ${JSON.stringify(newAddress)}`
    );

    return {
      statusCode: 201,
      message: 'Address created successfully',
      data: newAddress,
    };
  }

  /**
   * @description function to update address
   * @param {Object} user - the user object
   * @param {String} id - the address id
   * @param {Object} data - the data address object
   * @return {Object} object containing the status of the address update
   */
  static async updateAddressService(user, id, data) {
    const address = await AddressModel.findOne({
      _id: id,
      userId: user._id || user.id,
    });

    if (!address)
      return {
        statusCode: 404,
        message: 'Address not found',
      };

    const addressExists = await AddressModel.findOne({
      userId: user._id || user.id,
      address: data.address.toLowerCase(),
    });

    if (addressExists)
      return {
        statusCode: 409,
        message: 'Address already exists, you can not use the same address',
      };

    const updatedAddress = await AddressModel.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );

    logger.info(
      `updateAddressService -> updatedAddress: ${JSON.stringify(
        updatedAddress
      )}`
    );

    return {
      statusCode: 200,
      message: 'Address updated successfully',
      data: updatedAddress,
    };
  }

  /**
   * @description function to get all address
   * @param {Object} user - the user object
   * @return {Object} object containing all address
   */
  static async getAllAddressService(user, query) {
    const { page, limit } = query;

    // const address = await AddressModel.find({
    //   userId: user._id || user.id,
    //   status: ADDRESS_STATUS.ACTIVE,
    // });
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: { createdAt: -1 },
      populate: {
        path: 'userId',
      },
    };

    const address = await AddressModel.paginate(
      { userId: user._id || user.id, status: ADDRESS_STATUS.ACTIVE },
      options
    );

    logger.info(`getAllAddressService -> address: ${JSON.stringify(address)}`);

    return {
      statusCode: 200,
      message: 'Address fetched successfully',
      data: address,
    };
  }

  /**
   * @description function to get address by id
   * @param {Object} user - the user object
   * @param {String} id - the address id
   * @return {Object} object containing the address
   */
  static async getAddressByIdService(user, id) {
    const address = await AddressModel.findOne({
      _id: id,
      userId: user._id || user.id,
    });

    if (!address)
      return {
        statusCode: 404,
        message: 'Address not found',
      };
    logger.info(`getAddressByIdService -> address: ${JSON.stringify(address)}`);
    return {
      statusCode: 200,
      message: 'Address fetched successfully',
      data: address,
    };
  }

  /**
   * @description function to delete address by id
   * @param {Object} user - the user object
   * @param {String} id - the address id
   * @return {Object} object containing the status of the address deletion
   */
  static async deleteAddressByIdService(user, id) {
    const address = await AddressModel.findOne({
      _id: id,
      userId: user._id || user.id,
    });

    if (!address)
      return {
        statusCode: 404,
        message: 'Address not found',
      };
    const deletedAddress = await AddressModel.findOneAndUpdate(
      { _id: id },
      { status: ADDRESS_STATUS.DELETED },
      { new: true }
    );
    logger.info(
      `deleteAddressByIdService -> deletedAddress: ${JSON.stringify(
        deletedAddress
      )}`
    );
    return {
      statusCode: 200,
      message: 'Address deleted successfully',
    };
  }
}

export default AddressService;

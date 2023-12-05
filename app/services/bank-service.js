import BankModel from '../models/bank-model.js';
import { BANK_STATUS } from '../utils/constant/options.js';

/**
 * @description Bank Service
 */
class BankService {
  /**
   * @description function to create bank
   * @param {Object} user - the user object
   * @param {Object} data - the data bank object
   * @return {Object} object containing the status of the bank creation
   */
  static async createBankService(user, data) {
    const bank = await BankModel.findOne({
      userId: user._id || user.id,
      accountNumber: data.accountNumber,
    });

    if (bank)
      return {
        statusCode: 409,
        message: 'Bank already exists',
      };

    const newBank = await BankModel.create({
      userId: user._id || user.id,
      bankName: data.bankName.toLowerCase(),
      accountName: data.accountName,
      accountNumber: data.accountNumber,
    });

    logger.info(`createBankService -> newBank: ${JSON.stringify(newBank)}`);

    return {
      statusCode: 201,
      message: 'Bank created successfully',
      data: newBank,
    };
  }

  /**
   * @description function to update bank
   * @param {Object} user - the user object
   * @param {String} id - the bank id
   * @param {Object} data - the data bank object
   * @return {Object} object containing the status of the bank update
   */
  static async updateBankService(user, id, data) {
    const bank = await BankModel.findOne({
      userId: user._id || user.id,
      _id: id,
    });

    if (!bank) {
      return {
        statusCode: 404,
        message: 'Bank not found',
      };
    }

    const updatedBank = await BankModel.findOneAndUpdate(
      {
        userId: user._id || user.id,
        _id: id,
      },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    );

    logger.info(
      `updateBankService -> updatedBank: ${JSON.stringify(updatedBank)}`
    );

    return {
      statusCode: 200,
      message: 'Bank updated successfully',
      data: updatedBank,
    };
  }

  /**
   * @description function to get all banks
   *  @param {Object} user - the user object
   * @return {Object} object containing the status of all the bank fetched
   */
  static async getAllBankService(user, query) {
    const { page, limit } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: { createdAt: -1 },
    };

    const banks = await BankModel.paginate(
      {
        userId: user._id || user.id,
        status: BANK_STATUS.ACTIVE,
      },
      options
    );

    logger.info(`getAllBankService -> banks: ${JSON.stringify(banks)}`);

    return {
      statusCode: 200,
      message: 'Bank fetched successfully',
      data: banks,
    };
  }

  /**
   * @description function to get bank by id
   * @param {Object} user - the user object
   * @param {String} id - the bank id
   * @return {Object} object containing the status of the bank fetched by Id
   */
  static async getBankByIdService(user, id) {
    const bank = await BankModel.findOne({
      userId: user._id || user.id,
      _id: id,
    });

    if (!bank)
      return {
        statusCode: 404,
        message: 'Bank Details not found',
      };

    logger.info(`getBankByIdService -> bank: ${JSON.stringify(bank)}`);

    return {
      statusCode: 200,
      message: 'Bank fetched successfully',
      data: bank,
    };
  }

  /**
   * @description function to delete bank by id
   * @param {Object} user - the user object
   * @param {String} id - the bank id
   * @return {Object} object containing the status of the bank deleted by Id
   */
  static async deleteBankService(user, id) {
    const bank = await BankModel.findOne({
      userId: user._id || user.id,
      _id: id,
    });

    if (!bank)
      return {
        statusCode: 404,
        message: 'Bank not found',
      };

    const deletedBank = await BankModel.findOneAndUpdate(
      {
        userId: user._id || user.id,
        _id: id,
      },
      {
        $set: {
          status: BANK_STATUS.DELETED,
        },
      },
      {
        new: true,
      }
    );

    logger.info(
      `deleteBankService -> deletedBank: ${JSON.stringify(deletedBank)}`
    );

    return {
      statusCode: 200,
      message: 'Bank deleted successfully',
    };
  }
}

export default BankService;

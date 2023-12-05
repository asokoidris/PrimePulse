import mongoose from 'mongoose';
import CompanyModel from '../models/company-model.js';
import HelperFunctions from '../utils/helper-functions.js';
import { COMPANY_STATUS } from '../utils/constant/options.js';

/**
 * @description Category Service
 */

class CompanyService {
  /**
   * @description function to get all Company
   * @return {Object} Returned object
   */
  static async getAllCompanies(query) {
    const { page = 1, limit = 20 } = query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 20,
      sort: { createdAt: -1 },
      populate: {
        path: 'owner',
      },
    };

    const companies = await CompanyModel.paginate({}, options);
    logger.info(`getAllCompaniesService -> companies: ${companies}`);

    return {
      statusCode: 200,
      message: 'Companies retrieved successfully',
      data: companies,
    };
  }

  /**
   * @description function to Create a new Company
   * @param {Object} user - req body object from the Company Controller
   * @param {Object} data - req body object from the Company Controller
   * @return {Object} Returned object
   */
  static async createCompanyService(user, data) {
    const {
      businessName,
      businessEmail,
      businessPhone,
      businessDescription,
      businessAddress,
      bankDetails,
      tinNo,
      website,
    } = data;

    const companyExist = await CompanyModel.findOne({
      owner: user._id || user.id,
      businessName: HelperFunctions.capitalizeFirstLetter(businessName),
    });

    if (companyExist)
      return {
        statusCode: 409,
        message: 'Company already registered',
      };

    const newCompany = await CompanyModel.create({
      owner: user._id || user.id,
      businessName: HelperFunctions.capitalizeFirstLetter(businessName),
      businessEmail: businessEmail.toLowerCase(),
      businessPhone,
      businessDescription:
        HelperFunctions.capitalizeFirstLetter(businessDescription),
      businessAddress: businessAddress,
      bankDetails,
      tinNo,
      website: website.toLowerCase(),
    });

    logger.info(
      `createCompanyService -> newCompany: ${JSON.stringify(newCompany)}`
    );

    return {
      statusCode: 201,
      message: 'Company created successfully',
      data: newCompany,
    };
  }

  /**
   * @description function to update a Company
   * @param {Object} user - req body object from the Company Controller
   * @param {string} objectId - the ID of the Company to be updated
   * @param {Object} data - req body object from the Company Controller
   * @return {Object} Returned object
   */
  static async updateCompanyService(user, companyId, data) {
    const {
      businessName,
      businessEmail,
      businessPhone,
      businessDescription,
      businessAddress,
      bankDetails,
      tinNo,
      website,
    } = data;
    const companyOwner = await CompanyModel.findOne({
      _id: companyId,
      owner: user._id || user.id,
    });

    if (!companyOwner)
      return {
        statusCode: 401,
        message: 'You are not authorized to update this company',
      };

    const company = await CompanyModel.findOne({
      businessName: HelperFunctions.capitalizeFirstLetter(businessName),
    });

    if (company && company._id.toString() !== companyId)
      return {
        statusCode: 409,
        message: 'Company already exists',
      };

    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      { _id: companyId },
      {
        businessName: HelperFunctions.capitalizeFirstLetter(businessName),
        businessEmail: businessEmail.toLowerCase(),
        businessPhone,
        businessDescription:
          HelperFunctions.capitalizeFirstLetter(businessDescription),
        businessAddress: businessAddress,
        bankDetails,
        tinNo,
        website: website.toLowerCase(),
      },
      { new: true }
    );

    logger.info(`updateCompanyService ->updatedCompany: ${updatedCompany}`);

    return {
      statusCode: 200,
      message: 'Company updated successfully',
      data: updatedCompany,
    };
  }

  /**
   * @description function to get a Company by ID
   * @param {string} id - the ID of the Company to be retrieved
   * @return {Object} Returned object
   */
  static async getCompanyByIdService(id) {
    const company = await CompanyModel.findOne({
      _id: id,
      status: COMPANY_STATUS.ACTIVE,
    });

    if (!company)
      return {
        statusCode: 404,
        message: 'Company not found or deleted',
      };

    logger.info(`getCompanyByIdService -> company: ${company}`);

    return {
      statusCode: 200,
      message: 'Company retrieved successfully',
      data: company,
    };
  }

  /**
   * @description function to delete a Company
   * @param {string} id - the ID of the Company to be deleted
   * @return {Object} Returned object
   */
  static async deleteCompanyService(id) {
    const company = await CompanyModel.findById(id);

    if (!company || company.status === COMPANY_STATUS.DELETED)
      return {
        statusCode: 404,
        message: 'Company not found or deleted',
      };

    const deletedCompany = await CompanyModel.findOneAndUpdate(
      { _id: id },
      { status: COMPANY_STATUS.DELETED },
      { new: true }
    );

    logger.info(`deleteCompanyService: ${deletedCompany}`);

    return {
      statusCode: 200,
      message: 'Company deleted successfully',
    };
  }
}

export default CompanyService;

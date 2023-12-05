import express from 'express';

import { errorResponse, successResponse } from '../utils/response.js';
import { errorResponseMessage } from '../utils/constant/options.js';
import CompanyService from '../services/company-service.js';

/**
 * @description Company Controller
 */
class CompanyController {
  /**
   * @description Get all company(ies)
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} The HTTP response object with the company data
   */

  static async getAllCompaniesController(req, res) {
    const { page = 1, limit = 20 } = req.query;
    try {
      const companies = await CompanyService.getAllCompanies({ page, limit });

      logger.info(
        `getAllCompaniesController -> companies: ${JSON.stringify(companies)}`
      );

      return successResponse(
        res,
        companies.statusCode,
        companies.message,
        companies.data
      );
    } catch (error) {
      logger.error(`getAllCompaniesController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for creating a new company
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */

  static async createCompanyController(req, res) {
    const { user, body } = req;
    try {
      const newCompany = await CompanyService.createCompanyService(user, body);
      logger.info(
        `Create a new company controller -> newCompany: ${JSON.stringify(
          newCompany
        )}`
      );
      return successResponse(
        res,
        newCompany.statusCode,
        newCompany.message,
        newCompany.data
      );
    } catch (error) {
      logger.error(`createNewCompany -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for updating a company
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async updateCompanyController(req, res) {
    const { user, body, params } = req;
    try {
      const updatedCompany = await CompanyService.updateCompanyService(
        user,
        params.id,
        body
      );

      return successResponse(
        res,
        updatedCompany.statusCode,
        updatedCompany.message,
        updatedCompany.data
      );
    } catch (error) {
      logger.error(`updateCompanyController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for getting a company by id
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async getCompanyByIdController(req, res) {
    try {
      const { id } = req.params;
      const company = await CompanyService.getCompanyByIdService(id);
      logger.info(
        `Get a company by id controller -> company: ${JSON.stringify(company)}`
      );
      return successResponse(
        res,
        company.statusCode,
        company.message,
        company.data
      );
    } catch (error) {
      logger.error(`getCompanyByIdController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }

  /**
   * @description Controller for deleting a company
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async deleteCompanyController(req, res) {
    try {
      const { id } = req.params;
      const deletedCompany = await CompanyService.deleteCompanyService(id);

      logger.info(
        `Delete a company controller -> deletedCompany: ${JSON.stringify(
          deletedCompany
        )}`
      );

      return successResponse(
        res,
        deletedCompany.statusCode,
        deletedCompany.message
      );
    } catch (error) {
      logger.error(`deleteCompanyController -> error: ${error.message}`);
      return errorResponse(res, 500, errorResponseMessage);
    }
  }
}

export default CompanyController;

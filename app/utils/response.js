class ApiResponse {
  /**
   * Returns a success response with the status code , message and data. To be used for status code in the 2xx range
   * @static
   * @param { res } object - The response object
   * @param { statusCode } number - The status code.
   * @param { message } string - The success message
   * @param { data } object - The success data
   * @returns { res } object - The response object
   */
  static successResponse(res, statusCode, message, data, token = undefined) {
    return res.status(statusCode).json({
      error: false,
      status: statusCode,
      message,
      data,
      token,
    });
  }

  /**
   * Returns a success response with the status code , message and data. To be used for status code in the 2xx range
   * @static
   * @param { res } object - The response object
   * @param { statusCode } number - The status code.
   * @param { message } string - The error message
   * @returns { res } object - The response object
   */

  static errorResponse(res, statusCode, message) {
    return res
      .status(statusCode)
      .json({ error: true, status: statusCode, message });
  }
}

const { successResponse, errorResponse } = ApiResponse;

export { successResponse, errorResponse };

import joi from 'joi';
import { USER_TYPES, ADMIN_TYPES } from '../../utils/constant/options';

const signUpSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)

    .required(),
  userType: joi
    .string()
    .valid(...Object.values(USER_TYPES))
    .required(),
  agreeToTerm: joi.boolean().valid(true).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi
    .string()
    .min(8)
    // NOTE: consistency you forgot to add your regex here add it when general testing is done
    .required(),
});

const changePasswordSchema = joi.object({
  oldPassword: joi.string().required(), // NOTE: consistency you forgot to add your regex here add it when general testing is done
  newPassword: joi.string().required(), // NOTE: consistency you forgot to add your regex here add it when general testing is done
  confirmNewPassword: joi.string().required(), //NOTE: consistency you forgot to add your regex here add it when general testing is done
});

const forgetPasswordSchema = joi.alternatives().try(
  joi.object({
    email: joi.string().email().required(),
  }),
  joi.object({
    phoneNumber: joi
      .string()
      // .regex(/^[0-9]{10}$/) // NOTE: not sure if this is the right regex for phone number
      .required(),
  })
);

const resetPasswordSchema = joi
  .object({
    code: joi.string().required(),
    email: joi.string().email(),
    phoneNumber: joi.string(),
    newPassword: joi.string().min(8).required(), //NOTE: consistency you forgot to add your regex here add it when general testing is done
    confirmNewPassword: joi.string().valid(joi.ref('newPassword')).required(),
  })
  .with('email', 'newPassword');

const adminLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const onboardAdminSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().required(),
  password: joi.string().required(),
  //NOTE: roles can be an array of string or a single string with enum values of ADMIN_TYPES
  role: joi
    .alternatives()
    .try(
      joi.array().items(joi.string().valid(...Object.values(ADMIN_TYPES))),
      joi.string().valid(...Object.values(ADMIN_TYPES))
    ),
});

export {
  resetPasswordSchema,
  signUpSchema,
  loginSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  adminLoginSchema,
  onboardAdminSchema,
};

import * as yup from "yup";
import i18n from '@/services/i18n';

export const createAuthSchemas = () => ({
  loginSchema: yup.object({
    email: yup
      .string()
      .email(i18n.t("validation.invalidEmail"))
      .required(i18n.t("validation.emailRequired")),
    password: yup.string().required(i18n.t("validation.passwordRequired")),
  }),

  registerSchema: yup.object().shape({
    firstName: yup.string().required(i18n.t("validation.firstNameRequired")),
    lastName: yup.string().required(i18n.t("validation.lastNameRequired")),
    email: yup
      .string()
      .email(i18n.t("validation.invalidEmail"))
      .required(i18n.t("validation.emailRequired")),
    password: yup
      .string()
      .min(6, i18n.t("validation.passwordMinLength"))
      .required(i18n.t("validation.passwordRequired")),
  }),

  phoneLoginSchema: yup.object({
    phoneNumber: yup
      .string()
      .required(i18n.t("validation.phoneNumberRequired")),
  }),

  verificationCodeSchema: yup.object({
    code: yup.string().required(i18n.t("validation.verificationCodeRequired")),
  }),

  resetPasswordSchema: yup.object({
    email: yup
      .string()
      .email(i18n.t("validation.invalidEmail"))
      .required(i18n.t("validation.emailRequired")),
  }),
});

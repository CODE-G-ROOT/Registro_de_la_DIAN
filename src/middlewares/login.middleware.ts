import { check } from "express-validator";

export const validate_login = [
    check("email")
        .exists()
        .isString()
        .isEmail(),
    check("password")
        .exists()
        .isString()
        .isAlphanumeric()
        .isStrongPassword(),
];

export const validate_register = [
    check("name")
        .exists()
        .isString(),
    check("lastname")
        .exists()
        .isString(),
    check("email")
        .exists()
        .isString()
        .isEmail(),
    check("email_r")
        .exists()
        .isString()
        .isEmail(),
    check("password")
        .exists()
        .isString()
        .isAlphanumeric()
        .isStrongPassword(),
    check("phone"),
];
export const validate_query_sear_users = [
    
];
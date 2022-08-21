import Joi from "joi";

interface iHttpStatusCode {
  OK: number;
  BAD_REQUEST: number;
  UNAUTHORIZE: number;
  NOT_FOUND: number;
  INTERNAL_SERVER: number;
}

export const httpStatusCode: iHttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZE: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export const customJoi: Joi.Root = Joi.defaults((schema) =>
  schema.options({
    allowUnknown: true,
  })
);

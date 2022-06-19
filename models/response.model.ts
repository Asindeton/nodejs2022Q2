export enum ResponseMessage {
  CREATE_USER_ERROR = "Incorrect data for new user.",
  INCORRECT_ID_ERROR = "Incorrect ID.",
  INCORRECT_DATA_FOR_UPDATE = "Incorrect data for update user info.",
  USER_NOT_FOUNDED_ERROR = "User not founded.",
  PAGE_NOT_FOUNDED_ERROR = "Wrong url, pls check you request.",
}

export enum ResponseStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  USER_NOT_FOUNDED = 404,
}

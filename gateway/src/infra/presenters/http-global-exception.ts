import { HttpException, HttpStatus } from "@nestjs/common";

const httpException = (error: any) => {
  const { response, status } = {
    response: error.response?.data?.message || error,
    status: error.response?.data?.status || HttpStatus.INTERNAL_SERVER_ERROR,
  };

  throw new HttpException(response, status);
};

export { httpException };

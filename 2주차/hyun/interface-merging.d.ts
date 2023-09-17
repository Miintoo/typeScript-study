import User from "./interface";

// Express의 Request 타입을 확장
declare global {
  namespace Express {
    export interface Request {
      language?: string;
      user?: User;
    }
  }
}

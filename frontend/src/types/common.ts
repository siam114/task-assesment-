export interface StandardResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export type PaginationMetaData = {
  page?: number;
  limit?: number;
  total?: number;
};

export type PaginationModel = {
  page: number;
  pageSize: number;
  // total:number,
};

export type RouteStopperResult = {
  isConfirmed: boolean;
  isDenied: boolean;
  isDismissed: boolean;
  value?: boolean;
};

export type PaginationRequest = {
  page?: number;
  limit?: number;
  order_by?: string;
  sort_type?: string;
  filter?: string;
};

export type UserTokenDataType = {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
};

// export type RefreshResponseType = UserTokenDataType & {
//   accessToken: string;
//   refreshToken: string;
// };

export type UserDataType = UserTokenDataType & {
  profilePicUrl?: string | null;
};

export type PlanType = {
  plan_id: number;
  name: string;
  plan_code: string;
  on_trial: boolean;
  start_date: string | Date;
  end_date: string | Date;
  payment_status: string;
  interval: string;
  quantity: number;
  card_info: CardInfo;
};

export type CardInfo = {
  type: 'visa' | 'mastercard' | 'American Express' | 'UnionPay' | 'Unknown';
  lastFour: string;
  expiry: string;
};

export type SortType = 'asc' | 'desc';

export type ListReqParamsType = {
  page: number;
  limit: number;
  orderBy: string;
  sortType: string;
  filter?: string | null;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackUrl?: string;
  // cardToken: string;
};

export type EmailVerificationParams = {
  email: string;
  otp: string;
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackUrl?: string;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;

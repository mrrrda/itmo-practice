export type CommonCustomerInfoType = { email: string; phone: string; comment?: string };

export type NaturalPersonCustomerInfoType = {
  fullName: string;
};

export type JuridicalPersonCustomerInfoType = {
  companyName: string;
  INN?: string;
  KPP?: string;
  contactPerson: string;
};

type BaseOrdersDTO = {
  id: string;
  customerType: CustomerType;
  paymentMethod: PaymentMethodType;
  customerInfo: CustomerInfoType;
  date: string;
};

export type CustomerType = 'naturalPerson' | 'juridicalPerson';
export type PaymentMethodType = 'cash' | 'account';

export type CustomerInfoType = (NaturalPersonCustomerInfoType | JuridicalPersonCustomerInfoType) &
  CommonCustomerInfoType;

export type PostOrdersDTO = Omit<BaseOrdersDTO, 'id'>;

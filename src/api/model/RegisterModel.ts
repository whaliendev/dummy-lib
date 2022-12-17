export interface RegisterReaderModel {
  address: string
  cardNumber?: string
  name: string
  phoneNumber?: string
  type?: 'faculty' | 'reader' | 'staff'
}

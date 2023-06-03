export class User {
  id: number
  firstName: string
  lastName: string
  birthDate: string
  phone: string
  jobTitle: string
  country: string
  city: string
  email: string
  about: string

  // Web server for chrome must listen to specific folder contains all profile pictures
  profilePicturePath: string;
}


 export interface UserData {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
      firstname: string;
      lastname: string;
    };
    address: {
      city: string;
      street: string;
      number: number;
      zipcode: string;
      geolocation: {
        lat: string;
        long: string;
      };
    };
    phone: string;
  }
  
  // Usage example:
  const user: UserData = {
    id: 1,
    email: 'John@gmail.com',
    username: 'johnd',
    password: 'm38rmF$',
    name: {
      firstname: 'John',
      lastname: 'Doe'
    },
    address: {
      city: 'kilcoole',
      street: '7835 new road',
      number: 3,
      zipcode: '12926-3874',
      geolocation: {
        lat: '-37.3159',
        long: '81.1496'
      }
    },
    phone: '1-570-236-7033'
  };
  
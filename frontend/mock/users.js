export const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    fullName: "John Doe",
    role: "customer",
    address: "123 Main St, City",
    phone: "0123456789",
    orders: [
      {
        id: 1,
        date: "2024-03-15",
        total: 999,
        status: "delivered",
        items: [
          {
            phoneId: 1,
            quantity: 1,
            price: 999
          }
        ]
      }
    ]
  },
  {
    id: 2,
    username: "admin_user",
    email: "admin@example.com",
    fullName: "Admin User",
    role: "admin",
    address: "456 Admin Ave, City",
    phone: "0987654321",
    orders: []
  }
]; 
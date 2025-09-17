
export const CustomerService = {
  getCustomersMedium: async () => {
    // Mock data
    return [
      {
        id: 1,
        name: "John Doe",
        country: { name: "USA" },
        company: "Acme Inc.",
        representative: { name: "Jane Smith" }
      },
      {
        id: 2,
        name: "Alice Johnson",
        country: { name: "Canada" },
        company: "Maple Tech",
        representative: { name: "Robert Brown" }
      },
      {
        id: 3,
        name: "Bob Williams",
        country: { name: "UK" },
        company: "London Corp",
        representative: { name: "Emily Clark" }
      }
      // Add more users as needed
    ];
  }
};

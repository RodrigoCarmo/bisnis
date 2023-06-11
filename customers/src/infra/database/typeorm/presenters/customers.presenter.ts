const handleCustomerResponse = (customer) => {
  return {
    id: customer[0].id,
    firstName: customer[0].first_name,
    lastName: customer[0].last_name,
    email: customer[0].email,
    phone: customer[0].phone,
    createdAt: customer[0].created_at,
    updatedAt: customer[0].updated_at,
  };
};

export { handleCustomerResponse };

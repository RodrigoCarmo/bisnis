const handleCustomerResponse = (customer) => {
  return customer
    ? {
        id: customer[0]?.id || customer.id,
        firstName: customer[0]?.first_name || customer.firstName,
        lastName: customer[0]?.last_name || customer.lastName,
        email: customer[0]?.email || customer.email,
        phone: customer[0]?.phone || customer.phone,
        createdAt: customer[0]?.created_at || customer.createdAt,
        updatedAt: customer[0]?.updated_at || customer.updatedAt,
      }
    : undefined;
};

export { handleCustomerResponse };

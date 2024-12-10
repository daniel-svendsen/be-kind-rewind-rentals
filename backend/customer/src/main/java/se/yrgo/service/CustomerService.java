package se.yrgo.service;

import se.yrgo.domain.*;

import java.util.*;

public interface CustomerService {

    public List<Customer> getAllCustomers();
    public Optional<Customer> getCustomerById(Long id);
    public Customer createCustomer(Customer customer);
    public Customer updateCustomer(Long id, Customer updatedCustomer);
    public void deleteCustomer(Long id);
}

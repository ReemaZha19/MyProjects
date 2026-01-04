package com.employ.management.service;

import java.util.List;

import com.employ.management.entity.Employee;

public interface EmployeeService {

	public Employee saveEmployee(Employee employee);
	
	public List<Employee> getAllEmployees();
	
	public Employee getEmployeeById(Long id);
	
	public Employee updateEmployee(Employee employee);
	
	public void deleteEmployee(Employee employee);
	
	List<Employee> searchEmployees(String keyword);
}

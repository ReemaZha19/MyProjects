package com.employ.management.service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.employ.management.dao.EmployeeRepository;
import com.employ.management.entity.Employee;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public Employee saveEmployee(Employee employee) {
		Employee emp = employeeRepository.save(employee);
		return emp;
	}

	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@Override
	public Employee getEmployeeById(Long id) {
		return employeeRepository.findById(id).orElse(new Employee());
	}

	@Override
	public Employee updateEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public void deleteEmployee(Employee employee) {
		 employeeRepository.delete(employee);
	}
	
	@Override
	public List<Employee> searchEmployees(String keyword) {

	    // If searching by ID
	    if (keyword.matches("\\d+")) {
	        return employeeRepository.findById(Long.parseLong(keyword))
	                .map(List::of)
	                .orElse(List.of());
	    }

	    // Use a LinkedHashSet to preserve insertion order and remove duplicates
	    Set<Employee> resultSet = new LinkedHashSet<>();

	    resultSet.addAll(employeeRepository.findByFirstNameContainingIgnoreCase(keyword));
	    resultSet.addAll(employeeRepository.findByLastNameContainingIgnoreCase(keyword));
	    resultSet.addAll(employeeRepository.findByEmailContainingIgnoreCase(keyword));
	    resultSet.addAll(employeeRepository.findByPositionContainingIgnoreCase(keyword));

	    return new ArrayList<>(resultSet);
	}





}

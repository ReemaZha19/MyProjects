package com.employ.management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employ.management.entity.Employee;
import com.employ.management.service.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class RestEmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping
	public ResponseEntity<List<Employee>> getAll(){
		List<Employee> employees = employeeService.getAllEmployees();
		return ResponseEntity.status(200).body(employees);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getById(@PathVariable Long id){
		return ResponseEntity.status(200).body(employeeService.getEmployeeById(id));
	}
	
	@PostMapping
	public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee) {
		System.out.println(employee);
		Employee emp = employeeService.saveEmployee(employee);
		return ResponseEntity.status(HttpStatus.CREATED).body(emp);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(
	        @PathVariable Long id,
	        @RequestBody Employee employee) {

	    Employee existing = employeeService.getEmployeeById(id);

	    existing.setFirstName(employee.getFirstName());
	    existing.setLastName(employee.getLastName());
	    existing.setAddress(employee.getAddress());
	    existing.setEmail(employee.getEmail());
	    existing.setPosition(employee.getPosition());
	    existing.setSalary(employee.getSalary());

	    Employee updated = employeeService.saveEmployee(existing);
	    return ResponseEntity.ok(updated);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable Long id) {
		Employee employee = employeeService.getEmployeeById(id);
		employeeService.deleteEmployee(employee);
		return ResponseEntity.ok(employee);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Employee>> searchEmployees(
	        @RequestParam String keyword) {

	    return ResponseEntity.ok(employeeService.searchEmployees(keyword));
	}

	
}

import Businesses from "../models/Sbs.businesses.model";
import Employees from "../models/Sbs.employees.model";
import * as employeeService from "../services/Sbs.employee.services";
import Users from "../models/Sbs.users.model";
import { 
    validateCreateEmployee, 
    validateUpdateEmployee 

} from "../validation/Sbs.employee.validation";

// controller to create a employee
export const createEmployee = async (req, res) => {
  const { error, value } = validateCreateEmployee(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const employee = await employeeService.createEmp(value, req.file);
    return res.status(201).json({
      status: "201",
      message: "Employee created",
      data: employee,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: err.message,
    });
  }
};// controller to update employee
export const updateEmployee = async (req, res) => {
  const { error, value } = validateUpdateEmployee(req.body);

  if (error) {
    return res.status(400).json({
      status: "400",
      message: error.details[0].message,
    });
  }

  try {
    const { id } = req.params;
    const updatedEmployee = await employeeService.updateEmployee(id, value);

    return res.status(200).json({
      status: "200",
      message: "Employee updated",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};
// constroller to retrieve all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmp();
    return res.status(200).json({
      status: "200",
      message: "Employees retrieved",
      data: employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controller to retrieve single employee
export const getOneEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getOneEmp(id);

    if (!employee) {
      return res.status(404).json({
        status: "404",
        message: "Employee not found",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Employee retrieved",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};



// controller to delete a employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const findId = await Employees.findById(id);
    if (!findId) {
      return res.status(404).json({
        status: "404",
        message: "Employee not found",
      });
    }
    await employeeService.deleteEmployee(id);
    return res.status(200).json({
      status: "200",
      message: "Employee deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "Internal server error",
      error: error.message,
    });
  }
};

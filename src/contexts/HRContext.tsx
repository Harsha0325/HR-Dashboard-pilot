
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  image: string;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  company: {
    title: string;
    department: string;
  };
}

interface HRContextType {
  employees: Employee[];
  bookmarkedIds: number[];
  loading: boolean;
  searchTerm: string;
  selectedDepartments: string[];
  selectedRatings: number[];
  setSearchTerm: (term: string) => void;
  setSelectedDepartments: (departments: string[]) => void;
  setSelectedRatings: (ratings: number[]) => void;
  toggleBookmark: (id: number) => void;
  promoteEmployee: (id: number) => void;
  getFilteredEmployees: () => Employee[];
  getEmployeeById: (id: number) => Employee | undefined;
}

const HRContext = createContext<HRContextType | undefined>(undefined);

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within HRProvider');
  }
  return context;
};

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Product'];

export const HRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/karnataka_users.json');
      const data = await response.json();
      
      const processedEmployees = data.users.map((user: any) => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      
      setEmployees(processedEmployees);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => 
      prev.includes(id) 
        ? prev.filter(bookmarkId => bookmarkId !== id)
        : [...prev, id]
    );
  };

  const promoteEmployee = (id: number) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === id 
          ? { ...emp, rating: Math.min(emp.rating + 1, 5) }
          : emp
      )
    );
  };

  const getFilteredEmployees = () => {
    return employees.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(employee.department);
      
      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.includes(employee.rating);
      
      return matchesSearch && matchesDepartment && matchesRating;
    });
  };

  const getEmployeeById = (id: number) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <HRContext.Provider value={{
      employees,
      bookmarkedIds,
      loading,
      searchTerm,
      selectedDepartments,
      selectedRatings,
      setSearchTerm,
      setSelectedDepartments,
      setSelectedRatings,
      toggleBookmark,
      promoteEmployee,
      getFilteredEmployees,
      getEmployeeById,
    }}>
      {children}
    </HRContext.Provider>
  );
};

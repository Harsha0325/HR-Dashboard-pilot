
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useHR } from '../contexts/HRContext';
import { Search, Filter, X } from 'lucide-react';

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Product'];
const ratings = [1, 2, 3, 4, 5];

const SearchAndFilter: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
  } = useHR();

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department]);
    } else {
      setSelectedDepartments(selectedDepartments.filter(d => d !== department));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartments([]);
    setSelectedRatings([]);
  };

  const hasActiveFilters = searchTerm || selectedDepartments.length > 0 || selectedRatings.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Departments
                {selectedDepartments.length > 0 && (
                  <Badge className="ml-1">{selectedDepartments.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {departments.map((department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={selectedDepartments.includes(department)}
                  onCheckedChange={(checked) => handleDepartmentChange(department, checked)}
                >
                  {department}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Ratings
                {selectedRatings.length > 0 && (
                  <Badge className="ml-1">{selectedRatings.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {ratings.map((rating) => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked)}
                >
                  {rating} Star{rating !== 1 ? 's' : ''}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="gap-2">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm('')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedDepartments.map((dept) => (
            <Badge key={dept} variant="secondary" className="gap-1">
              {dept}
              <button onClick={() => handleDepartmentChange(dept, false)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge key={rating} variant="secondary" className="gap-1">
              {rating} Star{rating !== 1 ? 's' : ''}
              <button onClick={() => handleRatingChange(rating, false)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useHR } from '../contexts/HRContext';
import { Star, Bookmark, TrendingUp, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  image: string;
}

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { bookmarkedIds, toggleBookmark, promoteEmployee } = useHR();
  const isBookmarked = bookmarkedIds.includes(employee.id);

  const handleBookmark = () => {
    toggleBookmark(employee.id);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: `${employee.firstName} ${employee.lastName}`,
    });
  };

  const handlePromote = () => {
    promoteEmployee(employee.id);
    toast({
      title: "Employee promoted!",
      description: `${employee.firstName} ${employee.lastName}'s rating has been increased.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      Engineering: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      Sales: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      HR: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      Finance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Design: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      Product: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-blue-100 dark:ring-blue-900">
            <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {employee.firstName[0]}{employee.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {employee.firstName} {employee.lastName}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`p-1 ${isBookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400">{employee.email}</p>
            <p className="text-sm text-slate-500 dark:text-slate-500">Age: {employee.age}</p>
            
            <div className="flex items-center justify-between">
              <Badge className={getDepartmentColor(employee.department)}>
                {employee.department}
              </Badge>
              <div className="flex items-center space-x-1">
                {renderStars(employee.rating)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex space-x-2">
        <Link to={`/employee/${employee.id}`} className="flex-1">
          <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </Link>
        <Button 
          onClick={handlePromote}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Promote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;

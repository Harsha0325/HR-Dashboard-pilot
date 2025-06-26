
import React from 'react';
import Layout from '../components/Layout';
import EmployeeCard from '../components/EmployeeCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { useHR } from '../contexts/HRContext';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, TrendingUp, Star, Bookmark } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { loading, employees, bookmarkedIds, getFilteredEmployees } = useHR();
  const filteredEmployees = getFilteredEmployees();

  const stats = {
    totalEmployees: employees.length,
    bookmarked: bookmarkedIds.length,
    averageRating: employees.length > 0 ? 
      (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1) : '0',
    topPerformers: employees.filter(emp => emp.rating >= 4).length,
  };

  if (loading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HR Performance Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Track employee performance and manage your team effectively
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Total Employees</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bookmark className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Bookmarked</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.bookmarked}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-300">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{stats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-300">Top Performers</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.topPerformers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter />

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

        {filteredEmployees.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No employees found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;


import React from 'react';
import Layout from '../components/Layout';
import EmployeeCard from '../components/EmployeeCard';
import { useHR } from '../contexts/HRContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookmarks: React.FC = () => {
  const { employees, bookmarkedIds } = useHR();
  
  const bookmarkedEmployees = employees.filter(emp => bookmarkedIds.includes(emp.id));

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Bookmark className="h-8 w-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Bookmarked Employees
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your saved employees for quick access
          </p>
        </div>

        {/* Stats Card */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bookmark className="h-8 w-8 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100">
                    Total Bookmarked
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Employees you've saved for later
                  </p>
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
                {bookmarkedIds.length}
              </div>
            </div>
          </CardContent>
        </Card>

        {bookmarkedEmployees.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-slate-600 dark:text-slate-400">
                Showing {bookmarkedEmployees.length} bookmarked employee{bookmarkedEmployees.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              No bookmarked employees yet
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Start bookmarking employees from the dashboard to keep track of your favorite team members.
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                Browse Employees
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookmarks;

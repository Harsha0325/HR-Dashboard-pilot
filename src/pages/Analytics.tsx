
import React from 'react';
import Layout from '../components/Layout';
import { useHR } from '../contexts/HRContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { BarChart3, Users, Star, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  const { employees, bookmarkedIds } = useHR();

  // Department-wise data
  const departmentData = employees.reduce((acc, emp) => {
    const dept = emp.department;
    if (!acc[dept]) {
      acc[dept] = { department: dept, count: 0, totalRating: 0, bookmarked: 0 };
    }
    acc[dept].count += 1;
    acc[dept].totalRating += emp.rating;
    if (bookmarkedIds.includes(emp.id)) {
      acc[dept].bookmarked += 1;
    }
    return acc;
  }, {} as Record<string, { department: string; count: number; totalRating: number; bookmarked: number }>);

  const departmentChartData = Object.values(departmentData).map(dept => ({
    department: dept.department,
    employees: dept.count,
    avgRating: dept.count > 0 ? (dept.totalRating / dept.count).toFixed(1) : 0,
    bookmarked: dept.bookmarked,
  }));

  // Rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating: `${rating} Star${rating !== 1 ? 's' : ''}`,
    count: employees.filter(emp => emp.rating === rating).length,
  }));

  // Performance trends (mock data for demo)
  const performanceTrends = [
    { month: 'Jan', avgRating: 3.8 },
    { month: 'Feb', avgRating: 3.9 },
    { month: 'Mar', avgRating: 4.1 },
    { month: 'Apr', avgRating: 4.0 },
    { month: 'May', avgRating: 4.2 },
    { month: 'Jun', avgRating: 4.3 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#f97316'];

  const totalEmployees = employees.length;
  const averageRating = totalEmployees > 0 ? 
    (employees.reduce((sum, emp) => sum + emp.rating, 0) / totalEmployees).toFixed(1) : '0';
  const topPerformers = employees.filter(emp => emp.rating >= 4).length;
  const bookmarkRate = totalEmployees > 0 ? 
    ((bookmarkedIds.length / totalEmployees) * 100).toFixed(1) : '0';

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Insights and trends from your HR data
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Total Employees</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-300">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-300">Top Performers</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{topPerformers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Bookmark Rate</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{bookmarkRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgRating" fill="#3b82f6" name="Avg Rating" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ratingDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ rating, count }) => `${rating}: ${count}`}
                  >
                    {ratingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Employee Count */}
          <Card>
            <CardHeader>
              <CardTitle>Employees by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#10b981" name="Employees" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="avgRating" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left p-4 font-medium">Department</th>
                    <th className="text-left p-4 font-medium">Employees</th>
                    <th className="text-left p-4 font-medium">Avg Rating</th>
                    <th className="text-left p-4 font-medium">Bookmarked</th>
                    <th className="text-left p-4 font-medium">Bookmark Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentChartData.map((dept, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4 font-medium">{dept.department}</td>
                      <td className="p-4">{dept.employees}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{dept.avgRating}</span>
                        </div>
                      </td>
                      <td className="p-4">{dept.bookmarked}</td>
                      <td className="p-4">
                        {dept.employees > 0 ? ((dept.bookmarked / dept.employees) * 100).toFixed(1) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Analytics;

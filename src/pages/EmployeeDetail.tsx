
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useHR } from '../contexts/HRContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Star, Phone, MapPin, Bookmark, TrendingUp, Briefcase, MessageSquare, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployeeById, bookmarkedIds, toggleBookmark, promoteEmployee } = useHR();
  const [feedback, setFeedback] = useState('');
  
  const employee = getEmployeeById(Number(id));
  const isBookmarked = employee ? bookmarkedIds.includes(employee.id) : false;

  if (!employee) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Employee not found</h2>
          <Link to="/">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

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

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback submitted",
        description: "Your feedback has been recorded successfully.",
      });
      setFeedback('');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
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

  // Mock data for demonstration
  const projects = [
    { name: 'Project Alpha', status: 'Completed', completion: 100 },
    { name: 'Project Beta', status: 'In Progress', completion: 75 },
    { name: 'Project Gamma', status: 'Pending', completion: 25 },
  ];

  const performanceHistory = [
    { period: 'Q4 2024', rating: employee.rating },
    { period: 'Q3 2024', rating: Math.max(1, employee.rating - 1) },
    { period: 'Q2 2024', rating: Math.max(1, employee.rating - 1) },
    { period: 'Q1 2024', rating: Math.max(1, employee.rating - 2) },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBookmark} className="gap-2">
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current text-yellow-500' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button onClick={handlePromote} className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Promote
            </Button>
          </div>
        </div>

        {/* Employee Header Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-slate-800">
                <AvatarImage src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                  {employee.firstName[0]}{employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {employee.firstName} {employee.lastName}
                  </h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400">{employee.company?.title || 'Employee'}</p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6">
                  <Badge className={`${getDepartmentColor(employee.department)} text-sm px-3 py-1`}>
                    {employee.department}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {renderStars(employee.rating)}
                    <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                      ({employee.rating}/5)
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{employee.address?.city}, {employee.address?.state}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <FileText className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</Label>
                    <p className="text-slate-900 dark:text-slate-100">{employee.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</Label>
                    <p className="text-slate-900 dark:text-slate-100">{employee.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Age</Label>
                    <p className="text-slate-900 dark:text-slate-100">{employee.age} years old</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Address</Label>
                    <p className="text-slate-900 dark:text-slate-100">
                      {employee.address?.address}<br />
                      {employee.address?.city}, {employee.address?.state}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceHistory.map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="font-medium">{period.period}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(period.rating)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feedback">Your feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts about this employee's performance..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32"
                  />
                </div>
                <Button onClick={handleFeedbackSubmit} disabled={!feedback.trim()}>
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployeeDetail;

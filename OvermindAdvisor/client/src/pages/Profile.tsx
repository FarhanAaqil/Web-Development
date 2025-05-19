import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/authContext";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { 
  Brain, 
  Settings, 
  LogOut, 
  User,
  LayoutDashboard,
  Key,
  Download,
  FileDown,  // Changed from FileExport
  Upload,     // Changed from FileUp
  Shield,
  BarChart,   // Changed from GanttChart
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  
  // Password update form schema
  const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your new password"),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });
  
  type PasswordFormValues = z.infer<typeof passwordSchema>;
  
  // Profile update form schema
  const profileSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
  });
  
  type ProfileFormValues = z.infer<typeof profileSchema>;
  
  // Create password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  // Create profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });
  
  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      const response = await apiRequest("POST", "/api/auth/update-password", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      });
      passwordForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update password",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const response = await apiRequest("PUT", "/api/auth/profile", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
      // Update local user data
      const newUser = {
        ...user,
        username: data.data.username,
        email: data.data.email,
      };
      localStorage.setItem('overmind-user', JSON.stringify(newUser));
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle password update
  const onSubmitPassword = (data: PasswordFormValues) => {
    updatePasswordMutation.mutate(data);
  };
  
  // Handle profile update
  const onSubmitProfile = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };
  
  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <>
      <Helmet>
        <title>Profile | Overmind</title>
        <meta name="description" content="Manage your Overmind account settings" />
      </Helmet>
      
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="text-white h-4 w-4" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Overmind</span>
          </div>
          
          <nav className="space-y-1 flex-1">
            <Link href="/dashboard">
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
            </Link>
            <Link href="/mindmap">
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Brain className="h-5 w-5" />
                <span>Mind Map</span>
              </a>
            </Link>
            <Link href="/profile">
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-white">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </a>
            </Link>
          </nav>
          
          <div className="pt-4 border-t border-gray-800">
            <button 
              onClick={logout}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Profile & Settings</h1>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-gray-800">
                <AvatarImage src="https://api.dicebear.com/6.x/shapes/svg?seed=John" alt="Profile" />
                <AvatarFallback className="bg-primary text-2xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-2xl font-bold">{user?.username || "User"}</h2>
                <p className="text-gray-400">{user?.email || "user@example.com"}</p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 mr-2">
                    Edit Profile
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600">
                    <FileDown className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full max-w-md bg-gray-800">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your account details and profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                        <FormField
                          control={profileForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-gray-800 border-gray-700 text-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400">
                                This is your public display name
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-gray-800 border-gray-700 text-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400">
                                Your email address is used for notifications and login
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-primary to-purple-600"
                          disabled={updateProfileMutation.isPending}
                        >
                          {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 mt-6">
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription className="text-gray-400">
                      Export or delete your data from Overmind
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Export Data</h4>
                          <p className="text-sm text-gray-400">
                            Download all your mind nodes and connections as JSON
                          </p>
                        </div>
                        <Button variant="outline" className="border-gray-700 text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Import Data</h4>
                          <p className="text-sm text-gray-400">
                            Import mind nodes from a JSON file
                          </p>
                        </div>
                        <Button variant="outline" className="border-gray-700 text-white">
                          <Upload className="h-4 w-4 mr-2" />
                          Import
                        </Button>
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-red-500">Delete Account</h4>
                          <p className="text-sm text-gray-400">
                            Permanently delete your account and all associated data
                          </p>
                        </div>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription className="text-gray-400">
                      Change your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type={showPassword ? "text" : "password"}
                                    className="bg-gray-800 border-gray-700 text-white pr-10" 
                                    {...field} 
                                  />
                                </FormControl>
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  className="bg-gray-800 border-gray-700 text-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400">
                                Password must be at least 6 characters
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  className="bg-gray-800 border-gray-700 text-white" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-primary to-purple-600"
                          disabled={updatePasswordMutation.isPending}
                        >
                          {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 mt-6">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your security settings and account protection
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications for Login</Label>
                          <p className="text-sm text-gray-400">
                            Receive email alerts for new login attempts
                          </p>
                        </div>
                        <Switch id="email-notifications" />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="session-timeout">Auto Logout (Coming Soon)</Label>
                          <p className="text-sm text-gray-400">
                            Automatically sign out after a period of inactivity
                          </p>
                        </div>
                        <Switch id="session-timeout" disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>User Interface</CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize how Overmind looks and behaves
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-theme">Dark Mode</Label>
                          <p className="text-sm text-gray-400">
                            Use the dark theme across all screens
                          </p>
                        </div>
                        <Switch id="dark-theme" defaultChecked />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="animations">Interface Animations</Label>
                          <p className="text-sm text-gray-400">
                            Enable animations for a more dynamic experience
                          </p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="node-labels">Show Node Labels in Mind Map</Label>
                          <p className="text-sm text-gray-400">
                            Always display labels for nodes in mind map view
                          </p>
                        </div>
                        <Switch id="node-labels" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 mt-6">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription className="text-gray-400">
                      Control when and how Overmind notifies you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-suggestions">AI Suggestions</Label>
                          <p className="text-sm text-gray-400">
                            Receive suggestions about potential connections and insights
                          </p>
                        </div>
                        <Switch id="ai-suggestions" defaultChecked />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="task-reminders">Task Reminders</Label>
                          <p className="text-sm text-gray-400">
                            Get notified about pending tasks and due dates
                          </p>
                        </div>
                        <Switch id="task-reminders" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}
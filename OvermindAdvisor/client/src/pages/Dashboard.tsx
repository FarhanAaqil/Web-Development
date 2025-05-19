import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/authContext";
import { getQueryFn } from "@/lib/queryClient";
import { Helmet } from "react-helmet";
import { 
  Brain, 
  PlusCircle, 
  Grid, 
  List, 
  Calendar, 
  Settings, 
  LogOut, 
  User,
  Filter,
  Search,
  Sparkles,
  LayoutDashboard,
  Clock,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { NodeType, NodeStatus } from "@/lib/types";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Query to fetch all mind nodes
  const { data: mindNodes, isLoading, error } = useQuery({
    queryKey: ['/api/mind-nodes'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Filter nodes based on search and filters
  const filteredNodes = mindNodes ? mindNodes.data.filter((node: any) => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = !filterType || node.type === filterType;
    
    // Status filter
    const matchesStatus = !filterStatus || node.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  }) : [];
  
  // Sort nodes by updated_at (most recent first)
  const sortedNodes = [...(filteredNodes || [])].sort((a, b) => 
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  
  // Group nodes by type for stats
  const nodeStats = mindNodes ? mindNodes.data.reduce((acc: any, node: any) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {}) : {};
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Overmind</title>
        <meta name="description" content="Your Overmind Dashboard" />
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
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-white">
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
            <Link href="/dashboard">
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                <Clock className="h-5 w-5" />
                <span>Timeline</span>
              </a>
            </Link>
            <Link href="/profile">
              <a className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
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
              <h1 className="text-xl font-bold">Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search nodes..."
                    className="w-64 pl-9 bg-gray-800 border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="default" 
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Node
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem 
                      className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Total Nodes</CardDescription>
                  <CardTitle className="text-2xl">{mindNodes?.data?.length || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400">
                    All your mind nodes
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Ideas</CardDescription>
                  <CardTitle className="text-2xl">{nodeStats?.[NodeType.IDEA] || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400">
                    Inspirations & concepts
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Tasks</CardDescription>
                  <CardTitle className="text-2xl">{nodeStats?.[NodeType.TASK] || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400">
                    Actions to complete
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">Notes</CardDescription>
                  <CardTitle className="text-2xl">{nodeStats?.[NodeType.NOTE] || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400">
                    Thoughts & information
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Filters & Tabs */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all">All Nodes</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-700 text-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Type: {filterType || "All"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                    <DropdownMenuItem onClick={() => setFilterType(null)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      All Types
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType(NodeType.IDEA)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Ideas
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType(NodeType.TASK)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Tasks
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType(NodeType.NOTE)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Notes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType(NodeType.PROJECT)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType(NodeType.GOAL)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Goals
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-gray-700 text-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Status: {filterStatus || "All"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                    <DropdownMenuItem onClick={() => setFilterStatus(null)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      All Statuses
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus(NodeStatus.ACTIVE)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus(NodeStatus.IN_PROGRESS)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus(NodeStatus.DONE)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Done
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus(NodeStatus.ARCHIVED)} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">
                      Archived
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" className="border-gray-700 text-gray-300" onClick={() => {
                  setFilterType(null);
                  setFilterStatus(null);
                  setSearchQuery("");
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Content based on tab */}
            <div>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-gray-300">Error loading data. Please try again.</p>
                  <Button variant="outline" className="mt-4 border-gray-700">
                    Retry
                  </Button>
                </div>
              ) : sortedNodes.length === 0 ? (
                <div className="text-center p-8 bg-gray-800 rounded-lg border border-gray-700">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                  <h3 className="text-xl font-semibold mb-2">No nodes found</h3>
                  <p className="text-gray-400 mb-6">
                    Create your first mind node to start organizing your thoughts
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Your First Node
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedNodes.map((node: any) => (
                    <Card key={node.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              node.status === NodeStatus.ACTIVE ? "bg-blue-500" :
                              node.status === NodeStatus.IN_PROGRESS ? "bg-yellow-500" :
                              node.status === NodeStatus.DONE ? "bg-green-500" :
                              "bg-gray-500"
                            }`} />
                            <div className="text-xs uppercase text-gray-400">{node.type}</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {/* Priority indicator */}
                            <div className="flex">
                              {[...Array(node.priority)].map((_, i) => (
                                <div key={i} className="w-1.5 h-4 bg-primary/80 rounded-sm mr-0.5" />
                              ))}
                              {[...Array(5 - node.priority)].map((_, i) => (
                                <div key={i} className="w-1.5 h-4 bg-gray-700 rounded-sm mr-0.5" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-2">{node.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm line-clamp-3">{node.content}</p>
                        
                        {node.tags && node.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {node.tags.map((tag: string, index: number) => (
                              <div key={index} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                                {tag}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 border-t border-gray-700">
                        <span className="text-xs text-gray-400">
                          {new Date(node.updated_at).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
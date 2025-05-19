import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/authContext";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { 
  Brain, 
  PlusCircle, 
  Settings, 
  LogOut, 
  User,
  Search,
  ZoomIn,
  ZoomOut,
  Home,
  Maximize,
  Filter,
  Save,
  Layout,
  LayoutDashboard,
  Plus,
  X,
  FileDown,
  FileUp,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NodeType, NodeStatus, RelationshipType, MindNode, NodeRelationship } from "@/lib/types";

// D3 imports - would be used in actual implementation
// import * as d3 from 'd3';

export default function MindMap() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedNode, setSelectedNode] = useState<MindNode | null>(null);
  const [createNodeOpen, setCreateNodeOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [filterType, setFilterType] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Query to fetch all mind nodes
  const { data: mindNodes, isLoading: nodesLoading } = useQuery({
    queryKey: ['/api/mind-nodes'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Query to fetch relationships if a node is selected
  const { data: nodeRelationships, isLoading: relationshipsLoading } = useQuery({
    queryKey: ['/api/node-relationships', selectedNode?.id],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!selectedNode,
  });
  
  // Filter nodes based on filter
  const filteredNodes = mindNodes ? mindNodes.data.filter((node: MindNode) => {
    // Type filter
    return !filterType || node.type === filterType;
  }) : [];
  
  // Create node mutation
  const createNodeMutation = useMutation({
    mutationFn: async (newNode: any) => {
      const response = await apiRequest("POST", "/api/mind-nodes", newNode);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create node");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Node created",
        description: "Your new mind node has been created",
      });
      setCreateNodeOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/mind-nodes'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create node",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Create relationship mutation
  const createRelationshipMutation = useMutation({
    mutationFn: async (newRelationship: any) => {
      const response = await apiRequest("POST", "/api/node-relationships", newRelationship);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create relationship");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Relationship created",
        description: "Nodes have been connected",
      });
      if (selectedNode) {
        queryClient.invalidateQueries({ queryKey: ['/api/node-relationships', selectedNode.id] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create relationship",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Update node position mutation
  const updateNodePositionMutation = useMutation({
    mutationFn: async ({ id, position }: { id: number, position: { x: number, y: number } }) => {
      const response = await apiRequest("PUT", `/api/mind-nodes/${id}`, {
        position_x: position.x,
        position_y: position.y,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update node position");
      }
      return response.json();
    },
  });
  
  // Handle node creation
  const handleCreateNode = (formData: any) => {
    createNodeMutation.mutate({
      title: formData.title,
      content: formData.content,
      type: formData.type,
      status: formData.status,
      priority: parseInt(formData.priority),
      tags: formData.tags ? formData.tags.split(",").map((tag: string) => tag.trim()) : [],
      // Random position for demo purposes
      position_x: Math.floor(Math.random() * 800),
      position_y: Math.floor(Math.random() * 600),
    });
  };
  
  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  // Handle reset zoom
  const handleResetZoom = () => {
    setZoomLevel(1);
  };
  
  // In a real implementation, useEffect would be used to initialize and update the D3 force simulation
  useEffect(() => {
    if (!mindNodes || !svgRef.current) return;
    
    // This is where D3.js force-directed graph would be implemented
    // For demonstration purposes, we're just showing placeholders
    
  }, [mindNodes, svgRef, zoomLevel, filterType]);
  
  return (
    <>
      <Helmet>
        <title>Mind Map | Overmind</title>
        <meta name="description" content="Visualize your thoughts in Overmind's interactive mind map" />
      </Helmet>
      
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <aside className={`${showSidebar ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-800 transition-all duration-300 overflow-hidden flex flex-col`}>
          {showSidebar && (
            <>
              <div className="p-4">
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
                    <a className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 text-white">
                      <Brain className="h-5 w-5" />
                      <span>Mind Map</span>
                    </a>
                  </Link>
                </nav>
              </div>
              
              <div className="flex-1 overflow-hidden p-4">
                {/* Sidebar content tabs */}
                <Tabs defaultValue="nodes">
                  <TabsList className="w-full bg-gray-800">
                    <TabsTrigger value="nodes">Nodes</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="nodes" className="mt-4">
                    <div className="mb-4">
                      <Input
                        type="search"
                        placeholder="Search nodes..."
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <ScrollArea className="h-[calc(100vh-280px)]">
                      <Accordion type="single" collapsible className="w-full">
                        {Object.values(NodeType).map((type) => (
                          <AccordionItem key={type} value={type} className="border-gray-800">
                            <AccordionTrigger className="hover:bg-gray-800 rounded-lg px-2 text-sm">
                              {type.charAt(0).toUpperCase() + type.slice(1)}s
                            </AccordionTrigger>
                            <AccordionContent>
                              {filteredNodes
                                .filter((node: MindNode) => node.type === type)
                                .map((node: MindNode) => (
                                  <div 
                                    key={node.id}
                                    className={`px-2 py-1.5 rounded-md text-sm cursor-pointer mb-1 ${
                                      selectedNode?.id === node.id 
                                        ? 'bg-primary/20 text-white' 
                                        : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                                    onClick={() => setSelectedNode(node)}
                                  >
                                    {node.title}
                                  </div>
                                ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                    
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600"
                      onClick={() => setCreateNodeOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Node
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4">
                    {selectedNode ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{selectedNode.title}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="bg-gray-800 text-gray-300">
                              {selectedNode.type}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-800 text-gray-300">
                              {selectedNode.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300">{selectedNode.content}</p>
                        </div>
                        
                        {selectedNode.tags && selectedNode.tags.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {selectedNode.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-800 text-gray-300">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Priority</h4>
                          <div className="flex">
                            {[...Array(selectedNode.priority)].map((_, i) => (
                              <div key={i} className="w-6 h-2 bg-primary rounded-sm mr-1" />
                            ))}
                            {[...Array(5 - selectedNode.priority)].map((_, i) => (
                              <div key={i} className="w-6 h-2 bg-gray-700 rounded-sm mr-1" />
                            ))}
                          </div>
                        </div>
                        
                        {selectedNode.ai_notes && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">AI Notes</h4>
                            <p className="text-sm text-gray-300 italic">{selectedNode.ai_notes}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Connected Nodes</h4>
                          {relationshipsLoading ? (
                            <p className="text-sm text-gray-400">Loading connections...</p>
                          ) : nodeRelationships && nodeRelationships.data.length > 0 ? (
                            <div className="space-y-2">
                              {nodeRelationships.data.map((rel: any) => (
                                <div key={rel.id} className="text-sm p-2 bg-gray-800 rounded-md">
                                  <div className="font-medium">{rel.related_node.title}</div>
                                  <div className="text-xs text-gray-400 flex justify-between">
                                    <span>{rel.relationship_type}</span>
                                    <span>{rel.related_node.type}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">No connections</p>
                          )}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4 border-gray-700"
                        >
                          Edit Node
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        Select a node to view details
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Top toolbar */}
          <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-gray-400 hover:text-white"
              >
                {showSidebar ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
              
              <h1 className="text-lg font-medium">Mind Map</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom In</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleResetZoom}>
                      <Home className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <div className="h-6 border-l border-gray-700 mx-1"></div>
              
              <Select
                onValueChange={(value) => setFilterType(value === "all" ? null : value)}
                defaultValue="all"
              >
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.values(NodeType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}s
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Layout className="h-4 w-4 mr-2" />
                Auto-Layout
              </Button>
              
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Save className="h-4 w-4 mr-2" />
                Save View
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
          
          {/* Mind map area */}
          <div className="flex-1 bg-gray-950 overflow-hidden">
            {nodesLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-opacity-50 border-t-primary rounded-full"></div>
              </div>
            ) : (
              <svg 
                ref={svgRef}
                className="w-full h-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* In a real implementation, D3.js would render nodes and links here */}
                <g className="links">
                  {/* Example links - these would be dynamically generated in the real app */}
                  <line x1="300" y1="300" x2="500" y2="200" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
                  <line x1="300" y1="300" x2="400" y2="450" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2" />
                  <line x1="300" y1="300" x2="150" y2="250" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="2" />
                </g>
                
                <g className="nodes">
                  {/* Example nodes - these would be dynamically generated in the real app */}
                  <g transform="translate(300, 300)">
                    <circle r="30" fill="rgb(59, 130, 246)" />
                    <text textAnchor="middle" dy=".3em" fill="white" fontSize="12">Main Idea</text>
                  </g>
                  <g transform="translate(500, 200)">
                    <circle r="25" fill="rgb(16, 185, 129)" />
                    <text textAnchor="middle" dy=".3em" fill="white" fontSize="10">Task</text>
                  </g>
                  <g transform="translate(400, 450)">
                    <circle r="25" fill="rgb(245, 158, 11)" />
                    <text textAnchor="middle" dy=".3em" fill="white" fontSize="10">Note</text>
                  </g>
                  <g transform="translate(150, 250)">
                    <circle r="25" fill="rgb(168, 85, 247)" />
                    <text textAnchor="middle" dy=".3em" fill="white" fontSize="10">Goal</text>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </main>
      </div>
      
      {/* Create Node Dialog */}
      <Dialog open={createNodeOpen} onOpenChange={setCreateNodeOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Create New Mind Node</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new node to your mind map. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data: any = {};
            formData.forEach((value, key) => {
              data[key] = value;
            });
            handleCreateNode(data);
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="Node title" 
                  className="bg-gray-800 border-gray-700 text-white" 
                  required 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  placeholder="Node content or description" 
                  className="bg-gray-800 border-gray-700 text-white min-h-[100px]" 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Node Type</Label>
                  <Select name="type" defaultValue={NodeType.IDEA}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800 text-white">
                      {Object.values(NodeType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={NodeStatus.ACTIVE}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800 text-white">
                      {Object.values(NodeStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority (1-5)</Label>
                <Select name="priority" defaultValue="3">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-white">
                    {[1, 2, 3, 4, 5].map((priority) => (
                      <SelectItem key={priority} value={priority.toString()}>
                        {priority} - {
                          priority === 1 ? 'Very Low' :
                          priority === 2 ? 'Low' :
                          priority === 3 ? 'Medium' :
                          priority === 4 ? 'High' :
                          'Very High'
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags" 
                  name="tags" 
                  placeholder="e.g. important, work, inspiration" 
                  className="bg-gray-800 border-gray-700 text-white" 
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setCreateNodeOpen(false)}>Cancel</Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                disabled={createNodeMutation.isPending}
              >
                {createNodeMutation.isPending ? 'Creating...' : 'Create Node'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
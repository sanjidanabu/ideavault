"use client";

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { Pencil, Trash2, Loader2, X, AlertTriangle, DollarSign, Tag, Users, FolderOpen } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyIdeasPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  useEffect(() => {
    const fetchMyIdeas = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas?email=${session.user.email}`);
        const data = await res.json();
        setIdeas(data);
      } catch (err) {
        console.error("Error fetching ideas:", err);
        toast.error("Failed to load ideas!");
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading && session) {
      fetchMyIdeas();
    }
  }, [session, sessionLoading]);

  const openUpdateModal = (idea) => {
    setSelectedIdea(idea);
    setUpdateTitle(idea.title);
    setUpdateDescription(idea.description);
    setIsUpdateOpen(true);
  };

  const openDeleteModal = (idea) => {
    setSelectedIdea(idea);
    setIsDeleteOpen(true);
  };

  const handleUpdateIdea = async (e) => {
    e.preventDefault();
    if (!selectedIdea) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${selectedIdea._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updateTitle, description: updateDescription })
      });
      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success("Idea updated successfully!");
        setIsUpdateOpen(false);
        window.location.reload(); 
      } else {
        toast.error("No changes made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteIdea = async () => {
    if (!selectedIdea) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${selectedIdea._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Idea deleted successfully!");
        setIsDeleteOpen(false);
        window.location.reload(); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete idea.");
    } finally {
      setActionLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-8 max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100">
          <AlertTriangle className="mx-auto text-amber-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-500 text-sm mb-6">Please log in to view your private ideas.</p>
          <a href="/login" className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm hover:bg-red-700 transition-colors inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Ideas </h1>
            <p className="text-sm text-gray-500 mt-1">Manage and edit your personal innovations</p>
          </div>
          <span className="px-4 py-1.5 bg-red-50 text-red-600 text-sm font-bold uppercase tracking-wider rounded-full border border-red-100 shadow-sm">
            Total: {ideas.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-red-600" size={36} />
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-medium text-lg">You have not created any ideas yet.</p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div key={idea._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                
                
                {idea.imageUrl && (
                  <div className="h-44 w-full overflow-hidden relative bg-gray-100">
                    <img 
                      src={idea.imageUrl} 
                      alt={idea.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-lg flex items-center gap-1">
                      <FolderOpen size={12} /> {idea.category || 'Tech'}
                    </span>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                   
                    {!idea.imageUrl && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-lg border border-red-100">
                          {idea.category || 'Tech'}
                        </span>
                      </div>
                    )}

                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
                      {idea.title}
                    </h3>

                    
                    <p className="text-gray-500 text-xs font-medium mb-3 line-clamp-1 italic">
                      {idea.shortDescription || 'No short summary provided.'}
                    </p>

                   
                    <p className="text-gray-600 text-sm line-clamp-3 mb-5">
                      {idea.description || idea.detailedDescription}
                    </p>

                    
                    <div className="space-y-2 border-t border-gray-100 pt-4 mb-4 text-xs text-gray-600">
                      {idea.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign size={14} className="text-emerald-500" />
                          <span><strong className="text-gray-700">Budget:</strong> {idea.budget}</span>
                        </div>
                      )}
                      {idea.targetAudience && (
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-blue-500" />
                          <span><strong className="text-gray-700">Audience:</strong> {idea.targetAudience}</span>
                        </div>
                      )}
                    </div>

                  
                    {idea.tags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {idea.tags.split(',').map((tag, i) => (
                          <span key={i} className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                            <Tag size={10} /> {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                 
                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 mt-auto">
                    <button 
                      onClick={() => openUpdateModal(idea)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                      title="Edit Idea"
                    >
                      <Pencil size={14} />
                      <span>Edit</span>
                    </button>
                    <button 
                      onClick={() => openDeleteModal(idea)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                      title="Delete Idea"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button 
              onClick={() => setIsUpdateOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Idea</h2>
            
            <form onSubmit={handleUpdateIdea} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                <textarea 
                  rows="4"
                  required
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsUpdateOpen(false)}
                  className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {actionLoading ? <Loader2 className="animate-spin" size={18} /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center relative">
            <div className="mx-auto w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 border border-red-100">
              <AlertTriangle size={24} />
            </div>
            
            <h2 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h2>
            <p className="text-gray-500 text-sm mb-6">This will permanently delete this idea from your vault.</p>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleDeleteIdea}
                disabled={actionLoading}
                className="w-full py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={18} /> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;
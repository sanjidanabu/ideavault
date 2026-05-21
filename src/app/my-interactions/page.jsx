"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { authClient } from '@/lib/auth-client';
import { Loader2, MessageSquare, AlertTriangle, ArrowUpRight } from 'lucide-react';

const MyInteractionsPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  const [interactedIdeas, setInteractedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInteractions = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-interactions?email=${session.user.email}`);
        const data = await res.json();
        setInteractedIdeas(data);
      } catch (err) {
        console.error("Error fetching interactions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading && session) {
      fetchInteractions();
    }
  }, [session, sessionLoading]);

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
          <p className="text-gray-500 text-sm mb-6">Please log in to view your activity.</p>
          <a href="/login" className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm hover:bg-red-700 transition-colors inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* হেডার */}
        <div className="mb-8 border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-bold text-gray-900">My Interactions </h1>
          <p className="text-sm text-gray-500 mt-1">Review your comments and discussions on public ideas</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-red-600" size={32} />
          </div>
        ) : interactedIdeas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-medium text-sm">You have not commented on any ideas yet.</p>
          </div>
        ) : (
        
          <div className="space-y-4">
            {interactedIdeas.map((idea) => {
             
              const myCommentsOnThisIdea = idea.comments?.filter(c => c.userEmail === session.user.email) || [];

              return myCommentsOnThisIdea.map((comment) => (
                <div key={comment.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-all">
                  
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Idea Title</span>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{idea.title}</h3>
                    </div>
                    
                   
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100 font-medium mt-2">
                      {comment.text}
                    </p>
                    
                   
                    <span className="text-[11px] text-gray-400 block mt-2">{comment.timestamp}</span>
                  </div>

                 
                  <div className="flex items-center justify-end">
                    <Link 
                      href={`/ideas/${idea._id}`} 
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                    >
                      <span>View Idea</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>

                </div>
              ));
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInteractionsPage;
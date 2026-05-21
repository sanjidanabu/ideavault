"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Loader2, Search, Filter } from "lucide-react";

const IdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  
 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        
        const res = await fetch(
          `http://localhost:5000/ideas?search=${searchTerm}&category=${selectedCategory}`
        );
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    
    const delayDebounceFn = setTimeout(() => {
      fetchIdeas();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Ideas Page</h1>
      
      
      <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search ideas by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm text-gray-900"
          />
        </div>

       
        <div className="relative min-w-[180px]">
          <Filter className="absolute left-3.5 top-3 text-gray-400" size={16} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm text-gray-900 bg-white appearance-none"
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="AI">AI</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Fintech">Fintech</option>
            <option value="E-commerce">E-commerce</option>
          </select>
        </div>
      </div>

      
      {loading ? (
        
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="animate-spin text-red-600" size={40} />
          <p className="text-gray-500 text-sm font-medium">Loading innovative ideas...</p>
        </div>
      ) : ideas.length === 0 ? (
        
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xl mx-auto">
          <p className="text-gray-400 font-medium text-lg">No ideas found matching your criteria.</p>
        </div>
      ) : (
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            ideas.map((idea) => (
              <div 
                key={idea._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between border border-gray-100"
              >
                
                <div className="h-48 w-full overflow-hidden bg-gray-100">
                  {idea.imageUrl ? (
                    <img 
                      src={idea.imageUrl} 
                      alt={idea.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200 text-sm">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-5 flex-grow">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 rounded-full mb-3">
                    {idea.category}
                  </span>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {idea.title}
                  </h3>

                  <p className="text-sm font-medium text-emerald-600 mb-3">
                    Budget: ${idea.budget}
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {idea.shortDescription || "No description available for this idea."}
                  </p>
                </div>

                <div className="p-5 pt-0">
                  <Link href={`/ideas/${idea._id}`}> 
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center text-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default IdeasPage;
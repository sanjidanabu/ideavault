"use client"

import { authClient } from '@/lib/auth-client'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddIdeaPage = () => {
 
  const { data: session } = authClient.useSession();

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
   
    
    const formValues = Object.fromEntries(formData.entries())
    
   
    const idea = {
      ...formValues,
      userEmail: session?.user?.email || "anonymous" 
    }

    console.log(idea)

    try {
      const res = await fetch('http://localhost:5000/ideas', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(idea)
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        
        toast.success('Startup idea submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
        })
        e.target.reset() 
      } else {
        toast.error('Failed to submit idea. Please try again.', {
          position: "top-right",
          autoClose: 3000,
        })
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Server might be offline!', {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
    
      <ToastContainer />

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        
        <div className="mb-8 border-b border-gray-100 pb-5">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Add New Startup Idea</h2>
          <p className="mt-2 text-sm text-gray-500">
            Share your innovative startup idea with the world. Please fill up the details below.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Idea Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title" 
              required
              placeholder="e.g., AI-Powered Eco Friendly Logistics"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900"
            />
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="shortDescription" 
              required
              placeholder="Catchy one-liner or short summary (Max 150 characters)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category" 
                required
                defaultValue=""
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 bg-white"
              >
                <option value="" disabled>Select a category</option>
                <option value="Tech">Tech</option>
                <option value="AI">AI</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Fintech">Fintech</option>
                <option value="E-commerce">E-commerce</option>
              </select>
            </div>

           
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estimated Budget <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="budget" 
                placeholder="e.g., $5,000 - $10,000"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900"
              />
            </div>

            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="imageUrl" 
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900"
              />
            </div>

           
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="tags" 
                placeholder="e.g., saas, green-tech, automation"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900"
              />
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="targetAudience" 
              required
              placeholder="e.g., Small business owners, University students"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900"
            />
          </div>

        
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Problem Statement <span className="text-red-500">*</span>
            </label>
            <textarea
              name="problemStatement" 
              required
              rows="3"
              placeholder="What exact problem does this idea solve?"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 resize-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Proposed Solution <span className="text-red-500">*</span>
            </label>
            <textarea
              name="proposedSolution"
              required
              rows="3"
              placeholder="How does your idea solve the problem beautifully?"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 resize-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detailedDescription" 
              required
              rows="5"
              placeholder="Provide a comprehensive explanation of your idea, business model, features, etc."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-gray-900 resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto md:px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Submit Idea
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddIdeaPage;


const IdeasPage = async () => {
  const res = await fetch('http://localhost:5000/ideas', { cache: 'no-store' });
  const ideas = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Ideas Page</h1>
      
     
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
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default IdeasPage;
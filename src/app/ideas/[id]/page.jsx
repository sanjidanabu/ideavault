

import CommentsSection from '@/components/CommentsSection'; 

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

 
  const res = await fetch(`http://localhost:5000/ideas/${id}`, { cache: 'no-store' });
  const idea = await res.json();

  if (!idea) {
    return <div className="text-center py-20 text-red-500 font-bold">Idea not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
     
      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-8 relative bg-gray-100">
        {idea.imageUrl ? (
          <img src={idea.imageUrl} alt={idea.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
            {idea.category}
          </span>
        </div>
      </div>

      
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-3">{idea.title}</h1>
        <p className="text-xl font-semibold text-emerald-600 mb-6">Budget: ${idea.budget}</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Short Summary</h3>
            <p className="text-gray-600 leading-relaxed">{idea.shortDescription}</p>
          </div>
          <hr className="border-gray-100" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">The Problem Statement</h3>
            <p className="text-gray-700 bg-red-50/50 p-4 rounded-xl border border-red-100/50 leading-relaxed">{idea.problemStatement}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Proposed Solution</h3>
            <p className="text-gray-700 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50 leading-relaxed">{idea.proposedSolution}</p>
          </div>
          <hr className="border-gray-100" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Detailed Overview</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{idea.detailedDescription}</p>
          </div>
        </div>
      </div>

    
      <CommentsSection ideaId={id} />
    </div>
  );
};

export default IdeaDetailsPage;
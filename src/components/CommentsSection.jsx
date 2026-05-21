"use client";
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client'; 

const CommentsSection = ({ ideaId }) => {
 
  const { data: session } = authClient.useSession();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/ideas/${ideaId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.comments) {
          setComments([...data.comments].reverse());
        }
      })
      .catch(err => console.error("Error fetching comments:", err));
  }, [ideaId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    
    if (!session) {
      alert("Please log in to add a comment!");
      return;
    }

    const commentObj = {
      id: Date.now(), 
      userName: session?.user?.name || "Anonymous User", 
      userEmail: session?.user?.email, 
      userImage: session?.user?.image || "",
      text: newComment,
      timestamp: new Date().toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true, 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    const res = await fetch(`http://localhost:5000/ideas/${ideaId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentObj)
    });

    if (res.ok) {
      setComments([commentObj, ...comments]); 
      setNewComment("");
    }
  };

  const handleDelete = async (commentId) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      const res = await fetch(`http://localhost:5000/ideas/${ideaId}/comments/${commentId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setComments(comments.filter(c => c.id !== commentId)); 
      }
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    const res = await fetch(`http://localhost:5000/ideas/${ideaId}/comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText })
    });

    if (res.ok) {
      setComments(comments.map(c => c.id === commentId ? { ...c, text: editText } : c));
      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Interaction System (Comments)</h3>

    
      <form onSubmit={handleAddComment} className="mb-8">
        <textarea
          rows="3"
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm text-gray-800"
          placeholder={session ? "Write your constructive feedback or comment here..." : "Please log in to participate in the discussion..."}
          disabled={!session} 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button 
            type="submit" 
            disabled={!session}
            className={`font-medium py-2 px-5 rounded-lg transition-colors duration-200 text-sm text-white ${session ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Add Comment
          </button>
        </div>
      </form>

      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                 
                  {comment.userImage ? (
                    <img src={comment.userImage} alt={comment.userName} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {comment.userName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{comment.userName}</h4>
                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                  </div>
                </div>
                
                
                <div className="flex gap-3 text-xs font-semibold text-gray-500">
                  {editingId !== comment.id && session?.user?.email === comment.userEmail && (
                    <>
                      <button onClick={() => startEdit(comment)} className="hover:text-blue-600 transition-colors">Edit</button>
                      <button onClick={() => handleDelete(comment.id)} className="hover:text-red-600 transition-colors">Delete</button>
                    </>
                  )}
                </div>
              </div>

              {editingId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    rows="2"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 text-xs bg-gray-200 rounded-md hover:bg-gray-300 font-medium">Cancel</button>
                    <button onClick={() => handleSaveEdit(comment.id)} className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">Save</button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap pl-11">{comment.text}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
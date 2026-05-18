import { Zap, Users, BarChart3 } from "lucide-react"

export function WorkSection() {
  const steps = [
    {
      stepIcon: Zap,
      title: "Secure Your Idea",
      desc: "Vault your technical concepts with proof of ownership before sharing with global pioneers."
    },
    {
      stepIcon: Users,
      title: "Find Verified Co-Founders",
      desc: "Connect with expert global technical partners to solve workflow blockers and expand assets."
    },
    {
      stepIcon: BarChart3,
      title: "Acquire Funding",
      desc: "Pitch directly to top VC firms and pitch your validated roadmap for strategic seed funds."
    }
  ]

  return (
    
    <div className=" py-12 sm:py-20">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
       
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            Three Simple Steps to Scale
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed px-2">
            The minimal architecture to transition raw thoughts into a fully backed global startup.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((item, index) => (
            <div key={index} className="relative group p-6 sm:p-7 bg-white rounded-2xl border border-slate-100/70 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-50/50 transition-all flex flex-col gap-4">
              
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-red-600 border border-indigo-100/50">
                  <item.stepIcon className="h-5 w-5" />
                </div>
                <div className="text-sm font-bold text-slate-400 group-hover:text-red-400 select-none transition-colors">
                  Step 0{index + 1}
                </div>
              </div>
              
              <div className="space-y-1.5 flex-grow">
                <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
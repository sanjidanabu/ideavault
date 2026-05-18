export function StatsSection() {
  const stats = [
    { id: 1, name: 'Verified Tech Pioneers', value: '12K+' },
    { id: 2, name: 'Seed Funding Raised', value: '$45M+' },
    { id: 3, name: 'Concepts Shared', value: '8,500+' },
    { id: 4, name: 'Global Mentors', value: '350+' },
  ]

  return (
    
    <div className=" py-12 sm:py-16">
     
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
       
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100  shadow-sm shadow-slate-100/50 p-8 sm:p-12">
          
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Empowering Innovations Globally
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
              IdeaVault provides the trusted ground floor metrics where concepts find execution and strategic capital.
            </p>
          </div>
          
          <dl className="grid grid-cols-2 gap-x-4 gap-y-10 text-center md:grid-cols-4 sm:gap-x-8">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-1 sm:gap-y-2 p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-100 w-full hover:shadow-inner hover:border-indigo-100 transition-all">
                <dd className="text-3xl font-extrabold tracking-tight text-red-600 sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {stat.name}
                </dt>
              </div>
            ))}
          </dl>
          
        </div>

      </div>
    </div>
  )
}
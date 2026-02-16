export default function GoalsObjectivesCard() {
    const goals = [
        "Continuously commit to service excellence in skills training in all registered qualifications/programs",
        "Extend skills training opportunities to a greater number of people",
        "Intensify and strengthen linkages with industries known for their international standards",
        "Intensify and strengthen stakeholder's linkages",
        "Improve capability in income generating project production and entrepreneurship",
        "Greening ISAT",
        "Construction of new training laboratories",
        "Implement flexible learning delivery"
    ];

    const objectives = [
        "To strive for excellence in skills training strategy",
        "To upgrade programs in skills training for trainers to be globally competent",
        "To conduct TVET research",
        "To produce globally competitive trainees",
        "To conduct skills training to be identified areas",
        "To produce globally competitive skilled workforce",
        "To establish a strong relationship with different stakeholders of the school",
        "To encourage trainers of all qualifications to venture into IGP",
        "To serve quality and different variety of products",
        "To achieve 100% ARTA/CUSAT positive comments on services and products",
        "To increase the marketability of products and services",
        "To re-orient existing education programs to address sustainable development",
        "Construct additional training laboratories that conforms to the international standards",
        "To construct additional training laboratories that conforms to the international standard",
        "Offer programs relevant to the new normal situation/condition and in demand in the locality",
        "Continues implementation of disrupted programs"
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Goals Section */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 p-8 rounded-xl border-2 border-amber-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg">
                        <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900">GOALS</h3>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {goals.map((goal, index) => (
                        <div key={index} className="flex gap-3 group">
                            <div className="flex-shrink-0 mt-1">
                                <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                                    {index + 1}
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{goal}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Objectives Section */}
            <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-sky-50 p-8 rounded-xl border-2 border-sky-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-sky-900">OBJECTIVES</h3>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {objectives.map((objective, index) => (
                        <div key={index} className="flex gap-3 group">
                            <div className="flex-shrink-0 mt-1">
                                <div className="h-6 w-6 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform">
                                    {index + 1}
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{objective}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

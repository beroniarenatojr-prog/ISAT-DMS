export default function StatCard({ title, value, color = 'blue', icon, trend }) {
    const colorClasses = {
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            iconBg: 'bg-blue-500',
            text: 'text-blue-900',
            trend: 'text-blue-600'
        },
        green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            iconBg: 'bg-green-600',
            text: 'text-green-900',
            trend: 'text-green-600'
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            iconBg: 'bg-purple-500',
            text: 'text-purple-900',
            trend: 'text-purple-600'
        },
    };

    const colors = colorClasses[color];

    return (
        <div className={`${colors.bg} ${colors.border} border-2 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`${colors.iconBg} p-3 rounded-lg text-white`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-sm font-semibold ${colors.trend} flex items-center gap-1`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {trend}
                    </span>
                )}
            </div>
            <h4 className={`text-sm font-medium ${colors.text} opacity-80 mb-2`}>{title}</h4>
            <p className={`text-4xl font-bold ${colors.text}`}>{value}</p>
        </div>
    );
}

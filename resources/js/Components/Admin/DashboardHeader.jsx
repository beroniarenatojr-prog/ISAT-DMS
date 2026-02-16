export default function DashboardHeader({ title, subtitle }) {
    return (
        <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{title}</h3>
            {subtitle && (
                <p className="text-gray-600 text-lg flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

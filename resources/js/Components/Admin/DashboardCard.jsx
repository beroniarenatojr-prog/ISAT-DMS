export default function DashboardCard({ children, className = '' }) {
    return (
        <div className={`bg-white overflow-hidden shadow-lg sm:rounded-2xl border border-gray-100 ${className}`}>
            <div className="p-8 text-gray-900">
                {children}
            </div>
        </div>
    );
}

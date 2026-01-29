interface CardProps {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

export default function Card({ icon, title, detail }: CardProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-green-200 hover:shadow-lg hover:shadow-green-100 transition-all">
        <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
            {title}
        </h3>
        <p className="text-slate-600 leading-relaxed text-sm">
            {detail}
        </p>
    </div>
  );
}
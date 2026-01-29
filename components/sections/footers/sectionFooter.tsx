export default function SectionFooter() {
    return (
      <footer className="bg-slate-900 text-white py-8 px-6 mt-16">
        <div className="container mx-auto max-w-4xl text-center text-slate-400 text-sm">
          <p>
            © {new Date().getFullYear()} Table Snap Pro. Desarrollado por David Camilo Cortés Salazar
          </p>
        </div>
      </footer>
    );
}
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">404</p>
      <p className="text-gray-500 mb-4">Esta página no existe.</p>
      <Link href="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
    </div>
  );
}

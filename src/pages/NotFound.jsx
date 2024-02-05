import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center text-center min-h-screen gap-6 flex-col">
      <span className="block text-3xl font-productSans">Tidak Ditemukan!</span>
      <Link to={"/"} className="px-4 py-2 cursor-pointer bg-primary-main font-productSans hover:bg-primary-hover active:bg-primary-pressed overflow-hidden text-xl rounded-md text-neutral-10">
        Kembali
      </Link>
    </div>
  );
}

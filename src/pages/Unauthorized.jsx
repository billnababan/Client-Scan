import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex justify-center items-center text-center min-h-screen gap-6 flex-col">
      <span className="block text-2xl md:text-3xl font-productSans">Anda tidak mempunyai izin!</span>
      <Link to={"/"} className="px-4 py-2 cursor-pointer bg-primary-main font-productSans hover:bg-primary-hover active:bg-primary-pressed overflow-hidden text-xl rounded-md text-neutral-10">
        Kembali
      </Link>
    </div>
  );
}

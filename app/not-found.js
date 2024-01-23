import Link from "next/link";
import Image from "next/image";
import notFound from "@/public/not-found.jpg";
const NotFound = async () => {
  return (
    <div className="flex flex-col items-center  h-screen">
      <h2 className="text-4xl font-semibold my-8">Oops! Page Not Found</h2>
      <Image
        src={notFound}
        unoptimized={true}
        alt="Page Not Found"
        className="rounded-lg"
        width={400}
        height={400}
      />
      <p className="text-gray-600 text-center mt-4">
        The page you are looking for might be in another aisle.
      </p>
      <Link href="/">
        <button className="btn btn-accent"> Return to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;

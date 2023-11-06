import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6 shadow-md flex items-center ">
      <Image
        alt="Travel Planner Logo"
        className="rounded-full"
        height="50"
        src="/logo.png"
        style={{
          aspectRatio: "50/50",
          objectFit: "cover",
        }}
        width="50"
      />
      <h1 className="text-2xl font-bold">Chalo Chalein</h1>
    </header>
  );
};

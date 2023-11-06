import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { Planner } from "@/components/planner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className={`w-full max-w-6xl mx-auto ${inter.className}`}>
      <div className="flex flex-col min-h-screen">
        <QueryClientProvider client={queryClient}>
          <Header />
          <Planner />
          <Footer />
        </QueryClientProvider>
      </div>
    </div>
  );
}

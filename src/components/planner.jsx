/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ec4buFBojWU
 */
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Image from "next/image";
import { TripForm } from "./tripForm";

export function Planner() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (formData) => {
      const response = await fetch("/api/planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return JSON.parse(data.result).plans;
    },
    {
      onSuccess: (data) => {
        // Invalidate and refetch data query after a successful mutation
        queryClient.invalidateQueries("data");
      },
    }
  );

  const handleSubmit = async (values) => {
    try {
      // Call the mutation with your form data
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  let disabled = mutation.isLoading;
  let data = mutation.isSuccess && mutation.data;

  return (
    <main className="flex-grow">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Create Your Itinerary
              </h2>
              <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                Plan your trip and visualize it on the map.
              </p>
              <TripForm handleSubmit={handleSubmit} isLoading={disabled} />
            </div>
            <Image
              alt="Map"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/travel.png"
              width="550"
            />
          </div>
          <div className="mt-10">
            {data && data.length ? (
              <h3 className="text-2xl font-bold mb-4">Itinerary Details:</h3>
            ) : null}
            {disabled ? (
              <div className="w-full table-auto border-collapse">
                <div className="flex flex-col justify-center items-center h-64 bg-gray-200 dark:bg-gray-700 space-y-4">
                  <svg
                    className=" animate-spin text-5xl text-gray-500 dark:text-gray-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" x2="12" y1="2" y2="6" />
                    <line x1="12" x2="12" y1="18" y2="22" />
                    <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
                    <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
                    <line x1="2" x2="6" y1="12" y2="12" />
                    <line x1="18" x2="22" y1="12" y2="12" />
                    <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
                    <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
                  </svg>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    We are loading your trip plan...
                  </p>
                </div>
              </div>
            ) : data && data.length ? (
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-4 py-2">Day</th>
                    <th className="px-4 py-2">Place</th>
                    <th className="px-4 py-2">Weather</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((plan) => {
                    return (
                      <tr key={plan.day}>
                        <td className="border px-4 py-2">{plan.day}</td>
                        <td className="border px-4 py-2">{plan.places}</td>
                        <td className="border px-4 py-2">{plan.weather}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

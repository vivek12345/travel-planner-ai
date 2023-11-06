import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  country: z
    .string({
      required_error: "Please select a country to plan trip.",
    })
    .min(2, {
      message: "Country must be at least 2 characters.",
    }),
  days: z.string().min(1, {
    message: "Minumum days have to be 1",
  }),
  type: z.string(),
  arrival: z.string().min(3, {
    message: "Arrival city has to be atleast 3 characters.",
  }),
  departure: z.string().min(3, {
    message: "Depature city has to be atleast 3 characters.",
  }),
});

export const TripForm = ({ isLoading, handleSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      days: "",
      type: "relaxation",
      arrival: "",
      departure: "",
    },
  });
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    handleSubmit(values);
  }
  let disabled = isLoading || !form.formState.isValid;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-2"
      >
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter country"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="days"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  className="max-w-lg flex-1"
                  placeholder="Number of days"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrival"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="max-w-lg flex-1"
                  placeholder="City of arrival"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departure"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="max-w-lg flex-1"
                  placeholder="City of departure"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trip type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="solo">Solo</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural-experiences">
                    Cultural Experiences
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disabled} onClick={handleSubmit}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Plan My Itinerary
        </Button>
      </form>
    </Form>
  );
};

import Image from "next/image";
import { Event } from "@/lib/types";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-65 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{event.title}</h3>

        <p className="text-gray-500 text-sm mt-1">
          {new Date(event.startDatetime).toLocaleDateString()}
        </p>

        <p className="text-orange-500 font-semibold mt-2">₹{event.amount}</p>
      </div>
    </div>
  );
}

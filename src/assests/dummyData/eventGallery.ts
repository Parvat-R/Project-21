export type EventGalleryItem = {
  id: number;
  image: string;
  title: string;
  category: string;
};
import img1 from "@/assests/8.jpeg"

export const eventGallery: EventGalleryItem[] = [
  {
    id: 1,
    image: "/events/event1.jpg",
    title: "Fashion Show",
    category: "Corporate Event",
  },
  {
    id: 2,
    image: "/events/event2.jpg",
    title: "Live Music Concert",
    category: "Entertainment Event",
  },
  {
    id: 3,
    image: "/events/event3.jpg",
    title: "Brand Promotion",
    category: "Marketing Event",
  },
  {
    id: 4,
    image: "/events/event4.jpg",
    title: "Product Launch",
    category: "Corporate Event",
  },
  {
    id: 5,
    image: "/events/event5.jpg",
    title: "Award Ceremony",
    category: "Corporate Gala",
  },
  {
    id: 6,
    image: "/events/event6.jpg",
    title: "Tech Conference",
    category: "Professional Event",
  },
];

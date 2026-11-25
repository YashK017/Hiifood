// Sample food listings shipped with the app. User-posted donations are
// stored in localStorage and merged with these at read time.

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "meals", label: "Meals" },
  { id: "fruits-vegetables", label: "Fruits & Vegetables" },
  { id: "bakery", label: "Bakery" },
  { id: "snacks", label: "Snacks" },
  { id: "beverages", label: "Beverages" },
  { id: "other", label: "Other" },
];

export const FOOD_TYPES = [
  "Cooked Meal",
  "Fruits",
  "Vegetables",
  "Bakery",
  "Snacks",
  "Beverages",
  "Other",
];

export const FOODS = [
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    image: "/images/food-biryani.jpg",
    description:
      "Freshly cooked vegetable biryani with raita. Made this afternoon — plenty left over from a family function.",
    category: "meals",
    foodType: "Cooked Meal",
    vegetarian: true,
    donor: { name: "Hotel Spice Route", type: "Restaurant", rating: 4.8 },
    distanceKm: 1.2,
    quantity: "12 portions",
    portions: 12,
    pickupTime: "Today, 6–9 PM",
    expiry: "Today, 10 PM",
    location: "Park Street, Kolkata",
    status: "available",
  },
  {
    id: "mixed-fruits",
    name: "Mixed Fruits",
    image: "/images/food-fruits.jpg",
    description:
      "Seasonal fruits — apples, bananas, oranges and grapes. Fresh from this morning's stock.",
    category: "fruits-vegetables",
    foodType: "Fruits",
    vegetarian: true,
    donor: { name: "Fruit Plus Market", type: "Store", rating: 4.6 },
    distanceKm: 2.4,
    quantity: "8 kg",
    portions: 20,
    pickupTime: "Today, 4–8 PM",
    expiry: "Tomorrow",
    location: "Salt Lake, Kolkata",
    status: "available",
  },
  {
    id: "creamy-pasta",
    name: "Creamy Pasta",
    image: "/images/food-pasta.jpg",
    description:
      "Creamy white-sauce pasta with vegetables. Cooked in bulk for an event that got cancelled.",
    category: "meals",
    foodType: "Cooked Meal",
    vegetarian: true,
    donor: { name: "Community Kitchen", type: "NGO", rating: 4.9 },
    distanceKm: 3.1,
    quantity: "15 portions",
    portions: 15,
    pickupTime: "Today, 5–7 PM",
    expiry: "Today, 9 PM",
    location: "Ballygunge, Kolkata",
    status: "almost",
  },
  {
    id: "veggie-sandwiches",
    name: "Veggie Sandwiches",
    image: "/images/food-sandwiches.jpg",
    description:
      "Grilled vegetable sandwiches, packed and ready. Great for an evening snack.",
    category: "snacks",
    foodType: "Snacks",
    vegetarian: true,
    donor: { name: "Daily Bites Cafe", type: "Restaurant", rating: 4.5 },
    distanceKm: 0.8,
    quantity: "20 pieces",
    portions: 20,
    pickupTime: "Today, 3–6 PM",
    expiry: "Today, 8 PM",
    location: "Gariahat, Kolkata",
    status: "available",
  },
  {
    id: "rice-curry",
    name: "Rice & Curry",
    image: "/images/food-ricecurry.jpg",
    description:
      "Steamed rice with mixed-veg curry and dal. Home-cooked, hygienic and packed in boxes.",
    category: "meals",
    foodType: "Cooked Meal",
    vegetarian: true,
    donor: { name: "Meera's Kitchen", type: "Home", rating: 5.0 },
    distanceKm: 1.7,
    quantity: "10 boxes",
    portions: 10,
    pickupTime: "Today, 7–9 PM",
    expiry: "Today, 11 PM",
    location: "Behala, Kolkata",
    status: "available",
  },
  {
    id: "bread-pastries",
    name: "Bread & Pastries",
    image: "/images/food-bakery.jpg",
    description:
      "End-of-day bakery surplus — breads, buns and pastries. Perfectly good, just unsold.",
    category: "bakery",
    foodType: "Bakery",
    vegetarian: true,
    donor: { name: "The Baker's House", type: "Store", rating: 4.7 },
    distanceKm: 4.2,
    quantity: "30 items",
    portions: 30,
    pickupTime: "Today, 8–10 PM",
    expiry: "Tomorrow morning",
    location: "New Town, Kolkata",
    status: "almost",
  },
];

export const IMPACT_STATS = [
  { value: "12,450+", label: "Meals shared" },
  { value: "8,230 kg", label: "Food rescued" },
  { value: "6,450+", label: "People helped" },
  { value: "24.6 t", label: "CO₂ avoided" },
];

export const STATUS_LABELS = {
  available: "Available",
  almost: "Almost Claimed",
  claimed: "Claimed",
  expired: "Expired",
};

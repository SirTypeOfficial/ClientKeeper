import type { Customer } from "@/lib/types";

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    phoneNumber: "555-1234",
    birthday: new Date(1990, 5, 15), // June 15, 1990
    tags: ["VIP", "Repeat"],
    dateAdded: new Date(2023, 0, 10), // Jan 10, 2023
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    phoneNumber: "555-5678",
    birthday: new Date(1985, 8, 22), // Sep 22, 1985
    tags: ["New"],
    dateAdded: new Date(2023, 1, 20), // Feb 20, 2023
  },
  {
    id: "3",
    firstName: "Charlie",
    phoneNumber: "555-9101",
    birthday: new Date(1995, 11, 5), // Dec 5, 1995
    dateAdded: new Date(2023, 3, 5), // Apr 5, 2023
  },
  {
    id: "4",
    firstName: "Diana",
    lastName: "Prince",
    phoneNumber: "555-1122",
    tags: ["Referral"],
    dateAdded: new Date(2023, 4, 15), // May 15, 2023
  },
  {
    id: "5",
    firstName: "Ethan",
    lastName: "Hunt",
    phoneNumber: "555-3344",
    birthday: new Date(1988, 7, 1), // Aug 1, 1988
    tags: ["Loyal"],
    dateAdded: new Date(2023, 5, 25), // Jun 25, 2023
  },
];

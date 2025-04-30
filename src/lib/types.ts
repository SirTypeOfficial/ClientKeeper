export interface Customer {
  id: string; // Unique identifier
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  birthday?: Date;
  tags?: string[]; // Array of strings for tags
  dateAdded: Date; // Date the customer was added
}

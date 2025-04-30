/**
 * Represents a contact with a name and phone number.
 */
export interface Contact {
  /**
   * The name of the contact.
   */
  name: string;
  /**
   * The phone number of the contact.
   */
  phoneNumber: string;
}

/**
 * Asynchronously retrieves a list of contacts from the user's phone.
 *
 * @returns A promise that resolves to an array of Contact objects.
 */
export async function getContacts(): Promise<Contact[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'John Doe',
      phoneNumber: '123-456-7890',
    },
    {
      name: 'Jane Smith',
      phoneNumber: '987-654-3210',
    },
  ];
}

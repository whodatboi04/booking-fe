import React, { useState } from "react";

const BookingContext = React.createContext<any>(undefined);

const BookingContextProvider = ({ children }: any) => {
  const [bookings, setBookings] = useState<any>({});
  const contextValue = { bookings, setBookings };
  
  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};
export const useBookingContext = (): any => {
  const context = React.useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBookingContext must be used within a BookingContextProvider"
    );
  }

  return context;
};

export default BookingContextProvider;

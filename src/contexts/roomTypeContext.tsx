import React, { useState } from "react";

const RoomTypeContext = React.createContext<any>(undefined);

const RoomTypeContextProvider = ({ children }: any) => {
  const [roomTypes, setRoomTypes] = useState<any>({});
  const contextValue = { roomTypes, setRoomTypes };

  return (
    <RoomTypeContext.Provider value={contextValue}>
      {children}
    </RoomTypeContext.Provider>
  );
};

export const useRoomTypeContext = (): any => {
  const context = React.useContext(RoomTypeContext);

  if (!context) {
    throw new Error(
      "RoomTypeContext must be used within a RoomTypeContextProvider"
    );
  }

  return context;
};

export default RoomTypeContextProvider;

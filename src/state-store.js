import { create } from "zustand";

const StateStore = (set) => ({
  userInformation: {},
  setUserInformation: (userInformation) =>
    set((state) => ({
      userInformation: (state.userInformation = userInformation),
    })),
  // all events
  allEvents: [],
  setAllEvents: (allEvents) => set((state) => ({ allEvents: (state.allEvents = allEvents) })),
// all events available
  availableEvents: [],
  setAvailableEvents: (availableEvents) => set((state) => ({ availableEvents: (state.availableEvents = availableEvents) })),
// my created events
  myOrganizedEvents: [],
  setMyOrganizedEvents: (myOrganizedEvents) => set((state) => ({ myOrganizedEvents: (state.myOrganizedEvents = myOrganizedEvents) })),
// joined events id
  myJoinedEventsID: [], //joined events id table
  setMyJoinedEventsID: (myJoinedEventsID) =>
    set((state) => ({ myJoinedEventsID: (state.myJoinedEventsID = myJoinedEventsID) })),
// joined events 
  myJoinedEvents: [],
  setMyJoinedEvents: (myJoinedEvents) =>
    set((state) => ({ myJoinedEvents: (state.myJoinedEvents = myJoinedEvents) })),

  updateEvents: (idToRemove) => {
    const newEvents = events.filter((event) => event.id !== idToRemove);
    set({ events: newEvents });
  },
  updateMyEvents: (idToRemove) => {
    const newMyEvents = myEvents.filter((event) => event.id !== idToRemove);
    set({ myEvents: newMyEvents });
  },
});

const UseStateStore = create(StateStore);

export default UseStateStore;
